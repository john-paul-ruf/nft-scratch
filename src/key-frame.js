import {neonLights} from "./assets/color-scheme-store.js";
import {Project} from "../../my-nft-gen/src/app/Project.js";
import {LayerConfig} from "../../my-nft-gen/src/core/layer/LayerConfig.js";
import {ColorPicker} from "../../my-nft-gen/src/core/layer/configType/ColorPicker.js";
import {MultiStepDefinitionConfig} from "../../my-nft-gen/src/core/math/MultiStepDefinitionConfig.js";
import {Range} from "../../my-nft-gen/src/core/layer/configType/Range.js";
import {CRTScanLinesEffect} from "../../my-nft-gen/src/effects/finalImageEffects/crtScanLines/CRTScanLinesEffect.js";
import {CRTScanLinesConfig} from "../../my-nft-gen/src/effects/finalImageEffects/crtScanLines/CRTScanLinesConfig.js";
import {Point2D} from "../../my-nft-gen/src/core/layer/configType/Point2D.js";
import {
    EncircledSpiralEffect
} from "../../my-nft-gen/src/effects/primaryEffects/encircledSpiral/EncircledSpiralEffect.js";
import {
    EncircledSpiralConfig
} from "../../my-nft-gen/src/effects/primaryEffects/encircledSpiral/EncircledSpiralConfig.js";
import {findPointByAngleAndCircle} from "../../my-nft-gen/src/core/math/drawingMath.js";
import {FuzzFlareEffect} from "../../my-nft-gen/src/effects/primaryEffects/fuzz-flare/FuzzFlareEffect.js";
import {FuzzFlareConfig} from "../../my-nft-gen/src/effects/primaryEffects/fuzz-flare/FuzzFlareConfig.js";
import {CRTDegaussConfig} from "../../my-nft-gen/src/effects/keyFrameEffects/crtDegaussEvent/CRTDegaussConfig.js";
import {CRTDegaussEffect} from "../../my-nft-gen/src/effects/keyFrameEffects/crtDegaussEvent/CRTDegaussEffect.js";
import {PercentageShortestSide} from "../../my-nft-gen/src/core/layer/configType/PercentageShortestSide.js";
import {PercentageLongestSide} from "../../my-nft-gen/src/core/layer/configType/PercentageLongestSide.js";
import {PercentageRange} from "../../my-nft-gen/src/core/layer/configType/PercentageRange.js";
import {CRTShadowConfig} from "../../my-nft-gen/src/effects/finalImageEffects/crtShadow/CRTShadowConfig.js";
import {CRTShadowEffect} from "../../my-nft-gen/src/effects/finalImageEffects/crtShadow/CRTShadowEffect.js";
import {CRTBarrelConfig} from "../../my-nft-gen/src/effects/finalImageEffects/crtBarrel/CRTBarrelConfig.js";
import {CRTBarrelEffect} from "../../my-nft-gen/src/effects/finalImageEffects/crtBarrel/CRTBarrelEffect.js";

const promiseArray = [];

