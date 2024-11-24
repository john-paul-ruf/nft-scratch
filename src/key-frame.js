import {eyeBurn, neonLights} from "./assets/color-scheme-store.js";
import {Project} from "../../my-nft-gen/src/app/Project.js";
import {LayerConfig} from "../../my-nft-gen/src/core/layer/LayerConfig.js";
import {MultiStepDefinitionConfig} from "../../my-nft-gen/src/core/math/MultiStepDefinitionConfig.js";
import {Range} from "../../my-nft-gen/src/core/layer/configType/Range.js";
import {CRTScanLinesEffect} from "../../my-nft-gen/src/effects/finalImageEffects/crtScanLines/CRTScanLinesEffect.js";
import {CRTScanLinesConfig} from "../../my-nft-gen/src/effects/finalImageEffects/crtScanLines/CRTScanLinesConfig.js";
import {CRTDegaussConfig} from "../../my-nft-gen/src/effects/keyFrameEffects/crtDegaussEvent/CRTDegaussConfig.js";
import {CRTDegaussEffect} from "../../my-nft-gen/src/effects/keyFrameEffects/crtDegaussEvent/CRTDegaussEffect.js";
import {CRTShadowConfig} from "../../my-nft-gen/src/effects/finalImageEffects/crtShadow/CRTShadowConfig.js";
import {CRTShadowEffect} from "../../my-nft-gen/src/effects/finalImageEffects/crtShadow/CRTShadowEffect.js";
import {CRTBarrelConfig} from "../../my-nft-gen/src/effects/finalImageEffects/crtBarrel/CRTBarrelConfig.js";
import {CRTBarrelEffect} from "../../my-nft-gen/src/effects/finalImageEffects/crtBarrel/CRTBarrelEffect.js";
import {MappedFramesConfig} from "../../my-nft-gen/src/effects/primaryEffects/mappedFrames/MappedFramesConfig.js";
import {MappedFramesEffect} from "../../my-nft-gen/src/effects/primaryEffects/mappedFrames/MappedFramesEffect.js";
import {Point2D} from "../../my-nft-gen/src/core/layer/configType/Point2D.js";
import {ColorPicker} from "../../my-nft-gen/src/core/layer/configType/ColorPicker.js";
import {getRandomFromArray, getRandomIntInclusive} from "../../my-nft-gen/src/core/math/random.js";
import {
    EncircledSpiralEffect
} from "../../my-nft-gen/src/effects/primaryEffects/encircledSpiral/EncircledSpiralEffect.js";
import {
    EncircledSpiralConfig
} from "../../my-nft-gen/src/effects/primaryEffects/encircledSpiral/EncircledSpiralConfig.js";
import {findPointByAngleAndCircle} from "../../my-nft-gen/src/core/math/drawingMath.js";
import {PixelateKeyFrameEffect} from "../../my-nft-gen/src/effects/keyFrameEffects/pixelate/PixelateKeyFrameEffect.js";
import {PixelateKeyFrameConfig} from "../../my-nft-gen/src/effects/keyFrameEffects/pixelate/PixelateKeyFrameConfig.js";
import {findValue} from "../../my-nft-gen/src/core/math/findValue.js";
import {FadeEffect} from "../../my-nft-gen/src/effects/secondaryEffects/fade/FadeEffect.js";
import {FadeConfig} from "../../my-nft-gen/src/effects/secondaryEffects/fade/FadeConfig.js";


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

    const ringSpoke = 45;

    const baseRadius = 100;
    const burstMax = 4;

    const percentageIncrease = 2;
    const growthConstant = 0.0001;
    const burstGrowth = growthConstant * percentageIncrease;

    const numberOfRings = 4;

    const stroke = 1;
    const thickness =1;

    const layerOpacity = 0.7;
    const underLayerOpacity = 0.6;

    const secondaryEffects = [];

    for (let i = 0; i < 10; i++) {
        secondaryEffects.push(new LayerConfig({
            effect: CRTDegaussEffect,
            percentChance: getRandomIntInclusive(20,70),
            currentEffectConfig: new CRTDegaussConfig({
                keyFrames: [getRandomIntInclusive(0,1800)],
                glitchFrameCount: [getRandomIntInclusive(15,75)],
                sectionHeight: [1, 5, 10, 15],
                offset: {lower: 5, upper: 15},
                direction: [-1, 1],
                glitchTimes: {lower: 1, upper: 5},
                backgroundRed: {lower: 0, upper: 0},
                backgroundGreen: {lower: 0, upper: 0},
                backgroundBlue: {lower: 0, upper: 0},
                backgroundAlpha: {lower: 0, upper: 0},
            }),
        }));
    }
    for (let i = 0; i < 10; i++) {
        secondaryEffects.push(new LayerConfig({
            effect: PixelateKeyFrameEffect,
            percentChance: getRandomIntInclusive(20,70),
            currentEffectConfig: new PixelateKeyFrameConfig({
                keyFrames: [getRandomIntInclusive(0,1800)],
                glitchFrameCount: [getRandomIntInclusive(15,75)],
                lowerRange: { lower: 0, upper: 0 },
                upperRange: { lower:5, upper: 15 },
                times: { lower: 1, upper: 5 },
            }),
        }));
    }

    for (let burst = 1; burst <= burstMax; burst++) {

        const color = getRandomFromArray(neonLights.colorBucket);

        for (let i = 0; i < 360; i = i + ringSpoke) {
            await myTestProject.addPrimaryEffect({
                layerConfig: new LayerConfig({
                    effect: EncircledSpiralEffect,
                    percentChance: 100,
                    currentEffectConfig: new EncircledSpiralConfig({
                        invertLayers: true,
                        layerOpacity: layerOpacity,
                        underLayerOpacity: underLayerOpacity,
                        startAngle: {lower: 0, upper: 360},
                        numberOfRings: {lower: numberOfRings, upper: numberOfRings},
                        stroke: stroke,
                        thickness: thickness,
                        sparsityFactor: [ringSpoke],
                        sequencePixelConstant: {
                            lower: (finalSize) => finalSize.shortestSide * (growthConstant + (burstGrowth * burst)),
                            upper: (finalSize) => finalSize.shortestSide * (growthConstant + (burstGrowth * burst)),
                        },
                        sequence: [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987, 1597, 2584, 4181],
                        minSequenceIndex: [10],
                        numberOfSequenceElements: [4],
                        speed: {lower: 1, upper: 1},
                        accentRange: {bottom: {lower: 0, upper: 0}, top: {lower: 0, upper: 0}},
                        blurRange: {bottom: {lower: 1, upper: 1}, top: {lower: 1, upper: 1}},
                        featherTimes: {lower:1, upper: 1},
                        center: findPointByAngleAndCircle(new Point2D(1080 / 2, 1920 / 2), i, baseRadius * (burst * percentageIncrease)),
                        innerColor: new ColorPicker(ColorPicker.SelectionType.neutralBucket),
                        outerColor: new ColorPicker(ColorPicker.SelectionType.color, color),
                    }),
                    possibleSecondaryEffects: secondaryEffects
                }),
            });
        }
    }

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
            percentChance: 25,
            currentEffectConfig: new CRTScanLinesConfig({
                lines: {lower: 100, upper: 100},
                loopTimes: {lower: 1, upper: 2},
                brightness: {lower: 4000, upper: 5000},
                thickness: {lower: 12, upper: 12},
                lineBlur: {lower: 3, upper: 3},
            }),
        }),
    });


    await myTestProject.addFinalEffect({
        layerConfig: new LayerConfig({
            effect: CRTShadowEffect,
            percentChance: 100,
            currentEffectConfig: new CRTShadowConfig({
                shadowOpacityRange: {bottom: {lower: 0.7, upper: 0.7}, top: {lower: 0.8, upper: 0.8}},
                linesOpacityRange: {bottom: {lower: 0.2, upper: 0.2}, top: {lower: 0.3, upper: 0.3}},
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
                corner: {lower: 0.15, upper: 0.15},
            }),
        }),
    });

    promiseArray.push(myTestProject.generateRandomLoop());
};

await createComposition(neonLights);

await Promise.all(promiseArray);
