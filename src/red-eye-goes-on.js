import {Project} from "my-nft-gen/src/app/Project.js";
import {LayerConfig} from "my-nft-gen/src/core/layer/LayerConfig.js";
import {getRandomFromArray, getRandomIntInclusive} from "my-nft-gen/src/core/math/random.js";
import {ViewportEffect} from "my-nft-gen/src/effects/primaryEffects/viewport/ViewportEffect.js";
import {ColorPicker} from "my-nft-gen/src/core/layer/configType/ColorPicker.js";
import {LensFlareEffect} from "my-nft-gen/src/effects/primaryEffects/lensFlare/LensFlareEffect.js";
import {DynamicRange} from "my-nft-gen/src/core/layer/configType/DynamicRange.js";
import {Range} from "my-nft-gen/src/core/layer/configType/Range.js";
import {PercentageRange} from "my-nft-gen/src/core/layer/configType/PercentageRange.js";
import {PercentageShortestSide} from "my-nft-gen/src/core/layer/configType/PercentageShortestSide.js";
import {PercentageLongestSide} from "my-nft-gen/src/core/layer/configType/PercentageLongestSide.js";
import {MappedFramesEffect} from "my-nft-gen/src/effects/primaryEffects/mappedFrames/MappedFramesEffect.js";
import {MappedFramesConfig} from "my-nft-gen/src/effects/primaryEffects/mappedFrames/MappedFramesConfig.js";
import {RedEyeEffect} from "my-nft-gen/src/effects/primaryEffects/red-eye/RedEyeEffect.js";
import {RedEyeConfig} from "my-nft-gen/src/effects/primaryEffects/red-eye/RedEyeConfig.js";
import {Point2D} from "my-nft-gen/src/core/layer/configType/Point2D.js";
import {ViewportConfig} from "my-nft-gen/src/effects/primaryEffects/viewport/ViewportConfig.js";
import {LensFlareConfig} from "my-nft-gen/src/effects/primaryEffects/lensFlare/LensFlareConfig.js";
import {ColorScheme} from "my-nft-gen/src/core/color/ColorScheme.js";


const promiseArray = [];

const createRedEye = async (colorSheme) => {
    const myTestProject = new Project({
        artist: 'John Ruf',
        projectName: 'red-eye',
        projectDirectory: 'src/red-eye/',
        neutrals: ['#ffd439'],
        backgrounds: ['#000000'],
        numberOfFrame: 1800,
        colorScheme: colorSheme,
    });

    let redEyeCount = getRandomFromArray([3]);

    for (let i = 0; i < redEyeCount; i++) {
        await myTestProject.addPrimaryEffect({
            layerConfig: new LayerConfig({
                effect: RedEyeEffect,
                percentChance: 100,
                currentEffectConfig: new RedEyeConfig({
                    invertLayers: false,
                    layerOpacity: 0.8,
                    underLayerOpacity: 0.7,
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

    redEyeCount = getRandomFromArray([3]);

    for (let i = 0; i < redEyeCount; i++) {
        await myTestProject.addPrimaryEffect({
            layerConfig: new LayerConfig({
                effect: RedEyeEffect,
                percentChance: 100,
                currentEffectConfig: new RedEyeConfig({
                    invertLayers: false,
                    layerOpacity: 0.8,
                    underLayerOpacity: 0.7,
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

    redEyeCount = getRandomFromArray([3]);

    for (let i = 0; i < redEyeCount; i++) {
        await myTestProject.addPrimaryEffect({
            layerConfig: new LayerConfig({
                effect: RedEyeEffect,
                percentChance: 100,
                currentEffectConfig: new RedEyeConfig({
                    invertLayers: false,
                    layerOpacity: 0.8,
                    underLayerOpacity: 0.7,
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

    redEyeCount = getRandomFromArray([3]);

    for (let i = 0; i < redEyeCount; i++) {
        await myTestProject.addPrimaryEffect({
            layerConfig: new LayerConfig({
                effect: RedEyeEffect,
                percentChance: 100,
                currentEffectConfig: new RedEyeConfig({
                    invertLayers: false,
                    layerOpacity: 0.8,
                    underLayerOpacity: 0.7,
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

    await myTestProject.addPrimaryEffect({
        layerConfig: new LayerConfig({
            effect: ViewportEffect,
            percentChance: 100,
            currentEffectConfig: new ViewportConfig({
                color: new ColorPicker(ColorPicker.SelectionType.colorBucket),
                innerColor: new ColorPicker(ColorPicker.SelectionType.neutralBucket),
                invertLayers: false,
                layerOpacity: 0.8,
                underLayerOpacity: 0.7,
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
                folderName: '/mappedFrames/',
                layerOpacity: [1],
                buffer: [555],
                loopTimes: 30,
            }),
        }),
    });

    await myTestProject.addPrimaryEffect({
        layerConfig: new LayerConfig({
            effect: LensFlareEffect,
            percentChance: 100,
            currentEffectConfig: new LensFlareConfig({
                layerOpacityRange: new DynamicRange(new Range(0.8, 0.8), new Range(0.7, 0.7)),
                layerOpacityTimes: new Range(3, 3),

                elementOpacityRange: new DynamicRange(new Range(0.4, 0.5), new Range(0.8, 0.7)),
                elementOpacityTimes: new Range(3, 3),

                elementGastonRange: new DynamicRange(new Range(5, 10), new Range(15, 30)),
                elementGastonTimes: new Range(2, 6),

                numberOfFlareHex: new Range(0, 0),
                flareHexSizeRange: new PercentageRange(new PercentageShortestSide(0.01), new PercentageShortestSide(0.02)),
                flareHexOffsetRange: new PercentageRange(new PercentageShortestSide(0.0), new PercentageShortestSide(0.1)),

                angleRangeFlareHex: new DynamicRange(new Range(0, 15), new Range(15, 30)),
                angleGastonTimes: new Range(3, 3),

                numberOfFlareRings: new Range(100, 100),
                flareRingsSizeRange: new PercentageRange(new PercentageShortestSide(0.20), new PercentageLongestSide(1.1)),
                flareRingStroke: new Range(2, 2),

                numberOfFlareRays: new Range(250, 250),
                flareRaysSizeRange: new PercentageRange(new PercentageLongestSide(0.8), new PercentageLongestSide(15)),
                flareRaysStroke: new Range(2, 2),

                blurRange: new DynamicRange(new Range(0, 0), new Range(0, 0)),
                blurTimes: new Range(0, 0),

                strategy: ['color-bucket'],
            }),
        }),
    });

    promiseArray.push(myTestProject.generateRandomLoop());
};


const colors = new ColorScheme({
    colorBucket: [
        '#fa448c',
        '#faa405',
        '#f72215',
        '#a0c409',
        '#1cb0d4'
    ],
    colorSchemeInfo: "**Color Strategy**: bright & feisty\n"
});

await createRedEye(colors);

await Promise.all(promiseArray);
