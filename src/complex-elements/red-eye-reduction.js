import {ColorScheme} from "../../../my-nft-gen/src/core/color/ColorScheme.js";
import {LayerConfig} from "../../../my-nft-gen/src/core/layer/LayerConfig.js";
import {RedEyeEffect} from "../../../my-nft-gen/src/effects/primaryEffects/red-eye/RedEyeEffect.js";
import {RedEyeConfig} from "../../../my-nft-gen/src/effects/primaryEffects/red-eye/RedEyeConfig.js";
import {ColorPicker} from "../../../my-nft-gen/src/core/layer/configType/ColorPicker.js";
import {createFadeEffects} from "../util/glitch.js";

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
                                                loopTimesFunction = (index) => {
                                                    return index + 1
                                                },
                                                secondaryEffects = []
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

        if (lineStart >= outerRadius) {
            throw new Error('lineStart must less than outer radius');
        }

        await project.addPrimaryEffect({
            layerConfig: new LayerConfig({
                effect: RedEyeEffect,
                percentChance: 100,
                currentEffectConfig: new RedEyeConfig({
                    innerRadius: lineStart,
                    outerRadius: outerRadius,
                    possibleJumpRangeInPixels: {lower: 3, upper: 30},
                    lineLength: {lower: lineLength, upper: lineLength},
                    numberOfLoops: {lower: loopTimesFunction(i), upper: loopTimesFunction(i)},
                    invertLayers: true,
                    layerOpacity: 1,
                    underLayerOpacity: 0.7,
                    sparsityFactor: [sparsityFactor],
                    stroke: stroke,
                    thickness: thickness,
                    accentRange: {bottom: {lower: 5, upper: 5}, top: {lower: 15, upper: 15}},
                    blurRange: {bottom: {lower: 2, upper: 2}, top: {lower: 6, upper: 6}},
                    featherTimes: {lower: 30, upper: 30},
                    center: center,
                    innerColor: new ColorPicker(ColorPicker.SelectionType.neutralBucket),
                    outerColor: new ColorPicker(ColorPicker.SelectionType.color, colorScheme.getColorFromBucket()),
                }),
                possibleSecondaryEffects: [...secondaryEffects],
            }),
        });
    }
}

