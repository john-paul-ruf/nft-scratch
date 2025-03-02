import {Project} from "my-nft-gen/src/app/Project.js";
import {createOrbElement} from "./complex-elements/orbs.js";
import {getMultiStep} from "./util/multistep.js";
import {createDegaussEffects} from "./util/glitch.js";
import {MultiStepDefinitionConfig} from "my-nft-gen/src/core/math/MultiStepDefinitionConfig.js";
import {MappedFramesConfig} from "my-nft-gen/src/effects/primaryEffects/mappedFrames/MappedFramesConfig.js";
import {MappedFramesEffect} from "my-nft-gen/src/effects/primaryEffects/mappedFrames/MappedFramesEffect.js";
import {FuzzyRipplesConfig} from "my-nft-gen/src/effects/primaryEffects/fuzzyRipples/FuzzyRipplesConfig.js";
import {FuzzyRipplesEffect} from "my-nft-gen/src/effects/primaryEffects/fuzzyRipples/FuzzyRipplesEffect.js";
import {LayerConfig} from "my-nft-gen/src/core/layer/LayerConfig.js";
import {Range} from "my-nft-gen/src/core/layer/configType/Range.js";

import {
    activatingVishuddha,
    binahUnderstanding,
    chesedKindness,
    chokhmahWisdom, eternalRise,
    gevurahSeverity,
    hodSplendor,
    keterCrown,
    malkuthKingdom,
    neonHarmony,
    netzachVictory,
    tiferetBeauty,
    yesodFoundation
} from "./assets/color-scheme-store.js";
import {ViewportEffect} from "my-nft-gen/src/effects/primaryEffects/viewport/ViewportEffect.js";
import {ViewportConfig} from "my-nft-gen/src/effects/primaryEffects/viewport/ViewportConfig.js";
import {ColorPicker} from "my-nft-gen/src/core/layer/configType/ColorPicker.js";
import {CRTShadowEffect} from "my-nft-gen/src/effects/finalImageEffects/crtShadow/CRTShadowEffect.js";
import {CRTShadowConfig} from "my-nft-gen/src/effects/finalImageEffects/crtShadow/CRTShadowConfig.js";
import {ModulateEffect} from "my-nft-gen/src/effects/finalImageEffects/modulate/ModulateEffect.js";
import {ModulateConfig} from "my-nft-gen/src/effects/finalImageEffects/modulate/ModulateConfig.js";
import {CRTScanLinesEffect} from "my-nft-gen/src/effects/finalImageEffects/crtScanLines/CRTScanLinesEffect.js";
import {CRTScanLinesConfig} from "my-nft-gen/src/effects/finalImageEffects/crtScanLines/CRTScanLinesConfig.js";
import {StaticPathEffect} from "my-nft-gen/src/effects/primaryEffects/static-path/StaticPathEffect.js";
import {StaticPathConfig} from "my-nft-gen/src/effects/primaryEffects/static-path/StaticPathConfig.js";

import {GlowEffect} from "my-nft-gen/src/effects/secondaryEffects/glow/GlowEffect.js";
import {GlowConfig} from "my-nft-gen/src/effects/secondaryEffects/glow/GlowConfig.js";
import {getRandomIntInclusive} from "my-nft-gen/src/core/math/random.js";
import {findPointByAngleAndCircle} from "my-nft-gen/src/core/math/drawingMath.js";
import {createDecayingOrbElement} from "./complex-elements/decayingOrbs.js";
import {ColorScheme} from "my-nft-gen/src/core/color/ColorScheme.js";

import {
    EncircledSpiralEffect
} from "my-nft-gen/src/effects/primaryEffects/encircledSpiral/EncircledSpiralEffect.js";
import {
    EncircledSpiralConfig
} from "my-nft-gen/src/effects/primaryEffects/encircledSpiral/EncircledSpiralConfig.js";
import {Point2D} from "my-nft-gen/src/core/layer/configType/Point2D.js";

