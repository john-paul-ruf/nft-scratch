import { Project, ProjectEvents, WorkerEventCategories } from "my-nft-gen/src/app/Project.js";
import { createSelectiveSubscriber, setupCategoryEventHandlers } from "../util/project-event-handlers.js";
import { neonLights } from "../assets/color-scheme-store.js";

/**
 * Demonstration of the selective event subscription system
 */

console.log("🚀 Selective Event Subscription Demo\n");

const project = new Project({
    artist: 'Demo Artist',
    projectName: 'selective-events',
    projectDirectory: '/tmp/selective-demo/',
    numberOfFrame: 50, // Small number for demo
    colorScheme: neonLights
});

// Example 1: Subscribe to only frame events with rate limiting
console.log("📋 Example 1: Frame events with rate limiting (max 1 per 100ms)");
const subscriber = createSelectiveSubscriber(project);

const frameSubId = subscriber.subscribeToCategory(
    WorkerEventCategories.FRAME,
    (data) => {
        console.log(`   🎬 ${data.eventName}: Frame ${data.frameNumber} (Worker: ${data.workerId})`);
    },
    {
        rateLimit: 100, // Max 1 event per 100ms
        frameFilter: {
            modulo: 5 // Only show every 5th frame
        }
    }
);

// Example 2: Subscribe to performance events only
console.log("\n📋 Example 2: Performance events only");
const perfSubId = subscriber.subscribeToCategory(
    WorkerEventCategories.PERFORMANCE,
    (data) => {
        if (data.eventName === ProjectEvents.TIMING_FRAME) {
            console.log(`   ⏱️  Frame ${data.frameNumber} took ${data.totalMs}ms`);
        } else if (data.eventName === ProjectEvents.MEMORY_USAGE) {
            const memMB = Math.round(data.heapUsed / 1024 / 1024);
            console.log(`   💾 Memory: ${memMB}MB heap used`);
        }
    }
);

// Example 3: Subscribe to specific events only
console.log("\n📋 Example 3: Specific lifecycle events");
const lifecycleSubId = subscriber.subscribeToEvents(
    [ProjectEvents.GENERATION_STARTED, ProjectEvents.GENERATION_COMPLETED, ProjectEvents.WORKER_STARTED],
    (data) => {
        console.log(`   🔄 ${data.eventName}:`, data.timestamp || data.workerId || 'Event fired');
    }
);

// Example 4: Using the convenience function for category-based subscriptions
console.log("\n📋 Example 4: Category-based subscription with options");
const { subscriber: categorySubscriber } = setupCategoryEventHandlers(project, {
    frames: true,
    performance: true,
    errors: true,
    frameOptions: {
        frameFilter: {
            modulo: 10 // Only every 10th frame
        }
    }
});

// Add some effects to trigger events
console.log("\n🎨 Adding effects to trigger events...");
// Note: Since this is a demo, we won't run the full generation
// In a real scenario, you'd call project.generateRandomLoop() here

// Simulate some events for demonstration
setTimeout(() => {
    console.log("\n🎯 Simulating project lifecycle events...");

    // These would normally be fired by the worker threads
    project.emit(ProjectEvents.GENERATION_STARTED, {
        projectName: project.projectName,
        timestamp: new Date().toISOString()
    });

    project.emit(ProjectEvents.WORKER_STARTED, {
        workerId: 'demo-worker-1',
        config: { totalFrames: 50 }
    });

    // Simulate frame events
    for (let i = 0; i < 10; i++) {
        setTimeout(() => {
            project.emit(ProjectEvents.FRAME_STARTED, {
                frameNumber: i,
                workerId: 'demo-worker-1'
            });

            setTimeout(() => {
                project.emit(ProjectEvents.FRAME_COMPLETED, {
                    frameNumber: i,
                    workerId: 'demo-worker-1',
                    durationMs: Math.floor(Math.random() * 1000) + 100
                });
            }, 50);
        }, i * 100);
    }

    setTimeout(() => {
        project.emit(ProjectEvents.GENERATION_COMPLETED, {
            projectName: project.projectName,
            timestamp: new Date().toISOString()
        });

        console.log("\n📊 Subscription Info:");
        console.log(subscriber.getSubscriptionInfo());

        console.log("\n🧹 Cleaning up subscriptions...");
        subscriber.unsubscribeAll();
        categorySubscriber.unsubscribeAll();

        console.log("\n✅ Demo completed!");
    }, 2000);
}, 1000);

// Example of advanced filtering options
console.log("\n📋 Example 5: Advanced filtering options");
const advancedSubId = subscriber.subscribeToCategory(
    WorkerEventCategories.FRAME,
    (data) => {
        console.log(`   🎯 Advanced filter: ${data.eventName} frame ${data.frameNumber}`);
    },
    {
        frameFilter: {
            only: [1, 5, 10], // Only frames 1, 5, and 10
        },
        workerFilter: {
            skip: ['worker-2'] // Skip events from worker-2
        },
        rateLimit: 50 // Max 1 event per 50ms
    }
);

export { project, subscriber };