export const innerLayerRedEye = async (myTestProject, colorScheme, numberOfRedEyes, gap, gapReduction, lineLength, lineReduction, sparsityFactor) => {

    await createRedEyeReduction({
        project: myTestProject,
        colorScheme: colorScheme,
        center: new Point2D(1080 / 2, 1920 / 2),
        numberOfRedEyes: numberOfRedEyes,
        lineStartInitial: 100,
        gap: gap,
        gapReduction: gapReduction,
        lineLength: lineLength,
        lineReduction: lineReduction,
        sparsityFactor: sparsityFactor,
        outerRadius: 800,
        loopTimesFunction: (index) => {
            return numberOfRedEyes - index;
        },
        secondaryEffects: [...createFadeEffects([
            {
                arraySize: 10,
                randomChance: {lower: 10, upper: 25},
                glitchFrameCount: {lower: 25, upper: 160},
                keyFrames: {lower: 0, upper: 1800 - 160},
                lowerRange: {lower: 0.2, upper: 0.4},
                times: {lower: 1, upper: 3},
            },
            {
                arraySize: 20,
                randomChance: {lower: 10, upper: 25},
                glitchFrameCount: {lower: 25, upper: 75},
                keyFrames: {lower: 0, upper: 1800 - 75},
                lowerRange: {lower: 0.2, upper: 0.6},
                times: {lower: 1, upper: 3},
            },
            {
                arraySize: 10,
                randomChance: {lower: 10, upper: 25},
                glitchFrameCount: {lower: 60, upper: 120},
                keyFrames: {lower: 0, upper: 1800 - 120},
                lowerRange: {lower: 0.2, upper: 0.3},
                times: {lower: 1, upper: 3},
            },
        ]),]
    });

    await createRedEyeReduction({
        project: myTestProject,
        colorScheme: colorScheme,
        center: new Point2D(1080 / 2, 1920 / 2),
        numberOfRedEyes: numberOfRedEyes,
        lineStartInitial: 200,
        gap: gap,
        gapReduction: gapReduction,
        lineLength: lineLength,
        lineReduction: lineReduction,
        sparsityFactor: sparsityFactor,
        outerRadius: 850,
        loopTimesFunction: (index) => {
            return numberOfRedEyes - index;
        },
        secondaryEffects: [...createFadeEffects([
            {
                arraySize: 10,
                randomChance: {lower: 10, upper: 25},
                glitchFrameCount: {lower: 25, upper: 160},
                keyFrames: {lower: 0, upper: 1800 - 160},
                lowerRange: {lower: 0.2, upper: 0.4},
                times: {lower: 1, upper: 3},
            },
            {
                arraySize: 20,
                randomChance: {lower: 10, upper: 25},
                glitchFrameCount: {lower: 25, upper: 75},
                keyFrames: {lower: 0, upper: 1800 - 75},
                lowerRange: {lower: 0.2, upper: 0.6},
                times: {lower: 1, upper: 3},
            },
            {
                arraySize: 10,
                randomChance: {lower: 10, upper: 25},
                glitchFrameCount: {lower: 60, upper: 120},
                keyFrames: {lower: 0, upper: 1800 - 120},
                lowerRange: {lower: 0.2, upper: 0.3},
                times: {lower: 1, upper: 3},
            },
        ]),]
    });

    await createRedEyeReduction({
        project: myTestProject,
        colorScheme: colorScheme,
        center: new Point2D(1080 / 2, 1920 / 2),
        numberOfRedEyes: numberOfRedEyes,
        lineStartInitial: 300,
        gap: gap,
        gapReduction: gapReduction,
        lineLength: lineLength,
        lineReduction: lineReduction,
        sparsityFactor: sparsityFactor,
        outerRadius: 900,
        loopTimesFunction: (index) => {
            return numberOfRedEyes - index;
        },
        secondaryEffects: [...createFadeEffects([
            {
                arraySize: 10,
                randomChance: {lower: 10, upper: 25},
                glitchFrameCount: {lower: 25, upper: 160},
                keyFrames: {lower: 0, upper: 1800 - 160},
                lowerRange: {lower: 0.2, upper: 0.4},
                times: {lower: 1, upper: 3},
            },
            {
                arraySize: 20,
                randomChance: {lower: 10, upper: 25},
                glitchFrameCount: {lower: 25, upper: 75},
                keyFrames: {lower: 0, upper: 1800 - 75},
                lowerRange: {lower: 0.2, upper: 0.6},
                times: {lower: 1, upper: 3},
            },
            {
                arraySize: 10,
                randomChance: {lower: 10, upper: 25},
                glitchFrameCount: {lower: 60, upper: 120},
                keyFrames: {lower: 0, upper: 1800 - 120},
                lowerRange: {lower: 0.2, upper: 0.3},
                times: {lower: 1, upper: 3},
            },
        ]),]
    });
}

