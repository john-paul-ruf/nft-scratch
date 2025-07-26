import {Project} from "my-nft-gen/src/app/Project.js";
import {LayerConfig} from "my-nft-gen/src/core/layer/LayerConfig.js";

import {
    binahUnderstanding,
    chesedKindness,
    eternalRise, gevurahSeverity,
    hodSplendor,
    malkuthKingdom, neonCyberdream, neonHarmony, neonLights,
    netzachVictory,
    tiferetBeauty,
    yesodFoundation
} from "./assets/color-scheme-store.js";
import {CRTShadowEffect} from "my-nft-gen/src/effects/finalImageEffects/crtShadow/CRTShadowEffect.js";
import {CRTShadowConfig} from "my-nft-gen/src/effects/finalImageEffects/crtShadow/CRTShadowConfig.js";
import {CRTBarrelEffect} from "my-nft-gen/src/effects/finalImageEffects/crtBarrel/CRTBarrelEffect.js";
import {CRTBarrelConfig} from "my-nft-gen/src/effects/finalImageEffects/crtBarrel/CRTBarrelConfig.js";
import {ModulateEffect} from "my-nft-gen/src/effects/finalImageEffects/modulate/ModulateEffect.js";
import {ModulateConfig} from "my-nft-gen/src/effects/finalImageEffects/modulate/ModulateConfig.js";
import {getRandomIntInclusive} from 'my-nft-gen/src/core/math/random.js';
import {Point2D} from "my-nft-gen/src/core/layer/configType/Point2D.js";
import {layeredRedEye,} from "./complex-elements/red-eye-reduction.js";
import {createStackedScanlines} from "./complex-elements/stacked-crt-scanlines.js";
import {createGlitchedTriangle} from "./complex-elements/glitchedTriangle.js";
import {ViewportEffect} from "../../my-nft-gen/src/effects/primaryEffects/viewport/ViewportEffect.js";
import {ViewportConfig} from "../../my-nft-gen/src/effects/primaryEffects/viewport/ViewportConfig.js";
import {randomNumber} from "../../my-nft-gen/src/core/math/random.js";
import {ColorPicker} from "../../my-nft-gen/src/core/layer/configType/ColorPicker.js";
import {createDegaussEffects, createGlowEffects} from "./util/glitch.js";
import {ScopesEffect} from "../../my-nft-gen/src/effects/primaryEffects/scopes/ScopesEffect.js";
import {ScopesConfig} from "../../my-nft-gen/src/effects/primaryEffects/scopes/ScopesConfig.js";
import {createMultiFuzzFlare} from "./complex-elements/multi-fuzz-flare.js";
import {Range} from "../../my-nft-gen/src/core/layer/configType/Range.js";
import {PercentageRange} from "../../my-nft-gen/src/core/layer/configType/PercentageRange.js";
import {PercentageShortestSide} from "../../my-nft-gen/src/core/layer/configType/PercentageShortestSide.js";
import {PercentageLongestSide} from "../../my-nft-gen/src/core/layer/configType/PercentageLongestSide.js";
import {createColorArrayScanlines} from "./complex-elements/color-array-crt-scanlines.js";
import {metaMappedFramesRing} from "./complex-elements/metaMappedFramesRing.js";
import {createInvertedGlitchedTriangle} from "./complex-elements/invertedGlitchedTriangle.js";
import {layeredCurvedRedEye} from "./complex-elements/curved-red-eye-reduction.js";
import {createTheMark} from "./complex-elements/the-mark.js";
import {FindValueAlgorithm, getAllFindValueAlgorithms} from "../../my-nft-gen/src/core/math/findValue.js";

const promiseArray = [];
const backgroundHex = '#212121'
const scheme = neonCyberdream;

