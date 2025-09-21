import {RequestNewWorkerThread} from "my-nft-gen/src/core/worker-threads/RequestNewWorkerThread.js";
import {WorkerEventLogger} from "my-nft-gen/src/core/events/WorkerEventLogger.js";
import {UnifiedEventBus} from "my-nft-gen/src/core/events/UnifiedEventBus.js";
import {WorkerEventCategories} from "my-nft-gen/src/core/events/WorkerEventCategories.js";
import {promises as fs} from 'fs';

// npm run resume-folder src/scratch/hoz-r3kn5mi/settings/hoz-r3kn5mi-settings.json

const settingsPath = process.argv[2];
if (!settingsPath) {
    console.error('❌ Please provide a settings file path');
    process.exit(1);
}

try {
    const settingsData = await fs.readFile(settingsPath, 'utf8');
    const settings = JSON.parse(settingsData);

    console.log(`🔄 Resuming project: ${settings.config?.finalFileName || 'unknown'}`);
    console.log(`📁 From: ${settingsPath}`);

    // Create UnifiedEventBus with logging
    const eventBus = new UnifiedEventBus({
        enableDebug: false,
        enableMetrics: true,
        enableEventHistory: true
    });

    // Subscribe WorkerEventLogger to the event bus
    const { logger } = WorkerEventLogger.subscribeToCategories(eventBus, [
        WorkerEventCategories.FRAME,     // Frame progress
        WorkerEventCategories.EFFECT,    // Effect processing
        WorkerEventCategories.FILE_IO,   // File operations
        WorkerEventCategories.LIFECYCLE, // Worker start/complete
        WorkerEventCategories.ERROR      // Errors and warnings
    ], {
        showFrames: true,
        showEffects: true,
        showFileIO: true,
        showPerformance: false,
        showLifecycle: true,
        showErrors: true,
        verbose: false
    });

    // Start the worker thread with our event bus
    console.log(`🚀 Starting worker thread...`);
    await RequestNewWorkerThread(settingsPath, eventBus);

    // Show event metrics
    const metrics = eventBus.getMetrics();
    console.log('✅ Resume completed');
    console.log(`📊 Event metrics: ${metrics.totalEvents} events processed`);

    if (process.env.DEBUG_EVENTS) {
        console.log('🔍 Event breakdown:', metrics.eventCounts);
    }

} catch (error) {
    console.error('❌ Failed to resume project:', error.message);
    process.exit(1);
}