export const outerLayerRedEye = async (myTestProject, colorScheme, numberOfRedEyes, gap, gapReduction, lineLength, lineReduction, secondSparsityFactor) => {
    await createRedEyeReduction({
        project: myTestProject,
        colorScheme: colorScheme,
        center: new Point2D(1080 / 2, 1920 / 2),
        numberOfRedEyes: numberOfRedEyes,
        lineStartInitial: 150,
        gap: gap,
        gapReduction: gapReduction,
        lineLength: lineLength,
        lineReduction: lineReduction,
        sparsityFactor: secondSparsityFactor,
        outerRadius: 800,
        loopTimesFunction: (index) => {
            return numberOfRedEyes - index;
        },
        secondaryEffects: [...createFadeEffects([
            {
                arraySize: 10,
                randomChance: {lower: 10, upper: 25},
                glitchFrameCount: {lower: 25, upper: 160},
                keyFrames: {lower: 0, upper: 1800 - 160},
                lowerRange: {lower: 0.2, upper: 0.4},
                times: {lower: 1, upper: 3},
            },
            {
                arraySize: 20,
                randomChance: {lower: 10, upper: 25},
                glitchFrameCount: {lower: 25, upper: 75},
                keyFrames: {lower: 0, upper: 1800 - 75},
                lowerRange: {lower: 0.2, upper: 0.6},
                times: {lower: 1, upper: 3},
            },
            {
                arraySize: 10,
                randomChance: {lower: 10, upper: 25},
                glitchFrameCount: {lower: 60, upper: 120},
                keyFrames: {lower: 0, upper: 1800 - 120},
                lowerRange: {lower: 0.2, upper: 0.3},
                times: {lower: 1, upper: 3},
            },
        ]),]
    });

    await createRedEyeReduction({
        project: myTestProject,
        colorScheme: colorScheme,
        center: new Point2D(1080 / 2, 1920 / 2),
        numberOfRedEyes: numberOfRedEyes,
        lineStartInitial: 250,
        gap: gap,
        gapReduction: gapReduction,
        lineLength: lineLength,
        lineReduction: lineReduction,
        sparsityFactor: secondSparsityFactor,
        outerRadius: 850,
        loopTimesFunction: (index) => {
            return numberOfRedEyes - index;
        },
        secondaryEffects: [...createFadeEffects([
            {
                arraySize: 10,
                randomChance: {lower: 10, upper: 25},
                glitchFrameCount: {lower: 25, upper: 160},
                keyFrames: {lower: 0, upper: 1800 - 160},
                lowerRange: {lower: 0.2, upper: 0.4},
                times: {lower: 1, upper: 3},
            },
            {
                arraySize: 20,
                randomChance: {lower: 10, upper: 25},
                glitchFrameCount: {lower: 25, upper: 75},
                keyFrames: {lower: 0, upper: 1800 - 75},
                lowerRange: {lower: 0.2, upper: 0.6},
                times: {lower: 1, upper: 3},
            },
            {
                arraySize: 10,
                randomChance: {lower: 10, upper: 25},
                glitchFrameCount: {lower: 60, upper: 120},
                keyFrames: {lower: 0, upper: 1800 - 120},
                lowerRange: {lower: 0.2, upper: 0.3},
                times: {lower: 1, upper: 3},
            },
        ]),]
    });

    await createRedEyeReduction({
        project: myTestProject,
        colorScheme: colorScheme,
        center: new Point2D(1080 / 2, 1920 / 2),
        numberOfRedEyes: numberOfRedEyes,
        lineStartInitial: 350,
        gap: gap,
        gapReduction: gapReduction,
        lineLength: lineLength,
        lineReduction: lineReduction,
        sparsityFactor: secondSparsityFactor,
        outerRadius: 900,
        loopTimesFunction: (index) => {
            return numberOfRedEyes - index;
        },
        secondaryEffects: [...createFadeEffects([
            {
                arraySize: 10,
                randomChance: {lower: 10, upper: 25},
                glitchFrameCount: {lower: 25, upper: 160},
                keyFrames: {lower: 0, upper: 1800 - 160},
                lowerRange: {lower: 0.2, upper: 0.4},
                times: {lower: 1, upper: 3},
            },
            {
                arraySize: 20,
                randomChance: {lower: 10, upper: 25},
                glitchFrameCount: {lower: 25, upper: 75},
                keyFrames: {lower: 0, upper: 1800 - 75},
                lowerRange: {lower: 0.2, upper: 0.6},
                times: {lower: 1, upper: 3},
            },
            {
                arraySize: 10,
                randomChance: {lower: 10, upper: 25},
                glitchFrameCount: {lower: 60, upper: 120},
                keyFrames: {lower: 0, upper: 1800 - 120},
                lowerRange: {lower: 0.2, upper: 0.3},
                times: {lower: 1, upper: 3},
            },
        ]),]
    });
}