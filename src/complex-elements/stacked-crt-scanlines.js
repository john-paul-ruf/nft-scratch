import {LayerConfig} from "my-nft-gen/src/core/layer/LayerConfig.js";
import {CRTDegaussEffect} from "my-nft-gen/src/effects/keyFrameEffects/crtDegaussEvent/CRTDegaussEffect.js";
import {getRandomIntInclusive} from "my-nft-gen/src/core/math/random.js";
import {CRTDegaussConfig} from "my-nft-gen/src/effects/keyFrameEffects/crtDegaussEvent/CRTDegaussConfig.js";
import {CRTScanLinesEffect} from "my-nft-gen/src/effects/finalImageEffects/crtScanLines/CRTScanLinesEffect.js";
import {CRTScanLinesConfig} from "my-nft-gen/src/effects/finalImageEffects/crtScanLines/CRTScanLinesConfig.js";

export const createStackedScanlines = async (project,
                                             configs = [
                                                 {
                                                     lines: {lower: 30, upper: 30},
                                                     loopTimes: {lower: 1, upper: 2},
                                                     brightnessRange: {
                                                         bottom: {lower: 10, upper: 20},
                                                         top: {lower: 30, upper: 40}
                                                     },
                                                     brightnessTimes: {lower: 1, upper: 15},
                                                     thicknessRange: {
                                                         bottom: {lower: 4, upper: 8},
                                                         top: {lower: 10, upper: 12}
                                                     },
                                                     thicknessTimes: {lower: 1, upper: 15},
                                                     lineBlurRange: {
                                                         bottom: {lower: 20, upper: 30},
                                                         top: {lower: 40, upper: 60}
                                                     },
                                                     lineBlurTimes: {lower: 1, upper: 15},
                                                     colorTintRange: {
                                                         redRange: {
                                                             bottom: {lower: 1.3, upper: 1.6},
                                                             top: {lower: 1.5, upper: 2}
                                                         },
                                                         greenRange: {
                                                             bottom: {lower: 0, upper: 0},
                                                             top: {lower: 0, upper: 0}
                                                         },
                                                         blueRange: {
                                                             bottom: {lower: 0, upper: 0},
                                                             top: {lower: 0, upper: 0}
                                                         },
                                                     },
                                                     colorTintTimes: {lower: 1, upper: 15},
                                                     opacityRange: {
                                                         bottom: {lower: 0.3, upper: 0.4},
                                                         top: {lower: 0.5, upper: 0.6}
                                                     },
                                                     opacityTimes: {lower: 1, upper: 15},
                                                 },
                                                 {
                                                     lines: {lower: 30, upper: 30},
                                                     loopTimes: {lower: 1, upper: 2},
                                                     brightnessRange: {
                                                         bottom: {lower: 10, upper: 20},
                                                         top: {lower: 30, upper: 40}
                                                     },
                                                     brightnessTimes: {lower: 1, upper: 15},
                                                     thicknessRange: {
                                                         bottom: {lower: 4, upper: 8},
                                                         top: {lower: 10, upper: 12}
                                                     },
                                                     thicknessTimes: {lower: 1, upper: 15},
                                                     lineBlurRange: {
                                                         bottom: {lower: 20, upper: 30},
                                                         top: {lower: 40, upper: 60}
                                                     },
                                                     lineBlurTimes: {lower: 1, upper: 15},
                                                     colorTintRange: {
                                                         redRange: {
                                                             bottom: {lower: 0, upper: 0},
                                                             top: {lower: 0, upper: 0}
                                                         },
                                                         greenRange: {
                                                             bottom: {lower: 1.3, upper: 1.6},
                                                             top: {lower: 1.5, upper: 2}
                                                         },
                                                         blueRange: {
                                                             bottom: {lower: 0, upper: 0},
                                                             top: {lower: 0, upper: 0}
                                                         },
                                                     },
                                                     colorTintTimes: {lower: 1, upper: 15},
                                                     opacityRange: {
                                                         bottom: {lower: 0.3, upper: 0.4},
                                                         top: {lower: 0.5, upper: 0.6}
                                                     },
                                                     opacityTimes: {lower: 1, upper: 15},
                                                 },
                                                 {
                                                     lines: {lower: 30, upper: 30},
                                                     loopTimes: {lower: 1, upper: 2},
                                                     brightnessRange: {
                                                         bottom: {lower: 10, upper: 20},
                                                         top: {lower: 30, upper: 40}
                                                     },
                                                     brightnessTimes: {lower: 1, upper: 15},
                                                     thicknessRange: {
                                                         bottom: {lower: 4, upper: 8},
                                                         top: {lower: 10, upper: 12}
                                                     },
                                                     thicknessTimes: {lower: 1, upper: 15},
                                                     lineBlurRange: {
                                                         bottom: {lower: 20, upper: 30},
                                                         top: {lower: 40, upper: 60}
                                                     },
                                                     lineBlurTimes: {lower: 1, upper: 15},
                                                     colorTintRange: {
                                                         redRange: {
                                                             bottom: {lower: 0, upper: 0},
                                                             top: {lower: 0, upper: 0}
                                                         },
                                                         greenRange: {
                                                             bottom: {lower: 0, upper: 0},
                                                             top: {lower: 0, upper: 0}
                                                         },
                                                         blueRange: {
                                                             bottom: {lower: 1.3, upper: 1.6},
                                                             top: {lower: 1.5, upper: 2}
                                                         },
                                                     },
                                                     colorTintTimes: {lower: 1, upper: 15},
                                                     opacityRange: {
                                                         bottom: {lower: 0.3, upper: 0.4},
                                                         top: {lower: 0.5, upper: 0.6}
                                                     },
                                                     opacityTimes: {lower: 1, upper: 15},
                                                 },
                                                 /*{
                                                     lines: {lower: 30, upper: 30},
                                                     loopTimes: {lower: 1, upper: 2},
                                                     brightnessRange: {
                                                         bottom: {lower: 10, upper: 20},
                                                         top: {lower: 30, upper: 40}
                                                     },
                                                     brightnessTimes: {lower: 1, upper: 15},
                                                     thicknessRange: {
                                                         bottom: {lower: 4, upper: 8},
                                                         top: {lower: 10, upper: 12}
                                                     },
                                                     thicknessTimes: {lower: 1, upper: 15},
                                                     lineBlurRange: {
                                                         bottom: {lower: 10, upper: 10},
                                                         top: {lower: 15, upper: 15}
                                                     },
                                                     lineBlurTimes: {lower: 1, upper: 15},
                                                     colorTintRange: {
                                                         redRange: {
                                                             bottom: {lower: 1, upper: 1},
                                                             top: {lower: 1, upper: 1}
                                                         },
                                                         greenRange: {
                                                             bottom: {lower: 1, upper: 1},
                                                             top: {lower: 1, upper: 1}
                                                         },
                                                         blueRange: {
                                                             bottom: {lower: 1, upper: 1},
                                                             top: {lower: 1, upper: 1}
                                                         },
                                                     },
                                                     colorTintTimes: {lower: 1, upper: 15},
                                                     opacityRange: {
                                                         bottom: {lower: 0.5, upper: 0.6},
                                                         top: {lower: 0.7, upper: 0.9}
                                                     },
                                                     opacityTimes: {lower: 1, upper: 15},
                                                 }*/
                                             ]) => {

    if (!project) {
        throw new Error('must include project');
    }

    const results = [];

    for (let i = 0; i < configs.length; i++) {

        await project.addFinalEffect({
            layerConfig: new LayerConfig({
                effect: CRTScanLinesEffect, percentChance: 100, currentEffectConfig: new CRTScanLinesConfig(
                    configs[i]
                ),
            }),
        });
    }

    return results;
}
