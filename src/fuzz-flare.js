import {Project} from "my-nft-gen/src/app/Project.js";
import {ColorScheme} from "my-nft-gen/src/core/color/ColorScheme.js";
import {LayerConfig} from "my-nft-gen/src/core/layer/LayerConfig.js";
import {RedEyeEffect} from "my-nft-gen/src/effects/primaryEffects/red-eye/RedEyeEffect.js";
import {RedEyeConfig} from "my-nft-gen/src/effects/primaryEffects/red-eye/RedEyeConfig.js";
import {Point2D} from "my-nft-gen/src/core/layer/configType/Point2D.js";
import {ColorPicker} from "my-nft-gen/src/core/layer/configType/ColorPicker.js";
import {getRandomIntInclusive} from "my-nft-gen/src/core/math/random.js";
import {ViewportEffect} from "my-nft-gen/src/effects/primaryEffects/viewport/ViewportEffect.js";
import {ViewportConfig} from "my-nft-gen/src/effects/primaryEffects/viewport/ViewportConfig.js";
import {MappedFramesEffect} from "my-nft-gen/src/effects/primaryEffects/mappedFrames/MappedFramesEffect.js";
import {MappedFramesConfig} from "my-nft-gen/src/effects/primaryEffects/mappedFrames/MappedFramesConfig.js";
import {GlowEffect} from "my-nft-gen/src/effects/secondaryEffects/glow/GlowEffect.js";
import {GlowConfig} from "my-nft-gen/src/effects/secondaryEffects/glow/GlowConfig.js";
import {FuzzFlareEffect} from "my-nft-gen/src/effects/primaryEffects/fuzz-flare/FuzzFlareEffect.js";
import {FuzzFlareConfig} from "my-nft-gen/src/effects/primaryEffects/fuzz-flare/FuzzFlareConfig.js";
import {MultiStepDefinitionConfig} from "my-nft-gen/src/core/math/MultiStepDefinitionConfig.js";
import {PercentageRange} from "my-nft-gen/src/core/layer/configType/PercentageRange.js";
import {PercentageLongestSide} from "my-nft-gen/src/core/layer/configType/PercentageLongestSide.js";
import {PercentageShortestSide} from "my-nft-gen/src/core/layer/configType/PercentageShortestSide.js";
import {Range} from "my-nft-gen/src/core/layer/configType/Range.js";
import {brightAndFeisty} from "./assets/color-scheme-store.js";
import {LayeredHexEffect} from "../../my-nft-gen/src/effects/primaryEffects/layeredHex/LayeredHexEffect.js";
import {LayeredHexConfig} from "../../my-nft-gen/src/effects/primaryEffects/layeredHex/LayeredHexConfig.js";
import {NeonColorScheme, NeonColorSchemeFactory} from "../../my-nft-gen/src/core/color/NeonColorSchemeFactory.js";
import {FuzzyBandEffect} from "../../my-nft-gen/src/effects/primaryEffects/fuzzyBands/FuzzyBandEffect.js";
import {FuzzyBandConfig} from "../../my-nft-gen/src/effects/primaryEffects/fuzzyBands/FuzzyBandConfig.js";
import {HexEffect} from "../../my-nft-gen/src/effects/primaryEffects/hex/HexEffect.js";
import {HexConfig} from "../../my-nft-gen/src/effects/primaryEffects/hex/HexConfig.js";


const promiseArray = [];

