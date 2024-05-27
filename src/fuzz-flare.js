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

    await myTestProject.addPrimaryEffect({
        layerConfig: new LayerConfig({
            effect: RedEyeEffect,
            percentChance: 100,
            currentEffectConfig: new RedEyeConfig({
                invertLayers: false,
                layerOpacity: 0.7,
                underLayerOpacity: 0.5,
                center: new Point2D(1080 / 2, 1920 / 2),
                innerColor: new ColorPicker(ColorPicker.SelectionType.colorBucket),
                outerColor: new ColorPicker(ColorPicker.SelectionType.colorBucket),
                stroke: 1,
                thickness: 1,
                sparsityFactor: [8],
                innerRadius: getRandomIntInclusive(myTestProject.shortestSideInPixels * 0.1, myTestProject.shortestSideInPixels * 0.15),
                outerRadius: getRandomIntInclusive(myTestProject.shortestSideInPixels * 0.70, myTestProject.shortestSideInPixels * 0.8),
                possibleJumpRangeInPixels: {lower: 10, upper: 30},
                lineLength: {lower: 200, upper: 300},
                numberOfLoops: {lower: 1, upper: 1},
                accentRange: {bottom: {lower: 1, upper: 1}, top: {lower: 4, upper: 4}},
                blurRange: {bottom: {lower: 1, upper: 1}, top: {lower: 3, upper: 3}},
                featherTimes: {lower: 2, upper: 8},
            }),
        }),
    });

    await myTestProject.addPrimaryEffect({
        layerConfig: new LayerConfig({
            effect: RedEyeEffect,
            percentChance: 100,
            currentEffectConfig: new RedEyeConfig({
                invertLayers: false,
                layerOpacity: 0.7,
                underLayerOpacity: 0.5,
                center: new Point2D(1080 / 2, 1920 / 2),
                innerColor: new ColorPicker(ColorPicker.SelectionType.colorBucket),
                outerColor: new ColorPicker(ColorPicker.SelectionType.colorBucket),
                stroke: 1,
                thickness: 1,
                sparsityFactor: [8],
                innerRadius: getRandomIntInclusive(myTestProject.shortestSideInPixels * 0.1, myTestProject.shortestSideInPixels * 0.15),
                outerRadius: getRandomIntInclusive(myTestProject.shortestSideInPixels * 0.70, myTestProject.shortestSideInPixels * 0.8),
                possibleJumpRangeInPixels: {lower: 10, upper: 30},
                lineLength: {lower: 200, upper: 300},
                numberOfLoops: {lower: 2, upper: 2},
                accentRange: {bottom: {lower: 1, upper: 1}, top: {lower: 4, upper: 4}},
                blurRange: {bottom: {lower: 1, upper: 1}, top: {lower: 3, upper: 3}},
                featherTimes: {lower: 2, upper: 8},
            }),
        }),
    });

    await myTestProject.addPrimaryEffect({
        layerConfig: new LayerConfig({
            effect: RedEyeEffect,
            percentChance: 100,
            currentEffectConfig: new RedEyeConfig({
                invertLayers: false,
                layerOpacity: 0.7,
                underLayerOpacity: 0.5,
                center: new Point2D(1080 / 2, 1920 / 2),
                innerColor: new ColorPicker(ColorPicker.SelectionType.colorBucket),
                outerColor: new ColorPicker(ColorPicker.SelectionType.colorBucket),
                stroke: 1,
                thickness: 1,
                sparsityFactor: [8],
                innerRadius: getRandomIntInclusive(myTestProject.shortestSideInPixels * 0.1, myTestProject.shortestSideInPixels * 0.15),
                outerRadius: getRandomIntInclusive(myTestProject.shortestSideInPixels * 0.70, myTestProject.shortestSideInPixels * 0.8),
                possibleJumpRangeInPixels: {lower: 10, upper: 30},
                lineLength: {lower: 200, upper: 300},
                numberOfLoops: {lower: 3, upper: 3},
                accentRange: {bottom: {lower: 4, upper: 8}, top: {lower: 12, upper: 16}},
                blurRange: {bottom: {lower:2, upper: 3}, top: {lower: 5, upper: 6}},
                featherTimes: {lower: 2, upper: 8},
            }),
        }),
    });

    await myTestProject.addPrimaryEffect({
        layerConfig: new LayerConfig({
            effect: RedEyeEffect,
            percentChance: 100,
            currentEffectConfig: new RedEyeConfig({
                invertLayers: false,
                layerOpacity: 0.7,
                underLayerOpacity: 0.5,
                center: new Point2D(1080 / 2, 1920 / 2),
                innerColor: new ColorPicker(ColorPicker.SelectionType.colorBucket),
                outerColor: new ColorPicker(ColorPicker.SelectionType.colorBucket),
                stroke: 1,
                thickness: 1,
                sparsityFactor: [8],
                innerRadius: getRandomIntInclusive(myTestProject.shortestSideInPixels * 0.1, myTestProject.shortestSideInPixels * 0.15),
                outerRadius: getRandomIntInclusive(myTestProject.shortestSideInPixels * 0.70, myTestProject.shortestSideInPixels * 0.8),
                possibleJumpRangeInPixels: {lower: 10, upper: 30},
                lineLength: {lower: 200, upper: 300},
                numberOfLoops: {lower: 4, upper: 4},
                accentRange: {bottom: {lower: 1, upper: 1}, top: {lower: 4, upper: 4}},
                blurRange: {bottom: {lower: 1, upper: 1}, top: {lower: 3, upper: 3}},
                featherTimes: {lower: 2, upper: 8},
            }),
        }),
    });

    await myTestProject.addPrimaryEffect({
        layerConfig: new LayerConfig({
            effect: ViewportEffect,
            percentChance: 100,
            currentEffectConfig: new ViewportConfig({
                color: new ColorPicker(ColorPicker.SelectionType.colorBucket),
                innerColor: new ColorPicker(ColorPicker.SelectionType.colorBucket),
                invertLayers: false,
                layerOpacity: 0.7,
                underLayerOpacity: 0.6,
                stroke: 4,
                thickness: 10,
                ampStroke: 0,
                ampThickness: 1,
                radius: [300],
                startAngle: [270],
                amplitude: {lower: 75, upper: 75},
                times: {lower: 3, upper: 3},
                accentRange: {bottom: {lower: 10, upper: 10}, top: {lower: 40, upper: 40}},
                blurRange: {bottom: {lower: 3, upper: 3}, top: {lower: 8, upper: 8}},
                featherTimes: {lower: 3, upper: 3},
            }),
        }),
    });

    await myTestProject.addPrimaryEffect({
        layerConfig: new LayerConfig({
            effect: MappedFramesEffect,
            percentChance: 100,
            currentEffectConfig: new MappedFramesConfig({
                folderName: 'C:\\Users\\neomo\\WebstormProjects\\nft-scratch\\src\\assets\\mappedFrames\\og-eye-flux\\',
                layerOpacity: [1],
                buffer: [555],
                loopTimes: 30,
            }),
            possibleSecondaryEffects: [
                new LayerConfig({
                    effect: GlowEffect,
                    percentChance: 100,
                    currentEffectConfig: new GlowConfig({
                        lowerRange: {lower: -220, upper: -220},
                        upperRange: {lower: -240, upper: -240},
                        times: {lower: 3, upper: 3}
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
                invertLayers: false,

                outerColor: new ColorPicker(ColorPicker.SelectionType.colorBucket),
                innerColor: new ColorPicker(ColorPicker.SelectionType.colorBucket),

                layerOpacity: 0.7,

                underLayerOpacityRange: {bottom: {lower: 0.35, upper: 0.4}, top: {lower: 0.5, upper: 0.55}},
                underLayerOpacityTimes: {lower: 2, upper: 8},

                elementGastonMultiStep: [
                    new MultiStepDefinitionConfig({
                        percentage: 25,
                        min: new Range(5, 10),
                        max: new Range(15, 25),
                        times: new Range(1, 2),
                        invert: false
                    }),
                    new MultiStepDefinitionConfig({
                        percentage: 50,
                        min: new Range(2, 4),
                        max: new Range(6, 8),
                        times: new Range(1, 4),
                        invert: false
                    }),
                    new MultiStepDefinitionConfig({
                        percentage: 25,
                        min: new Range(2, 10),
                        max: new Range(15, 20),
                        times: new Range(1, 3),
                        invert: false
                    })
                ],

                numberOfFlareRings: new Range(25, 25),
                flareRingsSizeRange: new PercentageRange(new PercentageShortestSide(0.05), new PercentageLongestSide(1)),
                flareRingStroke: new Range(1, 1),
                flareRingThickness: new Range(1, 3),

                numberOfFlareRays: new Range(50, 50),
                flareRaysSizeRange: new PercentageRange(new PercentageLongestSide(0.7), new PercentageLongestSide(1)),
                flareRaysStroke: new Range(1, 1),
                flareRayThickness: new Range(1, 3),
                flareOffset: new PercentageRange(new PercentageShortestSide(0.01), new PercentageShortestSide(0.06)),

                accentRange: {bottom: {lower: 2, upper: 6}, top: {lower: 8, upper: 14}},
                blurRange: {bottom: {lower: 4, upper: 6}, top: {lower: 8, upper: 12}},
                featherTimes: {lower: 2, upper: 8},
            }),
        }),
    });

    promiseArray.push(myTestProject.generateRandomLoop());
};

const colors = new ColorScheme({
    colorBucket: [
        '#ffd439',
        '#fa448c',
        '#faa405',
        '#f72215',
        '#a0c409',
        '#1cb0d4'
    ],
    colorSchemeInfo: "**Color Strategy**: bright & feisty\n"
});

await createComposition(colors);

await Promise.all(promiseArray);
