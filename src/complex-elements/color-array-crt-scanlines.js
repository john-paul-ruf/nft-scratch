import {LayerConfig} from "my-nft-gen/src/core/layer/LayerConfig.js";
import {hexToRgbaObject} from "my-nft-gen/src/core/utils/hexToRgba.js"
import {mapNumberToRange} from "my-nft-gen/src/core/math/mapNumberToRange.js"
import {CRTScanLinesEffect} from "my-nft-gen/src/effects/finalImageEffects/crtScanLines/CRTScanLinesEffect.js";
import {CRTScanLinesConfig} from "my-nft-gen/src/effects/finalImageEffects/crtScanLines/CRTScanLinesConfig.js";

export const createColorArrayScanlines = async ({
                                                    project,
                                                    colorArray,
                                                    lines = {lower: 30, upper: 30},
                                                    loopTimes = {lower: 1, upper: 1},
                                                    brightnessRange = {
                                                        bottom: {lower: 10, upper: 20},
                                                        top: {lower: 30, upper: 40}
                                                    },
                                                    brightnessTimes = {lower: 1, upper: 15},
                                                    thicknessRange = {
                                                        bottom: {lower: 4, upper: 8},
                                                        top: {lower: 10, upper: 12}
                                                    },
                                                    thicknessTimes = {lower: 1, upper: 15},
                                                    lineBlurRange = {
                                                        bottom: {lower: 20, upper: 30},
                                                        top: {lower: 40, upper: 60}
                                                    },
                                                    lineBlurTimes = {lower: 1, upper: 15},

                                                    opacityRange = {
                                                        bottom: {lower: 0.3, upper: 0.4},
                                                        top: {lower: 0.5, upper: 0.6}
                                                    },
                                                    opacityTimes = {lower: 1, upper: 15},
                                                }) => {

    if (!project) {
        throw new Error('must include project');
    }

    const results = [];

    for (let i = 0; i < colorArray.length; i++) {

        const hexValue = hexToRgbaObject(colorArray[i]);
        const mapHexToRange = (number) => {
            return 1 + mapNumberToRange(number, 0, 255, 0, 1);
        }

        const red = mapHexToRange(hexValue.red);
        const green = mapHexToRange(hexValue.green);
        const blue = mapHexToRange(hexValue.blue);

        await project.addFinalEffect({
            layerConfig: new LayerConfig({
                effect: CRTScanLinesEffect, percentChance: 100, currentEffectConfig: new CRTScanLinesConfig(
                    {
                        lines: lines,
                        loopTimes: loopTimes,
                        brightnessRange: brightnessRange,
                        brightnessTimes: brightnessTimes,
                        thicknessRange: thicknessRange,
                        thicknessTimes: thicknessTimes,
                        lineBlurRange: lineBlurRange,
                        lineBlurTimes: lineBlurTimes,
                        colorTintRange: {
                            redRange: {
                                bottom: {lower: red, upper: red},
                                top: {lower: red, upper: red}
                            },
                            greenRange: {
                                bottom: {lower: green, upper: green},
                                top: {lower: green, upper: green}
                            },
                            blueRange: {
                                bottom: {lower: blue, upper: blue},
                                top: {lower: blue, upper: blue}
                            },
                        },
                        colorTintTimes: {lower: 1, upper: 1},
                        opacityRange: opacityRange,
                        opacityTimes: opacityTimes,
                    }
                ),
            }),
        });
    }

    return results;
}
