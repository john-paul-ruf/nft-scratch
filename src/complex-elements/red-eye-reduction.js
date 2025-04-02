import {ColorScheme} from "../../../my-nft-gen/src/core/color/ColorScheme.js";
import {LayerConfig} from "../../../my-nft-gen/src/core/layer/LayerConfig.js";
import {RedEyeEffect} from "../../../my-nft-gen/src/effects/primaryEffects/red-eye/RedEyeEffect.js";
import {RedEyeConfig} from "../../../my-nft-gen/src/effects/primaryEffects/red-eye/RedEyeConfig.js";
import {ColorPicker} from "../../../my-nft-gen/src/core/layer/configType/ColorPicker.js";

export const createRedEyeReduction = async ({
                                                project = null,
                                                colorScheme = new ColorScheme({}),
                                                center = {x: 0, y: 0},
                                                numberOfRedEyes = 8,
                                                lineStartInitial = 15,
                                                gap = 12,
                                                gapReduction = 1,
                                                lineLength = 10,
                                                lineReduction = 1,
                                                sparsityFactor = 10,
                                                outerRadius = 160,
                                            }) => {
    const stroke = 1;
    const thickness = 2;

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
    for (let i = 0; i < numberOfRedEyes; i++) {

        const lineStart = getLineStart(i);

        if(lineStart >= outerRadius) {
            throw new Error('lineStart must less than outer radius');
        }

        await project.addPrimaryEffect({
            layerConfig: new LayerConfig({
                effect: RedEyeEffect,
                percentChance: 100,
                currentEffectConfig: new RedEyeConfig({
                    innerRadius: lineStart,
                    outerRadius: outerRadius,
                    possibleJumpRangeInPixels: {lower: 5, upper: 20},
                    lineLength: {lower: 20, upper: 40},
                    numberOfLoops: {lower: i + 1, upper: i + 1},
                    invertLayers: true,
                    layerOpacity: 0.7,
                    underLayerOpacity: 0.5,
                    sparsityFactor: [sparsityFactor],
                    stroke: stroke,
                    thickness: thickness,
                    accentRange: {bottom: {lower: 5, upper: 5}, top: {lower: 15, upper: 15}},
                    blurRange: {bottom: {lower: 2, upper: 2}, top: {lower: 6, upper: 6}},
                    featherTimes: {lower: 4, upper: 4},
                    center: center,
                    innerColor: new ColorPicker(ColorPicker.SelectionType.neutralBucket),
                    outerColor: new ColorPicker(ColorPicker.SelectionType.color, colorScheme.getColorFromBucket()),
                }),
                possibleSecondaryEffects: [],
            }),
        });
    }
}