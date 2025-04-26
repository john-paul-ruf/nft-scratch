import {LayerConfig} from "../../../my-nft-gen/src/core/layer/LayerConfig.js";
import {ViewportEffect} from "../../../my-nft-gen/src/effects/primaryEffects/viewport/ViewportEffect.js";
import {ViewportConfig} from "../../../my-nft-gen/src/effects/primaryEffects/viewport/ViewportConfig.js";
import {Point2D} from "../../../my-nft-gen/src/core/layer/configType/Point2D.js";
import {ColorPicker} from "../../../my-nft-gen/src/core/layer/configType/ColorPicker.js";
import {createBlurEffects, createDegaussEffects, createFadeEffects, createGlowEffects} from "../util/glitch.js";

export const createGlitchedTriangle = async ({project, colorScheme, radius, amplitude, times, center, thickness}) => {
    for (let i = 0; i < 3; i++) {
        for (let i = 0; i < colorScheme.colorBucket.length; i++) {
            await project.addPrimaryEffect({
                layerConfig: new LayerConfig({
                    effect: ViewportEffect,
                    percentChance: 100,
                    currentEffectConfig: new ViewportConfig({
                        invertLayers: true,
                        layerOpacity: 1,
                        underLayerOpacity: 0.5,
                        center: center,
                        color: new ColorPicker(ColorPicker.SelectionType.color, colorScheme.colorBucket[i]),
                        innerColor: new ColorPicker(ColorPicker.SelectionType.neutralBucket),
                        stroke: 0,
                        thickness: thickness,
                        ampStroke: 0,
                        ampThickness: 1,
                        radius: radius,
                        startAngle: [270],
                        amplitude: amplitude,
                        times: times,
                        accentRange: {bottom: {lower: 30, upper: 80}, top: {lower: 120, upper: 180}},
                        blurRange: {bottom: {lower: 2, upper: 2}, top: {lower: 12, upper: 12}},
                        featherTimes: {lower: 4, upper: 20},
                    }),
                    possibleSecondaryEffects: [
                        ...createFadeEffects([
                            {
                                arraySize: 100,
                                randomChance: {lower: 10, upper: 25},
                                glitchFrameCount: {lower: 25, upper: 160},
                                keyFrames: {lower: 0, upper: 1800 - 160},
                                lowerRange: {lower: 0.4, upper: 0.8},
                                times: {lower: 1, upper: 3},
                            },
                            {
                                arraySize: 100,
                                randomChance: {lower: 10, upper: 25},
                                glitchFrameCount: {lower: 25, upper: 75},
                                keyFrames: {lower: 0, upper: 1800 - 75},
                                lowerRange: {lower: 0.2, upper: 0.6},
                                times: {lower: 1, upper: 3},
                            },
                            {
                                arraySize: 100,
                                randomChance: {lower: 10, upper: 25},
                                glitchFrameCount: {lower: 60, upper: 120},
                                keyFrames: {lower: 0, upper: 1800 - 120},
                                lowerRange: {lower: 0.2, upper: 0.8},
                                times: {lower: 1, upper: 3},
                            },
                        ]),
                        ...createDegaussEffects([
                            {
                                arraySize: 100,
                                randomChance: {lower: 10, upper: 25},
                                glitchFrameCount: {lower: 25, upper: 160},
                                keyFrames: {lower: 0, upper: 1800 - 160},
                                sectionHeight: [1, 5, 10],
                                offset: {lower: 3, upper: 15},
                                direction: [-1, 1],
                                glitchTimes: {lower: 3, upper: 8},
                            },
                            {
                                arraySize: 100,
                                randomChance: {lower: 10, upper: 25},
                                glitchFrameCount: {lower: 25, upper: 75},
                                keyFrames: {lower: 0, upper: 1800 - 75},
                                sectionHeight: [1, 2, 5],
                                offset: {lower: 5, upper: 25},
                                direction: [-1, 1],
                                glitchTimes: {lower: 3, upper: 8},
                            },
                            {
                                arraySize: 100,
                                randomChance: {lower: 10, upper: 25},
                                glitchFrameCount: {lower: 60, upper: 120},
                                keyFrames: {lower: 0, upper: 1800 - 120},
                                sectionHeight: [1, 2, 5],
                                offset: {lower: 5, upper: 25},
                                direction: [-1, 1],
                                glitchTimes: {lower: 3, upper: 8},
                            },
                        ]),
                        ...createBlurEffects([
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
                        ]),
                        ...createGlowEffects([
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
                                lowerRange: {lower: 1, upper: 32},
                                times: {lower: 1, upper: 3},
                            }
                        ])

                    ],
                }),
            });
        }
    }

    await project.addPrimaryEffect({
        layerConfig: new LayerConfig({
            effect: ViewportEffect,
            percentChance: 100,
            currentEffectConfig: new ViewportConfig({
                invertLayers: true,
                layerOpacity: 1,
                underLayerOpacity: 0.5,
                center:  center,
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
            possibleSecondaryEffects: [
            ],
        }),
    });
}
