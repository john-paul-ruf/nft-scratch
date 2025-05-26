import {Project} from "my-nft-gen/src/app/Project.js";
import {LayerConfig} from "my-nft-gen/src/core/layer/LayerConfig.js";

import {hodSplendor, malkuthKingdom, netzachVictory, yesodFoundation} from "./assets/color-scheme-store.js";
import {CRTShadowEffect} from "my-nft-gen/src/effects/finalImageEffects/crtShadow/CRTShadowEffect.js";
import {CRTShadowConfig} from "my-nft-gen/src/effects/finalImageEffects/crtShadow/CRTShadowConfig.js";
import {CRTBarrelEffect} from "my-nft-gen/src/effects/finalImageEffects/crtBarrel/CRTBarrelEffect.js";
import {CRTBarrelConfig} from "my-nft-gen/src/effects/finalImageEffects/crtBarrel/CRTBarrelConfig.js";
import {ModulateEffect} from "my-nft-gen/src/effects/finalImageEffects/modulate/ModulateEffect.js";
import {ModulateConfig} from "my-nft-gen/src/effects/finalImageEffects/modulate/ModulateConfig.js";
import {Point2D} from "my-nft-gen/src/core/layer/configType/Point2D.js";
import {layeredRedEye,} from "./complex-elements/red-eye-reduction.js";
import {createStackedScanlines} from "./complex-elements/stacked-crt-scanlines.js";
import {createGlitchedTriangle} from "./complex-elements/glitchedTriangle.js";

const promiseArray = [];
const backgroundHex = '#242424'
const scheme = netzachVictory;

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
    const lineLength = 60;
    const lineReduction = 15;
    const gap = 20;
    const gapReduction = 5;
    const sparsityFactor = 6;
    const secondSparsityFactor = 3;

    const center = new Point2D(1080 / 2, 1920 / 2);

    const lineStartInitial = 100;
    const lineStartIncrease = 50;
    const outerRadius = 600;
    const outerRadiusIncrease = 50;
    const numberOfLayers = 3;

    const loopTimesFunction = (index) => {
        return numberOfRedEyes - index;
    }

    await layeredRedEye({
        myTestProject,
        colorScheme,
        numberOfRedEyes,
        gap,
        gapReduction,
        lineLength,
        lineReduction,
        sparsityFactor: 3,
        center,
        lineStartInitial: 350,
        lineStartIncrease,
        outerRadius: 950,
        outerRadiusIncrease,
        loopTimesFunction,
        numberOfLayers,
    });

    await layeredRedEye({
        myTestProject,
        colorScheme,
        numberOfRedEyes,
        gap,
        gapReduction,
        lineLength,
        lineReduction,
        sparsityFactor: 4,
        center,
        lineStartInitial: 250,
        lineStartIncrease,
        outerRadius: 850,
        outerRadiusIncrease,
        loopTimesFunction,
        numberOfLayers,
    });

    await layeredRedEye({
        myTestProject,
        colorScheme,
        numberOfRedEyes,
        gap,
        gapReduction,
        lineLength,
        lineReduction,
        sparsityFactor,
        center,
        lineStartInitial,
        lineStartIncrease,
        outerRadius,
        outerRadiusIncrease,
        loopTimesFunction,
        numberOfLayers,
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
        times: {lower: 3, upper: 3},
        center: new Point2D(1080 / 2, (1920 / 2) - 50),
        thickness: 16,
        underlayOpacityRange: {lower: 0.4, upper: 0.6},
        accentRange: {bottom: {lower: 35, upper: 35}, top: {lower: 80, upper: 80}},
        blurRange: {bottom: {lower: 8, upper: 8}, top: {lower: 12, upper: 12}},
        featherTimes: {lower: 10, upper: 20},
        accentBottomRangeReduction: 4,
        accentTopRangeReduction: 8,
    });

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    await createStackedScanlines(myTestProject);

    await myTestProject.addFinalEffect({
        layerConfig: new LayerConfig({
            effect: CRTShadowEffect, percentChance: 100, currentEffectConfig: new CRTShadowConfig({
                shadowOpacityRange: {bottom: {lower: 0.5, upper: 0.5}, top: {lower: 0.7, upper: 0.7}},
                linesOpacityRange: {bottom: {lower: 0.5, upper: 0.5}, top: {lower: 0.7, upper: 0.7}},
                opacityTimes: {lower: 15, upper: 15},
                lineRed: {lower: 64, upper: 64},
                lineGreen: {lower: 32, upper: 32},
                lineBlue: {lower: 32, upper: 32},
                lineHeight: {lower: 3, upper: 3},
                edgePercentage: {lower: 0.10, upper: 0.10},
                maxLineHeight: {lower: 8, upper: 8},
                numberOfEdgeSections: {lower: 40, upper: 40},
            })
        }),
    });

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

    await myTestProject.addFinalEffect({
        layerConfig: new LayerConfig({
            effect: CRTBarrelEffect, percentChance: 100, currentEffectConfig: new CRTBarrelConfig({
                strength: {lower: 0.09, upper: 0.09},
                edgeThreshold: {lower: 0.025, upper: 0.025},
                corner: {lower: 0.025, upper: 0.025},
            }),
        }),
    });

    promiseArray.push(myTestProject.generateRandomLoop());
};

await createComposition(scheme);

await Promise.all(promiseArray);
