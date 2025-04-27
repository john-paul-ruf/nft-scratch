import {Project} from "my-nft-gen/src/app/Project.js";
import {createOrbElement} from "./complex-elements/orbs.js";
import {getMultiStep} from "./util/multistep.js";
import {
    createBlurEffects,
    createDegaussEffects,
    createFadeEffects,
    createGlowEffects
} from "./util/glitch.js";
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
    chokhmahWisdom, deepGrayMinimalTint, eternalRise, eyeBurn,
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
import {GlowKeyFrameEffect} from "../../my-nft-gen/src/effects/keyFrameEffects/glow/GlowKeyFrameEffect.js";
import {GlowKeyFrameConfig} from "../../my-nft-gen/src/effects/keyFrameEffects/glow/GlowKeyFrameConfig.js";
import {createStackedScanlines} from "./complex-elements/stacked-crt-scanlines.js";
import {createGlitchedTriangle} from "./complex-elements/glitchedTriangle.js";

const promiseArray = [];
const backgroundHex = '#000000'

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
        renderJumpFrames: 1,
        frameStart: 0,
    });

    const numberOfRedEyes = 3;
    const lineLength = 100;
    const lineReduction = 15;
    const gap = 20;
    const gapReduction = 5;
    const sparsityFactor= 4;
    const secondSparsityFactor= 6;

    await createRedEyeReduction({
        project: myTestProject,
        colorScheme: neonHarmony,
        center: new Point2D(1080 / 2, 1920 / 2),
        numberOfRedEyes: numberOfRedEyes,
        lineStartInitial: 100,
        gap: gap,
        gapReduction:gapReduction,
        lineLength: lineLength,
        lineReduction: lineReduction,
        sparsityFactor: sparsityFactor,
        outerRadius: 800,
        loopTimesFunction: (index) => {
            return numberOfRedEyes - index;
        },
        secondaryEffects: []
    });

    await createRedEyeReduction({
        project: myTestProject,
        colorScheme: neonHarmony,
        center: new Point2D(1080 / 2, 1920 / 2),
        numberOfRedEyes: numberOfRedEyes,
        lineStartInitial: 200,
        gap: gap,
        gapReduction:gapReduction,
        lineLength: lineLength,
        lineReduction: lineReduction,
        sparsityFactor: sparsityFactor,
        outerRadius: 850,
        loopTimesFunction: (index) => {
            return numberOfRedEyes - index;
        },
        secondaryEffects: []
    });

    await createRedEyeReduction({
        project: myTestProject,
        colorScheme: neonHarmony,
        center: new Point2D(1080 / 2, 1920 / 2),
        numberOfRedEyes: numberOfRedEyes,
        lineStartInitial: 300,
        gap: gap,
        gapReduction: gapReduction,
        lineLength: lineLength,
        lineReduction: lineReduction,
        sparsityFactor: sparsityFactor,
        outerRadius: 900,
        loopTimesFunction: (index) => {
            return numberOfRedEyes - index;
        },
        secondaryEffects: []
    });

    await createRedEyeReduction({
        project: myTestProject,
        colorScheme: neonHarmony,
        center: new Point2D(1080 / 2, 1920 / 2),
        numberOfRedEyes: numberOfRedEyes,
        lineStartInitial: 150,
        gap: gap,
        gapReduction:gapReduction,
        lineLength: lineLength,
        lineReduction: lineReduction,
        sparsityFactor: secondSparsityFactor,
        outerRadius: 800,
        loopTimesFunction: (index) => {
            return numberOfRedEyes - index;
        },
        secondaryEffects: []
    });

    await createRedEyeReduction({
        project: myTestProject,
        colorScheme: neonHarmony,
        center: new Point2D(1080 / 2, 1920 / 2),
        numberOfRedEyes: numberOfRedEyes,
        lineStartInitial: 250,
        gap: gap,
        gapReduction:gapReduction,
        lineLength: lineLength,
        lineReduction: lineReduction,
        sparsityFactor: secondSparsityFactor,
        outerRadius: 850,
        loopTimesFunction: (index) => {
            return numberOfRedEyes - index;
        },
        secondaryEffects: []
    });

    await createRedEyeReduction({
        project: myTestProject,
        colorScheme: neonHarmony,
        center: new Point2D(1080 / 2, 1920 / 2),
        numberOfRedEyes: numberOfRedEyes,
        lineStartInitial: 350,
        gap: gap,
        gapReduction: gapReduction,
        lineLength: lineLength,
        lineReduction: lineReduction,
        sparsityFactor: secondSparsityFactor,
        outerRadius: 900,
        loopTimesFunction: (index) => {
            return numberOfRedEyes - index;
        },
        secondaryEffects: []
    });

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    await createGlitchedTriangle({
        project: myTestProject,
        colorScheme: colorScheme,
        radius: [200],
        amplitude: {lower: 100, upper: 100},
        times: {lower: 5, upper: 5},
        center: new Point2D(1080 / 2, (1920 / 2) - 50),
        thickness: 18,
        underlayOpacityRange: {lower: 0.4, upper: 0.6},
        accentRange: {bottom: {lower: 20, upper: 20}, top: {lower: 30, upper: 60}},
        blurRange: {bottom: {lower: 4, upper: 4}, top: {lower: 6, upper: 6}},
        featherTimes: {lower: 4, upper: 20},
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
                lineRed: {lower: 0, upper: 0},
                lineGreen: {lower: 0, upper: 0},
                lineBlue: {lower: 0, upper: 0},
                lineHeight: {lower: 0.8, upper: 0.8},
                edgePercentage: {lower: 0.10, upper: 0.10},
                maxLineHeight: {lower: 4, upper: 4},
                numberOfEdgeSections: {lower: 40, upper: 40},
            })
        }),
    });

    await myTestProject.addFinalEffect({
        layerConfig: new LayerConfig({
            effect: CRTShadowEffect, percentChance: 100, currentEffectConfig: new CRTShadowConfig({
                shadowOpacityRange: {bottom: {lower: 0.7, upper: 0.7}, top: {lower: 0.9, upper: 0.9}},
                linesOpacityRange: {bottom: {lower: 0.6, upper: 0.6}, top: {lower: 0.9, upper: 0.9}},
                opacityTimes: {lower: 8, upper: 8},
                lineRed: {lower: 0, upper: 0},
                lineGreen: {lower: 128, upper: 128},
                lineBlue: {lower: 0, upper: 0},
                lineHeight: {lower: 0.4, upper: 0.4},
                edgePercentage: {lower: 0.15, upper: 0.15},
                maxLineHeight: {lower: 4, upper: 4},
                numberOfEdgeSections: {lower: 40, upper: 40},
            })
        }),
    });

    await myTestProject.addFinalEffect({
        layerConfig: new LayerConfig({
            effect: CRTShadowEffect, percentChance: 100, currentEffectConfig: new CRTShadowConfig({
                shadowOpacityRange: {bottom: {lower: 0.7, upper: 0.7}, top: {lower: 0.9, upper: 0.9}},
                linesOpacityRange: {bottom: {lower: 0.6, upper: 0.6}, top: {lower: 0.9, upper: 0.9}},
                opacityTimes: {lower: 8, upper: 8},
                lineRed: {lower: 0, upper: 0},
                lineGreen: {lower: 128, upper: 128},
                lineBlue: {lower: 0, upper: 0},
                lineHeight: {lower: 0.2, upper: 0.2},
                edgePercentage: {lower: 0.20, upper: 0.20},
                maxLineHeight: {lower: 4, upper: 4},
                numberOfEdgeSections: {lower: 40, upper: 40},
            })
        }),
    });

    await createStackedScanlines(myTestProject);

    await myTestProject.addFinalEffect({
        layerConfig: new LayerConfig({
            effect: ModulateEffect, percentChance: 100, currentEffectConfig: new ModulateConfig({
                brightnessRange: {bottom: {lower: 1, upper: 1}, top: {lower: 1.2, upper: 1.2}},
                brightnessTimes: {lower: 15, upper: 15},
                saturationRange: {bottom: {lower: 1, upper: 1}, top: {lower: 1.3, upper: 1.3}},
                saturationTimes: {lower: 15, upper: 15},
                contrastRange: {bottom: {lower: 1, upper: 1}, top: {lower: 1.3, upper: 1.3}},
                contrastTimes: {lower: 15, upper: 15},
            }),
        }),
    });

    promiseArray.push(myTestProject.generateRandomLoop());
};

await createComposition(neonHarmony);

await Promise.all(promiseArray);
