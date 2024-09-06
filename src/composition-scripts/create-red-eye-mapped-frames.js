import {Project} from "../../../my-nft-gen/src/app/Project.js";
import {LayerConfig} from "../../../my-nft-gen/src/core/layer/LayerConfig.js";
import {Point2D} from "../../../my-nft-gen/src/core/layer/configType/Point2D.js";
import {ColorPicker} from "../../../my-nft-gen/src/core/layer/configType/ColorPicker.js";
import {NeonColorScheme, NeonColorSchemeFactory} from "../../../my-nft-gen/src/core/color/NeonColorSchemeFactory.js";
import {RedEyeEffect} from "../../../my-nft-gen/src/effects/primaryEffects/red-eye/RedEyeEffect.js";
import {RedEyeConfig} from "../../../my-nft-gen/src/effects/primaryEffects/red-eye/RedEyeConfig.js";


const promiseArray = [];

const createComposition = async (colorScheme) => {
    const myTestProject = new Project({
        artist: 'John Ruf',
        projectName: 'red-eye-mapped-frames',
        projectDirectory: 'src/red-eye-mapped-frames/',
        neutrals: ['#FFFFFF'],
        backgrounds: ['#00000000'],
        numberOfFrame: 100,
        colorScheme: colorScheme,
    });

    const min = 25;
    const max = 45;

    for (let i = 0; i < 8; i++) {
        await myTestProject.addPrimaryEffect({
            layerConfig: new LayerConfig({
                effect: RedEyeEffect,
                percentChance: 100,
                currentEffectConfig: new RedEyeConfig({
                    invertLayers: true,
                    layerOpacity: 0.7,
                    underLayerOpacity: 0.5,
                    center: new Point2D(1080 / 2, 1920 / 2),
                    innerColor: new ColorPicker(ColorPicker.SelectionType.colorBucket),
                    outerColor: new ColorPicker(ColorPicker.SelectionType.colorBucket),
                    stroke: 0,
                    thickness: 1,
                    sparsityFactor: [9, 10, 12],
                    innerRadius: 250,
                    outerRadius: 800,
                    possibleJumpRangeInPixels: {lower: 10, upper: 50},
                    lineLength: {lower: 125, upper: 125},
                    numberOfLoops: {lower: 1, upper: 2},
                    accentRange: {bottom: {lower: 2, upper: 3}, top: {lower: 6, upper: 10}},
                    blurRange: {bottom: {lower: 2, upper: 4}, top: {lower: 6, upper: 10}},
                    featherTimes: {lower: 1, upper: 3},
                }),
            }),
        });
    }

    promiseArray.push(myTestProject.generateRandomLoop(true));
};

await createComposition(NeonColorSchemeFactory.getColorScheme(NeonColorScheme.neons));

await Promise.all(promiseArray);
