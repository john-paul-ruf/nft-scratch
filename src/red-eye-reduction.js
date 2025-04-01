import {Project} from "my-nft-gen/src/app/Project.js";
import {createOrbElement} from "./complex-elements/orbs.js";
import {getMultiStep} from "./util/multistep.js";
import {createBlurffects, createDegaussEffects, createFadeEffects, createGlowEffects} from "./util/glitch.js";
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
import {createRedEyeReduction} from "./complex-elements/red-eye-reduction.js";

const promiseArray = [];
const backgroundHex = '#1c001C'

const createComposition = async (colorScheme) => {
    const myTestProject = new Project({
        artist: 'John Ruf',
        projectName: 'red-eye-reduction',
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


    const radiusExpansionConstant = .5;
    const lineExpansionConstant = 1.25;


    const initialLineStart = 15;
    const initialGap = 12;
    const initialGapReduction = 1;
    const initialLineLength = 10;
    const initialLineReduction = 1;
    const initialOuterRadius = 160;

    const colorSchemeList = [
        keterCrown,
        chokhmahWisdom,
        binahUnderstanding,
        chesedKindness,
        gevurahSeverity,
        tiferetBeauty,
        netzachVictory,
        hodSplendor,
        yesodFoundation,
        malkuthKingdom
    ];

    let currentLineStart = initialLineStart;
    let currentGap = initialGap;
    let currentGapReduction = initialGapReduction;
    let currentLineLength = initialLineLength;
    let currentLineReduction = initialLineReduction;
    let currentOuterRadius = initialOuterRadius;

    for (let i = 0; i < colorSchemeList.length; i++) {

        const index = i + 2;

        await createRedEyeReduction({
            project: myTestProject,
            colorScheme: colorSchemeList[i],
            lineStartInitial: currentLineStart,
            gap: currentGap,
            gapReduction: currentGapReduction,
            lineLength: currentLineLength,
            lineReduction: currentLineReduction,
            sparsityFactor: 4,
            outerRadius: currentOuterRadius,
        });
        currentOuterRadius = initialOuterRadius * index;
        currentLineStart = initialOuterRadius * ((index-1) * radiusExpansionConstant);
        currentLineLength = Math.ceil(initialLineLength * (index + lineExpansionConstant));
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    for (let i = 0; i < colorScheme.colorBucket.length; i++) {
        await myTestProject.addPrimaryEffect({
            layerConfig: new LayerConfig({
                effect: ViewportEffect,
                percentChance: 100,
                currentEffectConfig: new ViewportConfig({
                    invertLayers: true,
                    layerOpacity: 1,
                    underLayerOpacity: 0.5,
                    center: new Point2D(1080 / 2, 1920 / 2),
                    color: new ColorPicker(ColorPicker.SelectionType.color, colorScheme.colorBucket[i]),
                    innerColor: new ColorPicker(ColorPicker.SelectionType.neutralBucket),
                    stroke: 0,
                    thickness: 20,
                    ampStroke: 0,
                    ampThickness: 1,
                    radius: [350],
                    startAngle: [270],
                    amplitude: {lower: 150, upper: 150},
                    times: {lower: 1, upper: 2},
                    accentRange: {bottom: {lower: 5, upper: 10}, top: {lower: 20, upper: 40}},
                    blurRange: {bottom: {lower: 2, upper: 2}, top: {lower: 10, upper: 10}},
                    featherTimes: {lower: 4, upper: 12},
                }),
                possibleSecondaryEffects: [
                    ...createFadeEffects({arraySize: 75}),
                    ...createDegaussEffects({arraySize: 200}),
                    ...createBlurffects({arraySize: 75}),
                ],
            }),
        });
    }


    await myTestProject.addPrimaryEffect({
        layerConfig: new LayerConfig({
            effect: ViewportEffect,
            percentChance: 100,
            currentEffectConfig: new ViewportConfig({
                invertLayers: true,
                layerOpacity: 1,
                underLayerOpacity: 0.5,
                center: new Point2D(1080 / 2, 1920 / 2),
                color: new ColorPicker(ColorPicker.SelectionType.neutralBucket),
                innerColor: new ColorPicker(ColorPicker.SelectionType.neutralBucket),
                stroke: 0,
                thickness: 20,
                ampStroke: 0,
                ampThickness: 1,
                radius: [350],
                startAngle: [270],
                amplitude: {lower: 150, upper: 150},
                times: {lower: 1, upper: 2},
                accentRange: {bottom: {lower: 0, upper: 0}, top: {lower: 0, upper: 0}},
                blurRange: {bottom: {lower: 0, upper: 0}, top: {lower: 0, upper: 0}},
                featherTimes: {lower: 0, upper: 0},
            }),
            possibleSecondaryEffects: [
                ...createFadeEffects({arraySize: 75}),
                ...createDegaussEffects({arraySize: 200}),
                ...createBlurffects({arraySize: 75}),
            ],
        }),
    });

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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

await createComposition(eternalRise);

await Promise.all(promiseArray);
