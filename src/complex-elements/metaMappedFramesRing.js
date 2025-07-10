import {LayerConfig} from "my-nft-gen/src/core/layer/LayerConfig.js";

import {createBlurEffects, createDegaussEffects, createFadeEffects, createGlowEffects} from "../util/glitch.js";

import {MappedFramesEffect} from "my-nft-gen/src/effects/primaryEffects/mappedFrames/MappedFramesEffect.js";
import {MappedFramesConfig} from "my-nft-gen/src/effects/primaryEffects/mappedFrames/MappedFramesConfig.js";
import {Range} from "my-nft-gen/src/core/layer/configType/Range.js";
import {generateSmoothRandomMultistep} from "../util/multistep.js";
import {Position} from "my-nft-gen/src/core/position/Position.js";
import {ArcPath} from "my-nft-gen/src/core/position/ArcPath.js";


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

    const multiStep = generateSmoothRandomMultistep({
            numberOfSegments: 15,
            times: new Range(1, 5),
        });

    await project.addPrimaryEffect({
        layerConfig: new LayerConfig({
            effect: MappedFramesEffect,
            percentChance: 100,
            currentEffectConfig: new MappedFramesConfig({
                center: new Position({x: center.x, y: center.y}),
                folderName: centerMappedFramePath,
                layerOpacity: [centerOpacity],
                buffer: [centerBuffer],
                loopTimesMultiStep: multiStep,
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

    await project.addPrimaryEffect({
        layerConfig: new LayerConfig({
            effect: MappedFramesEffect,
            percentChance: 100,
            currentEffectConfig: new MappedFramesConfig({
                center: new Position({x: center.x, y: center.y}),
                folderName: centerMappedFramePath,
                layerOpacity: [0.1],
                buffer: [centerBuffer],
                loopTimesMultiStep: multiStep,
            }),
            possibleSecondaryEffects: [],
        }),
    });

    const point = {x: center.x, y: center.y -ringYAdjustment};

    for (let i = 0; i < numberOfPoints; i++) {

        const multiStep = generateSmoothRandomMultistep({
            numberOfSegments: 15,
            times: new Range(1, 5),
        });
        const angle = (360 / numberOfPoints);

        await project.addPrimaryEffect({
            layerConfig: new LayerConfig({
                effect: MappedFramesEffect,
                percentChance: 100,
                currentEffectConfig: new MappedFramesConfig({
                    center: new ArcPath({
                            center: point,
                            radius: ringRadius,
                            startAngle: angle * i,
                            endAngle: angle * (i + 1),
                            direction: 1
                        }
                    ),
                    folderName: ringMappedFramePath,
                    layerOpacity: [ringOpacity],
                    buffer: [ringBuffer],
                    loopTimesMultiStep: multiStep,
                }),
                possibleSecondaryEffects: [
                    ...createDegaussEffects([
                        {
                            arraySize: 150,
                            randomChance: {lower: 10, upper: 25},
                            glitchFrameCount: {lower: 275, upper: 320},
                            keyFrames: {lower: 0, upper: 1800 - 320},
                            sectionHeight: [1, 5, 10],
                            offset: {lower: 2, upper: 5},
                            direction: [-1, 1],
                            glitchTimes: {lower: 3, upper: 8},
                        },
                        {
                            arraySize: 125,
                            randomChance: {lower: 10, upper: 25},
                            glitchFrameCount: {lower: 25, upper: 75},
                            keyFrames: {lower: 0, upper: 1800 - 75},
                            sectionHeight: [1, 2, 3],
                            offset: {lower: 5, upper: 10},
                            direction: [-1, 1],
                            glitchTimes: {lower: 3, upper: 8},
                        },
                        {
                            arraySize: 125,
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

        await project.addPrimaryEffect({
            layerConfig: new LayerConfig({
                effect: MappedFramesEffect,
                percentChance: 100,
                currentEffectConfig: new MappedFramesConfig({
                    center: new ArcPath({
                            center: point,
                            radius: ringRadius,
                            startAngle: angle * i,
                            endAngle: angle * (i + 1),
                            direction: 1
                        }
                    ),
                    folderName: ringMappedFramePath,
                    layerOpacity: [0.1],
                    buffer: [ringBuffer],
                    loopTimesMultiStep: multiStep,
                }),
                possibleSecondaryEffects: [],
            }),
        });

    }

}