const createComposition = async (colorScheme) => {
        const myTestProject = new Project({
            artist: 'John Ruf',
            projectName: 'curved-red-eye-reduction',
            projectDirectory: 'src/scratch',
            neutrals: ['#FFFFFF'],
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

        await myTestProject.addPrimaryEffect({
            layerConfig: new LayerConfig({
                effect: ScopesEffect,
                percentChance: 100,
                currentEffectConfig: new ScopesConfig({
                    layerOpacity: 1,
                    sparsityFactor: [1],
                    gapFactor: {lower: 0.15, upper: 0.15},
                    radiusFactor: {lower: 0.1, upper: 0.1},
                    scaleFactor: 1.1,
                    alphaRange: {bottom: {lower: 0.3, upper: 0.4}, top: {lower: 0.5, upper: 0.6}},
                    alphaTimes: {lower: 8, upper: 16},
                    rotationTimes: {lower: 2, upper: 8},
                    numberOfScopesInALine: 60,
                }),
                possibleSecondaryEffects: [
                    ...createGlowEffects([
                        {
                            arraySize: 200,
                            randomChance: {lower: 10, upper: 25},
                            glitchFrameCount: {lower: 25, upper: 160},
                            keyFrames: {lower: 0, upper: 1800 - 160},
                            lowerRange: {lower: 4, upper: 8},
                            times: {lower: 1, upper: 3},
                        },
                        {
                            arraySize: 200,
                            randomChance: {lower: 10, upper: 25},
                            glitchFrameCount: {lower: 25, upper: 75},
                            keyFrames: {lower: 0, upper: 1800 - 75},
                            lowerRange: {lower: 2, upper: 6},
                            times: {lower: 1, upper: 3},
                        },
                        {
                            arraySize: 200,
                            randomChance: {lower: 10, upper: 25},
                            glitchFrameCount: {lower: 60, upper: 120},
                            keyFrames: {lower: 0, upper: 1800 - 120},
                            lowerRange: {lower: 1, upper: 4},
                            times: {lower: 1, upper: 3},
                        }
                    ])

                ],
            }),
        });

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        const radius = 300;
        const radiusAdjustment = radius / 4;

        await createGlitchedTriangle({
            project: myTestProject,
            colorScheme: colorScheme,
            radius: [radius],
            amplitude: {lower: 100, upper: 100},
            times: {lower: 3, upper: 3},
            center: new Point2D(center.x, center.y - radiusAdjustment),
            thickness: 24,
            underlayOpacityRange: {lower: 0.4, upper: 0.5},
            accentRange: {bottom: {lower: 75, upper: 85}, top: {lower: 120, upper: 140}},
            blurRange: {bottom: {lower: 12, upper: 12}, top: {lower: 24, upper: 24}},
            featherTimes: {lower: 4, upper: 4},
            accentBottomRangeReduction: 30,
            accentTopRangeReduction: 30,
            accentFindValueAlgorithm: getAllFindValueAlgorithms(),
            blurFindValueAlgorithm: getAllFindValueAlgorithms(),
            opacityFindValueAlgorithm: getAllFindValueAlgorithms(),
        });


        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        /*TRIANGLE: 'triangle',

            // Inverted triangular wave: linear down-up motion
            INVERTED_TRIANGLE: 'invertedTriangle',

            // Sinusoidal wave: smooth up-down
            SINE: 'sine',

            // Inverted sine wave: smooth down-up
            INVERTED_SINE: 'invertedSine',

            // Multi-sine wave blend: organic, non-pingpong loop
            MULTIWAVE: 'multiwave',

            // Flipped version of multiwave
            INVERTED_MULTIWAVE: 'invertedMultiwave',

            // Constant ramp from min to max, wraps around
            FORWARD_LOOP: 'forward',

            // Raised cosine (ease in + ease out)
            COSINE_BELL: 'cosineBell',

            // Asymmetric ease-up then ease-down shape
            SMOOTHSTEP: 'smoothstep',

            // Phase-evolving version of MULTIWAVE
            MULTIWAVE: 'phasedMultiwave',

            // Custom looping shape via precomputed values
            KEYFRAME: 'keyframe',
            */
        await createMultiFuzzFlare({
                project: myTestProject,
                colorScheme: colorScheme,
                center: center,
                invertLayers: true,
                layerOpacity: 0.5,
                underLayerOpacityRange: {
                    bottom: {lower: 0.3, upper: 0.4},
                    top: {lower: 0.5, upper: 0.6}
                },
                underLayerOpacityTimes: {lower: 2, upper: 8},
                numberOfFlares: 8,
                numberOfRings: new Range(2, 2),
                numberOfFlareRays: new Range(8, 8),
                flareRingsSizeRange: new PercentageRange(new PercentageShortestSide(0.05), new PercentageLongestSide(1)),
                flareRaysSizeRange: new PercentageRange(new PercentageLongestSide(0.8), new PercentageLongestSide(1)),
                flareOffset: new PercentageRange(new PercentageShortestSide(0.01), new PercentageShortestSide(0.06)),
                ringStroke: new Range(1, 1),
                ringThickness: new Range(1, 5),
                rayStroke: new Range(1, 1),
                rayThickness: new Range(1, 5),
                accentFindValueAlgorithm: getAllFindValueAlgorithms(),
                blurFindValueAlgorithm: getAllFindValueAlgorithms(),
                opacityFindValueAlgorithm: getAllFindValueAlgorithms(),
                featureStructure: {
                    accentRange: {
                        bottom: {lower: 30, upper: 40},
                        top: {lower: 50, upper: 60}
                    },
                    blurRange: {
                        bottom: {lower: 6, upper: 10},
                        top: {lower: 12, upper: 14}
                    },
                    featherTimes: {lower: 2, upper: 8},
                },
                secondaryEffects: [...createGlowEffects([
                    {
                        arraySize: 50,
                        randomChance: {lower: 10, upper: 25},
                        glitchFrameCount: {lower: 25, upper: 160},
                        keyFrames: {lower: 0, upper: 1800 - 160},
                        lowerRange: {lower: 8, upper: 16},
                        times: {lower: 1, upper: 3},
                    },
                    {
                        arraySize: 50,
                        randomChance: {lower: 10, upper: 25},
                        glitchFrameCount: {lower: 25, upper: 75},
                        keyFrames: {lower: 0, upper: 1800 - 75},
                        lowerRange: {lower: 4, upper: 8},
                        times: {lower: 1, upper: 3},
                    },
                    {
                        arraySize: 50,
                        randomChance: {lower: 10, upper: 25},
                        glitchFrameCount: {lower: 60, upper: 120},
                        keyFrames: {lower: 0, upper: 1800 - 120},
                        lowerRange: {lower: 12, upper: 24},
                        times: {lower: 1, upper: 3},
                    }
                ])]
            },
        )


        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        const stroke = 1;
        const thickness = 1;
        const numberOfRedEyes = 4;
        const numberOfLayers = 6;
        const outerRadius = 700;
        const innerRadius = 25;
        const radiusGitter = new Range(0, 200);
        const numberOfSpokes = new Range(40, 80);
        const arcSteps = new Range(10, 30);
        const lineLength = new Range(75, 150);
        const possibleJumpRangeInPixels = new Range(5, 35);
        const sparsityFactor = [45, 60, 90, 120];

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
            loopTimesFunction: (index) => {
                return getRandomIntInclusive(1, 3);
            },
            arcSteps: arcSteps,
            numberOfSpokes: numberOfSpokes,
            possibleJumpRangeInPixels: possibleJumpRangeInPixels,
            numberOfLayers,
        });


        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        await metaMappedFramesRing({
                project: myTestProject,
                center: center,
                ringRadius: 175,
                numberOfPoints: 8,
                centerMappedFramePath: './src/assets/mappedFrames/og-eye-flux/',
                centerOpacity: 0.6,
                centerBuffer: 800,
                centerYAdjustment: 0,
                ringMappedFramePath: './src/assets/mappedFrames/flux-folder/',
                ringOpacity: 0.4,
                ringBuffer: 400,
                ringYAdjustment: 0,
                rotationAmount: 3,
            },
        )


        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        await createColorArrayScanlines(
            {
                project: myTestProject,
                colorArray: colorScheme.colorBucket,
                lines: {lower: 4, upper: 4},
                loopTimes: {lower: 1, upper: 2},
                brightnessRange: {
                    bottom: {lower: 10, upper: 30},
                    top: {lower: 30, upper: 40}
                },
                brightnessTimes: {lower: 1, upper: 8},
                thicknessRange: {
                    bottom: {lower: 12, upper: 24},
                    top: {lower: 10, upper: 12}
                },
                thicknessTimes: {lower: 1, upper: 8},
                lineBlurRange: {
                    bottom: {lower: 20, upper: 30},
                    top: {lower: 40, upper: 60}
                },
                lineBlurTimes: {lower: 1, upper: 8},

                opacityRange: {
                    bottom: {lower: 0.4, upper: 0.5},
                    top: {lower: 0.6, upper: 0.7}
                },
                opacityTimes: {lower: 1, upper: 8},
            });

        await myTestProject.addFinalEffect({
            layerConfig: new LayerConfig({
                effect: CRTShadowEffect, percentChance: 100, currentEffectConfig: new CRTShadowConfig({
                    shadowOpacityRange: {bottom: {lower: 0.5, upper: 0.5}, top: {lower: 0.7, upper: 0.7}},
                    linesOpacityRange: {bottom: {lower: 0.5, upper: 0.5}, top: {lower: 0.7, upper: 0.7}},
                    opacityTimes: {lower: 15, upper: 15},
                    lineRed: {lower: 64, upper: 64},
                    lineGreen: {lower: 32, upper: 32},
                    lineBlue: {lower: 32, upper: 32},
                    lineHeight: {lower: 3, upper: 3},
                    edgePercentage: {lower: 0.10, upper: 0.10},
                    maxLineHeight: {lower: 8, upper: 8},
                    numberOfEdgeSections: {lower: 40, upper: 40},
                })
            }),
        });

        await myTestProject.addFinalEffect({
            layerConfig: new LayerConfig({
                effect: ModulateEffect, percentChance: 100, currentEffectConfig: new ModulateConfig({
                    brightnessRange: {bottom: {lower: 1, upper: 1}, top: {lower: 1.1, upper: 1.1}},
                    brightnessTimes: {lower: 2, upper: 2},
                    saturationRange: {bottom: {lower: 2, upper: 2}, top: {lower: 3, upper: 3}},
                    saturationTimes: {lower: 4, upper: 4},
                    contrastRange: {bottom: {lower: 1, upper: 1}, top: {lower: 1.1, upper: 1.1}},
                    contrastTimes: {lower: 2, upper: 2},
                }),
            }),
        });

        await myTestProject.addFinalEffect({
            layerConfig: new LayerConfig({
                effect: CRTBarrelEffect, percentChance: 100, currentEffectConfig: new CRTBarrelConfig({
                    strength: {lower: 0.09, upper: 0.09},
                    edgeThreshold: {lower: 0.025, upper: 0.025},
                    corner: {lower: 0.025, upper: 0.025},
                }),
            }),
        });


        const buffer = 800;

        await createTheMark({
            project: myTestProject,
            center: new Point2D(myTestProject.width - 150, myTestProject.height - 150),
            fadeFrom: 0.0,
            opacity: 0.9,
            keyFrames: 30,
            glitchFrameCount: 360,
            fadeInOutCount: 30,
            buffer: buffer,
        })

        promiseArray.push(myTestProject.generateRandomLoop());
    }
;

await createComposition(scheme);

await Promise.all(promiseArray);
