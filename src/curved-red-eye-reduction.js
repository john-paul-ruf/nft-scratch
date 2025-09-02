import {Project} from "my-nft-gen/src/app/Project.js";
import {LayerConfig} from "my-nft-gen/src/core/layer/LayerConfig.js";

import {
    binahUnderstanding, brightAndFeisty,
    chesedKindness,
    eternalRise, gevurahSeverity,
    hodSplendor,
    malkuthKingdom, neonCyberdream, neonHarmony, neonLights,
    netzachVictory,
    tiferetBeauty,
    yesodFoundation
} from "./assets/color-scheme-store.js";
import {CRTShadowEffect} from "my-nft-gen/src/effects/finalImageEffects/crtShadow/CRTShadowEffect.js";
import {CRTShadowConfig} from "my-nft-gen/src/effects/finalImageEffects/crtShadow/CRTShadowConfig.js";
import {CRTBarrelEffect} from "my-nft-gen/src/effects/finalImageEffects/crtBarrel/CRTBarrelEffect.js";
import {CRTBarrelConfig} from "my-nft-gen/src/effects/finalImageEffects/crtBarrel/CRTBarrelConfig.js";
import {ModulateEffect} from "my-nft-gen/src/effects/finalImageEffects/modulate/ModulateEffect.js";
import {ModulateConfig} from "my-nft-gen/src/effects/finalImageEffects/modulate/ModulateConfig.js";
import {getRandomIntInclusive} from 'my-nft-gen/src/core/math/random.js';
import {Point2D} from "my-nft-gen/src/core/layer/configType/Point2D.js";
import {layeredRedEye,} from "./complex-elements/red-eye-reduction.js";
import {createStackedScanlines} from "./complex-elements/stacked-crt-scanlines.js";
import {createGlitchedTriangle} from "./complex-elements/glitchedTriangle.js";
import {ViewportEffect} from "../../my-nft-gen/src/effects/primaryEffects/viewport/ViewportEffect.js";
import {ViewportConfig} from "../../my-nft-gen/src/effects/primaryEffects/viewport/ViewportConfig.js";
import {randomNumber} from "../../my-nft-gen/src/core/math/random.js";
import {ColorPicker} from "../../my-nft-gen/src/core/layer/configType/ColorPicker.js";
import {createDegaussEffects, createGlowEffects} from "./util/glitch.js";
import {ScopesEffect} from "../../my-nft-gen/src/effects/primaryEffects/scopes/ScopesEffect.js";
import {ScopesConfig} from "../../my-nft-gen/src/effects/primaryEffects/scopes/ScopesConfig.js";
import {createMultiFuzzFlare} from "./complex-elements/multi-fuzz-flare.js";
import {Range} from "../../my-nft-gen/src/core/layer/configType/Range.js";
import {PercentageRange} from "../../my-nft-gen/src/core/layer/configType/PercentageRange.js";
import {PercentageShortestSide} from "../../my-nft-gen/src/core/layer/configType/PercentageShortestSide.js";
import {PercentageLongestSide} from "../../my-nft-gen/src/core/layer/configType/PercentageLongestSide.js";
import {createColorArrayScanlines} from "./complex-elements/color-array-crt-scanlines.js";
import {metaMappedFramesRing} from "./complex-elements/metaMappedFramesRing.js";
import {createInvertedGlitchedTriangle} from "./complex-elements/invertedGlitchedTriangle.js";
import {layeredCurvedRedEye} from "./complex-elements/curved-red-eye-reduction.js";
import {createTheMark} from "./complex-elements/the-mark.js";
import {FindValueAlgorithm, getAllFindValueAlgorithms} from "../../my-nft-gen/src/core/math/findValue.js";
import {
    BloomFilmGrainEffect
} from "../../my-nft-gen/src/effects/finalImageEffects/bloomFilmGrain/BloomFilmGrainEffect.js";
import {
    BloomFilmGrainConfig
} from "../../my-nft-gen/src/effects/finalImageEffects/bloomFilmGrain/BloomFilmGrainConfig.js";
import {CRTDegaussEffect} from "../../my-nft-gen/src/effects/keyFrameEffects/crtDegaussEvent/CRTDegaussEffect.js";
import {CRTDegaussConfig} from "../../my-nft-gen/src/effects/keyFrameEffects/crtDegaussEvent/CRTDegaussConfig.js";
import {EdgeGlowEffect} from "../../my-nft-gen/src/effects/secondaryEffects/edgeGlow/EdgeGlowEffect.js";
import {EdgeGlowConfig} from "../../my-nft-gen/src/effects/secondaryEffects/edgeGlow/EdgeGlowConfig.js";
import {LayeredHexEffect} from "../../my-nft-gen/src/effects/primaryEffects/layeredHex/LayeredHexEffect.js";
import {LayeredHexConfig} from "../../my-nft-gen/src/effects/primaryEffects/layeredHex/LayeredHexConfig.js";
import {HexEffect} from "../../my-nft-gen/src/effects/primaryEffects/hex/HexEffect.js";
import {HexConfig} from "../../my-nft-gen/src/effects/primaryEffects/hex/HexConfig.js";
import {
    ClaudeCRTBarrelRollEffect
} from "../../my-nft-gen/src/effects/finalImageEffects/claudeCRTBarrelRoll/ClaudeCRTBarrelRollEffect.js";
import {
    ClaudeCRTBarrelRollConfig
} from "../../my-nft-gen/src/effects/finalImageEffects/claudeCRTBarrelRoll/ClaudeCRTBarrelRollConfig.js";

