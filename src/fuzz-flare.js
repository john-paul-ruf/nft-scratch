import {neonLights} from "./assets/color-scheme-store.js";
import {Project} from "../../my-nft-gen/src/app/Project.js";
import {LayerConfig} from "../../my-nft-gen/src/core/layer/LayerConfig.js";
import {RedEyeEffect} from "../../my-nft-gen/src/effects/primaryEffects/red-eye/RedEyeEffect.js";
import {RedEyeConfig} from "../../my-nft-gen/src/effects/primaryEffects/red-eye/RedEyeConfig.js";
import {Point2D} from "../../my-nft-gen/src/core/layer/configType/Point2D.js";
import {ColorPicker} from "../../my-nft-gen/src/core/layer/configType/ColorPicker.js";
import {getRandomIntInclusive} from "../../my-nft-gen/src/core/math/random.js";
import {MappedFramesEffect} from "../../my-nft-gen/src/effects/primaryEffects/mappedFrames/MappedFramesEffect.js";
import {MappedFramesConfig} from "../../my-nft-gen/src/effects/primaryEffects/mappedFrames/MappedFramesConfig.js";
import {FuzzFlareEffect} from "../../my-nft-gen/src/effects/primaryEffects/fuzz-flare/FuzzFlareEffect.js";
import {FuzzFlareConfig} from "../../my-nft-gen/src/effects/primaryEffects/fuzz-flare/FuzzFlareConfig.js";
import {MultiStepDefinitionConfig} from "../../my-nft-gen/src/core/math/MultiStepDefinitionConfig.js";
import {Range} from "../../my-nft-gen/src/core/layer/configType/Range.js";
import {PercentageRange} from "../../my-nft-gen/src/core/layer/configType/PercentageRange.js";
import {PercentageShortestSide} from "../../my-nft-gen/src/core/layer/configType/PercentageShortestSide.js";
import {PercentageLongestSide} from "../../my-nft-gen/src/core/layer/configType/PercentageLongestSide.js";
import {CRTScanLinesEffect} from "../../my-nft-gen/src/effects/finalImageEffects/crtScanLines/CRTScanLinesEffect.js";
import {CRTScanLinesConfig} from "../../my-nft-gen/src/effects/finalImageEffects/crtScanLines/CRTScanLinesConfig.js";
import {CRTShadowEffect} from "../../my-nft-gen/src/effects/finalImageEffects/crtShadow/CRTShadowEffect.js";
import {CRTShadowConfig} from "../../my-nft-gen/src/effects/finalImageEffects/crtShadow/CRTShadowConfig.js";
import {GlowConfig} from "../../my-nft-gen/src/effects/secondaryEffects/glow/GlowConfig.js";
import {GlowEffect} from "../../my-nft-gen/src/effects/secondaryEffects/glow/GlowEffect.js";
import {CRTDegaussEffect} from "../../my-nft-gen/src/effects/finalImageEffects/crtDegaussEvent/CRTDegaussEffect.js";
import {CRTDegaussConfig} from "../../my-nft-gen/src/effects/finalImageEffects/crtDegaussEvent/CRTDegaussConfig.js";

const promiseArray = [];

