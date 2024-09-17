import {neonLights} from "./assets/color-scheme-store.js";
import {Project} from "../../my-nft-gen/src/app/Project.js";
import {LayerConfig} from "../../my-nft-gen/src/core/layer/LayerConfig.js";
import {ColorPicker} from "../../my-nft-gen/src/core/layer/configType/ColorPicker.js";
import {MappedFramesEffect} from "../../my-nft-gen/src/effects/primaryEffects/mappedFrames/MappedFramesEffect.js";
import {MappedFramesConfig} from "../../my-nft-gen/src/effects/primaryEffects/mappedFrames/MappedFramesConfig.js";
import {MultiStepDefinitionConfig} from "../../my-nft-gen/src/core/math/MultiStepDefinitionConfig.js";
import {Range} from "../../my-nft-gen/src/core/layer/configType/Range.js";
import {CRTScanLinesEffect} from "../../my-nft-gen/src/effects/finalImageEffects/crtScanLines/CRTScanLinesEffect.js";
import {CRTScanLinesConfig} from "../../my-nft-gen/src/effects/finalImageEffects/crtScanLines/CRTScanLinesConfig.js";
import {CRTShadowEffect} from "../../my-nft-gen/src/effects/finalImageEffects/crtShadow/CRTShadowEffect.js";
import {CRTShadowConfig} from "../../my-nft-gen/src/effects/finalImageEffects/crtShadow/CRTShadowConfig.js";
import {GlowConfig} from "../../my-nft-gen/src/effects/secondaryEffects/glow/GlowConfig.js";
import {GlowEffect} from "../../my-nft-gen/src/effects/secondaryEffects/glow/GlowEffect.js";
import {CRTDegaussEffect} from "../../my-nft-gen/src/effects/finalImageEffects/crtDegaussEvent/CRTDegaussEffect.js";
import {CRTDegaussConfig} from "../../my-nft-gen/src/effects/finalImageEffects/crtDegaussEvent/CRTDegaussConfig.js";
import {FuzzyBandConfig} from "../../my-nft-gen/src/effects/primaryEffects/fuzzyBands/FuzzyBandConfig.js";
import {FuzzyBandEffect} from "../../my-nft-gen/src/effects/primaryEffects/fuzzyBands/FuzzyBandEffect.js";
import {Point2D} from "../../my-nft-gen/src/core/layer/configType/Point2D.js";
import {CRTBarrelEffect} from "../../my-nft-gen/src/effects/finalImageEffects/crtBarrel/CRTBarrelEffect.js";
import {CRTBarrelConfig} from "../../my-nft-gen/src/effects/finalImageEffects/crtBarrel/CRTBarrelConfig.js";
import {
    EncircledSpiralEffect
} from "../../my-nft-gen/src/effects/primaryEffects/encircledSpiral/EncircledSpiralEffect.js";
import {
    EncircledSpiralConfig
} from "../../my-nft-gen/src/effects/primaryEffects/encircledSpiral/EncircledSpiralConfig.js";
import {findPointByAngleAndCircle} from "../../my-nft-gen/src/core/math/drawingMath.js";

const promiseArray = [];

