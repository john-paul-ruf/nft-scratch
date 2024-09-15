import {neonLights} from "./assets/color-scheme-store.js";
import {Project} from "../../my-nft-gen/src/app/Project.js";
import {LayerConfig} from "../../my-nft-gen/src/core/layer/LayerConfig.js";
import {ColorPicker} from "../../my-nft-gen/src/core/layer/configType/ColorPicker.js";
import {getRandomIntInclusive} from "../../my-nft-gen/src/core/math/random.js";
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
import {RedEyeConfig} from "../../my-nft-gen/src/effects/primaryEffects/red-eye/RedEyeConfig.js";
import {RedEyeEffect} from "../../my-nft-gen/src/effects/primaryEffects/red-eye/RedEyeEffect.js";
import {Point2D} from "../../my-nft-gen/src/core/layer/configType/Point2D.js";
import {CRTBarrelEffect} from "../../my-nft-gen/src/effects/finalImageEffects/crtBarrel/CRTBarrelEffect.js";
import {CRTBarrelConfig} from "../../my-nft-gen/src/effects/finalImageEffects/crtBarrel/CRTBarrelConfig.js";

const promiseArray = [];

const createComposition = async (colorScheme) => {
    const myTestProject = new Project({
        artist: 'John Ruf',
        projectName: 'fuzz-flare',
        projectDirectory: 'src/fuzz-flare/',
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
            })
        }),
    });

    await myTestProject.addPrimaryEffect({
        layerConfig: new LayerConfig({
            effect: RedEyeEffect,
            percentChance: 100,
            currentEffectConfig: new RedEyeConfig({
                invertLayers: true,
                layerOpacity: 0.8,
                underLayerOpacity: 0.6,
                center: new Point2D(1080 / 2, 1920 / 2),
                innerColor: new ColorPicker(ColorPicker.SelectionType.neutralBucket),
                outerColor: new ColorPicker(ColorPicker.SelectionType.colorBucket),
                stroke: 1,
                thickness: 0,
                sparsityFactor: [8],
                innerRadius: getRandomIntInclusive(myTestProject.shortestSideInPixels * 0.2, myTestProject.shortestSideInPixels * 0.2),
                outerRadius: getRandomIntInclusive(myTestProject.shortestSideInPixels * 0.70, myTestProject.shortestSideInPixels * 0.8),
                possibleJumpRangeInPixels: {lower: 10, upper: 30},
                lineLength: {lower: 200, upper: 300},
                numberOfLoops: {lower: 1, upper: 1},
                accentRange: {bottom: {lower: 0, upper: 0}, top: {lower: 0, upper: 0}},
                blurRange: {bottom: {lower: 0, upper: 0}, top: {lower: 0, upper: 0}},
                featherTimes: {lower: 1, upper: 1},
            })
        }),
    });

    await myTestProject.addPrimaryEffect({
        layerConfig: new LayerConfig({
            effect: RedEyeEffect,
            percentChance: 100,
            currentEffectConfig: new RedEyeConfig({
                invertLayers: true,
                layerOpacity: 0.8,
                underLayerOpacity: 0.6,
                center: new Point2D(1080 / 2, 1920 / 2),
                innerColor: new ColorPicker(ColorPicker.SelectionType.neutralBucket),
                outerColor: new ColorPicker(ColorPicker.SelectionType.colorBucket),
                stroke: 1,
                thickness: 0,
                sparsityFactor: [8],
                innerRadius: getRandomIntInclusive(myTestProject.shortestSideInPixels * 0.2, myTestProject.shortestSideInPixels * 0.2),
                outerRadius: getRandomIntInclusive(myTestProject.shortestSideInPixels * 0.70, myTestProject.shortestSideInPixels * 0.8),
                possibleJumpRangeInPixels: {lower: 10, upper: 30},
                lineLength: {lower: 200, upper: 300},
                numberOfLoops: {lower: 2, upper: 2},
                accentRange: {bottom: {lower: 0, upper: 0}, top: {lower: 0, upper: 0}},
                blurRange: {bottom: {lower: 0, upper: 0}, top: {lower: 0, upper: 0}},
                featherTimes: {lower: 1, upper: 1},
            })
        }),
    });

    await myTestProject.addPrimaryEffect({
        layerConfig: new LayerConfig({
            effect: RedEyeEffect,
            percentChance: 100,
            currentEffectConfig: new RedEyeConfig({
                invertLayers: true,
                layerOpacity: 0.8,
                underLayerOpacity: 0.6,
                center: new Point2D(1080 / 2, 1920 / 2),
                innerColor: new ColorPicker(ColorPicker.SelectionType.neutralBucket),
                outerColor: new ColorPicker(ColorPicker.SelectionType.colorBucket),
                stroke: 1,
                thickness: 0,
                sparsityFactor: [8],
                innerRadius: getRandomIntInclusive(myTestProject.shortestSideInPixels * 0.2, myTestProject.shortestSideInPixels * 0.2),
                outerRadius: getRandomIntInclusive(myTestProject.shortestSideInPixels * 0.70, myTestProject.shortestSideInPixels * 0.8),
                possibleJumpRangeInPixels: {lower: 10, upper: 30},
                lineLength: {lower: 200, upper: 300},
                numberOfLoops: {lower: 3, upper: 3},
                accentRange: {bottom: {lower: 0, upper: 0}, top: {lower: 0, upper: 0}},
                blurRange: {bottom: {lower: 0, upper: 0}, top: {lower: 0, upper: 0}},
                featherTimes: {lower: 1, upper: 1},
            })
        }),
    });

    await myTestProject.addPrimaryEffect({
        layerConfig: new LayerConfig({
            effect: RedEyeEffect,
            percentChance: 100,
            currentEffectConfig: new RedEyeConfig({
                invertLayers: true,
                layerOpacity: 0.8,
                underLayerOpacity: 0.6,
                center: new Point2D(1080 / 2, 1920 / 2),
                innerColor: new ColorPicker(ColorPicker.SelectionType.neutralBucket),
                outerColor: new ColorPicker(ColorPicker.SelectionType.colorBucket),
                stroke: 1,
                thickness: 0,
                sparsityFactor: [8],
                innerRadius: getRandomIntInclusive(myTestProject.shortestSideInPixels * 0.2, myTestProject.shortestSideInPixels * 0.2),
                outerRadius: getRandomIntInclusive(myTestProject.shortestSideInPixels * 0.70, myTestProject.shortestSideInPixels * 0.8),
                possibleJumpRangeInPixels: {lower: 10, upper: 30},
                lineLength: {lower: 200, upper: 300},
                numberOfLoops: {lower: 4, upper: 4},
                accentRange: {bottom: {lower: 0, upper: 0}, top: {lower: 0, upper: 0}},
                blurRange: {bottom: {lower: 0, upper: 0}, top: {lower: 0, upper: 0}},
                featherTimes: {lower: 1, upper: 1},
            })
        }),
    });

    await myTestProject.addPrimaryEffect({
        layerConfig: new LayerConfig({
            effect: MappedFramesEffect,
            percentChance: 100,
            currentEffectConfig: new MappedFramesConfig({
                folderName: 'C:\\Users\\neomo\\WebstormProjects\\nft-scratch\\src\\assets\\mappedFrames\\seer\\',
                layerOpacity: [0.7],
                buffer: [200],
                loopTimesMultiStep: [
                    new MultiStepDefinitionConfig({
                        minPercentage: 0,
                        maxPercentage: 45,
                        max: new Range(1, 1),
                        times: new Range(12, 12),
                    }),
                    new MultiStepDefinitionConfig({
                        minPercentage: 45,
                        maxPercentage: 55,
                        max: new Range(1, 1),
                        times: new Range(1, 1),
                    }),
                    new MultiStepDefinitionConfig({
                        minPercentage: 55,
                        maxPercentage: 100,
                        max: new Range(1, 1),
                        times: new Range(12, 12),
                    })
                ],
            }),
            possibleSecondaryEffects: [
                new LayerConfig({
                    effect: CRTDegaussEffect,
                    percentChance: 100,
                    currentEffectConfig: new CRTDegaussConfig({
                        keyFrames: [800, 900, 1000],
                        glitchFrameCount: [15, 25, 40],
                        sectionHeight: [5, 10, 15],
                        offset: {lower: 10, upper: 25},
                        direction: [-1, 1],
                        glitchTimes: {lower: 1, upper: 2},
                        backgroundRed: {lower: 0, upper: 0},
                        backgroundGreen: {lower: 0, upper: 0},
                        backgroundBlue: {lower: 0, upper: 0},
                        backgroundAlpha: {lower: 0, upper:0},
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
            effect: CRTDegaussEffect,
            percentChance: 100,
            currentEffectConfig: new CRTDegaussConfig({
                keyFrames: [100, 1700],
                glitchFrameCount: [15, 25, 40],
                sectionHeight: [5, 10, 15],
                offset: {lower: 2, upper: 8},
                direction: [-1, 1],
                glitchTimes: {lower: 1, upper: 1},
                backgroundRed: {lower: 0, upper: 0},
                backgroundGreen: {lower: 0, upper: 0},
                backgroundBlue: {lower: 0, upper: 0},
                backgroundAlpha: {lower: 1, upper: 1},
            }),
        }),
    });



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
                lineRed: {lower: 20, upper: 20},
                lineGreen: {lower: 20, upper: 20},
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
                strength: {lower: 0.4, upper: 0.4},
                edgeThreshold: {lower: 0.04, upper: 0.04},
                corner: {lower: 0.2, upper: 0.2},
            }),
        }),
    });

    promiseArray.push(myTestProject.generateRandomLoop());
};

await createComposition(neonLights);

await Promise.all(promiseArray);
