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
            effect: MappedFramesEffect,
            percentChance: 100,
            currentEffectConfig: new MappedFramesConfig({
                folderName: '/Users/the.dude/WebstormProjects/nft-scratch/src/assets/mappedFrames/og-eye-flux/',
                layerOpacity: [0.9],
                buffer: [400],
                loopTimesMultiStep: [
                    new MultiStepDefinitionConfig({
                        minPercentage: 0,
                        maxPercentage: 10,
                        max: new Range(0, 0),
                        times: new Range(5, 5),
                    }),
                    new MultiStepDefinitionConfig({
                        minPercentage: 10,
                        maxPercentage: 20,
                        max: new Range(0, 0),
                        times: new Range(4, 4),
                    }),
                    new MultiStepDefinitionConfig({
                        minPercentage: 20,
                        maxPercentage: 80,
                        max: new Range(0, 0),
                        times: new Range(4, 4),
                    }),
                    new MultiStepDefinitionConfig({
                        minPercentage: 80,
                        maxPercentage: 90,
                        max: new Range(0, 0),
                        times: new Range(4, 4),
                    }),
                    new MultiStepDefinitionConfig({
                        minPercentage: 90,
                        maxPercentage: 100,
                        max: new Range(0, 0),
                        times: new Range(5, 5),
                    }),
                ],
            }),
            possibleSecondaryEffects: [
                new LayerConfig({
                    effect: GlowEffect,
                    percentChance: 100,
                    currentEffectConfig: new GlowConfig({
                        lowerRange: {lower: -200, upper: -200},
                        upperRange: {lower: -260, upper: -260},
                        times: {lower: 6, upper: 6}
                    }),
                })
            ]
        }),
    });

    const min = 15;

    const max = 35;
    await myTestProject.addPrimaryEffect({
        layerConfig: new LayerConfig({
            effect: FuzzFlareEffect,
            percentChance: 100,
            currentEffectConfig: new FuzzFlareConfig({
                invertLayers: false,

                outerColor: new ColorPicker(ColorPicker.SelectionType.colorBucket),
                innerColor: new ColorPicker(ColorPicker.SelectionType.neutralBucket),

                layerOpacity: 0.7,

                underLayerOpacityRange: {bottom: {lower: 0.4, upper: 0.5}, top: {lower: 0.6, upper: 0.7}},
                underLayerOpacityTimes: {lower: 2, upper: 8},

                elementGastonMultiStep: [
                    new MultiStepDefinitionConfig({
                        minPercentage: 0,
                        maxPercentage: 10,
                        max: new Range(Math.ceil(min * 0.1), Math.ceil(max * 0.1)),
                        times: new Range(3, 4),
                    }),
                    new MultiStepDefinitionConfig({
                        minPercentage: 10,
                        maxPercentage: 25,
                        max: new Range(Math.ceil(min * 0.15), Math.ceil(max * 0.15)),
                        times: new Range(1, 2),
                    }),
                    new MultiStepDefinitionConfig({
                        minPercentage: 25,
                        maxPercentage: 75,
                        max: new Range(Math.ceil(min * 0.5), Math.ceil(max * 0.5)),
                        times: new Range(1, 1),
                    }),
                    new MultiStepDefinitionConfig({
                        minPercentage: 75,
                        maxPercentage: 90,
                        max: new Range(Math.ceil(min * 0.15), Math.ceil(max * 0.15)),
                        times: new Range(1, 2),
                    }),
                    new MultiStepDefinitionConfig({
                        minPercentage: 90,
                        maxPercentage: 100,
                        max: new Range(Math.ceil(min * 0.1), Math.ceil(max * 0.1)),
                        times: new Range(3, 4),
                    })
                ],

                numberOfFlareRings: new Range(20, 20),
                flareRingsSizeRange: new PercentageRange(new PercentageShortestSide(0.05), new PercentageLongestSide(1)),
                flareRingStroke: new Range(1, 1),
                flareRingThickness: new Range(1, 3),

                numberOfFlareRays: new Range(120, 120),
                flareRaysSizeRange: new PercentageRange(new PercentageLongestSide(0.7), new PercentageLongestSide(1)),
                flareRaysStroke: new Range(1, 1),
                flareRayThickness: new Range(1, 2),
                flareOffset: new PercentageRange(new PercentageShortestSide(0.10), new PercentageShortestSide(0.20)),

                accentRange: {bottom: {lower: 5, upper: 10}, top: {lower: 15, upper: 20}},
                blurRange: {bottom: {lower: 4, upper: 6}, top: {lower: 8, upper: 10}},
                featherTimes: {lower: 8, upper: 12},
            }),
        }),
    });

    await myTestProject.addPrimaryEffect({
        layerConfig: new LayerConfig({
            effect: LayeredHexEffect,
            percentChance: 100,
            currentEffectConfig: new LayeredHexConfig({
                invertLayers: false,

                thickness: 1,
                stroke: 1,

                layerOpacityRange: {bottom: {lower: 0.6, upper: 0.6}, top: {lower: 0.7, upper: 0.7}},
                layerOpacityTimes: {lower: 8, upper: 12},

                indexOpacityRange: {bottom: {lower: 0.4, upper: 0.5}, top: {lower: 0.6, upper: 0.7}},
                indexOpacityTimes: {lower: 8, upper: 12},

                radius: {lower: 20, upper: 40},
                offsetRadius: {lower: 50, upper: 50},

                numberOfIndex: {lower: 10, upper: 10},
                startIndex: {lower: 2, upper: 2},

                startAngle: 15,

                movementGaston: {lower: 8, upper: 12},

                initialNumberOfPoints: 12,
                scaleByFactor: 1.1,

                accentRange: {bottom: {lower: 1, upper: 1}, top: {lower: 3, upper: 6}},
                blurRange: {bottom: {lower: 1, upper: 1}, top: {lower: 1, upper: 1}},
                featherTimes: {lower: 2, upper: 4},
            }),
        }),
    });

    await myTestProject.addPrimaryEffect({
        layerConfig: new LayerConfig({
            effect: FuzzyBandEffect,
            percentChance: 100,
            currentEffectConfig: new FuzzyBandConfig({
                color: new ColorPicker(ColorPicker.SelectionType.color, '#00FF00'),
                innerColor: new ColorPicker(ColorPicker.SelectionType.color, '#000000'),
                invertLayers: false,
                layerOpacity: 1,
                underLayerOpacityRange: { bottom: { lower: 0.4, upper: 0.5 }, top: { lower: 0.5, upper: 0.6 } },
                underLayerOpacityTimes: { lower: 8, upper: 12 },
                circles: { lower: 1, upper: 1 },
                stroke: 22,  //which one is wrong?
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
                color: new ColorPicker(ColorPicker.SelectionType.color, '#00FF00'),
                innerColor: new ColorPicker(ColorPicker.SelectionType.color, '#000000'),
                invertLayers: false,
                layerOpacity: 1,
                underLayerOpacity: 0.5,
                stroke: 22,
                thickness: 12, //inverted with fuzzy bands? need standard verbiage
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
