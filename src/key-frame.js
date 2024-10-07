import {activatingSahasrara, vibrantHalloween} from "./assets/color-scheme-store.js";
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
import {RedEyeEffect} from "../../my-nft-gen/src/effects/primaryEffects/red-eye/RedEyeEffect.js";
import {RedEyeConfig} from "../../my-nft-gen/src/effects/primaryEffects/red-eye/RedEyeConfig.js";
import {Point2D} from "../../my-nft-gen/src/core/layer/configType/Point2D.js";
import {ColorPicker} from "../../my-nft-gen/src/core/layer/configType/ColorPicker.js";
import {getRandomIntInclusive} from "../../my-nft-gen/src/core/math/random.js";

const promiseArray = [];

const createComposition = async (colorScheme) => {
    const myTestProject = new Project({
        artist: 'John Ruf',
        projectName: 'key-frame',
        projectDirectory: 'src/key-frame',
        neutrals: ['#FF6F00'],
        backgrounds: ['#000000'],
        numberOfFrame: 1800,
        colorScheme: colorScheme,
    });

    const loopCount = 40;
    const innerRadiusRange = new Range(100,200);
    const outerRadius = 1200;
    const loopRange = new Range(1, 5);
    const stroke = 2;
    const thickness = 1;
    const sparsityFactor = [12, 15, 18];
    const possibleJumpRangeInPixels = { lower: 10, upper: 30 };
    const lineLength = { lower: 150, upper: 550 };


    for(let i = 0; i < loopCount; i++){
        await myTestProject.addPrimaryEffect({
            layerConfig: new LayerConfig({
                effect: RedEyeEffect,
                percentChance: 100,
                currentEffectConfig: new RedEyeConfig({
                    invertLayers: true,
                    layerOpacity: 0.7,
                    underLayerOpacity: 0.75,
                    center: new Point2D(1080 / 2, 1920 / 2),
                    innerColor: new ColorPicker(ColorPicker.SelectionType.neutralBucket),
                    outerColor: new ColorPicker(ColorPicker.SelectionType.colorBucket),
                    stroke: stroke,
                    thickness: thickness,
                    sparsityFactor: sparsityFactor,
                    innerRadius: getRandomIntInclusive(innerRadiusRange.lower, innerRadiusRange.upper),
                    outerRadius: outerRadius,
                    possibleJumpRangeInPixels: possibleJumpRangeInPixels,
                    lineLength:lineLength,
                    numberOfLoops: loopRange,
                    accentRange: { bottom: { lower: 1, upper: 1 }, top: { lower: 3, upper: 6 } },
                    blurRange: { bottom: { lower: 1, upper: 1 }, top: { lower: 1, upper: 1 } },
                    featherTimes: { lower: 2, upper: 6 },
                }),
                possibleSecondaryEffects: [
                    
                ]
            }),
        });
    }


    await myTestProject.addPrimaryEffect({
        layerConfig: new LayerConfig({
            effect: MappedFramesEffect,
            percentChance: 100,
            currentEffectConfig: new MappedFramesConfig({
                folderName: 'C:\\Users\\neomo\\WebstormProjects\\nft-scratch\\src\\assets\\mappedFrames\\pumpkin\\',
                layerOpacity: [0.85],
                buffer: [0],
                loopTimesMultiStep: [
                    new MultiStepDefinitionConfig({
                        minPercentage: 0,
                        maxPercentage: 33,
                        max: new Range(1, 1),
                        times: new Range(20, 20),
                    }),
                    new MultiStepDefinitionConfig({
                        minPercentage: 33,
                        maxPercentage: 66,
                        max: new Range(1, 1),
                        times: new Range(1, 1),
                    }),
                    new MultiStepDefinitionConfig({
                        minPercentage: 66,
                        maxPercentage: 100,
                        max: new Range(1, 1),
                        times: new Range(20, 20),
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
                loopTimes: {lower: 1, upper: 3},
                brightness: {lower: 1500, upper: 2500},
                thickness: {lower: 4, upper: 4},
                lineBlur: {lower: 1, upper: 1},
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

await createComposition(vibrantHalloween);

await Promise.all(promiseArray);
