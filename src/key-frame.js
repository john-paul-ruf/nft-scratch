import {duskTillDawn} from "./assets/color-scheme-store.js";
import {Project} from "../../my-nft-gen/src/app/Project.js";
import {LayerConfig} from "../../my-nft-gen/src/core/layer/LayerConfig.js";
import {CRTScanLinesEffect} from "../../my-nft-gen/src/effects/finalImageEffects/crtScanLines/CRTScanLinesEffect.js";
import {CRTScanLinesConfig} from "../../my-nft-gen/src/effects/finalImageEffects/crtScanLines/CRTScanLinesConfig.js";
import {CRTDegaussConfig} from "../../my-nft-gen/src/effects/keyFrameEffects/crtDegaussEvent/CRTDegaussConfig.js";
import {CRTDegaussEffect} from "../../my-nft-gen/src/effects/keyFrameEffects/crtDegaussEvent/CRTDegaussEffect.js";
import {CRTShadowConfig} from "../../my-nft-gen/src/effects/finalImageEffects/crtShadow/CRTShadowConfig.js";
import {CRTShadowEffect} from "../../my-nft-gen/src/effects/finalImageEffects/crtShadow/CRTShadowEffect.js";
import {CRTBarrelConfig} from "../../my-nft-gen/src/effects/finalImageEffects/crtBarrel/CRTBarrelConfig.js";
import {CRTBarrelEffect} from "../../my-nft-gen/src/effects/finalImageEffects/crtBarrel/CRTBarrelEffect.js";
import {Point2D} from "../../my-nft-gen/src/core/layer/configType/Point2D.js";
import {ColorPicker} from "../../my-nft-gen/src/core/layer/configType/ColorPicker.js";
import {getRandomIntInclusive} from "../../my-nft-gen/src/core/math/random.js";
import {RedEyeEffect} from "../../my-nft-gen/src/effects/primaryEffects/red-eye/RedEyeEffect.js";
import {RedEyeConfig} from "../../my-nft-gen/src/effects/primaryEffects/red-eye/RedEyeConfig.js";
import {PixelateKeyFrameEffect} from "../../my-nft-gen/src/effects/keyFrameEffects/pixelate/PixelateKeyFrameEffect.js";
import {PixelateKeyFrameConfig} from "../../my-nft-gen/src/effects/keyFrameEffects/pixelate/PixelateKeyFrameConfig.js";
import {FuzzFlareEffect} from "../../my-nft-gen/src/effects/primaryEffects/fuzz-flare/FuzzFlareEffect.js";
import {MultiStepDefinitionConfig} from "../../my-nft-gen/src/core/math/MultiStepDefinitionConfig.js";
import {Range} from "../../my-nft-gen/src/core/layer/configType/Range.js";
import {PercentageRange} from "../../my-nft-gen/src/core/layer/configType/PercentageRange.js";
import {PercentageShortestSide} from "../../my-nft-gen/src/core/layer/configType/PercentageShortestSide.js";
import {PercentageLongestSide} from "../../my-nft-gen/src/core/layer/configType/PercentageLongestSide.js";
import {FuzzFlareConfig} from "../../my-nft-gen/src/effects/primaryEffects/fuzz-flare/FuzzFlareConfig.js";
import {ViewportEffect} from "../../my-nft-gen/src/effects/primaryEffects/viewport/ViewportEffect.js";
import {ViewportConfig} from "../../my-nft-gen/src/effects/primaryEffects/viewport/ViewportConfig.js";


const promiseArray = [];

function createSecondaryEffects() {
    const secondaryEffects = [];

    for (let i = 0; i < 100; i++) {
        secondaryEffects.push(new LayerConfig({
            effect: CRTDegaussEffect,
            percentChance: getRandomIntInclusive(25, 25),
            currentEffectConfig: new CRTDegaussConfig({
                keyFrames: [getRandomIntInclusive(0, 1725)],
                glitchFrameCount: [getRandomIntInclusive(15, 75)],
                sectionHeight: [1, 5, 10],
                offset: {lower: 1, upper: 5},
                direction: [-1, 1],
                glitchTimes: {lower: 1, upper: 5},
                backgroundRed: {lower: 0, upper: 0},
                backgroundGreen: {lower: 0, upper: 0},
                backgroundBlue: {lower: 0, upper: 0},
                backgroundAlpha: {lower: 0, upper: 0},
            }),
        }));
    }


    for (let i = 0; i < 25; i++) {
        secondaryEffects.push(new LayerConfig({
            effect: PixelateKeyFrameEffect,
            percentChance: getRandomIntInclusive(25, 25),
            currentEffectConfig: new PixelateKeyFrameConfig({
                keyFrames: [getRandomIntInclusive(0, 1725)],
                glitchFrameCount: [getRandomIntInclusive(15, 75)],
                lowerRange: {lower: 0, upper: 0},
                upperRange: {lower: 3, upper: 8},
                times: {lower: 1, upper: 1},
            }),
        }));
    }

    return secondaryEffects;
}

