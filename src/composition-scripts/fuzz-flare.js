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
import {GlowConfig} from "../../../my-nft-gen/src/effects/secondaryEffects/glow/GlowConfig.js";
import {GlowEffect} from "../../../my-nft-gen/src/effects/secondaryEffects/glow/GlowEffect.js";
import {getRandomFromArray, getRandomIntInclusive} from "../../../my-nft-gen/src/core/math/random.js";
import {RedEyeEffect} from "../../../my-nft-gen/src/effects/primaryEffects/red-eye/RedEyeEffect.js";
import {RedEyeConfig} from "../../../my-nft-gen/src/effects/primaryEffects/red-eye/RedEyeConfig.js";
import {Point2D} from "../../../my-nft-gen/src/core/layer/configType/Point2D.js";
import {neonSlice} from "../assets/color-scheme-store.js";


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

    ;

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
                        max: new Range(10, 20),
                        times: new Range(1, 4),
                    }),
                    new MultiStepDefinitionConfig({
                        minPercentage: 20,
                        maxPercentage: 40,
                        max: new Range(10, 20),
                        times: new Range(1, 4),
                    }),
                    new MultiStepDefinitionConfig({
                        minPercentage: 40,
                        maxPercentage: 60,
                        max: new Range(10, 20),
                        times: new Range(1, 4),
                    }),
                    new MultiStepDefinitionConfig({
                        minPercentage: 60,
                        maxPercentage: 80,
                        max: new Range(10, 20),
                        times: new Range(1, 4),
                    }),
                    new MultiStepDefinitionConfig({
                        minPercentage: 80,
                        maxPercentage: 100,
                        max: new Range(10, 20),
                        times: new Range(1, 4),
                    }),
                ],

                numberOfFlareRings: new Range(20, 20),
                flareRingsSizeRange: new PercentageRange(new PercentageShortestSide(0.01), new PercentageLongestSide(0.8)),
                flareRingStroke: new Range(1, 1),
                flareRingThickness: new Range(3, 3),

                numberOfFlareRays: new Range(50, 50),
                flareRaysSizeRange: new PercentageRange(new PercentageLongestSide(0.5), new PercentageLongestSide(1)),
                flareRaysStroke: new Range(1, 1),
                flareRayThickness: new Range(3, 3),
                flareOffset: new PercentageRange(new PercentageShortestSide(0.01), new PercentageShortestSide(0.05)),

                accentRange: {bottom: {lower: 10, upper: 15}, top: {lower: 15, upper: 30}},
                blurRange: {bottom: {lower: 4, upper: 5}, top: {lower: 8, upper: 10}},
                featherTimes: {lower: 4, upper: 8},
            }),
            possibleSecondaryEffects: [
                new LayerConfig({
                    effect: GlowEffect,
                    percentChance: 100,
                    currentEffectConfig: new GlowConfig({
                        lowerRange: {lower: -32, upper: -8},
                        upperRange: {lower: 8, upper: 32},
                        times: {lower: 8, upper: 8}
                    }),
                }),
            ]
        }),
    });

    let redEyeCount = getRandomFromArray([3]);

    for (let i = 0; i < redEyeCount; i++) {
        await myTestProject.addPrimaryEffect({
            layerConfig: new LayerConfig({
                effect: RedEyeEffect,
                percentChance: 100,
                currentEffectConfig: new RedEyeConfig({
                    invertLayers: true,
                    layerOpacity: 0.7,
                    underLayerOpacity: 0.6,
                    center: new Point2D(1080 / 2, 1920 / 2),
                    innerColor: new ColorPicker(ColorPicker.SelectionType.neutralBucket),
                    outerColor: new ColorPicker(ColorPicker.SelectionType.colorBucket),
                    stroke: 1,
                    thickness: 1,
                    sparsityFactor: [9, 10, 12],
                    innerRadius: getRandomIntInclusive(myTestProject.shortestSideInPixels * 0.1, myTestProject.shortestSideInPixels * 0.20),
                    outerRadius: getRandomIntInclusive(myTestProject.shortestSideInPixels * 0.30, myTestProject.shortestSideInPixels * 0.40),
                    possibleJumpRangeInPixels: {lower: 10, upper: 20},
                    lineLength: {lower: 75, upper: 150},
                    numberOfLoops: {lower: 1, upper: 3},
                    accentRange: {bottom: {lower: 1, upper: 1}, top: {lower: 4, upper: 4}},
                    blurRange: {bottom: {lower: 1, upper: 1}, top: {lower: 3, upper: 3}},
                    featherTimes: {lower: 3, upper: 3},
                }),
            }),
        });
    }

    redEyeCount = getRandomFromArray([4]);

    for (let i = 0; i < redEyeCount; i++) {
        await myTestProject.addPrimaryEffect({
            layerConfig: new LayerConfig({
                effect: RedEyeEffect,
                percentChance: 100,
                currentEffectConfig: new RedEyeConfig({
                    invertLayers: true,
                    layerOpacity: 0.7,
                    underLayerOpacity: 0.6,
                    center: new Point2D(1080 / 2, 1920 / 2),
                    innerColor: new ColorPicker(ColorPicker.SelectionType.neutralBucket),
                    outerColor: new ColorPicker(ColorPicker.SelectionType.colorBucket),
                    stroke: 1,
                    thickness: 1,
                    sparsityFactor: [10, 12, 15],
                    innerRadius: getRandomIntInclusive(myTestProject.shortestSideInPixels * 0.2, myTestProject.shortestSideInPixels * 0.30),
                    outerRadius: getRandomIntInclusive(myTestProject.shortestSideInPixels * 0.50, myTestProject.shortestSideInPixels * 0.80),
                    possibleJumpRangeInPixels: {lower: 10, upper: 20},
                    lineLength: {lower: 75, upper: 150},
                    numberOfLoops: {lower: 1, upper: 3},
                    accentRange: {bottom: {lower: 1, upper: 1}, top: {lower: 4, upper: 4}},
                    blurRange: {bottom: {lower: 1, upper: 1}, top: {lower: 3, upper: 3}},
                    featherTimes: {lower: 3, upper: 3},
                }),
            }),
        });
    }

    redEyeCount = getRandomFromArray([4]);

    for (let i = 0; i < redEyeCount; i++) {
        await myTestProject.addPrimaryEffect({
            layerConfig: new LayerConfig({
                effect: RedEyeEffect,
                percentChance: 100,
                currentEffectConfig: new RedEyeConfig({
                    invertLayers: true,
                    layerOpacity: 0.7,
                    underLayerOpacity: 0.6,
                    center: new Point2D(1080 / 2, 1920 / 2),
                    innerColor: new ColorPicker(ColorPicker.SelectionType.neutralBucket),
                    outerColor: new ColorPicker(ColorPicker.SelectionType.colorBucket),
                    stroke: 1,
                    thickness: 1,
                    sparsityFactor: [6, 8, 9],
                    innerRadius: getRandomIntInclusive(myTestProject.shortestSideInPixels * 0.30, myTestProject.shortestSideInPixels * 0.40),
                    outerRadius: getRandomIntInclusive(myTestProject.shortestSideInPixels * 0.80, myTestProject.shortestSideInPixels * 0.70),
                    possibleJumpRangeInPixels: {lower: 10, upper: 20},
                    lineLength: {lower: 100, upper: 175},
                    numberOfLoops: {lower: 1, upper: 3},
                    accentRange: {bottom: {lower: 1, upper: 1}, top: {lower: 4, upper: 4}},
                    blurRange: {bottom: {lower: 1, upper: 1}, top: {lower: 3, upper: 3}},
                    featherTimes: {lower: 3, upper: 3},
                }),
            }),
        });
    }

    redEyeCount = getRandomFromArray([4]);

    for (let i = 0; i < redEyeCount; i++) {
        await myTestProject.addPrimaryEffect({
            layerConfig: new LayerConfig({
                effect: RedEyeEffect,
                percentChance: 100,
                currentEffectConfig: new RedEyeConfig({
                    invertLayers: true,
                    layerOpacity: 0.7,
                    underLayerOpacity: 0.6,
                    center: new Point2D(1080 / 2, 1920 / 2),
                    innerColor: new ColorPicker(ColorPicker.SelectionType.neutralBucket),
                    outerColor: new ColorPicker(ColorPicker.SelectionType.colorBucket),
                    stroke: 1,
                    thickness: 1,
                    sparsityFactor: [4, 5, 6],
                    innerRadius: getRandomIntInclusive(myTestProject.shortestSideInPixels * 0.40, myTestProject.shortestSideInPixels * 0.40),
                    outerRadius: getRandomIntInclusive(myTestProject.shortestSideInPixels * 0.80, myTestProject.shortestSideInPixels * 0.70),
                    possibleJumpRangeInPixels: {lower: 10, upper: 20},
                    lineLength: {lower: 125, upper: 175},
                    numberOfLoops: {lower: 1, upper: 3},
                    accentRange: {bottom: {lower: 1, upper: 1}, top: {lower: 4, upper: 4}},
                    blurRange: {bottom: {lower: 1, upper: 1}, top: {lower: 3, upper: 3}},
                    featherTimes: {lower: 3, upper: 3},
                }),
            }),
        });
    }


    promiseArray.push(myTestProject.generateRandomLoop());
};

await createComposition(neonSlice);

await Promise.all(promiseArray);
