import {Project} from "../../../my-nft-gen/src/app/Project.js";
import {LayerConfig} from "../../../my-nft-gen/src/core/layer/LayerConfig.js";
import {ColorPicker} from "../../../my-nft-gen/src/core/layer/configType/ColorPicker.js";
import {FuzzFlareEffect} from "../../../my-nft-gen/src/effects/primaryEffects/fuzz-flare/FuzzFlareEffect.js";
import {FuzzFlareConfig} from "../../../my-nft-gen/src/effects/primaryEffects/fuzz-flare/FuzzFlareConfig.js";
import {MultiStepDefinitionConfig} from "../../../my-nft-gen/src/core/math/MultiStepDefinitionConfig.js";
import {PercentageRange} from "../../../my-nft-gen/src/core/layer/configType/PercentageRange.js";
import {PercentageLongestSide} from "../../../my-nft-gen/src/core/layer/configType/PercentageLongestSide.js";
import {PercentageShortestSide} from "../../../my-nft-gen/src/core/layer/configType/PercentageShortestSide.js";
import {Range} from "../../../my-nft-gen/src/core/layer/configType/Range.js";
import {NeonColorScheme, NeonColorSchemeFactory} from "../../../my-nft-gen/src/core/color/NeonColorSchemeFactory.js";
import {MappedFramesEffect} from "../../../my-nft-gen/src/effects/primaryEffects/mappedFrames/MappedFramesEffect.js";
import {MappedFramesConfig} from "../../../my-nft-gen/src/effects/primaryEffects/mappedFrames/MappedFramesConfig.js";
import {GlowConfig} from "../../../my-nft-gen/src/effects/secondaryEffects/glow/GlowConfig.js";
import {GlowEffect} from "../../../my-nft-gen/src/effects/secondaryEffects/glow/GlowEffect.js";
import {PorousEffect} from "../../../my-nft-gen/src/effects/primaryEffects/porous/PorousEffect.js";
import {PorousConfig} from "../../../my-nft-gen/src/effects/primaryEffects/porous/PorousConfig.js";
import {FadeEffect} from "../../../my-nft-gen/src/effects/secondaryEffects/fade/FadeEffect.js";
import {FadeConfig} from "../../../my-nft-gen/src/effects/secondaryEffects/fade/FadeConfig.js";


const promiseArray = [];