const createComposition = async (colorScheme) => {
    const myTestProject = new Project({
        artist: 'John Ruf',
        projectName: 'key-frame',
        projectDirectory: 'src/key-frame',
        neutrals: ['#FFFFFF'],
        backgrounds: ['#001F14'],
        numberOfFrame: 1800,
        colorScheme: colorScheme,
    });

    for (let i = 0; i < 3; i++) {
        await myTestProject.addPrimaryEffect({
            layerConfig: new LayerConfig({
                effect: FuzzFlareEffect,
                percentChance: 100,
                currentEffectConfig: new FuzzFlareConfig({
                    invertLayers: true,

                    outerColor: new ColorPicker(ColorPicker.SelectionType.colorBucket),
                    innerColor: new ColorPicker(ColorPicker.SelectionType.neutralBucket),

                    layerOpacity: 0.7,

                    underLayerOpacityRange: {bottom: {lower: 0.55, upper: 0.55}, top: {lower: 0.65, upper: 0.65}},
                    underLayerOpacityTimes: {lower: 2, upper: 12},

                    elementGastonMultiStep: [
                        new MultiStepDefinitionConfig({
                            minPercentage: 0,
                            maxPercentage: 20,
                            max: new Range(4, 12),
                            times: new Range(1, 2),
                        }),
                        new MultiStepDefinitionConfig({
                            minPercentage: 20,
                            maxPercentage: 40,
                            max: new Range(4, 12),
                            times: new Range(1, 2),
                        }),
                        new MultiStepDefinitionConfig({
                            minPercentage: 40,
                            maxPercentage: 60,
                            max: new Range(4, 12),
                            times: new Range(1, 2),
                        }),
                        new MultiStepDefinitionConfig({
                            minPercentage: 60,
                            maxPercentage: 80,
                            max: new Range(4, 12),
                            times: new Range(1, 2),
                        }),
                        new MultiStepDefinitionConfig({
                            minPercentage: 80,
                            maxPercentage: 100,
                            max: new Range(4, 12),
                            times: new Range(1, 2),
                        }),
                    ],

                    numberOfFlareRings: new Range(5, 5),
                    flareRingsSizeRange: new PercentageRange(new PercentageShortestSide(0.01), new PercentageLongestSide(0.8)),
                    flareRingStroke: new Range(3, 3),
                    flareRingThickness: new Range(1, 1),

                    numberOfFlareRays: new Range(15, 15),
                    flareRaysSizeRange: new PercentageRange(new PercentageLongestSide(0.5), new PercentageLongestSide(1)),
                    flareRaysStroke: new Range(3, 3),
                    flareRayThickness: new Range(1, 1),
                    flareOffset: new PercentageRange(new PercentageShortestSide(0.1), new PercentageShortestSide(0.15)),

                    accentRange: {bottom: {lower: 5, upper: 10}, top: {lower: 15, upper: 20}},
                    blurRange: {bottom: {lower: 4, upper: 5}, top: {lower: 8, upper: 10}},
                    featherTimes: {lower: 5, upper: 5},
                }),
                possibleSecondaryEffects: createSecondaryEffects(),
            }),
        });
    }


    let redEyeCount = 4;

    for (let i = 0; i < redEyeCount; i++) {
        await myTestProject.addPrimaryEffect({
            layerConfig: new LayerConfig({
                effect: RedEyeEffect,
                percentChance: 100,
                currentEffectConfig: new RedEyeConfig({
                    invertLayers: true,
                    layerOpacity: 0.8,
                    underLayerOpacity: 0.7,
                    center: new Point2D(1080 / 2, 1920 / 2),
                    innerColor: new ColorPicker(ColorPicker.SelectionType.neutralBucket),
                    outerColor: new ColorPicker(ColorPicker.SelectionType.colorBucket),
                    stroke: 1,
                    thickness: 1,
                    sparsityFactor: [9, 10, 12],
                    innerRadius: getRandomIntInclusive(myTestProject.shortestSideInPixels * 0.25, myTestProject.shortestSideInPixels * 0.25),
                    outerRadius: getRandomIntInclusive(myTestProject.shortestSideInPixels * 0.40, myTestProject.shortestSideInPixels * 0.40),
                    possibleJumpRangeInPixels: {lower: 10, upper: 20},
                    lineLength: {lower: 150, upper: 300},
                    numberOfLoops: {lower: 1, upper: 2},
                    accentRange: {bottom: {lower: 1, upper: 1}, top: {lower: 4, upper: 4}},
                    blurRange: {bottom: {lower: 1, upper: 1}, top: {lower: 3, upper: 3}},
                    featherTimes: {lower: 3, upper: 3},
                }),
                possibleSecondaryEffects: createSecondaryEffects(),
            }),
        });
    }

    redEyeCount = 6;

    for (let i = 0; i < redEyeCount; i++) {
        await myTestProject.addPrimaryEffect({
            layerConfig: new LayerConfig({
                effect: RedEyeEffect,
                percentChance: 100,
                currentEffectConfig: new RedEyeConfig({
                    invertLayers: true,
                    layerOpacity: 0.8,
                    underLayerOpacity: 0.7,
                    center: new Point2D(1080 / 2, 1920 / 2),
                    innerColor: new ColorPicker(ColorPicker.SelectionType.neutralBucket),
                    outerColor: new ColorPicker(ColorPicker.SelectionType.colorBucket),
                    stroke: 1,
                    thickness: 1,
                    sparsityFactor: [9, 10, 12],
                    innerRadius: getRandomIntInclusive(myTestProject.shortestSideInPixels * 0.5, myTestProject.shortestSideInPixels * 0.5),
                    outerRadius: getRandomIntInclusive(myTestProject.shortestSideInPixels * 0.8, myTestProject.shortestSideInPixels * 0.8),
                    possibleJumpRangeInPixels: {lower: 10, upper: 20},
                    lineLength: {lower: 150, upper: 300},
                    numberOfLoops: {lower: 1, upper: 2},
                    accentRange: {bottom: {lower: 1, upper: 1}, top: {lower: 4, upper: 4}},
                    blurRange: {bottom: {lower: 1, upper: 1}, top: {lower: 3, upper: 3}},
                    featherTimes: {lower: 3, upper: 3},
                }),
                possibleSecondaryEffects: createSecondaryEffects(),
            }),
        });
    }

    await myTestProject.addPrimaryEffect({
        layerConfig: new LayerConfig({
            effect: ViewportEffect,
            percentChance: 100,
            currentEffectConfig: new ViewportConfig({
                invertLayers: true,
                layerOpacity: 0.7,
                underLayerOpacity: 0.6,
                center: new Point2D(1080 / 2, (1920 - 150) / 2),
                color: new ColorPicker(ColorPicker.SelectionType.colorBucket),
                innerColor: new ColorPicker(ColorPicker.SelectionType.neutralBucket),
                stroke: 2,
                thickness: 24,
                ampStroke: 0,
                ampThickness: 0,
                radius: [300],
                startAngle: [270],
                ampLength: [100],
                ampRadius: [100],
                sparsityFactor: [3, 4, 5, 6],
                amplitude: {lower: 150, upper: 150},
                times: {lower: 3, upper: 3},
                accentRange: {bottom: {lower: 5, upper: 5}, top: {lower: 30, upper: 30}},
                blurRange: {bottom: {lower: 2, upper: 3}, top: {lower: 5, upper: 8}},
                featherTimes: {lower: 6, upper: 6},
            }),
            possibleSecondaryEffects: createSecondaryEffects(),
        }),
    });

    /////////////////////////////////////
    ///
    ///
    /// FINAL EFFECTS
    ///
    ///
    /////////////////////////////////////

    await myTestProject.addFinalEffect({
        layerConfig: new LayerConfig({
            effect: CRTScanLinesEffect,
            percentChance: 100,
            currentEffectConfig: new CRTScanLinesConfig({
                lines: {lower: 50, upper: 50},
                loopTimes: {lower: 1, upper: 2},
                brightness: {lower: 3000, upper: 4000},
                thickness: {lower: 12, upper: 12},
                lineBlur: {lower: 4, upper: 4},
            }),
        }),
    });


    await myTestProject.addFinalEffect({
        layerConfig: new LayerConfig({
            effect: CRTShadowEffect,
            percentChance: 100,
            currentEffectConfig: new CRTShadowConfig({
                shadowOpacityRange: {bottom: {lower: 0.9, upper: 0.9}, top: {lower: 0.9, upper: 0.9}},
                linesOpacityRange: {bottom: {lower: 0.7, upper: 0.7}, top: {lower: 0.7, upper: 0.7}},
                opacityTimes: {lower: 2, upper: 2},
                lineRed: {lower: 0, upper: 0},
                lineGreen: {lower: 127, upper: 127},
                lineBlue: {lower: 0, upper: 0},
                lineHeight: {lower: 0.25, upper: 0.25},
                edgePercentage: {lower: 0.40, upper: 0.40},
                maxLineHeight: {lower: 2, upper: 2},
                numberOfEdgeSections: {lower: 40, upper: 40},
            })
        }),
    });

    await myTestProject.addFinalEffect({
        layerConfig: new LayerConfig({
            effect: CRTBarrelEffect,
            percentChance: 100,
            currentEffectConfig: new CRTBarrelConfig({
                strength: {lower: 0.15, upper: 0.15},
                edgeThreshold: {lower: 0.1, upper: 0.1},
                corner: {lower: 0.2, upper: 0.2},
            }),
        }),
    });

    promiseArray.push(myTestProject.generateRandomLoop());
};

await createComposition(duskTillDawn);

await Promise.all(promiseArray);
