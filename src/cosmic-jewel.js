import {Project, ProjectEvents} from "my-nft-gen/src/app/Project.js";
import {LayerConfig} from "my-nft-gen/src/core/layer/LayerConfig.js";

import {
    alchemicalTransmutation,
    binahUnderstanding, celestialVault, chesedKindness,
    chokhmahWisdom, citrusVitality, daatKnowledge, earthenVeil,
    eternalRise,
    gevurahSeverity, hodSplendor,
    neonCyberdream, neonHarmony, neonLights, redGreenYellowPop, shadowRealm, tibetanMandala
} from "./assets/color-scheme-store.js";
import {ModulateEffect} from "my-nft-effects-core/src/effects/finalImageEffects/modulate/ModulateEffect.js";
import {ModulateConfig} from "my-nft-effects-core/src/effects/finalImageEffects/modulate/ModulateConfig.js";
import {getRandomIntInclusive} from 'my-nft-gen/src/core/math/random.js';
import {Position} from "my-nft-gen/src/core/position/Position.js";
import {Point2D} from "my-nft-gen/src/core/layer/configType/Point2D.js";
import {Range} from "my-nft-gen/src/core/layer/configType/Range.js";
import {layeredCurvedRedEye} from "./complex-elements/curved-red-eye-reduction.js";
import {createTheMark} from "./complex-elements/the-mark.js";
import {createRings} from "./complex-elements/cosmic-jewel.js";
import {setupCategoryEventHandlers, setupProjectEventHandlers} from "./util/project-event-handlers.js";
import {WorkerEventLogger} from "my-nft-gen/src/core/events/WorkerEventLogger.js";
import {WorkerEventCategories} from "my-nft-gen/src/core/events/WorkerEventCategories.js";

const promiseArray = [];
const backgroundHex = '#2D2D2D'
const scheme = tibetanMandala;

const createComposition = async (colorScheme) => {
        const myTestProject = new Project({
            artist: 'John Ruf',
            projectName: 'hoz',
            projectDirectory: 'src/scratch',
            neutrals: ['#F5F5F5', '#E0E0E0', '#FAF9F6', '#EDEAE0'],
            backgrounds: [backgroundHex],
            numberOfFrame: 1800,
            colorScheme: colorScheme,
            longestSideInPixels: 1920,
            shortestSideInPixels: 1080,
            isHorizontal: true,
            maxConcurrentFrameBuilderThreads: 1,
            renderJumpFrames: 1,
            frameStart: 0,
        });

        // Set up basic project lifecycle events (generation started/completed)
        setupProjectEventHandlers(myTestProject, {
            verbose: false,         // Show verbose project details
            showProgress: true,     // Show generation started/completed
            showEffects: false      // Show effect additions
        });

        // NEW: Use UnifiedEventBus approach with WorkerEventLogger
        const eventBus = myTestProject.getEventBus();
        const { logger } = WorkerEventLogger.subscribeToCategories(eventBus, [
            WorkerEventCategories.FRAME,
            WorkerEventCategories.EFFECT,
            WorkerEventCategories.FILE_IO,
            WorkerEventCategories.PERFORMANCE,
            WorkerEventCategories.LIFECYCLE,
            WorkerEventCategories.ERROR
        ], {
            showFrames: true,
            showEffects: false,
            showFileIO: false,
            showPerformance: false,
            showLifecycle: false,
            showErrors: false,
            verbose: false
        });

        const center = new Point2D(myTestProject.width / 2, myTestProject.height / 2)

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        const stroke = 0;
        const thickness = 2;
        const numberOfRedEyes = 3;
        const numberOfLayers = 8;
        const outerRadius = 700;
        const innerRadius = 500;
        const radiusGitter = new Range(0, 100);
        const numberOfSpokes = new Range(20, 20);
        const arcSteps = new Range(30, 45);
        const lineLength = new Range(25, 75);
        const possibleJumpRangeInPixels = new Range(5, 15);
        const sparsityFactor = [6, 8, 10, 12];

        const loopTimesFunction = () => {
            return getRandomIntInclusive(2, 5);
        };

        const loopTimesRange = new Range(2, 5);
        const useLoopFunction = false;

        await layeredCurvedRedEye({
            myTestProject,
            stroke,
            thickness,
            numberOfRedEyes,
            lineLength,
            sparsityFactor: sparsityFactor,
            center,
            innerRadius: innerRadius,
            outerRadius: outerRadius,
            radiusGitter: radiusGitter,
            loopTimesFunction: loopTimesFunction,
            loopTimesRange: loopTimesRange,
            useLoopFunction: useLoopFunction,
            arcSteps: arcSteps,
            numberOfSpokes: numberOfSpokes,
            possibleJumpRangeInPixels: possibleJumpRangeInPixels,
            numberOfLayers,
            colorScheme: null,
        });

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        await createRings({
            myTestProject,

            ringSpoke: 30,

            outerRadius: 375,
            secondRadiusReduction: 0.75,

            thirdRadiusReduction: 0.5,

            outerRingColor: colorScheme.getColorFromBucket(),
            innerRingColor: colorScheme.getColorFromBucket(),
            thirdRingColor: colorScheme.getColorFromBucket(),
            fourthRingColor: colorScheme.getColorFromBucket(),
            fifthRingColor: colorScheme.getColorFromBucket(),

            firstRingSpeed: getRandomIntInclusive(2, 24),
            secondRingSpeed: getRandomIntInclusive(2, 24),
            thirdRingSPeed: getRandomIntInclusive(2, 24),
            fourthRingSpeed: getRandomIntInclusive(2, 24),
            fifthRingSpeed: getRandomIntInclusive(2, 24),

            numberOfRings: 6,

            stroke: 1,
            thickness: 1,

            opacity: 0.2,
            underLayerOpacity: 0.3,
            secondRingOpacity: 0.35,
            thirdRingOpacity: 0.4,
            fourthRingOpacity: 0.45,
            fifthRingOpacity: 0.5,
        })

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        const buffer = 800;

        await createTheMark({
            project: myTestProject,
            center: new Position({x: myTestProject.width - 150, y: myTestProject.height - 150}),
            fadeFrom: 0.0,
            opacity: 0.5,
            keyFrames: 120,
            glitchFrameCount: 360,
            fadeInOutCount: 60,
            buffer: buffer,
        })

        await myTestProject.addFinalEffect({
            layerConfig: new LayerConfig({
                effect: ModulateEffect,
                percentChance: 100,
                currentEffectConfig: new ModulateConfig({
                    brightnessRange: {bottom: {lower: 1.1, upper: 1.1}, top: {lower: 1.2, upper: 1.2}},
                    brightnessTimes: {lower: 6, upper: 6},
                    saturationRange: {bottom: {lower: 2, upper: 2}, top: {lower: 4, upper: 4}},
                    saturationTimes: {lower: 12, upper: 12},
                    contrastRange: {bottom: {lower: 1.25, upper: 1.25}, top: {lower: 1.5, upper: 1.5}},
                    contrastTimes: {lower: 6, upper: 6},
                }),
            }),
        });

        promiseArray.push(myTestProject.generateRandomLoop());

    }
;

await createComposition(scheme);

await Promise.all(promiseArray);
