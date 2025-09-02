import {Project} from "my-nft-gen/src/app/Project.js";
import {LayerConfig} from "my-nft-gen/src/core/layer/LayerConfig.js";

import {neonCyberdream} from "./assets/color-scheme-store.js";
import {ModulateEffect} from "my-nft-gen/src/effects/finalImageEffects/modulate/ModulateEffect.js";
import {ModulateConfig} from "my-nft-gen/src/effects/finalImageEffects/modulate/ModulateConfig.js";
import {getRandomIntInclusive} from 'my-nft-gen/src/core/math/random.js';
import {Point2D} from "my-nft-gen/src/core/layer/configType/Point2D.js";
import {Range} from "my-nft-gen/src/core/layer/configType/Range.js";
import {layeredCurvedRedEye} from "./complex-elements/curved-red-eye-reduction.js";
import {createTheMark} from "./complex-elements/the-mark.js";
import {createRings} from "./complex-elements/cosmic-jewel.js";

const promiseArray = [];
const backgroundHex = '#080808'
const scheme = neonCyberdream;

const createComposition = async (colorScheme) => {
        const myTestProject = new Project({
            artist: 'John Ruf',
            projectName: 'cosmic-jewel',
            projectDirectory: 'src/scratch',
            neutrals: ['#F5F5F5', '#E0E0E0', '#FAF9F6', '#EDEAE0'],
            backgrounds: [backgroundHex],
            numberOfFrame: 1800,
            colorScheme: colorScheme,
            longestSideInPixels: 1920,
            shortestSideInPixels: 1080,
            isHorizontal: false,
            maxConcurrentFrameBuilderThreads: 1,
            renderJumpFrames: 1,
            frameStart: 0,
        });

        const center = new Point2D(myTestProject.width / 2, myTestProject.height / 2)

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        const stroke = 1;
        const thickness = 1;
        const numberOfRedEyes = 3;
        const numberOfLayers = 3;
        const outerRadius = 650;
        const innerRadius = 450;
        const radiusGitter = new Range(0, 200);
        const numberOfSpokes = new Range(30, 40);
        const arcSteps = new Range(30, 45);
        const lineLength = new Range(50, 250);
        const possibleJumpRangeInPixels = new Range(10, 60);
        const sparsityFactor = [6, 8, 10, 12];

        const loopTimesFunction = (index) => {
            return getRandomIntInclusive(3, 15);
        };

        const loopTimesRange = new Range(6, 30);
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

            firstRingSpeed: 2,
            secondRingSpeed: 6,
            thirdRingSPeed: 8,
            fourthRingSpeed: 6,
            fifthRingSpeed: 1,

            numberOfRings: 4,

            stroke: 1,
            thickness: 1,

            opacity: 0.7,
            underLayerOpacity: 0.6,
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
            center: new Point2D(myTestProject.width - 150, myTestProject.height - 150),
            fadeFrom: 0.0,
            opacity: 0.5,
            keyFrames: 30,
            glitchFrameCount: 120,
            fadeInOutCount: 30,
            buffer: buffer,
        })

        await myTestProject.addFinalEffect({
            layerConfig: new LayerConfig({
                effect: ModulateEffect, percentChance: 100, currentEffectConfig: new ModulateConfig({
                    brightnessRange: {bottom: {lower: 1, upper: 1}, top: {lower: 1.1, upper: 1.1}},
                    brightnessTimes: {lower: 6, upper: 6},
                    saturationRange: {bottom: {lower: 1.5, upper: 1.5}, top: {lower: 4, upper: 4}},
                    saturationTimes: {lower: 12, upper: 12},
                    contrastRange: {bottom: {lower: 1, upper: 1}, top: {lower: 1.1, upper: 1.1}},
                    contrastTimes: {lower: 6, upper: 6},
                }),
            }),
        });

        promiseArray.push(myTestProject.generateRandomLoop());

    }
;

await createComposition(scheme);

await Promise.all(promiseArray);
