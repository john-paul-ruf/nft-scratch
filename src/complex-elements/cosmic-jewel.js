import {LayerConfig} from "../../../my-nft-gen/src/core/layer/LayerConfig.js";
import {
    EncircledSpiralEffect
} from "../../../my-nft-gen/src/effects/primaryEffects/encircledSpiral/EncircledSpiralEffect.js";
import {
    EncircledSpiralConfig
} from "../../../my-nft-gen/src/effects/primaryEffects/encircledSpiral/EncircledSpiralConfig.js";
import {findPointByAngleAndCircle} from "../../../my-nft-gen/src/core/math/drawingMath.js";
import {Point2D} from "../../../my-nft-gen/src/core/layer/configType/Point2D.js";
import {ColorPicker} from "../../../my-nft-gen/src/core/layer/configType/ColorPicker.js";

const createRings = async ({
                               ringSpoke = 30,

                               outerRadius = 375,
                               secondRadiusReduction = 0.75,
                               secondRadius = outerRadius * secondRadiusReduction,

                               thirdRadiusReduction = 0.5,
                               thirdRadius = outerRadius * thirdRadiusReduction,


                               outerRingColor = '#5DADE2',
                               innerRingColor = '#85C1E9',
                               thirdRingColor = '#283747',
                               fourthRingColor = '#BDC3C7',
                               fifthRingColor = '#FDFEFE',

                               firstRingSpeed = 2,
                               secondRingSpeed = 6,
                               thirdRingSPeed = 8,
                               fourthRingSpeed = 6,
                               fifthRingSpeed = 1,

                               numberOfRings = 4,

                               stroke = 0,
                               thickness = 3,

                               opacity = 0.4,
                               fourthRingOpacity = 0.45,
                               fifthRingOpacity = 0.5,
                           }) => {

    for (let i = 0; i < 360; i = i + ringSpoke) {
        await myTestProject.addPrimaryEffect({
            layerConfig: new LayerConfig({
                effect: EncircledSpiralEffect,
                percentChance: 100,
                currentEffectConfig: new EncircledSpiralConfig({
                    invertLayers: true,
                    layerOpacity: opacity,
                    underLayerOpacity: 0,
                    startAngle: {lower: 0, upper: 360},
                    numberOfRings: {lower: numberOfRings, upper: numberOfRings},
                    stroke: stroke,
                    thickness: thickness,
                    sparsityFactor: [ringSpoke],
                    sequencePixelConstant: {
                        lower: (finalSize) => finalSize.shortestSide * 0.001,
                        upper: (finalSize) => finalSize.shortestSide * 0.001,
                    },
                    sequence: [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987, 1597, 2584, 4181],
                    minSequenceIndex: [10],
                    numberOfSequenceElements: [2],
                    speed: {lower: firstRingSpeed, upper: firstRingSpeed},
                    accentRange: {bottom: {lower: 0, upper: 0}, top: {lower: 0, upper: 0}},
                    blurRange: {bottom: {lower: 0, upper: 0}, top: {lower: 0, upper: 0}},
                    featherTimes: {lower: 0, upper: 0},
                    center: findPointByAngleAndCircle(new Point2D(1080 / 2, 1920 / 2), i, outerRadius),
                    innerColor: new ColorPicker(ColorPicker.SelectionType.color, outerRingColor),
                    outerColor: new ColorPicker(ColorPicker.SelectionType.color, "#00000000"),
                }),
            }),
        });
    }

    for (let i = 0; i < 360; i = i + ringSpoke) {
        await myTestProject.addPrimaryEffect({
            layerConfig: new LayerConfig({
                effect: EncircledSpiralEffect,
                percentChance: 100,
                currentEffectConfig: new EncircledSpiralConfig({
                    invertLayers: true,
                    layerOpacity: opacity,
                    underLayerOpacity: 0,
                    startAngle: {lower: 0, upper: 360},
                    numberOfRings: {lower: numberOfRings, upper: numberOfRings},
                    stroke: stroke,
                    thickness: thickness,
                    sparsityFactor: [ringSpoke],
                    sequencePixelConstant: {
                        lower: (finalSize) => finalSize.shortestSide * 0.001,
                        upper: (finalSize) => finalSize.shortestSide * 0.001,
                    },
                    sequence: [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987, 1597, 2584, 4181],
                    minSequenceIndex: [10],
                    numberOfSequenceElements: [2],
                    speed: {lower: secondRingSpeed, upper: secondRingSpeed},
                    accentRange: {bottom: {lower: 0, upper: 0}, top: {lower: 0, upper: 0}},
                    blurRange: {bottom: {lower: 0, upper: 0}, top: {lower: 0, upper: 0}},
                    featherTimes: {lower: 0, upper: 0},
                    center: findPointByAngleAndCircle(new Point2D(1080 / 2, 1920 / 2), i, secondRadius),
                    innerColor: new ColorPicker(ColorPicker.SelectionType.color, innerRingColor),
                    outerColor: new ColorPicker(ColorPicker.SelectionType.color, "#00000000"),
                }),
            }),
        });
    }

    for (let i = 0; i < 360; i = i + ringSpoke) {
        await myTestProject.addPrimaryEffect({
            layerConfig: new LayerConfig({
                effect: EncircledSpiralEffect,
                percentChance: 100,
                currentEffectConfig: new EncircledSpiralConfig({
                    invertLayers: true,
                    layerOpacity: opacity,
                    underLayerOpacity: 0,
                    startAngle: {lower: 0, upper: 360},
                    numberOfRings: {lower: numberOfRings, upper: numberOfRings},
                    stroke: stroke,
                    thickness: thickness,
                    sparsityFactor: [ringSpoke],
                    sequencePixelConstant: {
                        lower: (finalSize) => finalSize.shortestSide * 0.001,
                        upper: (finalSize) => finalSize.shortestSide * 0.001,
                    },
                    sequence: [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987, 1597, 2584, 4181],
                    minSequenceIndex: [10],
                    numberOfSequenceElements: [2],
                    speed: {lower: thirdRingSPeed, upper: thirdRingSPeed},
                    accentRange: {bottom: {lower: 0, upper: 0}, top: {lower: 0, upper: 0}},
                    blurRange: {bottom: {lower: 0, upper: 0}, top: {lower: 0, upper: 0}},
                    featherTimes: {lower: 0, upper: 0},
                    center: findPointByAngleAndCircle(new Point2D(1080 / 2, 1920 / 2), i, thirdRadius),
                    innerColor: new ColorPicker(ColorPicker.SelectionType.color, thirdRingColor),
                    outerColor: new ColorPicker(ColorPicker.SelectionType.color, "#00000000"),
                }),
            }),
        });
    }

    await myTestProject.addPrimaryEffect({
        layerConfig: new LayerConfig({
            effect: EncircledSpiralEffect,
            percentChance: 100,
            currentEffectConfig: new EncircledSpiralConfig({
                invertLayers: true,
                layerOpacity: fourthRingOpacity,
                underLayerOpacity: 0,
                startAngle: {lower: 0, upper: 360},
                numberOfRings: {lower: numberOfRings, upper: numberOfRings},
                stroke: stroke,
                thickness: thickness,
                sparsityFactor: [ringSpoke],
                sequencePixelConstant: {
                    lower: (finalSize) => finalSize.shortestSide * 0.001,
                    upper: (finalSize) => finalSize.shortestSide * 0.001,
                },
                sequence: [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987, 1597, 2584, 4181],
                minSequenceIndex: [10],
                numberOfSequenceElements: [4],
                speed: {lower: fourthRingSpeed, upper: fourthRingSpeed},
                accentRange: {bottom: {lower: 0, upper: 0}, top: {lower: 0, upper: 0}},
                blurRange: {bottom: {lower: 0, upper: 0}, top: {lower: 0, upper: 0}},
                featherTimes: {lower: 0, upper: 0},
                center: new Point2D(1080 / 2, 1920 / 2),
                innerColor: new ColorPicker(ColorPicker.SelectionType.color, fourthRingColor),
                outerColor: new ColorPicker(ColorPicker.SelectionType.color, "#00000000"),
            }),
        }),
    });

    await myTestProject.addPrimaryEffect({
        layerConfig: new LayerConfig({
            effect: EncircledSpiralEffect,
            percentChance: 100,
            currentEffectConfig: new EncircledSpiralConfig({
                invertLayers: true,
                layerOpacity: fifthRingOpacity,
                underLayerOpacity: 0,
                startAngle: {lower: 0, upper: 360},
                numberOfRings: {lower: numberOfRings + 2, upper: numberOfRings + 2},
                stroke: stroke,
                thickness: thickness,
                sparsityFactor: [ringSpoke],
                sequencePixelConstant: {
                    lower: (finalSize) => finalSize.shortestSide * 0.001,
                    upper: (finalSize) => finalSize.shortestSide * 0.001,
                },
                sequence: [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987, 1597, 2584, 4181],
                minSequenceIndex: [11],
                numberOfSequenceElements: [3],
                speed: {lower: fifthRingSpeed, upper: fifthRingSpeed},
                accentRange: {bottom: {lower: 0, upper: 0}, top: {lower: 0, upper: 0}},
                blurRange: {bottom: {lower: 0, upper: 0}, top: {lower: 0, upper: 0}},
                featherTimes: {lower: 0, upper: 0},
                center: new Point2D(1080 / 2, 1920 / 2),
                innerColor: new ColorPicker(ColorPicker.SelectionType.color, fifthRingColor),
                outerColor: new ColorPicker(ColorPicker.SelectionType.color, "#00000000"),
            }),
        }),
    });


    await myTestProject.addPrimaryEffect({
        layerConfig: new LayerConfig({
            effect: EncircledSpiralEffect,
            percentChance: 100,
            currentEffectConfig: new EncircledSpiralConfig({
                invertLayers: true,
                layerOpacity: 0.75,
                underLayerOpacity: 0,
                startAngle: {lower: 0, upper: 360},
                numberOfRings: {lower: numberOfRings, upper: numberOfRings},
                stroke: stroke,
                thickness: thickness,
                sparsityFactor: [ringSpoke],
                sequencePixelConstant: {
                    lower: (finalSize) => finalSize.shortestSide * 0.001,
                    upper: (finalSize) => finalSize.shortestSide * 0.001,
                },
                sequence: [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987, 1597, 2584, 4181],
                minSequenceIndex: [2],
                numberOfSequenceElements: [9],
                speed: {lower: thirdRingSPeed, upper: thirdRingSPeed},
                accentRange: {bottom: {lower: 0, upper: 0}, top: {lower: 0, upper: 0}},
                blurRange: {bottom: {lower: 0, upper: 0}, top: {lower: 0, upper: 0}},
                featherTimes: {lower: 0, upper: 0},
                center: new Point2D(1080 / 2, 1920 / 2),
                innerColor: new ColorPicker(ColorPicker.SelectionType.color, '#FFF5E1'),
                outerColor: new ColorPicker(ColorPicker.SelectionType.color, "#00000000"),
            }),
        }),
    });

};