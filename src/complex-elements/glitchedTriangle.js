import {LayerConfig} from "../../../my-nft-gen/src/core/layer/LayerConfig.js";
import {ViewportEffect} from "../../../my-nft-gen/src/effects/primaryEffects/viewport/ViewportEffect.js";
import {ViewportConfig} from "../../../my-nft-gen/src/effects/primaryEffects/viewport/ViewportConfig.js";
import {ColorPicker} from "../../../my-nft-gen/src/core/layer/configType/ColorPicker.js";
import {createBlurEffects, createDegaussEffects, createFadeEffects, createGlowEffects} from "../util/glitch.js";
import {randomNumber} from "my-nft-gen/src/core/math/random.js";


export const createGlitchedTriangle = async ({
                                                 project,
                                                 colorScheme,
                                                 radius,
                                                 amplitude,
                                                 times,
                                                 center,
                                                 thickness,
                                                 underlayOpacityRange,
                                                 accentRange,
                                                 blurRang,
                                                 featherTimes,
                                                 accentBottomRangeReduction,
                                                 accentTopRangeReduction
                                             }) => {


    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i
            [array[i], array[j]] = [array[j], array[i]];   // swap elements
        }
        return array;
    }

    const shuffled = shuffleArray(colorScheme.colorBucket)

    for (let i = 0; i < shuffled.length; i++) {
        await project.addPrimaryEffect({
            layerConfig: new LayerConfig({
                effect: ViewportEffect,
                percentChance: 100,
                currentEffectConfig: new ViewportConfig({
                    invertLayers: true,
                    layerOpacity: 0.7,
                    underLayerOpacity: randomNumber(underlayOpacityRange.lower, underlayOpacityRange.upper),
                    center: center,
                    color: new ColorPicker(ColorPicker.SelectionType.color, shuffled[i]),
                    innerColor: new ColorPicker(ColorPicker.SelectionType.neutralBucket),
                    stroke: 0,
                    thickness: thickness,
                    ampStroke: 0,
                    ampThickness: 1,
                    radius: radius,
                    startAngle: [270],
                    amplitude: amplitude,
                    times: times,
                    accentRange: {
                        bottom: {
                            lower: accentRange.bottom.lower - (accentBottomRangeReduction * (i+1)),
                            upper: accentRange.bottom.upper - (accentBottomRangeReduction * (i+1))
                        },
                        top: {
                            lower: accentRange.top.lower - (accentTopRangeReduction * (i+1)),
                            upper: accentRange.top.upper - (accentTopRangeReduction * (i+1))
                        }
                    },
                    blurRange: blurRang,
                    featherTimes: featherTimes,
                }),
                possibleSecondaryEffects: [
                  /*  ...createFadeEffects([
                        {
                            arraySize: 75,
                            randomChance: {lower: 10, upper: 25},
                            glitchFrameCount: {lower: 275, upper: 320},
                            keyFrames: {lower: 0, upper: 1800 - 320},
                            lowerRange: {lower: 0.4, upper: 0.45},
                            times: {lower: 1, upper: 3},
                        },
                        {
                            arraySize: 75,
                            randomChance: {lower: 10, upper: 25},
                            glitchFrameCount: {lower: 180, upper: 240},
                            keyFrames: {lower: 0, upper: 1800 - 240},
                            lowerRange: {lower: 0.35, upper: 0.4},
                            times: {lower: 1, upper: 3},
                        },
                    ]),*/
                    ...createDegaussEffects([
                        {
                            arraySize: 75,
                            randomChance: {lower: 10, upper: 25},
                            glitchFrameCount: {lower: 275, upper: 320},
                            keyFrames: {lower: 0, upper: 1800 - 320},
                            sectionHeight: [1, 5, 10],
                            offset: {lower: 3, upper: 15},
                            direction: [-1, 1],
                            glitchTimes: {lower: 3, upper: 8},
                        },
                        {
                            arraySize: 50,
                            randomChance: {lower: 10, upper: 25},
                            glitchFrameCount: {lower: 25, upper: 75},
                            keyFrames: {lower: 0, upper: 1800 - 75},
                            sectionHeight: [1, 2, 3],
                            offset: {lower: 5, upper: 25},
                            direction: [-1, 1],
                            glitchTimes: {lower: 3, upper: 8},
                        },
                        {
                            arraySize: 50,
                            randomChance: {lower: 10, upper: 25},
                            glitchFrameCount: {lower: 180, upper: 240},
                            keyFrames: {lower: 0, upper: 1800 - 240},
                            sectionHeight: [1, 2, 5],
                            offset: {lower: 5, upper: 25},
                            direction: [-1, 1],
                            glitchTimes: {lower: 3, upper: 8},
                        },
                    ]),
                    /*  ...createBlurEffects([
                          {
                              arraySize: 100,
                              randomChance: {lower: 10, upper: 25},
                              glitchFrameCount: {lower: 25, upper: 160},
                              keyFrames: {lower: 0, upper: 1800 - 160},
                              lowerRange: {lower: 16, upper: 32},
                              times: {lower: 1, upper: 3},
                          },
                          {
                              arraySize: 100,
                              randomChance: {lower: 10, upper: 25},
                              glitchFrameCount: {lower: 25, upper: 75},
                              keyFrames: {lower: 0, upper: 1800 - 75},
                              lowerRange: {lower: 4, upper: 16},
                              times: {lower: 1, upper: 3},
                          },
                          {
                              arraySize: 100,
                              randomChance: {lower: 10, upper: 25},
                              glitchFrameCount: {lower: 60, upper: 120},
                              keyFrames: {lower: 0, upper: 1800 - 120},
                              lowerRange: {lower: 12, upper: 24},
                              times: {lower: 1, upper: 3},
                          },
                      ]),*/
                    ...createGlowEffects([
                        {
                            arraySize: 75,
                            randomChance: {lower: 10, upper: 25},
                            glitchFrameCount: {lower: 25, upper: 160},
                            keyFrames: {lower: 0, upper: 1800 - 160},
                            lowerRange: {lower: 4, upper: 8},
                            times: {lower: 1, upper: 3},
                        },
                        {
                            arraySize: 50,
                            randomChance: {lower: 10, upper: 25},
                            glitchFrameCount: {lower: 25, upper: 75},
                            keyFrames: {lower: 0, upper: 1800 - 75},
                            lowerRange: {lower: 2, upper: 6},
                            times: {lower: 1, upper: 3},
                        },
                        {
                            arraySize: 50,
                            randomChance: {lower: 10, upper: 25},
                            glitchFrameCount: {lower: 60, upper: 120},
                            keyFrames: {lower: 0, upper: 1800 - 120},
                            lowerRange: {lower: 1, upper: 4},
                            times: {lower: 1, upper: 3},
                        }
                    ])

                ],
            }),
        });
    }

    await project.addPrimaryEffect({
        layerConfig: new LayerConfig({
            effect: ViewportEffect,
            percentChance: 100,
            currentEffectConfig: new ViewportConfig({
                invertLayers: true,
                layerOpacity: 1,
                underLayerOpacity: 0,
                center: center,
                color: new ColorPicker(ColorPicker.SelectionType.neutralBucket),
                innerColor: new ColorPicker(ColorPicker.SelectionType.neutralBucket),
                stroke: 0,
                thickness: thickness,
                ampStroke: 0,
                ampThickness: 1,
                radius: radius,
                startAngle: [270],
                amplitude: amplitude,
                times: times,
                accentRange: {bottom: {lower: 0, upper: 0}, top: {lower: 0, upper: 0}},
                blurRange: {bottom: {lower: 0, upper: 0}, top: {lower: 0, upper: 0}},
                featherTimes: {lower: 0, upper: 0},
            }),
            possibleSecondaryEffects: [],
        }),
    });
}
