import {neonLights} from "./assets/color-scheme-store.js";
import {Project} from "../../my-nft-gen/src/app/Project.js";
import {LayerConfig} from "../../my-nft-gen/src/core/layer/LayerConfig.js";
import {RedEyeEffect} from "../../my-nft-gen/src/effects/primaryEffects/red-eye/RedEyeEffect.js";
import {RedEyeConfig} from "../../my-nft-gen/src/effects/primaryEffects/red-eye/RedEyeConfig.js";
import {Point2D} from "../../my-nft-gen/src/core/layer/configType/Point2D.js";
import {ColorPicker} from "../../my-nft-gen/src/core/layer/configType/ColorPicker.js";
import {getRandomIntInclusive} from "../../my-nft-gen/src/core/math/random.js";
import {ViewportEffect} from "../../my-nft-gen/src/effects/primaryEffects/viewport/ViewportEffect.js";
import {ViewportConfig} from "../../my-nft-gen/src/effects/primaryEffects/viewport/ViewportConfig.js";
import {MappedFramesEffect} from "../../my-nft-gen/src/effects/primaryEffects/mappedFrames/MappedFramesEffect.js";
import {MappedFramesConfig} from "../../my-nft-gen/src/effects/primaryEffects/mappedFrames/MappedFramesConfig.js";
import {GlowEffect} from "../../my-nft-gen/src/effects/secondaryEffects/glow/GlowEffect.js";
import {GlowConfig} from "../../my-nft-gen/src/effects/secondaryEffects/glow/GlowConfig.js";
import {FuzzFlareEffect} from "../../my-nft-gen/src/effects/primaryEffects/fuzz-flare/FuzzFlareEffect.js";
import {FuzzFlareConfig} from "../../my-nft-gen/src/effects/primaryEffects/fuzz-flare/FuzzFlareConfig.js";
import {MultiStepDefinitionConfig} from "../../my-nft-gen/src/core/math/MultiStepDefinitionConfig.js";
import {Range} from "../../my-nft-gen/src/core/layer/configType/Range.js";
import {PercentageRange} from "../../my-nft-gen/src/core/layer/configType/PercentageRange.js";
import {PercentageShortestSide} from "../../my-nft-gen/src/core/layer/configType/PercentageShortestSide.js";
import {PercentageLongestSide} from "../../my-nft-gen/src/core/layer/configType/PercentageLongestSide.js";
import {CRTScanLinesEffect} from "../../my-nft-gen/src/effects/finalImageEffects/crtScanLines/CRTScanLinesEffect.js";
import {CRTScanLinesConfig} from "../../my-nft-gen/src/effects/finalImageEffects/crtScanLines/CRTScanLinesConfig.js";
import {CRTBarrelEffect} from "../../my-nft-gen/src/effects/finalImageEffects/crtBarrel/CRTBarrelEffect.js";
import {CRTBarrelConfig} from "../../my-nft-gen/src/effects/finalImageEffects/crtBarrel/CRTBarrelConfig.js";
import {CRTDegaussEffect} from "../../my-nft-gen/src/effects/finalImageEffects/CRTDegaussEvent/CRTDegaussEffect.js";
import {CRTDegaussConfig} from "../../my-nft-gen/src/effects/finalImageEffects/CRTDegaussEvent/CRTDegaussConfig.js";
import {CRTShadowEffect} from "../../my-nft-gen/src/effects/finalImageEffects/crtShadow/CRTShadowEffect.js";
import {CRTShadowConfig} from "../../my-nft-gen/src/effects/finalImageEffects/crtShadow/CRTShadowConfig.js";

const promiseArray = [];