const createComposition = async (colorScheme) => {
    const myTestProject = new Project({
        artist: 'John Ruf',
        projectName: 'fuzz-flare',
        projectDirectory: 'src/fuzz-flare/',
        neutrals: ['#FF0000'],
        backgrounds: ['#0F0000'],
        numberOfFrame: 1800,
        colorScheme: colorScheme,
    });

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
                stroke: 2,
                thickness: 1,
                sparsityFactor: [8],
                innerRadius: getRandomIntInclusive(myTestProject.shortestSideInPixels * 0.3, myTestProject.shortestSideInPixels * 0.3),
                outerRadius: getRandomIntInclusive(myTestProject.shortestSideInPixels * 0.70, myTestProject.shortestSideInPixels * 0.8),
                possibleJumpRangeInPixels: {lower: 10, upper: 30},
                lineLength: {lower: 200, upper: 300},
                numberOfLoops: {lower: 1, upper: 1},
                accentRange: {bottom: {lower: 0, upper: 0}, top: {lower: 0, upper: 0}},
                blurRange: {bottom: {lower: 2, upper: 2}, top: {lower: 2, upper: 2}},
                featherTimes: {lower: 1, upper: 1},
            })
        }),
    });

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
                stroke: 2,
                thickness: 1,
                sparsityFactor: [8],
                innerRadius: getRandomIntInclusive(myTestProject.shortestSideInPixels * 0.3, myTestProject.shortestSideInPixels * 0.3),
                outerRadius: getRandomIntInclusive(myTestProject.shortestSideInPixels * 0.70, myTestProject.shortestSideInPixels * 0.8),
                possibleJumpRangeInPixels: {lower: 10, upper: 30},
                lineLength: {lower: 200, upper: 300},
                numberOfLoops: {lower: 2, upper: 2},
                accentRange: {bottom: {lower: 0, upper: 0}, top: {lower: 0, upper: 0}},
                blurRange: {bottom: {lower: 2, upper: 2}, top: {lower: 2, upper: 2}},
                featherTimes: {lower: 1, upper: 1},
            })
        }),
    });

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
                stroke: 2,
                thickness: 1,
                sparsityFactor: [8],
                innerRadius: getRandomIntInclusive(myTestProject.shortestSideInPixels * 0.3, myTestProject.shortestSideInPixels * 0.3),
                outerRadius: getRandomIntInclusive(myTestProject.shortestSideInPixels * 0.70, myTestProject.shortestSideInPixels * 0.8),
                possibleJumpRangeInPixels: {lower: 10, upper: 30},
                lineLength: {lower: 200, upper: 300},
                numberOfLoops: {lower: 3, upper: 3},
                accentRange: {bottom: {lower: 0, upper: 0}, top: {lower: 0, upper: 0}},
                blurRange: {bottom: {lower: 2, upper: 2}, top: {lower: 2, upper: 2}},
                featherTimes: {lower: 1, upper: 1},
            })
        }),
    });

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
                stroke: 2,
                thickness: 1,
                sparsityFactor: [8],
                innerRadius: getRandomIntInclusive(myTestProject.shortestSideInPixels * 0.3, myTestProject.shortestSideInPixels * 0.3),
                outerRadius: getRandomIntInclusive(myTestProject.shortestSideInPixels * 0.70, myTestProject.shortestSideInPixels * 0.8),
                possibleJumpRangeInPixels: {lower: 10, upper: 30},
                lineLength: {lower: 200, upper: 300},
                numberOfLoops: {lower: 4, upper: 4},
                accentRange: {bottom: {lower: 0, upper: 0}, top: {lower: 0, upper: 0}},
                blurRange: {bottom: {lower: 2, upper: 2}, top: {lower: 2, upper: 2}},
                featherTimes: {lower: 1, upper: 1},
            })
        }),
    });

    /*await myTestProject.addPrimaryEffect({
        layerConfig: new LayerConfig({
            effect: ViewportEffect,
            percentChance: 100,
            currentEffectConfig: new ViewportConfig({
                color: new ColorPicker(ColorPicker.SelectionType.colorBucket),
                innerColor: new ColorPicker(ColorPicker.SelectionType.neutralBucket),
                invertLayers: false,
                layerOpacity: 0.8,
                underLayerOpacity: 0.6,
                stroke: 4,
                thickness: 18,
                ampStroke: 0,
                ampThickness: 1,
                radius: [450],
                startAngle: [270],
                amplitude: {lower: 100, upper: 100},
                times: {lower: 4, upper: 4},
                accentRange: {bottom: {lower: 10, upper: 10}, top: {lower: 40, upper: 40}},
                blurRange: {bottom: {lower: 4, upper: 4}, top: {lower: 12, upper: 12}},
                featherTimes: {lower: 4, upper: 4},
            })
        }),
    });*/

    await myTestProject.addPrimaryEffect({
        layerConfig: new LayerConfig({
            effect: MappedFramesEffect,
            percentChance: 100,
            currentEffectConfig: new MappedFramesConfig({
                folderName: 'C:\\Users\\neomo\\WebstormProjects\\nft-scratch\\src\\assets\\mappedFrames\\seer\\',
                layerOpacity: [0.7],
                buffer: [400],
                loopTimesMultiStep: [
                    new MultiStepDefinitionConfig({
                        minPercentage: 0,
                        maxPercentage: 45,
                        max: new Range(1, 1),
                        times: new Range(12, 12),
                    }),
                    new MultiStepDefinitionConfig({
                        minPercentage: 45,
                        maxPercentage: 55,
                        max: new Range(1, 1),
                        times: new Range(1, 1),
                    }),
                    new MultiStepDefinitionConfig({
                        minPercentage: 55,
                        maxPercentage: 100,
                        max: new Range(1, 1),
                        times: new Range(12, 12),
                    })
                ],
            }),
            /* possibleSecondaryEffects: [
                 new LayerConfig({
                     effect: GlowEffect,
                     percentChance: 100,
                     currentEffectConfig: new GlowConfig({
                         lowerRange: {lower: -220, upper: -220},
                         upperRange: {lower: -260, upper: -260},
                         times: {lower: 4, upper: 4},
                     }),
                 })
             ]*/
        }),
    });

    await myTestProject.addPrimaryEffect({
        layerConfig: new LayerConfig({
            effect: FuzzFlareEffect,
            percentChance: 100,
            currentEffectConfig: new FuzzFlareConfig({
                invertLayers: true,

                outerColor: new ColorPicker(ColorPicker.SelectionType.colorBucket),
                innerColor: new ColorPicker(ColorPicker.SelectionType.neutralBucket),

                layerOpacity: 0.8,

                underLayerOpacityRange: {bottom: {lower: 0.6, upper: 0.65}, top: {lower: 0.7, upper: 0.75}},
                underLayerOpacityTimes: {lower: 2, upper: 8},

                elementGastonMultiStep: [
                    new MultiStepDefinitionConfig({
                        minPercentage: 0,
                        maxPercentage: 25,
                        max: new Range(3, 20),
                        times: new Range(1, 1),
                    }),
                    new MultiStepDefinitionConfig({
                        minPercentage: 25,
                        maxPercentage: 50,
                        max: new Range(3, 20),
                        times: new Range(1, 2),
                    }),
                    new MultiStepDefinitionConfig({
                        minPercentage: 50,
                        maxPercentage: 75,
                        max: new Range(3, 20),
                        times: new Range(1, 2),
                    }),
                    new MultiStepDefinitionConfig({
                        minPercentage: 75,
                        maxPercentage: 100,
                        max: new Range(3, 20),
                        times: new Range(1, 1),
                    })
                ],

                numberOfFlareRings: new Range(8, 8),
                flareRingsSizeRange: new PercentageRange(new PercentageShortestSide(0.15), new PercentageLongestSide(1)),
                flareRingStroke: new Range(2, 2),
                flareRingThickness: new Range(1, 1),

                numberOfFlareRays: new Range(40, 40),
                flareRaysSizeRange: new PercentageRange(new PercentageLongestSide(0.7), new PercentageLongestSide(1)),
                flareRaysStroke: new Range(2, 2),
                flareRayThickness: new Range(1, 1),
                flareOffset: new PercentageRange(new PercentageShortestSide(0.125), new PercentageShortestSide(0.175)),

                accentRange: {bottom: {lower: 2, upper: 6}, top: {lower: 8, upper: 14}},
                blurRange: {bottom: {lower: 4, upper: 6}, top: {lower: 8, upper: 12}},
                featherTimes: {lower: 2, upper: 8},
            })
        }),
    });

    await myTestProject.addFinalEffect({
        layerConfig: new LayerConfig({
            effect: CRTDegaussEffect,
            percentChance: 100,
            currentEffectConfig: new CRTDegaussConfig({
                keyFrames: [100, 800, 900, 1000, 1700],
                glitchFrameCount: [15,25,40],
                sectionHeight: [5, 10, 15],
                offset: {lower: 2, upper: 8},
                direction: [-1, 1],
                glitchTimes: {lower: 1, upper: 1},
                backgroundRed: {lower: 0, upper: 0},
                backgroundGreen: {lower: 0, upper: 0},
                backgroundBlue: {lower: 0, upper: 0},
                backgroundAlpha: {lower: 1, upper: 1},
            }),
        }),
    });

    await myTestProject.addFinalEffect({
        layerConfig: new LayerConfig({
            effect: CRTScanLinesEffect,
            percentChance: 100,
            currentEffectConfig: new CRTScanLinesConfig({
                lines: {lower: 40, upper: 40},
                loopTimes: {lower: 1, upper: 2},
                brightness: {lower: 1500, upper: 2500},
                thickness: {lower: 4, upper: 4},
                lineBlur: {lower: 6, upper: 6},
            }),
        }),
    });

    await myTestProject.addFinalEffect({
        layerConfig: new LayerConfig({
            effect: CRTShadowEffect,
            percentChance: 100,
            currentEffectConfig: new CRTShadowConfig({
                shadowOpacityRange: {bottom: {lower: 0.7, upper: 0.7}, top: {lower: 0.9, upper: 0.9}},
                linesOpacityRange: {bottom: {lower: 0.2, upper: 0.2}, top: {lower: 0.4, upper: 0.4}},
                opacityTimes: {lower: 4, upper: 4},
                lineRed: {lower: 20, upper: 20},
                lineGreen: {lower: 20, upper: 20},
                lineBlue: {lower: 0, upper: 0},
                lineHeight: {lower: 1, upper: 1},
                edgePercentage: {lower: 0.10, upper: 0.10},
                maxLineHeight: {lower: 3, upper: 3},
                numberOfEdgeSections: {lower: 16, upper: 16},
            }),
            possibleSecondaryEffects: [
                new LayerConfig({
                    effect: GlowEffect,
                    percentChance: 100,
                    currentEffectConfig: new GlowConfig({
                        lowerRange: {lower: 0, upper: 0},
                        upperRange: {lower: 180, upper: 180},
                        times: {lower: 1, upper: 1},
                    }),
                })
            ]
        }),
    });

    promiseArray.push(myTestProject.generateRandomLoop());
};

await createComposition(neonLights);

await Promise.all(promiseArray);
