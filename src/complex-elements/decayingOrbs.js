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
import {RedEyeEffect} from "my-nft-gen/src/effects/primaryEffects/red-eye/RedEyeEffect.js";
import {RedEyeConfig} from "my-nft-gen/src/effects/primaryEffects/red-eye/RedEyeConfig.js";

export const createDecayingOrbElement = async ({
                                                   project = new Project(),
                                                   colorScheme = new ColorScheme({}),
                                                   center = {x: 0, y: 0}
                                               }) => {

    const stroke = 2;
    const thickness = 1;

    for (let i = 0; i < 5; i++) {
        await project.addPrimaryEffect({
            layerConfig: new LayerConfig({
                effect: RedEyeEffect,
                percentChance: 100,
                currentEffectConfig: new RedEyeConfig({
                    invertLayers: true,
                    layerOpacity: 0.7,
                    underLayerOpacity: 0.5,
                    center: center,
                    innerColor: new ColorPicker(ColorPicker.SelectionType.neutralBucket),
                    outerColor: new ColorPicker(ColorPicker.SelectionType.color, colorScheme.getColorFromBucket()),
                    stroke: stroke,
                    thickness: thickness,
                    sparsityFactor: [12],
                    innerRadius: 40,
                    outerRadius: 160,
                    possibleJumpRangeInPixels: { lower: 5, upper: 15 },
                    lineLength: { lower: 20, upper: 30 },
                    numberOfLoops: { lower: 1, upper: 3 },
                    accentRange: {bottom: {lower: 5, upper: 5}, top: {lower: 15, upper: 15}},
                    blurRange: {bottom: {lower: 2, upper: 2}, top: {lower: 6, upper: 6}},
                    featherTimes: {lower: 4, upper: 4},
                }),
                possibleSecondaryEffects: []//createSecondaryEffects(),
            }),
        });
    }
}