const createComposition = async (colorScheme) => {
    const myTestProject = new Project({
        artist: 'John Ruf',
        projectName: 'key-frame',
        projectDirectory: 'src/key-frame',
        neutrals: ['#000000'],
        backgrounds: ['#000000'],
        numberOfFrame: 1800,
        colorScheme: colorScheme,
    });


    await myTestProject.addPrimaryEffect({
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
                circles: {lower: 12, upper: 12},
                stroke: 0,
                thickness: 8,
                radius: {
                    lower: (finalSize) => finalSize.shortestSide * 0.25,
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
                        keyFrames: [1700],
                        glitchFrameCount: [100, 120, 140],
                        sectionHeight: [10, 15, 20, 60],
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

    const createRings = async () => {

        const outerRadius = 400;
        const secondRadiusReduction = 0.25;
        const secondRadius = outerRadius * secondRadiusReduction;
        const ringSpoke = 36;

        const outerRingColor = '#00FF00';
        const innerRingColor = '#FF0000';

        for (let i = 0; i < 360; i = i + ringSpoke) {
            await myTestProject.addPrimaryEffect({
                layerConfig: new LayerConfig({
                    effect: EncircledSpiralEffect,
                    percentChance: 100,
                    currentEffectConfig: new EncircledSpiralConfig({
                        invertLayers: true,
                        layerOpacity: 0.55,
                        underLayerOpacity: 0.5,
                        startAngle: {lower: 0, upper: 360},
                        numberOfRings: {lower: 20, upper: 20},
                        stroke: 2,
                        thickness: 0,
                        sparsityFactor: [60],
                        sequencePixelConstant: {
                            lower: (finalSize) => finalSize.shortestSide * 0.001,
                            upper: (finalSize) => finalSize.shortestSide * 0.001,
                        },
                        sequence: [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987, 1597, 2584, 4181],
                        minSequenceIndex: [12],
                        numberOfSequenceElements: [3],
                        speed: {lower: 2, upper: 2},
                        accentRange: {bottom: {lower: 1, upper: 1}, top: {lower: 3, upper: 6}},
                        blurRange: {bottom: {lower: 1, upper: 1}, top: {lower: 1, upper: 1}},
                        featherTimes: {lower: 2, upper: 4},
                        center: findPointByAngleAndCircle(new Point2D(1080 / 2, 1920 / 2), i, outerRadius),
                        innerColor: new ColorPicker(ColorPicker.SelectionType.neutralBucket),
                        outerColor: new ColorPicker(ColorPicker.SelectionType.color, outerRingColor),
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
                        layerOpacity: 0.55,
                        underLayerOpacity: 0.5,
                        startAngle: {lower: 0, upper: 360},
                        numberOfRings: {lower: 20, upper: 20},
                        stroke: 2,
                        thickness: 0,
                        sparsityFactor: [60],
                        sequencePixelConstant: {
                            lower: (finalSize) => finalSize.shortestSide * 0.001,
                            upper: (finalSize) => finalSize.shortestSide * 0.001,
                        },
                        sequence: [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987, 1597, 2584, 4181],
                        minSequenceIndex: [12],
                        numberOfSequenceElements: [3],
                        speed: {lower: 2, upper: 2},
                        accentRange: {bottom: {lower: 1, upper: 1}, top: {lower: 3, upper: 6}},
                        blurRange: {bottom: {lower: 1, upper: 1}, top: {lower: 1, upper: 1}},
                        featherTimes: {lower: 2, upper: 4},
                        center: findPointByAngleAndCircle(new Point2D(1080 / 2, 1920 / 2), i, secondRadius),
                        innerColor: new ColorPicker(ColorPicker.SelectionType.neutralBucket),
                        outerColor: new ColorPicker(ColorPicker.SelectionType.color, innerRingColor),
                    }),
                }),
            });
        }
    };

    await createRings();

    await myTestProject.addPrimaryEffect({
        layerConfig: new LayerConfig({
            effect: MappedFramesEffect,
            percentChance: 100,
            currentEffectConfig: new MappedFramesConfig({
                folderName: 'C:\\Users\\neomo\\WebstormProjects\\nft-scratch\\src\\assets\\mappedFrames\\all-seeing\\',
                layerOpacity: [0.7],
                buffer: [200],
                loopTimesMultiStep: [
                    new MultiStepDefinitionConfig({
                        minPercentage: 0,
                        maxPercentage: 40,
                        max: new Range(1, 1),
                        times: new Range(3, 3),
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
                        times: new Range(3, 3),
                    })
                ],
            }),
            possibleSecondaryEffects: [
                new LayerConfig({
                    effect: CRTDegaussEffect,
                    percentChance: 100,
                    currentEffectConfig: new CRTDegaussConfig({
                        keyFrames: [100, 700, 900, 1100, 1600],
                        glitchFrameCount: [100, 120, 140],
                        sectionHeight: [10, 15, 20, 60],
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
                lines: {lower: 40, upper: 40},
                loopTimes: {lower: 1, upper: 2},
                brightness: {lower: 1500, upper: 2500},
                thickness: {lower: 4, upper: 4},
                lineBlur: {lower: 6, upper: 6},
            }),
        }),
    });


    await myTestProject.addFinalEffect({
        layerConfig: new LayerConfig({
            effect: CRTShadowEffect,
            percentChance: 100,
            currentEffectConfig: new CRTShadowConfig({
                shadowOpacityRange: {bottom: {lower: 0.7, upper: 0.7}, top: {lower: 0.9, upper: 0.9}},
                linesOpacityRange: {bottom: {lower: 0.2, upper: 0.2}, top: {lower: 0.4, upper: 0.4}},
                opacityTimes: {lower: 4, upper: 4},
                lineRed: {lower: 128, upper: 128},
                lineGreen: {lower: 128, upper: 128},
                lineBlue: {lower: 0, upper: 0},
                lineHeight: {lower: 1, upper: 1},
                edgePercentage: {lower: 0.20, upper: 0.20},
                maxLineHeight: {lower: 3.5, upper: 3.5},
                numberOfEdgeSections: {lower: 20, upper: 20},
            }),
            possibleSecondaryEffects: [
                new LayerConfig({
                    effect: GlowEffect,
                    percentChance: 100,
                    currentEffectConfig: new GlowConfig({
                        lowerRange: {lower: 0, upper: 0},
                        upperRange: {lower: 180, upper: 180},
                        times: {lower: 1, upper: 1},
                    }),
                })
            ]
        }),
    });

    await myTestProject.addFinalEffect({
        layerConfig: new LayerConfig({
            effect: CRTBarrelEffect,
            percentChance: 100,
            currentEffectConfig: new CRTBarrelConfig({
                strength: {lower: 0.3, upper: 0.3},
                edgeThreshold: {lower: 0.025, upper: 0.025},
                corner: {lower: 0.12, upper: 0.12},
            }),
        }),
    });

    promiseArray.push(myTestProject.generateRandomLoop());
};

await createComposition(neonLights);

await Promise.all(promiseArray);