const promiseArray = [];
const backgroundHex = '#080808'
const scheme = eternalRise;

const createComposition = async (colorScheme) => {
        const myTestProject = new Project({
            artist: 'John Ruf',
            projectName: 'curved-red-eye-reduction',
            projectDirectory: 'src/scratch',
            neutrals: ['#F5F5F5', '#E0E0E0', '#FAF9F6', '#EDEAE0'],
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

        const center = new Point2D(myTestProject.width / 2, myTestProject.height / 2)

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        const stroke = 1;
        const thickness = 1;
        const numberOfRedEyes = 6;
        const numberOfLayers = 3;
        const outerRadius = 500;
        const innerRadius = 10;
        const radiusGitter = new Range(0, 200);
        const numberOfSpokes = new Range(60, 70);
        const arcSteps = new Range(30, 45);
        const lineLength = new Range(50, 250);
        const possibleJumpRangeInPixels = new Range(10, 60);
        const sparsityFactor = [6, 8, 10, 12];

        const loopTimesFunction = (index) => {
            return getRandomIntInclusive(3, 15);
        };

        const loopTimesRange = new Range(6, 30);
        const useLoopFunction = false;

        await layeredCurvedRedEye({
            myTestProject,
            stroke,
            thickness,
            numberOfRedEyes,
            lineLength,
            sparsityFactor: sparsityFactor,
            center,
            innerRadius: innerRadius,
            outerRadius: outerRadius,
            radiusGitter: radiusGitter,
            loopTimesFunction: loopTimesFunction,
            loopTimesRange: loopTimesRange,
            useLoopFunction: useLoopFunction,
            arcSteps: arcSteps,
            numberOfSpokes: numberOfSpokes,
            possibleJumpRangeInPixels: possibleJumpRangeInPixels,
            numberOfLayers,
            colorScheme: eternalRise,
        });

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


        await layeredCurvedRedEye({
            myTestProject,
            stroke,
            thickness,
            numberOfRedEyes,
            lineLength,
            sparsityFactor: sparsityFactor,
            center,
            innerRadius: innerRadius,
            outerRadius: outerRadius,
            radiusGitter: radiusGitter,
            loopTimesFunction: loopTimesFunction,
            loopTimesRange: loopTimesRange,
            useLoopFunction: useLoopFunction,
            arcSteps: arcSteps,
            numberOfSpokes: numberOfSpokes,
            possibleJumpRangeInPixels: possibleJumpRangeInPixels,
            numberOfLayers,
            colorScheme: neonCyberdream,
        });


        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        const buffer = 800;

        await createTheMark({
            project: myTestProject,
            center: new Point2D(myTestProject.width - 150, myTestProject.height - 150),
            fadeFrom: 0.0,
            opacity: 0.5,
            keyFrames: 30,
            glitchFrameCount: 120,
            fadeInOutCount: 30,
            buffer: buffer,
        })

        await myTestProject.addFinalEffect({
            layerConfig: new LayerConfig({
                effect: ModulateEffect, percentChance: 100, currentEffectConfig: new ModulateConfig({
                    brightnessRange: {bottom: {lower: 1, upper: 1}, top: {lower: 1.1, upper: 1.1}},
                    brightnessTimes: {lower: 6, upper: 6},
                    saturationRange: {bottom: {lower: 1.5, upper: 1.5}, top: {lower: 4, upper: 4}},
                    saturationTimes: {lower: 12, upper: 12},
                    contrastRange: {bottom: {lower: 1, upper: 1}, top: {lower: 1.1, upper: 1.1}},
                    contrastTimes: {lower: 6, upper: 6},
                }),
            }),
        });


        /*await myTestProject.addFinalEffect({
            layerConfig: new LayerConfig({
                effect: BloomFilmGrainEffect, percentChance: 100, currentEffectConfig: new BloomFilmGrainConfig({
                    brightnessRange: {bottom: {lower: 1.5, upper: 1.5}, top: {lower: 2.5, upper: 2.5}},
                    brightnessTimes: {lower: 12, upper: 12},
                    blurRange: {bottom: {lower: 8, upper: 8}, top: {lower: 15, upper: 15}},
                    blurTimes: {lower: 6, upper: 6},
                    grainRange: {bottom: {lower: 0.2, upper: 0.4}, top: {lower: 0.5, upper: 0.8}},
                    grainTimes: {lower: 12, upper: 12},
                    grainIntensityRange: {bottom: {lower: 0.08, upper: 0.08}, top: {lower: 0.1, upper: 0.1}},
                    grainIntensityTimes: {lower: 12, upper: 12},
                }),
            }),
        });*/

       /* await myTestProject.addFinalEffect({
            layerConfig: new LayerConfig({
                effect: ClaudeCRTBarrelRollEffect, percentChance: 100, currentEffectConfig: new ClaudeCRTBarrelRollConfig({

                }),
            }),
        });
*/

        promiseArray.push(myTestProject.generateRandomLoop());

    }
;

await createComposition(scheme);

await Promise.all(promiseArray);
