# Selective Event Subscription System

The NFT generation system now supports categorized worker thread events that you can subscribe to selectively. This allows you to monitor only the specific aspects of the generation process you care about.

## Event Categories

The system categorizes events into these types:

- **`FRAME`** - Frame processing events (started, completed, failed, skipped)
- **`EFFECT`** - Effect processing events (effect applications, failures)
- **`FILE_IO`** - File operations (reading settings, writing frames, cleanup)
- **`PERFORMANCE`** - Timing and performance metrics
- **`RESOURCE`** - Memory and resource usage tracking
- **`ERROR`** - Error and warning events
- **`LIFECYCLE`** - Worker startup/shutdown events
- **`PROGRESS`** - Progress tracking and status updates

## Basic Usage

### 1. Standard Event Handlers (Existing)

```javascript
import { setupProjectEventHandlers } from "./src/util/project-event-handlers.js";

// Full logging (verbose)
setupProjectEventHandlers(project, { verbose: true });

// Minimal logging (start/complete + errors only)
setupMinimalProjectEventHandlers(project);

// Silent (errors only)
setupSilentProjectEventHandlers(project);
```

### 2. Category-Based Subscriptions

The `setupCategoryEventHandlers` function now includes comprehensive defaults that show all available options:

```javascript
import { setupCategoryEventHandlers } from "./src/util/project-event-handlers.js";

// Using defaults (frames, lifecycle, progress, errors enabled)
const { subscriber } = setupCategoryEventHandlers(project);

// Or customize any category:
const { subscriber } = setupCategoryEventHandlers(project, {
    // Event categories to subscribe to
    frames: true,           // Frame progress events (started, completed, failed)
    performance: false,     // Performance metrics (timing, memory usage)
    effects: false,         // Effect processing events
    fileIo: false,          // File I/O operations (read, write, delete)
    resource: false,        // Resource allocation (buffers, canvas)
    lifecycle: true,        // Worker lifecycle (started, completed)
    progress: true,         // Progress updates and status
    errors: true,           // Error and warning events (always recommended)

    // Advanced filtering options for each category
    frameOptions: {
        rateLimit: 1000,        // Max 1 event per 1000ms
        frameFilter: {
            modulo: 10,         // Only every 10th frame
            only: [1, 5, 10],   // Only specific frames
            skip: [50, 100]     // Skip specific frames
        }
    },

    performanceOptions: {
        rateLimit: 5000,        // Performance updates every 5 seconds max
    },

    effectOptions: {
        rateLimit: 2000,        // Effect updates every 2 seconds max
        frameFilter: { modulo: 5 }  // Only every 5th frame
    },

    fileIoOptions: {
        rateLimit: 1000,        // File I/O updates every second max
    },

    resourceOptions: {
        rateLimit: 10000,       // Resource updates every 10 seconds max
    },

    lifecycleOptions: {
        // No rate limiting on lifecycle events
    },

    progressOptions: {
        rateLimit: 2000,        // Progress updates every 2 seconds max
    },

    errorOptions: {
        // No filtering on errors - always show immediately
    },

    // Global options
    verbose: false              // Show additional details in event messages
});
```

### 3. Advanced Selective Subscriptions

```javascript
import { createSelectiveSubscriber } from "./src/util/project-event-handlers.js";
import { WorkerEventCategories, ProjectEvents } from "my-nft-gen/src/app/Project.js";

const subscriber = createSelectiveSubscriber(project);

// Subscribe to frame events with filtering
const frameSubId = subscriber.subscribeToCategory(
    WorkerEventCategories.FRAME,
    (data) => {
        console.log(`Frame ${data.frameNumber}: ${data.eventName}`);
    },
    {
        rateLimit: 100,         // Max 1 event per 100ms
        frameFilter: {
            modulo: 5,          // Only every 5th frame
            only: [1, 10, 20],  // Or specific frames
            skip: [50, 60]      // Skip certain frames
        },
        workerFilter: {
            only: ['worker-1'],  // Only from specific workers
            skip: ['worker-2']   // Or skip specific workers
        }
    }
);

// Subscribe to specific events
const lifecycleSubId = subscriber.subscribeToEvents(
    [ProjectEvents.GENERATION_STARTED, ProjectEvents.GENERATION_COMPLETED],
    (data) => {
        console.log(`Lifecycle: ${data.eventName}`);
    }
);

// Clean up when done
subscriber.unsubscribe(frameSubId);
subscriber.unsubscribeAll(); // Or remove all
```