const createComposition = async (colorScheme) => {
    const myTestProject = new Project({
        artist: 'John Ruf',
        projectName: 'fuzz-flare',
        projectDirectory: 'src/fuzz-flare/',
        neutrals: ['#FFD4D4'],
        backgrounds: ['#000008'],
        numberOfFrame: 1800,
        colorScheme: colorScheme,
    });

    await myTestProject.addPrimaryEffect({
        layerConfig: new LayerConfig({
            effect: HexEffect,
            percentChance: 100,
            currentEffectConfig: new HexConfig({
                layerOpacity: 0.8,
                underLayerOpacity :0.6,
                sparsityFactor :[18],
                gapFactor :{ lower: 12, upper: 12 },
                radiusFactor :{ lower: 8, upper: 8},
                accentRange: {bottom: {lower: 1.4, upper: 1.4}, top: {lower: 2.4, upper: 2.4}}, //affected by scale factor
                blurRange: {bottom: {lower: 4, upper: 6}, top: {lower: 8, upper: 10}},
                featherTimes: {lower: 12, upper: 12},
                stroke :1,
                thickness : 2,
                scaleFactor :0.5,
                numberOfHex :8,
                strategy :['static'],
                overlayStrategy :['flat'],
            }),
        }),
    });

    await myTestProject.addPrimaryEffect({
        layerConfig: new LayerConfig({
            effect: MappedFramesEffect,
            percentChance: 100,
            currentEffectConfig: new MappedFramesConfig({
                folderName: '/Users/the.dude/WebstormProjects/nft-scratch/src/assets/mappedFrames/flux-folder/',
                layerOpacity: [0.9],
                buffer: [200],
                loopTimesMultiStep: [
                    new MultiStepDefinitionConfig({
                        minPercentage: 0,
                        maxPercentage: 10,
                        max: new Range(0, 0),
                        times: new Range(1, 1),
                    }),
                    new MultiStepDefinitionConfig({
                        minPercentage: 10,
                        maxPercentage: 20,
                        max: new Range(0, 0),
                        times: new Range(5, 5),
                    }),
                    new MultiStepDefinitionConfig({
                        minPercentage: 20,
                        maxPercentage: 80,
                        max: new Range(0, 0),
                        times: new Range(8, 8),
                    }),
                    new MultiStepDefinitionConfig({
                        minPercentage: 80,
                        maxPercentage: 90,
                        max: new Range(0, 0),
                        times: new Range(3, 3),
                    }),
                    new MultiStepDefinitionConfig({
                        minPercentage: 90,
                        maxPercentage: 100,
                        max: new Range(0, 0),
                        times: new Range(1, 1),
                    }),
                ],
            }),
            possibleSecondaryEffects: [
                new LayerConfig({
                    effect: GlowEffect,
                    percentChance: 100,
                    currentEffectConfig: new GlowConfig({
                        lowerRange: {lower: -80, upper: -80},
                        upperRange: {lower: -0, upper: 0},
                        times: {lower: 1, upper: 1}
                    }),
                })
            ]
        }),
    });

    const min = 25;
    const max = 45;

    await myTestProject.addPrimaryEffect({
        layerConfig: new LayerConfig({
            effect: FuzzFlareEffect,
            percentChance: 100,
            currentEffectConfig: new FuzzFlareConfig({
                invertLayers: true,

                outerColor: new ColorPicker(ColorPicker.SelectionType.colorBucket),
                innerColor: new ColorPicker(ColorPicker.SelectionType.neutralBucket),

                layerOpacity: 0.8,

                underLayerOpacityRange: {bottom: {lower: 0.6, upper: 0.7}, top: {lower: 0.8, upper: 0.9}},
                underLayerOpacityTimes: {lower: 2, upper: 8},

                elementGastonMultiStep: [
                    new MultiStepDefinitionConfig({
                        minPercentage: 0,
                        maxPercentage: 10,
                        max: new Range(Math.ceil(min * 0.1), Math.ceil(max * 0.1)),
                        times: new Range(1, 1),
                    }),
                    new MultiStepDefinitionConfig({
                        minPercentage: 10,
                        maxPercentage: 25,
                        max: new Range(Math.ceil(min * 0.15), Math.ceil(max * 0.15)),
                        times: new Range(2, 2),
                    }),
                    new MultiStepDefinitionConfig({
                        minPercentage: 25,
                        maxPercentage: 75,
                        max: new Range(Math.ceil(min * 0.5), Math.ceil(max * 0.5)),
                        times: new Range(4, 4),
                    }),
                    new MultiStepDefinitionConfig({
                        minPercentage: 75,
                        maxPercentage: 90,
                        max: new Range(Math.ceil(min * 0.15), Math.ceil(max * 0.15)),
                        times: new Range(2, 2),
                    }),
                    new MultiStepDefinitionConfig({
                        minPercentage: 90,
                        maxPercentage: 100,
                        max: new Range(Math.ceil(min * 0.1), Math.ceil(max * 0.1)),
                        times: new Range(1, 1),
                    })
                ],

                numberOfFlareRings: new Range(10, 10),
                flareRingsSizeRange: new PercentageRange(new PercentageShortestSide(0.05), new PercentageLongestSide(0.8)),
                flareRingStroke: new Range(1, 1),
                flareRingThickness: new Range(1, 1),

                numberOfFlareRays: new Range(100, 100),
                flareRaysSizeRange: new PercentageRange(new PercentageLongestSide(0.7), new PercentageLongestSide(1)),
                flareRaysStroke: new Range(1, 1),
                flareRayThickness: new Range(1, 1),
                flareOffset: new PercentageRange(new PercentageShortestSide(0.05), new PercentageShortestSide(0.15)),

                accentRange: {bottom: {lower: 10, upper: 15}, top: {lower: 20, upper: 25}},
                blurRange: {bottom: {lower: 4, upper: 6}, top: {lower: 8, upper: 10}},
                featherTimes: {lower: 8, upper: 12},
            }),
        }),
    });

    await myTestProject.addPrimaryEffect({
        layerConfig: new LayerConfig({
            effect: FuzzyBandEffect,
            percentChance: 100,
            currentEffectConfig: new FuzzyBandConfig({
                color: new ColorPicker(ColorPicker.SelectionType.color, '#FF0000'),
                innerColor: new ColorPicker(ColorPicker.SelectionType.neutralBucket),
                invertLayers: true,
                layerOpacity: 0.8,
                underLayerOpacityRange: { bottom: { lower: 0.6, upper: 0.7 }, top: { lower: 0.8, upper: 0.9 } },
                underLayerOpacityTimes: { lower: 8, upper: 12 },
                circles: { lower: 1, upper: 1 },
                stroke: 2,
                thickness: 12,
                radius: {
                    lower: (finalSize)=> finalSize.shortestSide * 0.30,
                    upper: (finalSize)=> finalSize.shortestSide * 0.30,
                },
                accentRange: {bottom: {lower: 10, upper: 10}, top: {lower: 40, upper: 40}},
                blurRange: {bottom: {lower: 3, upper: 3}, top: {lower: 8, upper: 8}},
                featherTimes: {lower: 12, upper: 12},
            }),
        }),
    });

    await myTestProject.addPrimaryEffect({
        layerConfig: new LayerConfig({
            effect: ViewportEffect,
            percentChance: 100,
            currentEffectConfig: new ViewportConfig({
                color: new ColorPicker(ColorPicker.SelectionType.color, '#FF0000'),
                innerColor: new ColorPicker(ColorPicker.SelectionType.neutralBucket),
                invertLayers: true,
                layerOpacity: 0.8,
                underLayerOpacity: 0.7,
                stroke: 2,
                thickness: 12,
                ampStroke: 0,
                ampThickness: 1,
                radius: [450],
                startAngle: [270],
                amplitude: {lower: 100, upper: 100},
                times: {lower: 6, upper: 6},
                accentRange: {bottom: {lower: 10, upper: 10}, top: {lower: 40, upper: 40}},
                blurRange: {bottom: {lower: 3, upper: 3}, top: {lower: 8, upper: 8}},
                featherTimes: {lower: 12, upper: 12},
                center: new Point2D(1080 / 2, 850)
            }),
        }),
    });

    promiseArray.push(myTestProject.generateRandomLoop());
};

await createComposition(NeonColorSchemeFactory.getColorScheme(NeonColorScheme.neons));

await Promise.all(promiseArray);
