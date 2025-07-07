import {LayerConfig} from "../../../my-nft-gen/src/core/layer/LayerConfig.js";
import {ViewportEffect} from "../../../my-nft-gen/src/effects/primaryEffects/viewport/ViewportEffect.js";
import {ViewportConfig} from "../../../my-nft-gen/src/effects/primaryEffects/viewport/ViewportConfig.js";
import {ColorPicker} from "../../../my-nft-gen/src/core/layer/configType/ColorPicker.js";
import {createBlurEffects, createDegaussEffects, createFadeEffects, createGlowEffects} from "../util/glitch.js";
import {randomNumber} from "my-nft-gen/src/core/math/random.js";
import {MappedFramesEffect} from "../../../my-nft-gen/src/effects/primaryEffects/mappedFrames/MappedFramesEffect.js";
import {MappedFramesConfig} from "../../../my-nft-gen/src/effects/primaryEffects/mappedFrames/MappedFramesConfig.js";
import {MultiStepDefinitionConfig} from "../../../my-nft-gen/src/core/math/MultiStepDefinitionConfig.js";
import {Range} from "../../../my-nft-gen/src/core/layer/configType/Range.js";
import {generateSmoothRandomMultistep} from "../util/multistep.js";


export const metaMappedFramesRing = async ({
                                               project,
                                               center,
                                               ringRadius,
                                               numberOfPoints,
                                               centerMappedFramePath,
                                               centerOpacity,
                                               centerBuffer,
                                               centerYAdjustment,
                                               ringMappedFramePath,
                                               ringOpacity,
                                               ringBuffer,
                                               ringYAdjustment,
                                           }) => {
    center.y -= centerYAdjustment;

    await project.addPrimaryEffect({
        layerConfig: new LayerConfig({
            effect: MappedFramesEffect,
            percentChance: 100,
            currentEffectConfig: new MappedFramesConfig({
                center: center,
                folderName: centerMappedFramePath,
                layerOpacity: [centerOpacity + 0.05],
                buffer: [centerBuffer],
                loopTimesMultiStep: generateSmoothRandomMultistep({
                    numberOfSegments: 15,
                    times: new Range(1, 5),
                }),
            }),
            possibleSecondaryEffects: [],
        }),
    });


    await project.addPrimaryEffect({
        layerConfig: new LayerConfig({
            effect: MappedFramesEffect,
            percentChance: 100,
            currentEffectConfig: new MappedFramesConfig({
                center: center,
                folderName: centerMappedFramePath,
                layerOpacity: [centerOpacity],
                buffer: [centerBuffer],
                loopTimesMultiStep: generateSmoothRandomMultistep({
                    numberOfSegments: 15,
                    times: new Range(1, 5),
                }),
            }),
            possibleSecondaryEffects: [
                ...createDegaussEffects([
                    {
                        arraySize: 50,
                        randomChance: {lower: 10, upper: 25},
                        glitchFrameCount: {lower: 275, upper: 320},
                        keyFrames: {lower: 0, upper: 1800 - 320},
                        sectionHeight: [1, 5, 10],
                        offset: {lower: 3, upper: 15},
                        direction: [-1, 1],
                        glitchTimes: {lower: 3, upper: 8},
                    },
                    {
                        arraySize: 25,
                        randomChance: {lower: 10, upper: 25},
                        glitchFrameCount: {lower: 25, upper: 75},
                        keyFrames: {lower: 0, upper: 1800 - 75},
                        sectionHeight: [1, 2, 3],
                        offset: {lower: 5, upper: 25},
                        direction: [-1, 1],
                        glitchTimes: {lower: 3, upper: 8},
                    },
                    {
                        arraySize: 25,
                        randomChance: {lower: 10, upper: 25},
                        glitchFrameCount: {lower: 180, upper: 240},
                        keyFrames: {lower: 0, upper: 1800 - 240},
                        sectionHeight: [1, 2, 5],
                        offset: {lower: 5, upper: 25},
                        direction: [-1, 1],
                        glitchTimes: {lower: 3, upper: 8},
                    },
                ]),
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

    for (let i = 0; i < numberOfPoints; i++) {
        const angle = (i / numberOfPoints) * 2 * Math.PI; // Full circle = 2π radians
        const point = {x: center.x + ringRadius * Math.cos(angle), y: center.y + ringRadius * Math.sin(angle)}

        point.y -= ringYAdjustment;

        await project.addPrimaryEffect({
            layerConfig: new LayerConfig({
                effect: MappedFramesEffect,
                percentChance: 100,
                currentEffectConfig: new MappedFramesConfig({
                    center: point,
                    folderName: ringMappedFramePath,
                    layerOpacity: [ringOpacity + 0.05],
                    buffer: [ringBuffer],
                    loopTimesMultiStep: generateSmoothRandomMultistep({
                        numberOfSegments: 15,
                        times: new Range(1, 5),
                    }),
                }),
                possibleSecondaryEffects: [],
            }),
        });

        await project.addPrimaryEffect({
            layerConfig: new LayerConfig({
                effect: MappedFramesEffect,
                percentChance: 100,
                currentEffectConfig: new MappedFramesConfig({
                    center: point,
                    folderName: ringMappedFramePath,
                    layerOpacity: [ringOpacity],
                    buffer: [ringBuffer],
                    loopTimesMultiStep: generateSmoothRandomMultistep({
                        numberOfSegments: 15,
                        times: new Range(1, 5),
                    }),
                }),
                possibleSecondaryEffects: [
                    ...createDegaussEffects([
                        {
                            arraySize: 50,
                            randomChance: {lower: 10, upper: 25},
                            glitchFrameCount: {lower: 275, upper: 320},
                            keyFrames: {lower: 0, upper: 1800 - 320},
                            sectionHeight: [1, 5, 10],
                            offset: {lower: 2, upper: 5},
                            direction: [-1, 1],
                            glitchTimes: {lower: 3, upper: 8},
                        },
                        {
                            arraySize: 25,
                            randomChance: {lower: 10, upper: 25},
                            glitchFrameCount: {lower: 25, upper: 75},
                            keyFrames: {lower: 0, upper: 1800 - 75},
                            sectionHeight: [1, 2, 3],
                            offset: {lower: 5, upper: 10},
                            direction: [-1, 1],
                            glitchTimes: {lower: 3, upper: 8},
                        },
                        {
                            arraySize: 25,
                            randomChance: {lower: 5, upper: 25},
                            glitchFrameCount: {lower: 180, upper: 240},
                            keyFrames: {lower: 0, upper: 1800 - 240},
                            sectionHeight: [1, 2, 5],
                            offset: {lower: 3, upper: 7},
                            direction: [-1, 1],
                            glitchTimes: {lower: 3, upper: 8},
                        },
                    ]),
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

}