## Real-World Examples

### Monitor Only Critical Events
```javascript
// Minimal monitoring - just start/complete and errors
const { subscriber } = setupCategoryEventHandlers(project, {
    frames: false,          // Disable frame progress
    performance: false,     // Disable performance metrics
    effects: false,         // Disable effect processing
    fileIo: false,          // Disable file operations
    resource: false,        // Disable resource tracking
    lifecycle: true,        // Keep worker lifecycle events
    progress: false,        // Disable progress updates
    errors: true            // Always keep errors enabled
});
```

### Development/Debug Mode
```javascript
// Full visibility for development
const { subscriber } = setupCategoryEventHandlers(project, {
    frames: true,
    performance: true,
    effects: true,
    fileIo: true,
    resource: true,
    lifecycle: true,
    progress: true,
    errors: true,

    // Reasonable rate limiting to prevent spam
    frameOptions: {
        frameFilter: { modulo: 5 }  // Every 5th frame
    },

    performanceOptions: {
        rateLimit: 3000             // Every 3 seconds max
    },

    verbose: true                   // Detailed information
});
```

### Performance Monitoring
```javascript
// Track performance without spam
const subscriber = createSelectiveSubscriber(project);

subscriber.subscribeToCategory(
    WorkerEventCategories.PERFORMANCE,
    (data) => {
        if (data.eventName === ProjectEvents.TIMING_FRAME) {
            console.log(`Frame ${data.frameNumber}: ${data.totalMs}ms`);
        } else if (data.eventName === ProjectEvents.MEMORY_USAGE) {
            const memMB = Math.round(data.heapUsed / 1024 / 1024);
            console.log(`Memory: ${memMB}MB`);
        }
    },
    {
        rateLimit: 1000,  // Max 1 per second
        frameFilter: { modulo: 10 }  // Every 10th frame
    }
);
```

### Debug Specific Frame Range
```javascript
// Debug frames 100-110 only
subscriber.subscribeToCategory(
    WorkerEventCategories.FRAME,
    (data) => {
        console.log(`🐛 Debug Frame ${data.frameNumber}: ${data.eventName}`, data);
    },
    {
        frameFilter: {
            only: Array.from({length: 11}, (_, i) => i + 100) // [100,101,102...110]
        }
    }
);
```

### Progress Tracking with Throttling
```javascript
let lastProgressUpdate = 0;

subscriber.subscribeToCategory(
    WorkerEventCategories.FRAME,
    (data) => {
        if (data.eventName === ProjectEvents.FRAME_COMPLETED) {
            const now = Date.now();
            if (now - lastProgressUpdate > 5000) { // Every 5 seconds max
                const progress = ((data.frameNumber / data.totalFrames) * 100).toFixed(1);
                console.log(`Progress: ${progress}% (Frame ${data.frameNumber})`);
                lastProgressUpdate = now;
            }
        }
    }
);
```

## Event Data Structure

All events include this structure:
```javascript
{
    eventName: "frameCompleted",      // The specific event
    category: "frame",                // Event category
    workerId: "frame-worker-12345",   // Which worker generated this
    timestamp: 1634567890123,         // When it happened
    elapsedMs: 5432,                  // Time since worker started
    subscriptionId: "sub_123",        // Your subscription ID

    // Event-specific data
    frameNumber: 42,
    durationMs: 156,
    outputPath: "/path/to/frame.png",
    // ... more depending on event type
}
```

## Managing Subscriptions

```javascript
const subscriber = createSelectiveSubscriber(project);

// Get info about active subscriptions
console.log(subscriber.getSubscriptionInfo());

// Pause/resume (useful for debugging)
subscriber.pause();   // Events won't fire
subscriber.resume();  // Events fire again

// Individual cleanup
subscriber.unsubscribe(subscriptionId);

// Clean up everything
subscriber.unsubscribeAll();
```

This system gives you fine-grained control over what events you see, with powerful filtering options to reduce noise and focus on what matters for your specific use case.