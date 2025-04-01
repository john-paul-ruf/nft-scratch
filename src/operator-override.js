import {Project} from "my-nft-gen/src/app/Project.js";
import {createOrbElement} from "./complex-elements/orbs.js";
import {getMultiStep} from "./util/multistep.js";
import {createDegaussEffects, createGlowEffects} from "./util/glitch.js";
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
import {AmpEffect} from "../../my-nft-gen/src/effects/primaryEffects/amp/AmpEffect.js";
import {AmpConfig} from "../../my-nft-gen/src/effects/primaryEffects/amp/AmpConfig.js";
import {RedEyeEffect} from "my-nft-gen/src/effects/primaryEffects/red-eye/RedEyeEffect.js";
import {RedEyeConfig} from "my-nft-gen/src/effects/primaryEffects/red-eye/RedEyeConfig.js";

const promiseArray = [];
const topYBuffer = 10;
const backgroundHex = '#1c2d1c'

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
        maxConcurrentFrameBuilderThreads: 1,

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

    const pathColor = '#1c8D1c'

    const lineCount = 10;

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
                        lineLength: {lower: 5, upper: 5},
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
                        lineLength: {lower: 5, upper: 5},
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

    const addSpiral = async (myTestProject, color, point) => {

        const sequencePixelConstant = {
            lower: (finalSize) => finalSize.shortestSide * 0.0005,
            upper: (finalSize) => finalSize.shortestSide * 0.0005,
        }

        await myTestProject.addPrimaryEffect({
            layerConfig: new LayerConfig({
                effect: EncircledSpiralEffect, percentChance: 100, currentEffectConfig: new EncircledSpiralConfig({
                    outerColor:new ColorPicker(ColorPicker.SelectionType.color, color),
                    innerColor: new ColorPicker(ColorPicker.SelectionType.color, '#FFFFFF'),
                    invertLayers: true,
                    layerOpacity: 0.6,
                    underLayerOpacity: 0.4,
                    startAngle: {lower: 0, upper: 360},
                    numberOfRings: new Range(4, 4),
                    stroke: 0,
                    thickness: 1,
                    sparsityFactor: [45],
                    sequencePixelConstant: sequencePixelConstant,
                    sequence: [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987, 1597, 2584, 4181],
                    minSequenceIndex: [9],
                    numberOfSequenceElements: [3],
                    speed: {lower: 2, upper: 2},
                    accentRange: {bottom: {lower: 0, upper: 0}, top: {lower: 1, upper: 1}},
                    blurRange: {bottom: {lower: 0, upper: 0}, top: {lower: 2, upper: 2}},
                    featherTimes: {lower: 8, upper: 8}, //center
                    center: point,
                }), defaultEffectConfig: EncircledSpiralConfig, possibleSecondaryEffects: [

                ]
            })
        })
        ;
    }


    const createLantern = async ({colorScheme, center}) => {

        const length = 64;
        const outlierColor = colorScheme.getColorFromBucket();
        const squareColor = colorScheme.getColorFromBucket();
        const crossColor = colorScheme.getColorFromBucket();

        //outliers
        await addSpiral(myTestProject, outlierColor, new Point2D(center.x, center.y + (2 * length)));
        await addSpiral(myTestProject, outlierColor, new Point2D(center.x - (2 * length), center.y));
        await addSpiral(myTestProject, outlierColor, new Point2D(center.x + (2 * length), center.y));
        await addSpiral(myTestProject, outlierColor, new Point2D(center.x, center.y - (2 * length)));

        //square
        await addSpiral(myTestProject, squareColor, new Point2D(center.x + (length), center.y + (length)));
        await addSpiral(myTestProject, squareColor, new Point2D(center.x - (length), center.y + (length)));
        await addSpiral(myTestProject, squareColor, new Point2D(center.x - (length), center.y - (length)));
        await addSpiral(myTestProject, squareColor, new Point2D(center.x + (length), center.y - (length)));

        //cross
        await addSpiral(myTestProject, crossColor, new Point2D(center.x, center.y + (length)));
        await addSpiral(myTestProject, crossColor, new Point2D(center.x - length, center.y));
        await addSpiral(myTestProject, crossColor, new Point2D(center.x + length, center.y));
        await addSpiral(myTestProject, crossColor, new Point2D(center.x, center.y - (length)));
    }

    const createTabs = async ({
                                               colorScheme = new ColorScheme({}),
                                               center = {x: 0, y: 0},
                                           }) => {

        const stroke = 1;
        const thickness = 2;

        const lineStartInitial = 15 ;
        const gap = 12;
        const gapReduction = 1;
        const lineLength = 20;
        const lineReduction = 3;

        let invertDirection = false;

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
        for (let i = 0; i < 8; i++) {
            invertDirection = !invertDirection;
            await myTestProject.addPrimaryEffect({
                layerConfig: new LayerConfig({
                    effect: AmpEffect,
                    percentChance: 100,
                    currentEffectConfig: new AmpConfig({
                        invertLayers: false,
                        invertDirection: invertDirection,
                        layerOpacity: 0.7,
                        underLayerOpacity: 0.5,
                        sparsityFactor: [10],
                        stroke: stroke,
                        thickness: thickness,
                        accentRange: {bottom: {lower: 5, upper: 5}, top: {lower: 15, upper: 15}},
                        blurRange: {bottom: {lower: 2, upper: 2}, top: {lower: 6, upper: 6}},
                        featherTimes: {lower: 4, upper: 4},
                        speed: {lower: i, upper: i},
                        length: getLineLength(i),
                        lineStart: getLineStart(i),
                        center: center,
                        innerColor: new ColorPicker(ColorPicker.SelectionType.colorBucket),
                        outerColor: new ColorPicker(ColorPicker.SelectionType.color, colorScheme.getColorFromBucket()),
                    }),
                    possibleSecondaryEffects: [...createGlowEffects({arraySize: 100})]//createSecondaryEffects(),
                }),
            });
        }
    }
    
    const createRedEyeReduction = async ({
                                             colorScheme = new ColorScheme({}),
                                             center = {x: 0, y: 0},
                                         }) => {
        const stroke = 1;
        const thickness = 2;

        const lineStartInitial = 15 ;
        const gap = 12;
        const gapReduction = 1;
        const lineLength = 10;
        const lineReduction = 1;


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
        for (let i = 0; i < 7; i++) {
            await myTestProject.addPrimaryEffect({
                layerConfig: new LayerConfig({
                    effect: RedEyeEffect,
                    percentChance: 100,
                    currentEffectConfig: new RedEyeConfig({

                        innerRadius: getLineStart(i),
                        outerRadius: 180,
                        possibleJumpRangeInPixels: { lower: 5, upper: 20 },
                        lineLength: { lower: 20, upper: 40 },
                        numberOfLoops: { lower: i+1, upper: i+1 },

                        invertLayers: true,
                        layerOpacity: 0.7,
                        underLayerOpacity: 0.5,
                        sparsityFactor: [8],
                        stroke: stroke,
                        thickness: thickness,
                        accentRange: {bottom: {lower: 5, upper: 5}, top: {lower: 15, upper: 15}},
                        blurRange: {bottom: {lower: 2, upper: 2}, top: {lower: 6, upper: 6}},
                        featherTimes: {lower: 4, upper: 4},
                        center: center,
                        innerColor: new ColorPicker(ColorPicker.SelectionType.neutralBucket),
                        outerColor: new ColorPicker(ColorPicker.SelectionType.color, colorScheme.getColorFromBucket()),
                    }),
                    possibleSecondaryEffects: [],
                }),
            });
        }
    }



    await createRedEyeReduction({center: daatPoint, colorScheme: activatingVishuddha});

    await createRedEyeReduction({center: malkuthPoint, colorScheme: malkuthKingdom});
    await createRedEyeReduction({center: yesodPoint, colorScheme: yesodFoundation});
    await createRedEyeReduction({center: netzachPoint, colorScheme: netzachVictory});
    await createRedEyeReduction({center: hodPoint, colorScheme: hodSplendor});
    await createRedEyeReduction({center: tiferetPoint, colorScheme: tiferetBeauty});
    await createRedEyeReduction({center: chesedPoint, colorScheme: chokhmahWisdom});
    await createRedEyeReduction({center: gevurahPoint, colorScheme: gevurahSeverity});
    await createRedEyeReduction({center: chokhmahPoint, colorScheme: chokhmahWisdom});
    await createRedEyeReduction({center: binahPoint, colorScheme: binahUnderstanding});
    await createRedEyeReduction({center: keterPoint, colorScheme: keterCrown});

    //await createAllPaths();

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
                lines: {lower: 50, upper: 50},
                loopTimes: {lower: 1, upper: 2},
                brightnessRange: {bottom: {lower: 10, upper: 20}, top: {lower: 30, upper: 40}},
                brightnessTimes: {lower: 4, upper: 4},
                thicknessRange: {bottom: {lower: 1, upper: 2}, top: {lower: 3, upper: 4}},
                thicknessTimes: {lower: 4, upper: 4},
                lineBlurRange: {bottom: {lower: 10, upper: 10}, top: {lower: 15, upper: 15}},
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
                saturationRange: {bottom: {lower: 1, upper: 1}, top: {lower: 1.3, upper: 1.3}},
                saturationTimes: {lower: 4, upper: 4},
                contrastRange: {bottom: {lower: 1, upper: 1}, top: {lower: 1.3, upper: 1.3}},
                contrastTimes: {lower: 8, upper: 8},
            }),
        }),
    });

    promiseArray.push(myTestProject.generateRandomLoop());
};

await createComposition(keterCrown);

await Promise.all(promiseArray);