const promiseArray = [];
const topYBuffer = 10;
const backgroundHex = '#1C1C1C'

const createComposition = async (colorScheme) => {
    const myTestProject = new Project({
        artist: 'John Ruf',
        projectName: 'operator-override',
        projectDirectory: 'src/scratch',
        neutrals: ['#FFFFFF'],
        backgrounds: [backgroundHex],
        numberOfFrame: 1800,
        colorScheme: colorScheme,
        longestSideInPixels: 1920,
        shortestSideInPixels: 1080,
        isHorizontal: false,
        maxConcurrentFrameBuilderThreads: 2,

    });

    const keterPoint = {x: 540, y: 220 + topYBuffer};
    const binahPoint = {x: 240, y: 420 + topYBuffer};
    const chokhmahPoint = {x: 840, y: 420 + topYBuffer};
    const gevurahPoint = {x: 240, y: 780 + topYBuffer};
    const chesedPoint = {x: 840, y: 780 + topYBuffer};
    const tiferetPoint = {x: 540, y: 960 + topYBuffer};
    const hodPoint = {x: 240, y: 1130 + topYBuffer};
    const netzachPoint = {x: 840, y: 1130 + topYBuffer};
    const yesodPoint = {x: 540, y: 1330 + topYBuffer};
    const malkuthPoint = {x: 540, y: 1700 + topYBuffer};
    const daatPoint = {x: 540, y: 600 + topYBuffer}

    const keterColor = '#FFD700';
    const binahColor = '#6A0DAD';
    const chokhmahColor = '#1F51FF';
    const gevurahColor = '#D70000';
    const chesedColor = '#00C957';
    const tiferetColor = '#FFAE42';
    const hodColor = '#9932CC';
    const netzachColor = '#FF4500';
    const yesodColor = '#00FFFF';
    const malkuthColor = '#8B4513';
    const daatColor = '#0F3D0F';

    const keterHighlight = '#FFFFFF';
    const binahHighlight = '#D8BFD8';
    const chokhmahHighlight = '#87CEEB';
    const gevurahHighlight = '#FF4500';
    const chesedHighlight = '#98FF98';
    const tiferetHighlight = '#FFF44F';
    const hodHighlight = '#9932CC';
    const netzachHighlight = '#FF8C00';
    const yesodHighlight = '#7DF9FF';
    const malkuthHighlight = '#DAA520';
    const daatHighlight = '#32CD32';

    const highlight = '#FFFFFF'

    const pathColor = '#9F2386'

    const lineCount = 10;

    const pulseStroke = 4;
    const pulseThickness = 8;


    const createRings = async ({
                                   center = new Point2D(0, 0),
                                   colorScheme = new ColorScheme(),
                                   ringSpoke = 45,

                                   outerRadius = 160,
                                   secondRadiusReduction = 0.75,
                                   secondRadius = outerRadius * secondRadiusReduction,

                                   thirdRadiusReduction = 0.5,
                                   thirdRadius = outerRadius * thirdRadiusReduction,


                                   firstRingSpeed = 4,
                                   secondRingSpeed = 6,
                                   thirdRingSPeed = 8,
                                   fourthRingSpeed = 4,

                                   numberOfRings = 4,

                                   stroke = 1,
                                   thickness = 0,

                                   underLayerOpacity = 0.7,
                                   opacity = 0,
                                   sequencePixelConstant = {
                                       lower: (finalSize) => finalSize.shortestSide * 0.0002,
                                       upper: (finalSize) => finalSize.shortestSide * 0.0002,
                                   }
                               }) => {

        const outerRingColor = colorScheme.getColorFromBucket();
        const innerRingColor = colorScheme.getColorFromBucket();
        const thirdRingColor = colorScheme.getColorFromBucket();
        const fourthRingColor = colorScheme.getColorFromBucket();

        await myTestProject.addPrimaryEffect({
            layerConfig: new LayerConfig({
                effect: EncircledSpiralEffect,
                percentChance: 100,
                currentEffectConfig: new EncircledSpiralConfig({
                    invertLayers: true,
                    layerOpacity: opacity,
                    underLayerOpacity: underLayerOpacity,
                    startAngle: {lower: 0, upper: 360},
                    numberOfRings: {lower: numberOfRings, upper: numberOfRings},
                    stroke: stroke,
                    thickness: thickness,
                    sparsityFactor: [ringSpoke],
                    sequencePixelConstant: sequencePixelConstant,
                    sequence: [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987, 1597, 2584, 4181],
                    minSequenceIndex: [10],
                    numberOfSequenceElements: [3],
                    speed: {lower: fourthRingSpeed, upper: fourthRingSpeed},
                    center: center,
                    innerColor: new ColorPicker(ColorPicker.SelectionType.color, '#FFFFFF'),
                    outerColor: new ColorPicker(ColorPicker.SelectionType.color, fourthRingColor),
                    accentRange: {bottom: {lower: 0, upper: 0}, top: {lower: 0, upper: 0}},
                    blurRange: {bottom: {lower: 0, upper: 0}, top: {lower: 0, upper: 0}},
                    featherTimes: {lower: 0, upper: 0},
                }),
            }),
        });

        /*for (let i = 0; i < 360; i = i + ringSpoke) {
            await myTestProject.addPrimaryEffect({
                layerConfig: new LayerConfig({
                    effect: EncircledSpiralEffect,
                    percentChance: 100,
                    currentEffectConfig: new EncircledSpiralConfig({
                        invertLayers: true,
                        layerOpacity: opacity,
                        underLayerOpacity: underLayerOpacity,
                        startAngle: {lower: 0, upper: 360},
                        numberOfRings: {lower: numberOfRings, upper: numberOfRings},
                        stroke: stroke,
                        thickness: thickness,
                        sparsityFactor: [ringSpoke],
                        sequencePixelConstant: sequencePixelConstant,
                        sequence: [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987, 1597, 2584, 4181],
                        minSequenceIndex: [10],
                        numberOfSequenceElements: [4],
                        speed: {lower: firstRingSpeed, upper: firstRingSpeed},
                        center: findPointByAngleAndCircle(center, i, outerRadius),
                        innerColor: new ColorPicker(ColorPicker.SelectionType.color, '#FFFFFF'),
                        outerColor: new ColorPicker(ColorPicker.SelectionType.color, outerRingColor),
                        accentRange: {bottom: {lower: 0, upper: 0}, top: {lower: 0, upper: 0}},
                        blurRange: {bottom: {lower: 0, upper: 0}, top: {lower: 0, upper: 0}},
                        featherTimes: {lower: 0, upper: 0},
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
                        underLayerOpacity: underLayerOpacity,
                        startAngle: {lower: 0, upper: 360},
                        numberOfRings: {lower: numberOfRings, upper: numberOfRings},
                        stroke: stroke,
                        thickness: thickness,
                        sparsityFactor: [ringSpoke],
                        sequencePixelConstant: sequencePixelConstant,
                        sequence: [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987, 1597, 2584, 4181],
                        minSequenceIndex: [10],
                        numberOfSequenceElements: [3],
                        speed: {lower: secondRingSpeed, upper: secondRingSpeed},
                        center: findPointByAngleAndCircle(center, i, secondRadius),
                        innerColor: new ColorPicker(ColorPicker.SelectionType.color, '#FFFFFF'),
                        outerColor: new ColorPicker(ColorPicker.SelectionType.color, innerRingColor),
                        accentRange: {bottom: {lower: 0, upper: 0}, top: {lower: 0, upper: 0}},
                        blurRange: {bottom: {lower: 0, upper: 0}, top: {lower: 0, upper: 0}},
                        featherTimes: {lower: 0, upper: 0},
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
                        underLayerOpacity: underLayerOpacity,
                        startAngle: {lower: 0, upper: 360},
                        numberOfRings: {lower: numberOfRings, upper: numberOfRings},
                        stroke: stroke,
                        thickness: thickness,
                        sparsityFactor: [ringSpoke],
                        sequencePixelConstant: sequencePixelConstant,
                        sequence: [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987, 1597, 2584, 4181],
                        minSequenceIndex: [10],
                        numberOfSequenceElements: [2],
                        speed: {lower: thirdRingSPeed, upper: thirdRingSPeed},
                        center: findPointByAngleAndCircle(center, i, thirdRadius),
                        innerColor: new ColorPicker(ColorPicker.SelectionType.color, '#FFFFFF'),
                        outerColor: new ColorPicker(ColorPicker.SelectionType.color, thirdRingColor),
                        accentRange: {bottom: {lower: 0, upper: 0}, top: {lower: 0, upper: 0}},
                        blurRange: {bottom: {lower: 0, upper: 0}, top: {lower: 0, upper: 0}},
                        featherTimes: {lower: 0, upper: 0},
                    }),
                }),
            });
        } */
    };

    const placePath = async ({point1, point2, lineCount, color}) => {
        for (let i = 0; i < lineCount; i++) {
            await myTestProject.addPrimaryEffect({
                layerConfig: new LayerConfig({
                    effect: StaticPathEffect, percentChance: 100, currentEffectConfig: new StaticPathConfig({
                        invertLayers: true,
                        layerOpacity: 0.8,
                        underLayerOpacity: 0.7,
                        innerColor: new ColorPicker(ColorPicker.SelectionType.neutralBucket),
                        outerColor: new ColorPicker(ColorPicker.SelectionType.color, color),
                        stroke: 0,
                        thickness: 2,
                        lineLength: {lower: 15, upper: 15},
                        numberOfLoops: {lower: i, upper: i},
                        accentRange: {bottom: {lower: 2, upper: 2}, top: {lower: 8, upper: 8}},
                        blurRange: {bottom: {lower: 2, upper: 2}, top: {lower: 6, upper: 6}},
                        featherTimes: {lower: 4, upper: 4},
                        path: [point1, point2],
                    })
                }),
            });

            await myTestProject.addPrimaryEffect({
                layerConfig: new LayerConfig({
                    effect: StaticPathEffect, percentChance: 100, currentEffectConfig: new StaticPathConfig({
                        invertLayers: true,
                        layerOpacity: 0.8,
                        underLayerOpacity: 0.7,
                        innerColor: new ColorPicker(ColorPicker.SelectionType.neutralBucket),
                        outerColor: new ColorPicker(ColorPicker.SelectionType.color, color),
                        stroke: 0,
                        thickness: 2,
                        lineLength: {lower:15, upper: 15},
                        numberOfLoops: {lower: i, upper: i},
                        accentRange: {bottom: {lower: 2, upper: 2}, top: {lower: 8, upper: 6}},
                        blurRange: {bottom: {lower: 2, upper: 2}, top: {lower: 6, upper: 6}},
                        featherTimes: {lower: 4, upper: 4},
                        path: [point2, point1],
                    })
                }),
            });
        }
    }

    const createAllPaths = async () => {
        await placePath({
            point1: keterPoint,
            point2: chokhmahPoint,
            lineCount: lineCount,
            color: pathColor,
        });

        await placePath({
            point1: keterPoint,
            point2: binahPoint,
            lineCount: lineCount,
            color: pathColor,
        });

        await placePath({
            point1: keterPoint,
            point2: tiferetPoint,
            lineCount: lineCount,
            color: pathColor,
        });

        await placePath({
            point1: chokhmahPoint,
            point2: binahPoint,
            lineCount: lineCount,
            color: pathColor,
        });

        await placePath({
            point1: chokhmahPoint,
            point2: chesedPoint,
            lineCount: lineCount,
            color: pathColor,
        });

        await placePath({
            point1: chokhmahPoint,
            point2: tiferetPoint,
            lineCount: lineCount,
            color: pathColor,
        });

        await placePath({
            point1: binahPoint,
            point2: gevurahPoint,
            lineCount: lineCount,
            color: pathColor,
        });

        await placePath({
            point1: binahPoint,
            point2: tiferetPoint,
            lineCount: lineCount,
            color: pathColor,
        });

        await placePath({
            point1: chesedPoint,
            point2: gevurahPoint,
            lineCount: lineCount,
            color: pathColor,
        });

        await placePath({
            point1: chesedPoint,
            point2: tiferetPoint,
            lineCount: lineCount,
            color: pathColor,
        });

        await placePath({
            point1: chesedPoint,
            point2: netzachPoint,
            lineCount: lineCount,
            color: pathColor,
        });

        await placePath({
            point1: gevurahPoint,
            point2: tiferetPoint,
            lineCount: lineCount,
            color: pathColor,
        });

        await placePath({
            point1: gevurahPoint,
            point2: hodPoint,
            lineCount: lineCount,
            color: pathColor,
        });

        await placePath({
            point1: tiferetPoint,
            point2: netzachPoint,
            lineCount: lineCount,
            color: pathColor,
        });

        await placePath({
            point1: tiferetPoint,
            point2: hodPoint,
            lineCount: lineCount,
            color: pathColor,
        });

        await placePath({
            point1: tiferetPoint,
            point2: yesodPoint,
            lineCount: lineCount,
            color: pathColor,
        });

        await placePath({
            point1: netzachPoint,
            point2: hodPoint,
            lineCount: lineCount,
            color: pathColor,
        });

        await placePath({
            point1: netzachPoint,
            point2: yesodPoint,
            lineCount: lineCount,
            color: pathColor,
        });

        await placePath({
            point1: netzachPoint,
            point2: malkuthPoint,
            lineCount: lineCount,
            color: pathColor,
        });


        await placePath({
            point1: hodPoint,
            point2: yesodPoint,
            lineCount: lineCount,
            color: pathColor,
        });

        await placePath({
            point1: hodPoint,
            point2: malkuthPoint,
            lineCount: lineCount,
            color: pathColor,
        });

        await placePath({
            point1: yesodPoint,
            point2: malkuthPoint,
            lineCount: lineCount,
            color: pathColor,
        });
    }

    await createAllPaths();

    await createRings({center: daatPoint, colorScheme: activatingVishuddha})

    await createRings({center: malkuthPoint, colorScheme: malkuthKingdom})
    await createRings({center: yesodPoint, colorScheme: yesodFoundation})
    await createRings({center: netzachPoint, colorScheme: netzachVictory})
    await createRings({center: hodPoint, colorScheme: hodSplendor})
    await createRings({center: tiferetPoint, colorScheme: tiferetBeauty})
    await createRings({center: chesedPoint, colorScheme: chokhmahWisdom})
    await createRings({center: gevurahPoint, colorScheme: gevurahSeverity})
    await createRings({center: chokhmahPoint, colorScheme: chokhmahWisdom})
    await createRings({center: binahPoint, colorScheme: binahUnderstanding})
    await createRings({center: keterPoint, colorScheme: keterCrown})


    await createOrbElement({project: myTestProject, colorScheme: activatingVishuddha, center: daatPoint,})
    await createOrbElement({project: myTestProject, colorScheme: malkuthKingdom, center: malkuthPoint,})
    await createOrbElement({project: myTestProject, colorScheme: yesodFoundation, center: yesodPoint,})
    await createOrbElement({project: myTestProject, colorScheme: netzachVictory, center: netzachPoint,})
    await createOrbElement({project: myTestProject, colorScheme: hodSplendor, center: hodPoint,})
    await createOrbElement({project: myTestProject, colorScheme: tiferetBeauty, center: tiferetPoint,})
    await createOrbElement({project: myTestProject, colorScheme: chesedKindness, center: chesedPoint,})
    await createOrbElement({project: myTestProject, colorScheme: gevurahSeverity, center: gevurahPoint,})
    await createOrbElement({project: myTestProject, colorScheme: chokhmahWisdom, center: chokhmahPoint,})
    await createOrbElement({project: myTestProject, colorScheme: binahUnderstanding, center: binahPoint,})
    await createOrbElement({project: myTestProject, colorScheme: keterCrown, center: keterPoint,})



    await myTestProject.addFinalEffect({
        layerConfig: new LayerConfig({
            effect: CRTShadowEffect, percentChance: 100, currentEffectConfig: new CRTShadowConfig({
                shadowOpacityRange: {bottom: {lower: 0.7, upper: 0.7}, top: {lower: 0.9, upper: 0.9}},
                linesOpacityRange: {bottom: {lower: 0.6, upper: 0.6}, top: {lower: 0.9, upper: 0.9}},
                opacityTimes: {lower: 8, upper: 8},
                lineRed: {lower: 111, upper: 111},
                lineGreen: {lower: 0, upper: 0},
                lineBlue: {lower: 111, upper: 111},
                lineHeight: {lower: 0.25, upper: 0.25},
                edgePercentage: {lower: 0.10, upper: 0.10},
                maxLineHeight: {lower: 2, upper: 2},
                numberOfEdgeSections: {lower: 40, upper: 40},
            })
        }),
    });

    await myTestProject.addFinalEffect({
        layerConfig: new LayerConfig({
            effect: CRTScanLinesEffect, percentChance: 100, currentEffectConfig: new CRTScanLinesConfig({
                lines: {lower: 100, upper: 100},
                loopTimes: {lower: 1, upper: 2},
                brightnessRange: {bottom: {lower: 5, upper: 10}, top: {lower: 15, upper: 20}},
                brightnessTimes: {lower: 4, upper: 4},
                thicknessRange: {bottom: {lower: 2, upper: 4}, top: {lower: 6, upper: 8}},
                thicknessTimes: {lower: 4, upper: 4},
                lineBlurRange: {bottom: {lower: 20, upper: 25}, top: {lower: 30, upper: 40}},
                lineBlurTimes: {lower: 4, upper: 4},
                colorTintRange: {
                    redRange: {bottom: {lower: 1.3, upper: 1.6}, top: {lower: 1.5, upper: 2}},
                    greenRange: {bottom: {lower: 1, upper: 1}, top: {lower: 1, upper: 1}},
                    blueRange: {bottom: {lower: 1, upper: 1}, top: {lower: 1, upper: 1}},
                },
                colorTintTimes: {lower: 8, upper: 8},
                opacityRange: {bottom: {lower: 0.3, upper: 0.4}, top: {lower: 0.5, upper: 0.6}},
                opacityTimes: {lower: 4, upper: 4},
            }),
        }),
    });

    await myTestProject.addFinalEffect({
        layerConfig: new LayerConfig({
            effect: ModulateEffect, percentChance: 100, currentEffectConfig: new ModulateConfig({
                brightnessRange: {bottom: {lower: 1, upper: 1}, top: {lower: 1.2, upper: 1.2}},
                brightnessTimes: {lower: 8, upper: 8},
                saturationRange: {bottom: {lower: 1, upper: 1}, top: {lower: 1.5, upper: 1.5}},
                saturationTimes: {lower: 4, upper: 4},
                contrastRange: {bottom: {lower: 1, upper: 1}, top: {lower: 1.1, upper: 1.8}},
                contrastTimes: {lower: 8, upper: 8},
            }),
        }),
    });

    promiseArray.push(myTestProject.generateRandomLoop());
};

await createComposition(keterCrown);

await Promise.all(promiseArray);