const createComposition = async (colorScheme) => {
    const myTestProject = new Project({
        artist: 'John Ruf',
        projectName: 'key-frame',
        projectDirectory: 'src/key-frame',
        neutrals: ['#FFFFFF'],
        backgrounds: ['#000000'],
        numberOfFrame: 1800,
        colorScheme: colorScheme,
    });


    /*await myTestProject.addPrimaryEffect({
        layerConfig: new LayerConfig({
            effect: FuzzyBandEffect,
            percentChance: 100,
            currentEffectConfig: new FuzzyBandConfig({
                color: new ColorPicker(ColorPicker.SelectionType.colorBucket),
                innerColor: new ColorPicker(ColorPicker.SelectionType.neutralBucket),
                invertLayers: false,
                layerOpacity: 1,
                underLayerOpacityRange: {bottom: {lower: 0.5, upper: 0.6}, top: {lower: 0.7, upper: 0.8}},
                underLayerOpacityTimes: {lower: 4, upper: 4},
                circles: {lower: 8, upper: 8},
                stroke: 0,
                thickness: 12,
                radius: {
                    lower: (finalSize) => finalSize.shortestSide * 0.5,
                    upper: (finalSize) => finalSize.longestSide * 0.55,
                },
                accentRange: {bottom: {lower: 12, upper: 16}, top: {lower: 24, upper: 36}},
                blurRange: {bottom: {lower: 10, upper: 15}, top: {lower: 20, upper: 25}},
                featherTimes: {lower: 4, upper: 4},
            }),
            possibleSecondaryEffects: [
                new LayerConfig({
                    effect: CRTDegaussEffect,
                    percentChance: 100,
                    currentEffectConfig: new CRTDegaussConfig({
                        keyFrames: [190],
                        glitchFrameCount: [240],
                        sectionHeight: [10, 15, 20, 40],
                        offset: {lower: 5, upper: 30},
                        direction: [-1, 1],
                        glitchTimes: {lower: 1, upper: 2},
                        backgroundRed: {lower: 0, upper: 0},
                        backgroundGreen: {lower: 0, upper: 0},
                        backgroundBlue: {lower: 0, upper: 0},
                        backgroundAlpha: {lower: 0, upper: 0},
                    }),
                }),
            ]
        }),
    });
     */

    await myTestProject.addPrimaryEffect({
        layerConfig: new LayerConfig({
            effect: FuzzFlareEffect,
            percentChance: 100,
            currentEffectConfig: new FuzzFlareConfig({
                invertLayers: true,

                outerColor: new ColorPicker(ColorPicker.SelectionType.colorBucket),
                innerColor: new ColorPicker(ColorPicker.SelectionType.colorBucket),

                layerOpacity: 0.65,

                underLayerOpacityRange: {bottom: {lower: 0.0, upper: 0.0}, top: {lower: 0.0, upper: 0.0}},
                underLayerOpacityTimes: {lower: 0, upper: 0},

                elementGastonMultiStep: [
                    new MultiStepDefinitionConfig({
                        minPercentage: 0,
                        maxPercentage: 50,
                        max: new Range(5, 10),
                        times: new Range(1, 1),
                    }),
                    new MultiStepDefinitionConfig({
                        minPercentage: 50,
                        maxPercentage: 100,
                        max: new Range(5, 10),
                        times: new Range(2, 2),
                    })
                ],

                numberOfFlareRings: new Range(20, 20),
                flareRingsSizeRange: new PercentageRange(new PercentageShortestSide(0.35), new PercentageLongestSide(0.95)),
                flareRingStroke: new Range(0, 0),
                flareRingThickness: new Range(2, 2),

                numberOfFlareRays: new Range(200, 200),
                flareRaysSizeRange: new PercentageRange(new PercentageShortestSide(0.75), new PercentageLongestSide(1)),
                flareRaysStroke: new Range(0, 0),
                flareRayThickness: new Range(2, 2),
                flareOffset: new PercentageRange(new PercentageShortestSide(0.35), new PercentageShortestSide(0.45)),

                accentRange: {bottom: {lower: 0, upper: 0}, top: {lower: 0, upper: 0}},
                blurRange: {bottom: {lower: 0, upper: 0}, top: {lower: 0, upper: 0}},
                featherTimes: {lower: 0, upper: 0},
            }),
            possibleSecondaryEffects: [
                new LayerConfig({
                    effect: CRTDegaussEffect,
                    percentChance: 100,
                    currentEffectConfig: new CRTDegaussConfig({
                        keyFrames: [0],
                        glitchFrameCount: [900],
                        sectionHeight: [5, 10, 15],
                        offset: {lower: 5, upper: 15},
                        direction: [-1, 1],
                        glitchTimes: {lower: 1, upper: 6},
                        backgroundRed: {lower: 0, upper: 0},
                        backgroundGreen: {lower: 0, upper: 0},
                        backgroundBlue: {lower: 0, upper: 0},
                        backgroundAlpha: {lower: 0, upper: 0},
                    }),
                }),
            ]
        }),
    });

    const createRings = async () => {

        const ringSpoke = 36;

        const outerRadius = 375;
        const secondRadiusReduction = 0.75;
        const secondRadius = outerRadius * secondRadiusReduction;

        const thirdRadiusReduction = 0.5;
        const thirdRadius = outerRadius * thirdRadiusReduction;


        const outerRingColor = '#00FF00';
        const innerRingColor = '#FF0000';
        const thirdRingColor = '#FFFF00';
        const fourthRingColor = '#FF00FF';
        const fifthRingColor = '#0000FF';

        const firstRingSpeed = 2;
        const secondRingSpeed = 4
        const thirdRingSPeed = 6;
        const fourthRingSpeed = 4;
        const fifthRingSpeed = 2;

        const numberOfRings = 4;

        const stroke = 0;
        const thickness = 1;

        const opacity = 0.3;
        const fourthRingOpacity = 0.4;
        const fifthRingOpacity = 0.6;


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
                    minSequenceIndex: [7],
                    numberOfSequenceElements: [7],
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
                    minSequenceIndex: [5],
                    numberOfSequenceElements: [7],
                    speed: {lower: fifthRingSpeed, upper: fifthRingSpeed},
                    accentRange: {bottom: {lower: 0, upper: 0}, top: {lower: 0, upper: 0}},
                    blurRange: {bottom: {lower: 0, upper: 0}, top: {lower: 0, upper: 0}},
                    featherTimes: {lower: 0, upper: 0},
                    center: new Point2D(1080 / 2, 1920 / 2),
                    innerColor: new ColorPicker(ColorPicker.SelectionType.color, fifthRingColor),
                }),
            }),
        });

    };

    await createRings();

    /*await myTestProject.addPrimaryEffect({
        layerConfig: new LayerConfig({
            effect: MappedFramesEffect,
            percentChance: 100,
            currentEffectConfig: new MappedFramesConfig({
                folderName: 'C:\\Users\\neomo\\WebstormProjects\\nft-scratch\\src\\assets\\mappedFrames\\all-seeing\\',
                layerOpacity: [0.95],
                buffer: [200],
                loopTimesMultiStep: [
                    new MultiStepDefinitionConfig({
                        minPercentage: 0,
                        maxPercentage: 40,
                        max: new Range(1, 1),
                        times: new Range(5, 5),
                    }),
                    new MultiStepDefinitionConfig({
                        minPercentage: 40,
                        maxPercentage: 60,
                        max: new Range(1, 1),
                        times: new Range(1, 1),
                    }),
                    new MultiStepDefinitionConfig({
                        minPercentage: 60,
                        maxPercentage: 100,
                        max: new Range(1, 1),
                        times: new Range(5, 5),
                    })
                ],
            }),
            possibleSecondaryEffects: [
                new LayerConfig({
                    effect: CRTDegaussEffect,
                    percentChance: 100,
                    currentEffectConfig: new CRTDegaussConfig({
                        keyFrames: [600],
                        glitchFrameCount: [360],
                        sectionHeight: [5, 15, 20],
                        offset: {lower: 5, upper: 40},
                        direction: [-1, 1],
                        glitchTimes: {lower: 1, upper: 2},
                        backgroundRed: {lower: 0, upper: 0},
                        backgroundGreen: {lower: 0, upper: 0},
                        backgroundBlue: {lower: 0, upper: 0},
                        backgroundAlpha: {lower: 0, upper: 0},
                    }),
                }),
            ]
        }),
    });*/


    /////////////////////////////////////
    ///
    ///
    /// FINAL EFFECTS
    ///
    ///
    /////////////////////////////////////

    await myTestProject.addFinalEffect({
        layerConfig: new LayerConfig({
            effect: CRTScanLinesEffect,
            percentChance: 100,
            currentEffectConfig: new CRTScanLinesConfig({
                lines: {lower: 60, upper: 60},
                loopTimes: {lower: 1, upper: 3},
                brightness: {lower: 4000, upper: 5000},
                thickness: {lower:60, upper: 120},
                lineBlur: {lower: 4, upper: 4},
            }),
        }),
    });


    await myTestProject.addFinalEffect({
        layerConfig: new LayerConfig({
            effect: CRTShadowEffect,
            percentChance: 100,
            currentEffectConfig: new CRTShadowConfig({
                shadowOpacityRange: {bottom: {lower: 0.7, upper: 0.7}, top: {lower: 0.8, upper: 0.8}},
                linesOpacityRange: {bottom: {lower: 0.10, upper: 0.10}, top: {lower: 0.2, upper: 0.2}},
                opacityTimes: {lower: 4, upper: 4},
                lineRed: {lower: 0, upper: 0},
                lineGreen: {lower: 0, upper: 0},
                lineBlue: {lower: 0, upper: 0},
                lineHeight: {lower: 0.25, upper: 0.25},
                edgePercentage: {lower: 0.40, upper: 0.40},
                maxLineHeight: {lower: 4, upper: 4},
                numberOfEdgeSections: {lower: 40, upper: 40},
            })
        }),
    });

    await myTestProject.addFinalEffect({
        layerConfig: new LayerConfig({
            effect: CRTBarrelEffect,
            percentChance: 100,
            currentEffectConfig: new CRTBarrelConfig({
                strength: {lower: 0.3, upper: 0.3},
                edgeThreshold: {lower: 0.035, upper: 0.035},
                corner: {lower: 0.10, upper: 0.10},
            }),
        }),
    });

    promiseArray.push(myTestProject.generateRandomLoop());
};

await createComposition(neonLights);

await Promise.all(promiseArray);