const createComposition = async (colorScheme) => {
    const myTestProject = new Project({
        artist: 'John Ruf',
        projectName: 'fuzz-flare',
        projectDirectory: 'src/fuzz-flare/',
        neutrals: ['#FF0000'],
        backgrounds: ['#080808'],
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

    await myTestProject.addPrimaryEffect({
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
                radius: [350],
                startAngle: [270],
                amplitude: {lower: 150, upper: 150},
                times: {lower: 4, upper: 4},
                accentRange: {bottom: {lower: 10, upper: 10}, top: {lower: 40, upper: 40}},
                blurRange: {bottom: {lower: 4, upper: 4}, top: {lower: 12, upper: 12}},
                featherTimes: {lower: 4, upper: 4},
            })
        }),
    });

    await myTestProject.addPrimaryEffect({
        layerConfig: new LayerConfig({
            effect: MappedFramesEffect,
            percentChance: 100,
            currentEffectConfig: new MappedFramesConfig({
                folderName: 'C:\\Users\\neomo\\WebstormProjects\\nft-scratch\\src\\assets\\mappedFrames\\skull-idea\\',
                layerOpacity: [0.7],
                buffer: [200],
                times: 80,
            }),
            possibleSecondaryEffects: [
                new LayerConfig({
                    effect: GlowEffect,
                    percentChance: 100,
                    currentEffectConfig: new GlowConfig({
                        lowerRange: {lower: -220, upper: -220},
                        upperRange: {lower: -260, upper: -260},
                        times: {lower: 4, upper: 4},
                    }),
                })
            ]
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
                        max: new Range(5,15),
                        times: new Range(1, 1),
                    }),
                    new MultiStepDefinitionConfig({
                        minPercentage: 25,
                        maxPercentage: 50,
                        max: new Range(5,15),
                        times: new Range(1, 1),
                    }),
                    new MultiStepDefinitionConfig({
                        minPercentage: 50,
                        maxPercentage: 75,
                        max: new Range(5,15),
                        times: new Range(1, 1),
                    }),
                    new MultiStepDefinitionConfig({
                        minPercentage: 75,
                        maxPercentage: 100,
                        max: new Range(5,15),
                        times: new Range(1, 1),
                    })
                ],

                numberOfFlareRings: new Range(8, 8),
                flareRingsSizeRange: new PercentageRange(new PercentageShortestSide(0.15), new PercentageLongestSide(1)),
                flareRingStroke: new Range(2, 2),
                flareRingThickness: new Range(1, 1),

                numberOfFlareRays: new Range(25, 25),
                flareRaysSizeRange: new PercentageRange(new PercentageLongestSide(0.7), new PercentageLongestSide(1)),
                flareRaysStroke: new Range(2, 2),
                flareRayThickness: new Range(1, 1),
                flareOffset: new PercentageRange(new PercentageShortestSide(0.1), new PercentageShortestSide(0.15)),

                accentRange: {bottom: {lower: 2, upper: 6}, top: {lower: 8, upper: 14}},
                blurRange: {bottom: {lower: 4, upper: 6}, top: {lower: 8, upper: 12}},
                featherTimes: {lower: 2, upper: 8},
            })
        }),
    });

     await myTestProject.addFinalEffect({
        layerConfig: new LayerConfig({
            effect: CRTScanLinesEffect,
            percentChance: 100,
            currentEffectConfig: new CRTScanLinesConfig({
                lines: {lower: 40, upper: 40},
                loopTimes: {lower: 1, upper: 1},
                brightness: {lower: 1000, upper: 1000},
                thickness: {lower: 4, upper: 4},
                lineBlur: {lower: 6, upper: 6},
            }),
        }),
    });

    /*await myTestProject.addFinalEffect({
        layerConfig: new LayerConfig({
            effect: CRTDegaussEffect,
            percentChance: 100,
            currentEffectConfig: new CRTDegaussConfig({
                numberOfFrames: { lower: 20, upper: 40 },
                keyFrames: [15, 120, 360, 900],
                waveFrequency: { lower: 0, upper: 6 },
                waveAmplitude: { lower: 20, upper: 60 },
                amount: {lower: 0.7, upper: 1},
                glitchSections: {lower: 8, upper: 12},
                maxOffset: {lower: 40, upper: 60},
            }),
        }),
    });*/

    await myTestProject.addFinalEffect({
        layerConfig: new LayerConfig({
            effect: CRTShadowEffect,
            percentChance: 100,
            currentEffectConfig: new CRTShadowConfig({

            }),
        }),
    });

    promiseArray.push(myTestProject.generateRandomLoop());
};

await createComposition(neonLights);

await Promise.all(promiseArray);
