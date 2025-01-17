import {eyeBurn, neonLights} from "../assets/color-scheme-store.js";
import {Project} from "../../../my-nft-gen/src/app/Project.js";
import {MultiStepDefinitionConfig} from "../../../my-nft-gen/src/core/math/MultiStepDefinitionConfig.js";
import {Range} from "../../../my-nft-gen/src/core/layer/configType/Range.js";
import {CRTScanLinesEffect} from "../../../my-nft-gen/src/effects/finalImageEffects/crtScanLines/CRTScanLinesEffect.js";
import {CRTScanLinesConfig} from "../../../my-nft-gen/src/effects/finalImageEffects/crtScanLines/CRTScanLinesConfig.js";
import {CRTDegaussConfig} from "../../../my-nft-gen/src/effects/keyFrameEffects/crtDegaussEvent/CRTDegaussConfig.js";
import {CRTDegaussEffect} from "../../../my-nft-gen/src/effects/keyFrameEffects/crtDegaussEvent/CRTDegaussEffect.js";
import {CRTShadowConfig} from "../../../my-nft-gen/src/effects/finalImageEffects/crtShadow/CRTShadowConfig.js";
import {CRTShadowEffect} from "../../../my-nft-gen/src/effects/finalImageEffects/crtShadow/CRTShadowEffect.js";
import {CRTBarrelConfig} from "../../../my-nft-gen/src/effects/finalImageEffects/crtBarrel/CRTBarrelConfig.js";
import {CRTBarrelEffect} from "../../../my-nft-gen/src/effects/finalImageEffects/crtBarrel/CRTBarrelEffect.js";
import {MappedFramesConfig} from "../../../my-nft-gen/src/effects/primaryEffects/mappedFrames/MappedFramesConfig.js";
import {MappedFramesEffect} from "../../../my-nft-gen/src/effects/primaryEffects/mappedFrames/MappedFramesEffect.js";
import {getRandomFromArray} from "../../../my-nft-gen/src/core/math/random.js";


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


    const ringSpoke = 18;

    const baseRadius = 300;
    const burstMax = 6;
    const percentageIncrease = 1.25;

    const numberOfRings = 4;

    const stroke = 1;
    const thickness = 2;

    const opacity = 0.4;

    for(let burst = 1; burst <= burstMax; burst++) {

        const color = getRandomFromArray(neonLights.colorBucket);

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
                        speed: {lower: burst, upper: burst},
                        accentRange: {bottom: {lower: 0, upper: 0}, top: {lower: 0, upper: 0}},
                        blurRange: {bottom: {lower: 0, upper: 0}, top: {lower: 0, upper: 0}},
                        featherTimes: {lower: 0, upper: 0},
                        center: findPointByAngleAndCircle(new Point2D(1080 / 2, 1920 / 2), i, baseRadius * (burst * percentageIncrease)),
                        innerColor: new ColorPicker(ColorPicker.SelectionType.color, color),
                        outerColor: new ColorPicker(ColorPicker.SelectionType.color, "#00000000"),
                    }),
                }),
            });
        }
    }

    await myTestProject.addPrimaryEffect({
        layerConfig: new LayerConfig({
            effect: MappedFramesEffect,
            percentChance: 100,
            currentEffectConfig: new MappedFramesConfig({
                folderName: 'C:\\Users\\neomo\\WebstormProjects\\nft-scratch\\src\\assets\\mappedFrames\\all-seeing\\',
                layerOpacity: [0.85],
                buffer: [500],
                loopTimesMultiStep: [
                    new MultiStepDefinitionConfig({
                        minPercentage: 0,
                        maxPercentage: 33,
                        max: new Range(1, 1),
                        times: new Range(2, 2),
                    }),
                    new MultiStepDefinitionConfig({
                        minPercentage: 33,
                        maxPercentage: 66,
                        max: new Range(1, 1),
                        times: new Range(0, 0),
                    }),
                    new MultiStepDefinitionConfig({
                        minPercentage: 66,
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
                        keyFrames: [600],
                        glitchFrameCount: [600],
                        sectionHeight: [5, 10, 15],
                        offset: {lower: 5, upper: 30},
                        direction: [-1, 1],
                        glitchTimes: {lower: 1, upper: 2},
                        backgroundRed: {lower: 0, upper: 0},
                        backgroundGreen: {lower: 0, upper: 0},
                        backgroundBlue: {lower: 0, upper: 0},
                        backgroundAlpha: {lower: 0, upper: 0},
                    }),
                }),
                new LayerConfig({
                    effect: CRTDegaussEffect,
                    percentChance: 100,
                    currentEffectConfig: new CRTDegaussConfig({
                        keyFrames: [300],
                        glitchFrameCount: [60],
                        sectionHeight: [5, 10, 15],
                        offset: {lower: 5, upper: 30},
                        direction: [-1, 1],
                        glitchTimes: {lower: 1, upper: 1},
                        backgroundRed: {lower: 0, upper: 0},
                        backgroundGreen: {lower: 0, upper: 0},
                        backgroundBlue: {lower: 0, upper: 0},
                        backgroundAlpha: {lower: 0, upper: 0},
                    }),
                }),
                new LayerConfig({
                    effect: CRTDegaussEffect,
                    percentChance: 100,
                    currentEffectConfig: new CRTDegaussConfig({
                        keyFrames: [800],
                        glitchFrameCount: [60],
                        sectionHeight: [5, 10, 15],
                        offset: {lower: 5, upper: 30},
                        direction: [-1, 1],
                        glitchTimes: {lower: 1, upper: 2},
                        backgroundRed: {lower: 0, upper: 0},
                        backgroundGreen: {lower: 0, upper: 0},
                        backgroundBlue: {lower: 0, upper: 0},
                        backgroundAlpha: {lower: 0, upper: 0},
                    }),
                }),
                new LayerConfig({
                    effect: CRTDegaussEffect,
                    percentChance: 100,
                    currentEffectConfig: new CRTDegaussConfig({
                        keyFrames: [1000],
                        glitchFrameCount: [60],
                        sectionHeight: [5, 10, 15],
                        offset: {lower: 5, upper: 30},
                        direction: [-1, 1],
                        glitchTimes: {lower: 1, upper: 1},
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
                lines: {lower: 75, upper: 75},
                loopTimes: {lower: 1, upper: 2},
                brightness: {lower: 2000, upper: 2500},
                thickness: {lower: 8, upper: 8},
                lineBlur: {lower: 2, upper: 2},
            }),
        }),
    });


    await myTestProject.addFinalEffect({
        layerConfig: new LayerConfig({
            effect: CRTShadowEffect,
            percentChance: 100,
            currentEffectConfig: new CRTShadowConfig({
                shadowOpacityRange: {bottom: {lower: 0.7, upper: 0.7}, top: {lower: 0.8, upper: 0.8}},
                linesOpacityRange: {bottom: {lower: 0.05, upper: 0.05}, top: {lower: 0.1, upper: 0.1}},
                opacityTimes: {lower: 2, upper: 2},
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
