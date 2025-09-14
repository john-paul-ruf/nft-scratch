import { ProjectEvents, WorkerEventCategories } from "my-nft-gen/src/app/Project.js";
import { SelectiveEventSubscriber } from "my-nft-gen/src/core/events/SelectiveEventSubscriber.js";
import { WorkerEventLogger } from "my-nft-gen/src/core/events/WorkerEventLogger.js";

// Helper function to format duration in human-readable format
const formatDuration = (ms) => {
    if (ms < 1000) return `${ms}ms`;
    if (ms < 60000) return `${(ms / 1000).toFixed(1)}s`;
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}m ${seconds}s`;
};

// Helper function to estimate time to completion
const estimateTimeToCompletion = (currentFrame, totalFrames, averageFrameTime, startTime) => {
    if (!averageFrameTime || currentFrame === 0) return 'calculating...';

    const framesRemaining = totalFrames - (currentFrame + 1);
    const estimatedRemainingMs = framesRemaining * averageFrameTime;
    const estimatedCompletionTime = new Date(Date.now() + estimatedRemainingMs);

    let durationText = '';
    if (estimatedRemainingMs < 60000) {
        durationText = `~${Math.round(estimatedRemainingMs / 1000)}s`;
    } else if (estimatedRemainingMs < 3600000) {
        const minutes = Math.round(estimatedRemainingMs / 60000);
        durationText = `~${minutes}m`;
    } else {
        const hours = Math.floor(estimatedRemainingMs / 3600000);
        const minutes = Math.round((estimatedRemainingMs % 3600000) / 60000);
        durationText = `~${hours}h ${minutes}m`;
    }

    const completionTimeString = estimatedCompletionTime.toLocaleString();
    return `${durationText} remaining (ETA: ${completionTimeString})`;
};

// Helper function to log detailed effect structure
const logEffectStructure = (settings) => {
    if (!settings) {
        console.log(`\n📋 Effect Structure: No settings data available`);
        return;
    }

    console.log(`\n📋 Effect Structure for: ${settings.config?.finalFileName || 'Project'}`);

    // Log primary effects
    if (settings.effects && settings.effects.length > 0) {
        console.log(`\n🎨 Primary Effects (${settings.effects.length}):`);
        settings.effects.forEach((effect, index) => {
            const effectName = effect.effect?.name || effect.name || effect.constructor?.name || 'Unknown Effect';
            console.log(`   ${index + 1}. ${effectName}`);

            // Try to get effect info if available - getInfo() is on the Effect class itself
            try {
                if (typeof effect.getInfo === 'function') {
                    const info = effect.getInfo();
                    if (info && typeof info === 'string') {
                        // Clean up the formatting
                        const cleanInfo = info.replace(/\n\s*/g, '\n      ').trim();
                        console.log(`      ${cleanInfo}`);
                    }
                }
            } catch (err) {
                // Silently ignore if getInfo fails
            }
        });
    }

    // Log final image effects
    if (settings.finalImageEffects && settings.finalImageEffects.length > 0) {
        console.log(`\n🎭 Final Image Effects (${settings.finalImageEffects.length}):`);
        settings.finalImageEffects.forEach((effect, index) => {
            const effectName = effect.effect?.name || effect.name || effect.constructor?.name || 'Unknown Effect';
            console.log(`   ${index + 1}. ${effectName}`);

            // Try to get effect info if available - getInfo() is on the Effect class itself
            try {
                if (typeof effect.getInfo === 'function') {
                    const info = effect.getInfo();
                    if (info && typeof info === 'string') {
                        // Clean up the formatting
                        const cleanInfo = info.replace(/\n\s*/g, '\n      ').trim();
                        console.log(`      ${cleanInfo}`);
                    }
                }
            } catch (err) {
                // Silently ignore if getInfo fails
            }
        });
    }

    // Log project configuration
    if (settings.config) {
        console.log(`\n⚙️  Project Configuration:`);
        console.log(`   • Frames: ${settings.config.numberOfFrame || 'Unknown'}`);

        // Access dimensions from finalSize object
        const width = settings.finalSize?.width || 'Unknown';
        const height = settings.finalSize?.height || 'Unknown';
        console.log(`   • Dimensions: ${width} x ${height}`);

        // Check if we have horizontal/vertical info
        const orientation = settings.finalSize?.width > settings.finalSize?.height ? 'Horizontal' : 'Vertical';
        console.log(`   • Orientation: ${orientation}`);

        console.log(`   • Working Directory: ${settings.workingDirectory || 'Unknown'}`);

        if (settings.frameStart !== undefined) {
            console.log(`   • Frame Range: ${settings.frameStart} to ${(settings.frameStart + settings.config.numberOfFrame - 1)} (step: ${settings.config.frameInc || 1})`);
        }
    }

    console.log(''); // Empty line for separation
};

/**
 * Sets up standard event listeners for a Project instance with console logging
 * @param {Project} project - The Project instance to set up event listeners for
 * @param {Object} options - Configuration options
 * @param {boolean} options.verbose - Whether to show verbose logging (default: true)
 * @param {boolean} options.showProgress - Whether to show progress updates (default: true)
 * @param {boolean} options.showEffects - Whether to show effect additions/removals (default: true)
 */
export function setupProjectEventHandlers(project, options = {}) {
    const {
        verbose = true,
        showProgress = true,
        showEffects = true
    } = options;

    if (showProgress) {
        project.on(ProjectEvents.GENERATION_STARTED, (data) => {
            const timestamp = new Date(data.timestamp).toLocaleTimeString();
            const frameInfo = data.keepFrames !== undefined ? ` (${data.keepFrames ? 'keeping frames' : 'frames temporary'})` : '';
            console.log(`🚀 [${timestamp}] Starting generation for project: ${data.projectName}${frameInfo}`);
        });

        project.on(ProjectEvents.DIRECTORY_CREATED, (data) => {
            if (verbose) {
                console.log(`📁 Created directory: ${data.workingDirectory}`);
            }
        });

        project.on(ProjectEvents.SETTINGS_CREATED, (data) => {
            if (verbose) {
                console.log(`⚙️  Settings created for: ${data.projectInfo?.finalFileName || data.settings?.config?.finalFileName}`);
            }
        });

        project.on(ProjectEvents.CONFIG_SAVED, (data) => {
            if (verbose) {
                console.log(`💾 Config saved to: ${data.configPath}`);
            }

            // Log detailed effect structure after settings are saved and effects are generated
            // This needs to happen after the settings file is saved because effects need their data initialized
            if (data.settings) {
                logEffectStructure(data.settings);
            }
        });

        project.on(ProjectEvents.WORKER_THREAD_STARTING, (data) => {
            if (verbose) {
                console.log(`🔧 Starting worker thread for: ${data.configPath}`);
            }
        });

        project.on(ProjectEvents.GENERATION_COMPLETED, (data) => {
            const timestamp = new Date(data.timestamp).toLocaleTimeString();
            const outputInfo = data.workingDirectory ? `\n   Output: ${data.workingDirectory}` : '';
            const finalFileName = data.finalFileName ? `\n   Final name: ${data.finalFileName}` : '';
            console.log(`🎉 Generation completed for: ${data.projectName} at ${timestamp}${outputInfo}${finalFileName}`);
        });
    }

    if (showEffects) {
        project.on(ProjectEvents.PRIMARY_EFFECT_ADDED, (data) => {
            if (verbose) {
                const effectName = data.effect?.effect?.name ||
                                 data.effect?.currentEffectConfig?.constructor?.name ||
                                 'Unknown Effect';
                console.log(`🎨 Added primary effect: ${effectName} (total: ${data.totalEffects})`);
            }
        });

        project.on(ProjectEvents.FINAL_EFFECT_ADDED, (data) => {
            if (verbose) {
                const effectName = data.effect?.effect?.name ||
                                 data.effect?.currentEffectConfig?.constructor?.name ||
                                 'Unknown Effect';
                console.log(`🎭 Added final effect: ${effectName} (total: ${data.totalEffects})`);
            }
        });

        project.on(ProjectEvents.PRIMARY_EFFECT_REMOVED, (data) => {
            if (verbose) {
                console.log(`🗑️  Removed primary effect, remaining: ${data.totalEffects}`);
            }
        });

        project.on(ProjectEvents.FINAL_EFFECT_REMOVED, (data) => {
            if (verbose) {
                console.log(`🗑️  Removed final effect, remaining: ${data.totalEffects}`);
            }
        });
    }

    // Always handle errors and warnings
    project.on(ProjectEvents.ERROR, (data) => {
        console.error(`❌ Error in ${data.type}:`, data.error.message);
        if (verbose) {
            console.error('Full error details:', data.error);
        }
    });

    project.on(ProjectEvents.WARNING, (data) => {
        console.warn(`⚠️  Warning in ${data.type}: ${data.message}`);
    });
}

/**
 * Sets up minimal event listeners that only show start/completion and errors
 * @param {Project} project - The Project instance to set up event listeners for
 */
export function setupMinimalProjectEventHandlers(project) {
    setupProjectEventHandlers(project, {
        verbose: false,
        showProgress: true,
        showEffects: false
    });
}

/**
 * Sets up silent event listeners that only log errors
 * @param {Project} project - The Project instance to set up event listeners for
 */
export function setupSilentProjectEventHandlers(project) {
    setupProjectEventHandlers(project, {
        verbose: false,
        showProgress: false,
        showEffects: false
    });

    // Also suppress worker logs for truly silent mode
    project.setSuppressWorkerLogs(true);
}

/**
 * Creates a selective event subscriber for advanced event filtering
 * @param {Project} project - The Project instance
 * @returns {SelectiveEventSubscriber} The subscriber instance
 */
export function createSelectiveSubscriber(project) {
    return new SelectiveEventSubscriber(project);
}

/**
 * Sets up category-specific event handlers using the selective subscriber
 * @param {Project} project - The Project instance
 * @param {Object} categoryOptions - Configuration for which categories to subscribe to
 */
export function setupCategoryEventHandlers(project, categoryOptions = {
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
        // rateLimit: 1000,     // Max 1 event per 1000ms
        // frameFilter: {
        //     modulo: 10,       // Only every 10th frame
        //     only: [1, 5, 10], // Only specific frames
        //     skip: [50, 100]   // Skip specific frames
        // }
    },

    performanceOptions: {
        // rateLimit: 5000,     // Performance updates every 5 seconds max
    },

    effectOptions: {
        // rateLimit: 2000,     // Effect updates every 2 seconds max
        // frameFilter: { modulo: 5 }  // Only every 5th frame
    },

    fileIoOptions: {
        // rateLimit: 1000,     // File I/O updates every second max
    },

    resourceOptions: {
        // rateLimit: 10000,    // Resource updates every 10 seconds max
    },

    lifecycleOptions: {
        // No rate limiting on lifecycle events
    },

    progressOptions: {
        // rateLimit: 2000,     // Progress updates every 2 seconds max
    },

    errorOptions: {
        // No filtering on errors - always show immediately
    },

    // Global options
    verbose: false,             // Show additional details in event messages
    suppressWorkerLogs: false   // Suppress all unstructured worker console logs
}) {
    const subscriber = createSelectiveSubscriber(project);
    const subscriptions = [];

    // Auto-suppress worker logs if all event categories are disabled
    const allCategoriesDisabled = !categoryOptions.frames &&
                                 !categoryOptions.performance &&
                                 !categoryOptions.effects &&
                                 !categoryOptions.fileIo &&
                                 !categoryOptions.resource &&
                                 !categoryOptions.lifecycle &&
                                 !categoryOptions.progress &&
                                 !categoryOptions.errors;

    if (allCategoriesDisabled || categoryOptions.suppressWorkerLogs === true) {
        project.setSuppressWorkerLogs(true);
    }

    // Frame events (progress tracking)
    if (categoryOptions.frames !== false) {
        // Track timing for estimates
        const frameTimings = [];
        let projectStartTime = Date.now();

        const frameSubId = subscriber.subscribeToCategory(
            WorkerEventCategories.FRAME,
            (data) => {
                if (data.eventName === ProjectEvents.FRAME_STARTED) {
                    const progress = data.totalFrames ? `(${data.frameNumber + 1}/${data.totalFrames})` : '';
                    const progressPercent = data.progress ? ` - ${Math.round(data.progress * 100)}%` : '';
                    console.log(`🎬 Starting frame ${data.frameNumber} ${progress}${progressPercent}`);
                } else if (data.eventName === ProjectEvents.FRAME_COMPLETED) {
                    // Track frame timing for estimates
                    if (data.durationMs) {
                        frameTimings.push(data.durationMs);
                    }

                    const progress = data.totalFrames ? `(${data.frameNumber + 1}/${data.totalFrames})` : '';
                    const progressPercent = data.progress ? ` - ${Math.round(data.progress * 100)}%` : '';
                    const timing = data.durationMs ? ` in ${formatDuration(data.durationMs)}` : '';
                    const outputInfo = data.outputPath ? ` → ${data.outputPath.split('/').pop()}` : '';

                    // Calculate time estimate
                    let estimateText = '';
                    if (data.totalFrames && frameTimings.length > 0) {
                        const averageFrameTime = frameTimings.reduce((a, b) => a + b, 0) / frameTimings.length;
                        const estimate = estimateTimeToCompletion(data.frameNumber, data.totalFrames, averageFrameTime, projectStartTime);
                        estimateText = ` | ${estimate}`;
                    }

                    console.log(`✅ Completed frame ${data.frameNumber} ${progress}${progressPercent}${timing}${outputInfo}${estimateText}`);
                } else if (data.eventName === ProjectEvents.FRAME_FAILED) {
                    const progress = data.totalFrames ? `(${data.frameNumber + 1}/${data.totalFrames})` : '';
                    console.error(`❌ Frame ${data.frameNumber} ${progress} failed: ${data.error}`);
                }
            },
            categoryOptions.frameOptions || {}
        );
        subscriptions.push(frameSubId);
    }

    // Performance events
    if (categoryOptions.performance === true) {
        const perfSubId = subscriber.subscribeToCategory(
            WorkerEventCategories.PERFORMANCE,
            (data) => {
                if (data.eventName === ProjectEvents.TIMING_FRAME) {
                    const frameTime = formatDuration(data.totalMs);
                    const breakdowns = data.breakdowns || {};
                    const breakdownText = Object.keys(breakdowns).length > 0
                        ? ` (${Object.entries(breakdowns).map(([key, val]) => `${key}: ${formatDuration(val)}`).join(', ')})`
                        : '';
                    console.log(`⏱️  Frame ${data.frameNumber} timing: ${frameTime}${breakdownText}`);
                } else if (data.eventName === ProjectEvents.MEMORY_USAGE) {
                    const memMB = Math.round(data.heapUsed / 1024 / 1024);
                    const memTotalMB = data.heapTotal ? Math.round(data.heapTotal / 1024 / 1024) : null;
                    const externalMB = data.external ? Math.round(data.external / 1024 / 1024) : null;
                    const frameInfo = data.frameNumber !== undefined ? ` for frame ${data.frameNumber}` : '';

                    let memoryText = `💾 Memory usage${frameInfo}: ${memMB}MB`;
                    if (memTotalMB) memoryText += ` / ${memTotalMB}MB heap`;
                    if (externalMB) memoryText += `, ${externalMB}MB external`;

                    console.log(memoryText);
                }
            },
            categoryOptions.performanceOptions || {}
        );
        subscriptions.push(perfSubId);
    }

    // Effect processing events
    if (categoryOptions.effects === true) {
        const effectSubId = subscriber.subscribeToCategory(
            WorkerEventCategories.EFFECT,
            (data) => {
                const effectName = data.effectName || 'Unknown Effect';
                const frameInfo = data.frameNumber !== undefined ? ` on frame ${data.frameNumber}` : '';

                if (data.eventName === ProjectEvents.EFFECT_STARTED) {
                    console.log(`🎨 Starting effect: ${effectName}${frameInfo}`);
                } else if (data.eventName === ProjectEvents.EFFECT_COMPLETED) {
                    const timing = data.durationMs ? ` (${formatDuration(data.durationMs)})` : '';
                    console.log(`✨ Completed effect: ${effectName}${frameInfo}${timing}`);
                } else if (data.eventName === ProjectEvents.EFFECT_FAILED) {
                    const error = data.error ? `: ${data.error}` : '';
                    console.error(`💥 Effect failed: ${effectName}${frameInfo}${error}`);
                } else {
                    // Fallback for other effect events
                    if (categoryOptions.verbose) {
                        console.log(`🎨 Effect ${data.eventName}: ${effectName}${frameInfo}`);
                    } else {
                        console.log(`🎨 ${data.eventName}: ${effectName}`);
                    }
                }
            },
            categoryOptions.effectOptions || {}
        );
        subscriptions.push(effectSubId);
    }

    // File I/O events
    if (categoryOptions.fileIo === true) {
        const fileSubId = subscriber.subscribeToCategory(
            WorkerEventCategories.FILE_IO,
            (data) => {
                if (data.eventName === ProjectEvents.FILE_WRITE_COMPLETED) {
                    const sizeMB = data.fileSizeBytes ? ` (${Math.round(data.fileSizeBytes / 1024 / 1024 * 100) / 100}MB)` : '';
                    console.log(`💾 File written: Frame ${data.frameNumber}${sizeMB}`);
                } else if (categoryOptions.verbose) {
                    console.log(`📁 File ${data.eventName}: ${data.filePath || 'Unknown path'}`);
                }
            },
            categoryOptions.fileIoOptions || {}
        );
        subscriptions.push(fileSubId);
    }

    // Resource allocation events
    if (categoryOptions.resource === true) {
        const resourceSubId = subscriber.subscribeToCategory(
            WorkerEventCategories.RESOURCE,
            (data) => {
                if (categoryOptions.verbose) {
                    const sizeMB = data.size ? ` (${Math.round(data.size / 1024 / 1024 * 100) / 100}MB)` : '';
                    console.log(`🔧 Resource ${data.eventName}: ${data.purpose || 'Unknown'}${sizeMB}`);
                }
            },
            categoryOptions.resourceOptions || {}
        );
        subscriptions.push(resourceSubId);
    }

    // Worker lifecycle events
    if (categoryOptions.lifecycle === true) {
        const lifecycleSubId = subscriber.subscribeToCategory(
            WorkerEventCategories.LIFECYCLE,
            (data) => {
                if (data.eventName === ProjectEvents.WORKER_STARTED) {
                    console.log(`🚀 Worker started: ${data.workerId}`);
                } else if (data.eventName === ProjectEvents.WORKER_COMPLETED) {
                    const duration = data.totalDurationMs ? ` in ${Math.round(data.totalDurationMs)}ms` : '';
                    console.log(`✅ Worker completed: ${data.workerId}${duration}`);
                }
            },
            categoryOptions.lifecycleOptions || {}
        );
        subscriptions.push(lifecycleSubId);
    }

    // Progress tracking events
    if (categoryOptions.progress === true) {
        const progressSubId = subscriber.subscribeToCategory(
            WorkerEventCategories.PROGRESS,
            (data) => {
                if (data.eventName === ProjectEvents.BATCH_PROGRESS) {
                    console.log(`📊 Batch progress: ${Math.round((data.completed || 0) / (data.total || 1) * 100)}%`);
                } else if (data.eventName === ProjectEvents.OVERALL_PROGRESS) {
                    console.log(`📈 Overall progress: ${Math.round(data.progress * 100)}%`);
                }
            },
            categoryOptions.progressOptions || {}
        );
        subscriptions.push(progressSubId);
    }

    // Error events (always recommended)
    if (categoryOptions.errors !== false) {
        const errorSubId = subscriber.subscribeToCategory(
            WorkerEventCategories.ERROR,
            (data) => {
                const workerInfo = data.workerId ? ` [${data.workerId}]` : '';
                const frameInfo = data.frameNumber !== undefined ? ` (frame ${data.frameNumber})` : '';
                const timestamp = new Date(data.timestamp || Date.now()).toLocaleTimeString();

                if (data.eventName === ProjectEvents.WORKER_ERROR) {
                    console.error(`❌ [${timestamp}] Worker Error${workerInfo}${frameInfo}: ${data.error}`);
                    if (categoryOptions.verbose && data.stack) {
                        console.error(`   Stack trace: ${data.stack.split('\n').slice(0, 3).join('\n   ')}`);
                    }
                } else if (data.eventName === ProjectEvents.FATAL_ERROR) {
                    console.error(`💀 [${timestamp}] FATAL ERROR${workerInfo}${frameInfo}: ${data.error}`);
                    if (data.stack) {
                        console.error(`   Stack trace: ${data.stack.split('\n').slice(0, 5).join('\n   ')}`);
                    }
                } else if (data.eventName === ProjectEvents.WORKER_WARNING) {
                    console.warn(`⚠️  [${timestamp}] Warning${workerInfo}${frameInfo}: ${data.message}`);
                    if (categoryOptions.verbose && data.context) {
                        console.warn(`   Context: ${JSON.stringify(data.context, null, 2)}`);
                    }
                }
            },
            categoryOptions.errorOptions || {}
        );
        subscriptions.push(errorSubId);
    }

    return { subscriber, subscriptions };
}

/**
 * Sets up category-specific event handlers using the new WorkerEventLogger
 * This provides the same functionality as setupCategoryEventHandlers but with cleaner code
 * @param {Project} project - The Project instance
 * @param {Object} categoryOptions - Configuration for which categories to show
 * @returns {Object} Object containing the subscriber and logger instances
 */
export function setupCategoryEventHandlersWithLogger(project, categoryOptions = {
    frames: true,
    performance: false,
    effects: false,
    fileIo: false,
    resource: false,
    lifecycle: true,
    progress: true,
    errors: true,
    verbose: false
}) {
    const subscriber = createSelectiveSubscriber(project);

    // Create WorkerEventLogger with options mapped from categoryOptions
    const workerLogger = new WorkerEventLogger({
        showFrames: categoryOptions.frames !== false,
        showEffects: categoryOptions.effects === true,
        showFileIO: categoryOptions.fileIo === true,
        showPerformance: categoryOptions.performance === true,
        showLifecycle: categoryOptions.lifecycle !== false,
        showErrors: categoryOptions.errors !== false,
        verbose: categoryOptions.verbose === true
    });

    // Auto-suppress worker logs if all event categories are disabled
    const allCategoriesDisabled = !categoryOptions.frames &&
                                 !categoryOptions.performance &&
                                 !categoryOptions.effects &&
                                 !categoryOptions.fileIo &&
                                 !categoryOptions.resource &&
                                 !categoryOptions.lifecycle &&
                                 !categoryOptions.progress &&
                                 !categoryOptions.errors;

    if (allCategoriesDisabled || categoryOptions.suppressWorkerLogs === true) {
        project.setSuppressWorkerLogs(true);
    }

    // Subscribe to all enabled categories and attach the logger
    const subscriptions = [];

    const enabledCategories = [];
    if (categoryOptions.frames !== false) enabledCategories.push(WorkerEventCategories.FRAME);
    if (categoryOptions.effects === true) enabledCategories.push(WorkerEventCategories.EFFECT);
    if (categoryOptions.fileIo === true) enabledCategories.push(WorkerEventCategories.FILE_IO);
    if (categoryOptions.performance === true) enabledCategories.push(WorkerEventCategories.PERFORMANCE);
    if (categoryOptions.resource === true) enabledCategories.push(WorkerEventCategories.RESOURCE);
    if (categoryOptions.lifecycle !== false) enabledCategories.push(WorkerEventCategories.LIFECYCLE);
    if (categoryOptions.progress === true) enabledCategories.push(WorkerEventCategories.PROGRESS);
    if (categoryOptions.errors !== false) enabledCategories.push(WorkerEventCategories.ERROR);

    // Create a subscription that pipes events to the WorkerEventLogger
    enabledCategories.forEach(category => {
        const subId = subscriber.subscribeToCategory(category, (data) => {
            // Create a mock event emitter that the logger can handle
            const mockEmitter = {
                listeners: [],
                on(eventName, handler) {
                    this.listeners.push({ eventName, handler });
                },
                emit(eventName, eventData) {
                    this.listeners.forEach(listener => {
                        if (listener.eventName === eventName) {
                            listener.handler(eventData);
                        }
                    });
                }
            };

            // Attach logger to mock emitter and emit the event
            workerLogger.attachTo(mockEmitter);
            mockEmitter.emit(data.eventName, data);
        });
        subscriptions.push(subId);
    });

    return { subscriber, subscriptions, workerLogger };
}