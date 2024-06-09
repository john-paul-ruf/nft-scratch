import {Project} from "my-nft-gen/src/app/Project.js";
import {LayerConfig} from "my-nft-gen/src/core/layer/LayerConfig.js";
import {Point2D} from "my-nft-gen/src/core/layer/configType/Point2D.js";
import {ColorPicker} from "my-nft-gen/src/core/layer/configType/ColorPicker.js";
import {FuzzFlareEffect} from "my-nft-gen/src/effects/primaryEffects/fuzz-flare/FuzzFlareEffect.js";
import {FuzzFlareConfig} from "my-nft-gen/src/effects/primaryEffects/fuzz-flare/FuzzFlareConfig.js";
import {MultiStepDefinitionConfig} from "my-nft-gen/src/core/math/MultiStepDefinitionConfig.js";
import {PercentageRange} from "my-nft-gen/src/core/layer/configType/PercentageRange.js";
import {PercentageLongestSide} from "my-nft-gen/src/core/layer/configType/PercentageLongestSide.js";
import {PercentageShortestSide} from "my-nft-gen/src/core/layer/configType/PercentageShortestSide.js";
import {Range} from "my-nft-gen/src/core/layer/configType/Range.js";
import {NeonColorScheme, NeonColorSchemeFactory} from "my-nft-gen/src/core/color/NeonColorSchemeFactory.js";
import {
    EncircledSpiralEffect
} from "my-nft-gen/src/effects/primaryEffects/encircledSpiral/EncircledSpiralEffect.js";
import {
    EncircledSpiralConfig
} from "my-nft-gen/src/effects/primaryEffects/encircledSpiral/EncircledSpiralConfig.js";


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

    const min = 25;
    const max = 45;

    await myTestProject.addPrimaryEffect({
        layerConfig: new LayerConfig({
            effect: EncircledSpiralEffect,
            percentChance: 100,
            currentEffectConfig: new EncircledSpiralConfig({
                invertLayers: true,
                layerOpacity: 0.7,
                underLayerOpacity: 0.5,
                startAngle: {lower: 0, upper: 360}, //need to remove or make option to use
                numberOfRings: {lower: 3, upper: 3},
                stroke: 0,
                thickness: 1,
                sparsityFactor: [45],
                sequencePixelConstant: {
                    lower: (finalSize) => finalSize.shortestSide * 0.001,
                    upper: (finalSize) => finalSize.shortestSide * 0.001,
                },
                sequence: [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987, 1597, 2584, 4181],
                minSequenceIndex: [8],
                numberOfSequenceElements: [7],
                speed: {lower: 4, upper: 4},
                accentRange: {bottom: {lower: 10, upper: 15}, top: {lower: 20, upper: 25}},
                blurRange: {bottom: {lower: 4, upper: 6}, top: {lower: 8, upper: 10}},
                featherTimes: {lower: 8, upper: 12},
                center: new Point2D(1080 / 2, 1920 / 2),
                innerColor: new ColorPicker(ColorPicker.SelectionType.colorBucket),
                outerColor: new ColorPicker(ColorPicker.SelectionType.colorBucket),
            }),
        }),
    });

    await myTestProject.addPrimaryEffect({
        layerConfig: new LayerConfig({
            effect: FuzzFlareEffect,
            percentChance: 100,
            currentEffectConfig: new FuzzFlareConfig({
                invertLayers: true,

                outerColor: new ColorPicker(ColorPicker.SelectionType.colorBucket),
                innerColor: new ColorPicker(ColorPicker.SelectionType.colorBucket),

                layerOpacity: 0.6,

                underLayerOpacityRange: {bottom: {lower: 0.45, upper: 0.45}, top: {lower: 0.55, upper: 0.55}},
                underLayerOpacityTimes: {lower: 2, upper: 8},

                elementGastonMultiStep: [
                    new MultiStepDefinitionConfig({
                        minPercentage: 0,
                        maxPercentage: 10,
                        max: new Range(Math.ceil(min * 0.1), Math.ceil(max * 0.1)),
                        times: new Range(1, 2),
                    }),
                    new MultiStepDefinitionConfig({
                        minPercentage: 10,
                        maxPercentage: 20,
                        max: new Range(Math.ceil(min * 0.1), Math.ceil(max * 0.1)),
                        times: new Range(1, 3),
                    }),
                    new MultiStepDefinitionConfig({
                        minPercentage: 20,
                        maxPercentage: 80,
                        max: new Range(Math.ceil(min * 0.6), Math.ceil(max * 0.6)),
                        times: new Range(1, 8),
                    }),
                    new MultiStepDefinitionConfig({
                        minPercentage: 80,
                        maxPercentage: 90,
                        max: new Range(Math.ceil(min * 0.1), Math.ceil(max * 0.1)),
                        times: new Range(1, 3),
                    }),
                    new MultiStepDefinitionConfig({
                        minPercentage: 90,
                        maxPercentage: 100,
                        max: new Range(Math.ceil(min * 0.1), Math.ceil(max * 0.1)),
                        times: new Range(1, 3),
                    })
                ],

                numberOfFlareRings: new Range(30, 30),
                flareRingsSizeRange: new PercentageRange(new PercentageShortestSide(0.05), new PercentageLongestSide(0.8)),
                flareRingStroke: new Range(0, 0),
                flareRingThickness: new Range(1, 1),

                numberOfFlareRays: new Range(150, 150),
                flareRaysSizeRange: new PercentageRange(new PercentageLongestSide(0.7), new PercentageLongestSide(1)),
                flareRaysStroke: new Range(0, 0),
                flareRayThickness: new Range(1, 1),
                flareOffset: new PercentageRange(new PercentageShortestSide(0.05), new PercentageShortestSide(0.15)),

                accentRange: {bottom: {lower: 10, upper: 15}, top: {lower: 20, upper: 25}},
                blurRange: {bottom: {lower: 4, upper: 6}, top: {lower: 8, upper: 10}},
                featherTimes: {lower: 8, upper: 12},
            }),
        }),
    });


    promiseArray.push(myTestProject.generateRandomLoop());
};

await createComposition(NeonColorSchemeFactory.getColorScheme(NeonColorScheme.neons));

await Promise.all(promiseArray);
