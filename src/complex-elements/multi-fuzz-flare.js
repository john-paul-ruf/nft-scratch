import {ColorScheme} from "../../../my-nft-gen/src/core/color/ColorScheme.js";
import {LayerConfig} from "../../../my-nft-gen/src/core/layer/LayerConfig.js";
import {RedEyeEffect} from "../../../my-nft-gen/src/effects/primaryEffects/red-eye/RedEyeEffect.js";
import {RedEyeConfig} from "../../../my-nft-gen/src/effects/primaryEffects/red-eye/RedEyeConfig.js";
import {ColorPicker} from "../../../my-nft-gen/src/core/layer/configType/ColorPicker.js";
import {createFadeEffects} from "../util/glitch.js";
import {FuzzFlareEffect} from "my-nft-gen/src/effects/primaryEffects/fuzz-flare/FuzzFlareEffect.js";
import {Point2D} from "../../../my-nft-gen/src/core/layer/configType/Point2D.js";
import {MultiStepDefinitionConfig} from "../../../my-nft-gen/src/core/math/MultiStepDefinitionConfig.js";
import {Range} from "../../../my-nft-gen/src/core/layer/configType/Range.js";
import {PercentageRange} from "../../../my-nft-gen/src/core/layer/configType/PercentageRange.js";
import {PercentageShortestSide} from "../../../my-nft-gen/src/core/layer/configType/PercentageShortestSide.js";
import {PercentageLongestSide} from "../../../my-nft-gen/src/core/layer/configType/PercentageLongestSide.js";
import {generateSmoothRandomMultistep, getMultiStep} from "../util/multistep.js";
import {FuzzFlareConfig} from "my-nft-gen/src/effects/primaryEffects/fuzz-flare/FuzzFlareConfig.js";

export const createMultiFuzzFlare = async ({
                                               project = null,
                                               colorScheme = new ColorScheme({}),
                                               center = {x: 0, y: 0},
                                               invertLayers = false,
                                               layerOpacity = 0.7,
                                               underLayerOpacityRange = {
                                                   bottom: {lower: 0.35, upper: 0.4},
                                                   top: {lower: 0.5, upper: 0.55}
                                               },
                                               underLayerOpacityTimes = {lower: 2, upper: 8},
                                               numberOfFlares = 8,
                                               numberOfRings = new Range(25, 25),
                                               numberOfFlareRays = new Range(50, 50),
                                               flareRingsSizeRange = new PercentageRange(new PercentageShortestSide(0.05), new PercentageLongestSide(1)),
                                               flareRaysSizeRange = new PercentageRange(new PercentageLongestSide(0.7), new PercentageLongestSide(1)),
                                               flareOffset = new PercentageRange(new PercentageShortestSide(0.01), new PercentageShortestSide(0.06)),
                                               ringStroke = new Range(1, 1),
                                               ringThickness = new Range(4, 8),
                                               rayStroke = new Range(1, 1),
                                               rayThickness = new Range(4, 8),
                                               featureStructure = {
                                                   accentRange: {
                                                       bottom: {lower: 2, upper: 6},
                                                       top: {lower: 8, upper: 14}
                                                   },
                                                   blurRange: {
                                                       bottom: {lower: 4, upper: 6},
                                                       top: {lower: 8, upper: 12}
                                                   },
                                                   featherTimes: {lower: 2, upper: 8},
                                               },
                                               secondaryEffects = []
                                           }) => {


    //amp
    for (let i = 0; i < numberOfFlares; i++) {
        await project.addPrimaryEffect({
            layerConfig: new LayerConfig({
                effect: FuzzFlareEffect,
                percentChance: 100,
                currentEffectConfig: new FuzzFlareConfig({
                    invertLayers: invertLayers,
                    innerColor: new ColorPicker(ColorPicker.SelectionType.neutralBucket),
                    outerColor: new ColorPicker(ColorPicker.SelectionType.color, colorScheme.getColorFromBucket()),
                    layerOpacity: layerOpacity,
                    underLayerOpacityRange: underLayerOpacityRange,
                    underLayerOpacityTimes: underLayerOpacityTimes,
                    center: center,
                    elementGastonMultiStep: generateSmoothRandomMultistep({
                        numberOfSegments: 8,
                        max: new Range(2, 6),
                        times: new Range(1, 2),
                    }),
                    numberOfFlareRings: numberOfRings,
                    flareRingsSizeRange: flareRingsSizeRange,
                    flareRingStroke: ringStroke,
                    flareRingThickness: ringThickness,

                    numberOfFlareRays: numberOfFlareRays,
                    flareRaysSizeRange: flareRaysSizeRange,
                    flareRaysStroke: rayStroke,
                    flareRayThickness: rayThickness,
                    flareOffset: flareOffset,
                    ...featureStructure,
                }),
                possibleSecondaryEffects: [...secondaryEffects],
            }),
        });
    }
}



