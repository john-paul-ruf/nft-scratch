import {LayerConfig} from "my-nft-gen/src/core/layer/LayerConfig.js";

import {createBlurEffects, createDegaussEffects, createFadeEffects, createGlowEffects} from "../util/glitch.js";

import {MappedFramesEffect} from "my-nft-gen/src/effects/primaryEffects/mappedFrames/MappedFramesEffect.js";
import {MappedFramesConfig} from "my-nft-gen/src/effects/primaryEffects/mappedFrames/MappedFramesConfig.js";
import {Range} from "my-nft-gen/src/core/layer/configType/Range.js";
import {generateSmoothRandomMultistep} from "../util/multistep.js";
import {Position} from "my-nft-gen/src/core/position/Position.js";
import {ArcPath} from "my-nft-gen/src/core/position/ArcPath.js";
import {getRandomIntInclusive} from 'my-nft-gen/src/core/math/random.js';
import {MultiStepDefinitionConfig} from "my-nft-gen/src/core/math/MultiStepDefinitionConfig.js";
import {EdgeGlowEffect} from "../../../my-nft-gen/src/effects/secondaryEffects/edgeGlow/EdgeGlowEffect.js";
import {EdgeGlowConfig} from "../../../my-nft-gen/src/effects/secondaryEffects/edgeGlow/EdgeGlowConfig.js";
import {getAllFindValueAlgorithms} from "../../../my-nft-gen/src/core/math/findValue.js";

const generateCustomRandomMultistep = async ({
                                                 numberOfSegments = 4,
                                                 max = new Range(2, 5),
                                                 times = new Range(1, 2),
                                             }) => {

    const result = [];
    const seg = 100 / numberOfSegments;

    for (let i = 0; i < numberOfSegments; i++) {

        const pick = getRandomIntInclusive(times.lower, times.upper);

        result.push(
            new MultiStepDefinitionConfig({
                minPercentage: Math.floor(seg * i),
                maxPercentage: Math.floor(seg * (i + 1)),
                max: max,
                times: new Range(pick, pick),
            })
        );
    }

    return result;
}

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
                                               rotationAmount,
                                           }) => {
    center.y -= centerYAdjustment;

    const multiStep = await generateCustomRandomMultistep({
        numberOfSegments: 8,
        times: new Range(1, 3),
    });

    const ringMultiStep = await generateCustomRandomMultistep({
        numberOfSegments: 15,
        times: new Range(2, 4),
    });


    const point = {x: center.x, y: center.y - ringYAdjustment};

    for (let i = 0; i < numberOfPoints; i++) {

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
                            endAngle: angle * (i + rotationAmount),
                            direction: 1
                        }
                    ),
                    folderName: ringMappedFramePath,
                    layerOpacity: [ringOpacity],
                    buffer: [ringBuffer],
                    loopTimesMultiStep: ringMultiStep,
                }),
                possibleSecondaryEffects: [
                    new LayerConfig({
                        effect: EdgeGlowEffect,
                        percentChance: 100,
                        currentEffectConfig: new EdgeGlowConfig({
                            glowBottom: [75, 0, 130],     // #4B0082
                            glowTop:    [216, 191, 216],  // #D8BFD8
                            glowTimes: {lower: 2, upper: 6},
                            brightnessRange: {bottom: {lower: 1.5, upper: 1.5}, top: {lower: 2, upper: 2}},
                            brightnessTimes: {lower: 2, upper: 8},
                            blurRange: {bottom: {lower: 12, upper: 12}, top: {lower: 15, upper: 15}},
                            blurTimes: {lower: 2, upper: 8},
                            brightnessFindValueAlgorithm: getAllFindValueAlgorithms(),
                            blurFindValueAlgorithm: getAllFindValueAlgorithms(),
                        }),
                    }),
                    ...createDegaussEffects([
                        {
                            arraySize: 75,
                            randomChance: {lower: 10, upper: 25},
                            glitchFrameCount: {lower: 10, upper: 30},
                            keyFrames: {lower: 0, upper: 1800 - 25},
                            sectionHeight: [1, 5, 10],
                            offset: {lower: 2, upper: 5},
                            direction: [-1, 1],
                            glitchTimes: {lower: 1, upper: 1},
                        },
                        {
                            arraySize: 75,
                            randomChance: {lower: 10, upper: 25},
                            glitchFrameCount: {lower: 5, upper: 10},
                            keyFrames: {lower: 0, upper: 1800 - 25},
                            sectionHeight: [1, 2, 3],
                            offset: {lower: 5, upper: 10},
                            direction: [-1, 1],
                            glitchTimes: {lower: 1, upper: 1},
                        },
                        {
                            arraySize: 75,
                            randomChance: {lower: 5, upper: 25},
                            glitchFrameCount: {lower: 10, upper: 20},
                            keyFrames: {lower: 0, upper: 1800 - 20},
                            sectionHeight: [1, 2, 5],
                            offset: {lower: 3, upper: 7},
                            direction: [-1, 1],
                            glitchTimes: {lower: 1, upper: 1},
                        },
                    ]),
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
                    layerOpacity: [centerOpacity],
                    buffer: [centerBuffer],
                    loopTimesMultiStep: multiStep,
                }),
                possibleSecondaryEffects: [
                    createDegaussEffects([
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
                ],
            }),
        });

    }

}
