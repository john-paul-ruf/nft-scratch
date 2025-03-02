import {LayerConfig} from "my-nft-gen/src/core/layer/LayerConfig.js";
import {Point2D} from "my-nft-gen/src/core/layer/configType/Point2D.js";
import {ColorPicker} from "my-nft-gen/src/core/layer/configType/ColorPicker.js";
import {FuzzFlareEffect} from "my-nft-gen/src/effects/primaryEffects/fuzz-flare/FuzzFlareEffect.js";
import {MultiStepDefinitionConfig} from "my-nft-gen/src/core/math/MultiStepDefinitionConfig.js";
import {Range} from "my-nft-gen/src/core/layer/configType/Range.js";
import {PercentageRange} from "my-nft-gen/src/core/layer/configType/PercentageRange.js";
import {PercentageShortestSide} from "my-nft-gen/src/core/layer/configType/PercentageShortestSide.js";
import {PercentageLongestSide} from "my-nft-gen/src/core/layer/configType/PercentageLongestSide.js";
import {FuzzFlareConfig} from "my-nft-gen/src/effects/primaryEffects/fuzz-flare/FuzzFlareConfig.js";
import {ColorScheme} from "my-nft-gen/src/core/color/ColorScheme.js";
import {Project} from "my-nft-gen/src/app/Project.js";
import {getRandomIntExclusive} from "my-nft-gen/src/core/math/random.js";
import {getMultiStep} from "../util/multistep.js";
import {createDegaussEffects} from "../util/glitch.js";
import {AmpEffect} from "my-nft-gen/src/effects/primaryEffects/amp/AmpEffect.js";
import {AmpConfig} from "my-nft-gen/src/effects/primaryEffects/amp/AmpConfig.js";


export const createOrbElement = async ({
                                           project = new Project(),
                                           colorScheme = new ColorScheme({}),
                                           center = {x: 0, y: 0},
                                       }) => {

    const stroke = 1;
    const thickness = 2;

    const lineStartInitial = 60;
    const gap = 8;
    const gapReduction = 1;
    const lineLength = 45;
    const lineReduction = 10;

    let invertDirection = false;

    function getLineLength(index) {
        return lineLength - (lineReduction * index);
    }

    function getLineStart(index) {
        let result = 0;

        result += lineStartInitial;

        for (let i = 0; i < index; i++) {
            result += getLineLength(i);
        }

        result += ((gap * index) - (gapReduction * index))

        return result;
    }

    //amp
    for (let i = 0; i < 5; i++) {
        invertDirection = !invertDirection;
        await project.addPrimaryEffect({
            layerConfig: new LayerConfig({
                effect: AmpEffect,
                percentChance: 100,
                currentEffectConfig: new AmpConfig({
                    invertLayers: false,
                    invertDirection: invertDirection,
                    layerOpacity: 0.7,
                    underLayerOpacity: 0.5,
                    sparsityFactor: [10],
                    stroke: stroke,
                    thickness: thickness,
                    accentRange: {bottom: {lower: 5, upper: 5}, top: {lower: 15, upper: 15}},
                    blurRange: {bottom: {lower: 2, upper: 2}, top: {lower: 6, upper: 6}},
                    featherTimes: {lower: 4, upper: 4},
                    speed: {lower: 10, upper: 10},
                    length: getLineLength(i),
                    lineStart: getLineStart(i),
                    center: center,
                    innerColor: new ColorPicker(ColorPicker.SelectionType.colorBucket),
                    outerColor: new ColorPicker(ColorPicker.SelectionType.color, colorScheme.getColorFromBucket()),
                }),
                possibleSecondaryEffects: []//createSecondaryEffects(),
            }),
        });
    }

    //rings
    for (let i = 0; i < 8; i++) {
        await project.addPrimaryEffect({
            layerConfig: new LayerConfig({
                effect: FuzzFlareEffect,
                percentChance: 100,
                currentEffectConfig: new FuzzFlareConfig({
                    center: center,
                    invertLayers: true,

                    outerColor: new ColorPicker(ColorPicker.SelectionType.color, colorScheme.getColorFromBucket()),
                    innerColor: new ColorPicker(ColorPicker.SelectionType.neutralBucket),

                    layerOpacity: 0.7,

                    underLayerOpacityRange: {bottom: {lower: 0.55, upper: 0.55}, top: {lower: 0.65, upper: 0.65}},
                    underLayerOpacityTimes: {lower: 2, upper: 12},

                    elementGastonMultiStep: getMultiStep(),

                    numberOfFlareRings: new Range(1, 1),
                    flareRingsSizeRange: new PercentageRange(new PercentageLongestSide(0.15), new PercentageLongestSide(0.19)),
                    flareRingStroke: new Range(stroke, stroke),
                    flareRingThickness: new Range(thickness, thickness),

                    numberOfFlareRays: new Range(0, 0),
                    flareRaysSizeRange: new PercentageRange(new PercentageLongestSide(0), new PercentageLongestSide(0)),
                    flareRaysStroke: new Range(stroke, stroke),
                    flareRayThickness: new Range(thickness, thickness),
                    flareOffset: new PercentageRange(new PercentageLongestSide(0), new PercentageLongestSide(0)),

                    accentRange: {bottom: {lower: 5, upper: 10}, top: {lower: 15, upper: 20}},
                    blurRange: {bottom: {lower: 2, upper: 4}, top: {lower: 4, upper: 6}},
                    featherTimes: {lower: 4, upper: 4},
                }),
                possibleSecondaryEffects: [],
            }),
        });
    }

    //rays
    for (let i = 0; i < 20; i++) {
        await project.addPrimaryEffect({
            layerConfig: new LayerConfig({
                effect: FuzzFlareEffect,
                percentChance: 100,
                currentEffectConfig: new FuzzFlareConfig({
                    center: center,
                    invertLayers: true,

                    outerColor: new ColorPicker(ColorPicker.SelectionType.color, colorScheme.getColorFromBucket()),
                    innerColor: new ColorPicker(ColorPicker.SelectionType.neutralBucket),

                    layerOpacity: 0.7,

                    underLayerOpacityRange: {bottom: {lower: 0.55, upper: 0.55}, top: {lower: 0.65, upper: 0.65}},
                    underLayerOpacityTimes: {lower: 2, upper: 12},

                    elementGastonMultiStep: getMultiStep(),

                    numberOfFlareRings: new Range(0, 0),
                    flareRingsSizeRange: new PercentageRange(new PercentageLongestSide(0), new PercentageLongestSide(0)),
                    flareRingStroke: new Range(stroke, stroke),
                    flareRingThickness: new Range(thickness, thickness),

                    numberOfFlareRays: new Range(2, 2),
                    flareRaysSizeRange: new PercentageRange(new PercentageLongestSide(0.15), new PercentageLongestSide(0.2)),
                    flareRaysStroke: new Range(stroke, stroke),
                    flareRayThickness: new Range(thickness, thickness),
                    flareOffset: new PercentageRange(new PercentageLongestSide(0.04), new PercentageLongestSide(0.06)),

                    accentRange: {bottom: {lower: 5, upper: 10}, top: {lower: 15, upper: 20}},
                    blurRange: {bottom: {lower: 2, upper: 4}, top: {lower: 4, upper: 6}},
                    featherTimes: {lower: 4, upper: 4},
                }),
                possibleSecondaryEffects: [...createDegaussEffects({arraySize: 50})],
            }),
        });
    }
}