const createComposition = async (colorScheme) => {
    const myTestProject = new Project({
        artist: 'John Ruf',
        projectName: 'fuzz-flare',
        projectDirectory: 'src/fuzz-flare/',
        neutrals: ['#FFFFFF'],
        backgrounds: ['#000000'],
        numberOfFrame: 1800,
        colorScheme: colorScheme,
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
                innerColor: new ColorPicker(ColorPicker.SelectionType.colorBucket),

                layerOpacity: 0.7,

                underLayerOpacityRange: {bottom: {lower: 0.55, upper: 0.55}, top: {lower: 0.65, upper: 0.65}},
                underLayerOpacityTimes: {lower: 2, upper: 12},

                elementGastonMultiStep: [
                    new MultiStepDefinitionConfig({
                        minPercentage: 0,
                        maxPercentage: 20,
                        max: new Range(Math.ceil(min * 0.2), Math.ceil(max * 0.2)),
                        times: new Range(1, 2),
                    }),
                    new MultiStepDefinitionConfig({
                        minPercentage: 20,
                        maxPercentage: 100,
                        max: new Range(Math.ceil(min * 0.8), Math.ceil(max * 0.8)),
                        times: new Range(1, 4),
                    }),
                ],

                numberOfFlareRings: new Range(20, 20),
                flareRingsSizeRange: new PercentageRange(new PercentageShortestSide(0.01), new PercentageLongestSide(0.8)),
                flareRingStroke: new Range(3, 3),
                flareRingThickness: new Range(1, 1),

                numberOfFlareRays: new Range(50, 50),
                flareRaysSizeRange: new PercentageRange(new PercentageLongestSide(0.5), new PercentageLongestSide(1)),
                flareRaysStroke: new Range(3, 3),
                flareRayThickness: new Range(1, 1),
                flareOffset: new PercentageRange(new PercentageShortestSide(0.01), new PercentageShortestSide(0.05)),

                accentRange: {bottom: {lower: 20, upper: 25}, top: {lower: 30, upper: 35}},
                blurRange: {bottom: {lower: 4, upper: 5}, top: {lower: 8, upper: 10}},
                featherTimes: {lower: 7, upper: 7},
            }),
            possibleSecondaryEffects: [
                new LayerConfig({
                    effect: GlowEffect,
                    percentChance: 100,
                    currentEffectConfig: new GlowConfig({
                        lowerRange: {lower: -16, upper: -8},
                        upperRange: {lower: 8, upper: 16},
                        times: {lower: 8, upper: 8}
                    }),
                }),
                new LayerConfig({
                    effect: FadeEffect,
                    percentChance: 100,
                    currentEffectConfig: new FadeConfig({
                        lowerRange: {lower: 0.7, upper: 0.8},
                        upperRange: {lower: 0.9, upper: 1},
                        times: {lower: 8, upper: 8},
                    }),
                }),
            ]
        }),
    });

    await myTestProject.addPrimaryEffect({
        layerConfig: new LayerConfig({
            effect: MappedFramesEffect,
            percentChance: 100,
            currentEffectConfig: new MappedFramesConfig({
                folderName: '/Users/the.dude/WebstormProjects/nft-scratch/src/assets/mappedFrames/red-eye-mapped-frames/',
                layerOpacity: [1],
                buffer: [600],
                loopTimesMultiStep: [
                    new MultiStepDefinitionConfig({
                        minPercentage: 0,
                        maxPercentage: 20,
                        max: new Range(0, 0),
                        times: new Range(1, 1),
                    }),
                    new MultiStepDefinitionConfig({
                        minPercentage: 20,
                        maxPercentage: 100,
                        max: new Range(0, 0),
                        times: new Range(2, 2),
                    }),
                ],
            }),
            possibleSecondaryEffects: [
                new LayerConfig({
                    effect: GlowEffect,
                    percentChance: 100,
                    currentEffectConfig: new GlowConfig({
                        lowerRange: {lower: -80, upper: -80},
                        upperRange: {lower: 0, upper: 0},
                        times: {lower: 2, upper: 2}
                    }),
                })
            ]
        }),
    });

    await myTestProject.addPrimaryEffect({
        layerConfig: new LayerConfig({
            effect: MappedFramesEffect,
            percentChance: 100,
            currentEffectConfig: new MappedFramesConfig({
                folderName: '/Users/the.dude/WebstormProjects/nft-scratch/src/assets/mappedFrames/red-eye-mapped-frames/',
                layerOpacity: [1],
                buffer: [300],
                loopTimesMultiStep: [
                    new MultiStepDefinitionConfig({
                        minPercentage: 0,
                        maxPercentage: 20,
                        max: new Range(0, 0),
                        times: new Range(1, 1),
                    }),
                    new MultiStepDefinitionConfig({
                        minPercentage: 20,
                        maxPercentage: 100,
                        max: new Range(0, 0),
                        times: new Range(2, 2),
                    }),
                ],
            }),
            possibleSecondaryEffects: [
                new LayerConfig({
                    effect: GlowEffect,
                    percentChance: 100,
                    currentEffectConfig: new GlowConfig({
                        lowerRange: {lower: -160, upper: -160},
                        upperRange: {lower: -80, upper: -80},
                        times: {lower: 2, upper: 2}
                    }),
                })
            ]
        }),
    });


    await myTestProject.addPrimaryEffect({
        layerConfig: new LayerConfig({
            effect: MappedFramesEffect,
            percentChance: 100,
            currentEffectConfig: new MappedFramesConfig({
                folderName: '/Users/the.dude/WebstormProjects/nft-scratch/src/assets/mappedFrames/red-eye-mapped-frames/',
                layerOpacity: [1],
                buffer: [0],
                loopTimesMultiStep: [
                    new MultiStepDefinitionConfig({
                        minPercentage: 0,
                        maxPercentage: 20,
                        max: new Range(0, 0),
                        times: new Range(1, 1),
                    }),
                    new MultiStepDefinitionConfig({
                        minPercentage: 20,
                        maxPercentage: 100,
                        max: new Range(0, 0),
                        times: new Range(2, 2),
                    }),
                ],
            }),
            possibleSecondaryEffects: [
                new LayerConfig({
                    effect: GlowEffect,
                    percentChance: 100,
                    currentEffectConfig: new GlowConfig({
                        lowerRange: {lower: -240, upper: -240},
                        upperRange: {lower: -160, upper: -160},
                        times: {lower: 2, upper: 2}
                    }),
                })
            ]
        }),
    });


    await myTestProject.addPrimaryEffect({
        layerConfig: new LayerConfig({
            effect: PorousEffect,
            percentChance: 100,
            currentEffectConfig: new PorousConfig({
                layerOpacity: 0.9,
            }),
            possibleSecondaryEffects: []
        }),
    });

    promiseArray.push(myTestProject.generateRandomLoop());
};

await createComposition(NeonColorSchemeFactory.getColorScheme(NeonColorScheme.clashNeons));

await Promise.all(promiseArray);
