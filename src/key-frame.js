import {neonLights} from "./assets/color-scheme-store.js";
import {Project} from "../../my-nft-gen/src/app/Project.js";
import {LayerConfig} from "../../my-nft-gen/src/core/layer/LayerConfig.js";
import {CRTScanLinesEffect} from "../../my-nft-gen/src/effects/finalImageEffects/crtScanLines/CRTScanLinesEffect.js";
import {CRTScanLinesConfig} from "../../my-nft-gen/src/effects/finalImageEffects/crtScanLines/CRTScanLinesConfig.js";
import {CRTDegaussConfig} from "../../my-nft-gen/src/effects/keyFrameEffects/crtDegaussEvent/CRTDegaussConfig.js";
import {CRTDegaussEffect} from "../../my-nft-gen/src/effects/keyFrameEffects/crtDegaussEvent/CRTDegaussEffect.js";
import {CRTShadowConfig} from "../../my-nft-gen/src/effects/finalImageEffects/crtShadow/CRTShadowConfig.js";
import {CRTShadowEffect} from "../../my-nft-gen/src/effects/finalImageEffects/crtShadow/CRTShadowEffect.js";
import {CRTBarrelConfig} from "../../my-nft-gen/src/effects/finalImageEffects/crtBarrel/CRTBarrelConfig.js";
import {CRTBarrelEffect} from "../../my-nft-gen/src/effects/finalImageEffects/crtBarrel/CRTBarrelEffect.js";
import {Point2D} from "../../my-nft-gen/src/core/layer/configType/Point2D.js";
import {ColorPicker} from "../../my-nft-gen/src/core/layer/configType/ColorPicker.js";
import {getRandomIntInclusive} from "../../my-nft-gen/src/core/math/random.js";
import {RedEyeEffect} from "../../my-nft-gen/src/effects/primaryEffects/red-eye/RedEyeEffect.js";
import {RedEyeConfig} from "../../my-nft-gen/src/effects/primaryEffects/red-eye/RedEyeConfig.js";
import {ImageOverlayEffect} from "../../my-nft-gen/src/effects/primaryEffects/imageOverlay/ImageOverlayEffect.js";
import {ImageOverlayConfig} from "../../my-nft-gen/src/effects/primaryEffects/imageOverlay/ImageOverlayConfig.js";


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

    const secondaryEffects = [];

    for (let i = 0; i < 100; i++) {
        secondaryEffects.push(new LayerConfig({
            effect: CRTDegaussEffect,
            percentChance: getRandomIntInclusive(25, 25),
            currentEffectConfig: new CRTDegaussConfig({
                keyFrames: [getRandomIntInclusive(0, 1740)],
                glitchFrameCount: [getRandomIntInclusive(30, 60)],
                sectionHeight: [1, 5, 10, 15],
                offset: {lower: 5, upper: 30},
                direction: [-1, 1],
                glitchTimes: {lower: 1, upper: 5},
                backgroundRed: {lower: 0, upper: 0},
                backgroundGreen: {lower: 0, upper: 0},
                backgroundBlue: {lower: 0, upper: 0},
                backgroundAlpha: {lower: 0, upper: 0},
            }),
        }));
    }


    let redEyeCount = 4;

    for (let i = 0; i < redEyeCount; i++) {
        await myTestProject.addPrimaryEffect({
            layerConfig: new LayerConfig({
                effect: RedEyeEffect,
                percentChance: 100,
                currentEffectConfig: new RedEyeConfig({
                    invertLayers: true,
                    layerOpacity: 0.8,
                    underLayerOpacity: 0.7,
                    center: new Point2D(1080 / 2, 1920 / 2),
                    innerColor: new ColorPicker(ColorPicker.SelectionType.neutralBucket),
                    outerColor: new ColorPicker(ColorPicker.SelectionType.colorBucket),
                    stroke: 1,
                    thickness: 1,
                    sparsityFactor: [9, 10, 12],
                    innerRadius: getRandomIntInclusive(myTestProject.shortestSideInPixels * 0.25, myTestProject.shortestSideInPixels * 0.25),
                    outerRadius: getRandomIntInclusive(myTestProject.shortestSideInPixels * 0.40, myTestProject.shortestSideInPixels * 0.40),
                    possibleJumpRangeInPixels: {lower: 10, upper: 20},
                    lineLength: {lower: 150, upper: 300},
                    numberOfLoops: {lower: 1, upper: 2},
                    accentRange: {bottom: {lower: 1, upper: 1}, top: {lower: 4, upper: 4}},
                    blurRange: {bottom: {lower: 1, upper: 1}, top: {lower: 3, upper: 3}},
                    featherTimes: {lower: 3, upper: 3},
                }),
                possibleSecondaryEffects: []
            }),
        });
    }

    redEyeCount = 6;

    for (let i = 0; i < redEyeCount; i++) {
        await myTestProject.addPrimaryEffect({
            layerConfig: new LayerConfig({
                effect: RedEyeEffect,
                percentChance: 100,
                currentEffectConfig: new RedEyeConfig({
                    invertLayers: true,
                    layerOpacity: 0.8,
                    underLayerOpacity: 0.7,
                    center: new Point2D(1080 / 2, 1920 / 2),
                    innerColor: new ColorPicker(ColorPicker.SelectionType.neutralBucket),
                    outerColor: new ColorPicker(ColorPicker.SelectionType.colorBucket),
                    stroke: 1,
                    thickness: 1,
                    sparsityFactor: [9, 10, 12],
                    innerRadius: getRandomIntInclusive(myTestProject.shortestSideInPixels * 0.425, myTestProject.shortestSideInPixels * 0.425),
                    outerRadius: getRandomIntInclusive(myTestProject.shortestSideInPixels * 0.7, myTestProject.shortestSideInPixels * 0.7),
                    possibleJumpRangeInPixels: {lower: 10, upper: 20},
                    lineLength: {lower: 150, upper: 300},
                    numberOfLoops: {lower: 1, upper: 2},
                    accentRange: {bottom: {lower: 1, upper: 1}, top: {lower: 4, upper: 4}},
                    blurRange: {bottom: {lower: 1, upper: 1}, top: {lower: 3, upper: 3}},
                    featherTimes: {lower: 3, upper: 3},
                }),
                possibleSecondaryEffects: []
            }),
        });
    }

    await myTestProject.addPrimaryEffect({
        layerConfig: new LayerConfig({
            effect: ImageOverlayEffect,
            percentChance: 100,
            currentEffectConfig: new ImageOverlayConfig({
                folderName: './src/assets/imageOverlay/working/',
                layerOpacity: [0.7],
                buffer: [100],
            }),
            possibleSecondaryEffects: secondaryEffects
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
