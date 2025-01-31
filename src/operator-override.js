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
    chokhmahWisdom,
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
import {getRandomIntInclusive} from "my-nft-gen/src/core/math/random.js";
import {findPointByAngleAndCircle} from "my-nft-gen/src/core/math/drawingMath.js";
import {createDecayingOrbElement} from "./complex-elements/decayingOrbs.js";


const promiseArray = [];
const topYBuffer = 15;
const backgroundHex = '#000000'

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
        maxConcurrentFrameBuilderThreads: 5,
    });

    const keterPoint = {x: 540, y: 200 + topYBuffer};
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

    const highlight = '#87CEFA'

    const placePulse = async ({color, highlight, center, invertDirection = false}) => {
        await myTestProject.addPrimaryEffect({
            layerConfig: new LayerConfig({
                effect: FuzzyRipplesEffect, percentChance: 100, currentEffectConfig: new FuzzyRipplesConfig({
                    invertLayers: false,
                    layerOpacity: 1,
                    underLayerOpacity: 0.9,
                    stroke: 4,
                    thickness: 2,
                    center: center,
                    innerColor: new ColorPicker(ColorPicker.SelectionType.color, highlight),
                    outerColor: new ColorPicker(ColorPicker.SelectionType.color, color),
                    speed: 4,
                    invertDirection: invertDirection,
                    largeRadius: {
                        lower: (finalSize) => finalSize.longestSide * 0.14,
                        upper: (finalSize) => finalSize.longestSide * 0.14,
                    },
                    smallRadius: {
                        lower: (finalSize) => finalSize.longestSide * 0.06,
                        upper: (finalSize) => finalSize.longestSide * 0.06,
                    },
                    largeNumberOfRings: {lower: 7, upper: 7},
                    smallNumberOfRings: {lower: 4, upper: 4},
                    ripple: {
                        lower: (finalSize) => finalSize.longestSide * 0.02,
                        upper: (finalSize) => finalSize.longestSide * 0.02,
                    },
                    times: {lower: 2, upper: 2},
                    smallerRingsGroupRadius: {
                        lower: (finalSize) => finalSize.longestSide * 0.06,
                        upper: (finalSize) => finalSize.longestSide * 0.06,
                    },
                    accentRange: {bottom: {lower: 1, upper: 1}, top: {lower: 5, upper: 5}},
                    blurRange: {bottom: {lower: 4, upper: 4}, top: {lower: 6, upper: 6}},
                    featherTimes: {lower: 4, upper: 4},
                })
            }),
        });
    }

    const placePulseOverlay = async ({color, center, highlight, invertDirection = false}) => {
        await myTestProject.addPrimaryEffect({
            layerConfig: new LayerConfig({
                effect: FuzzyRipplesEffect, percentChance: 100, currentEffectConfig: new FuzzyRipplesConfig({
                    invertLayers: false,
                    layerOpacity: 1,
                    underLayerOpacity: 0.9,
                    stroke: 0,
                    thickness: 2,
                    center: center,
                    innerColor: new ColorPicker(ColorPicker.SelectionType.color, highlight),
                    outerColor: new ColorPicker(ColorPicker.SelectionType.color, color),
                    speed: 4,
                    invertDirection: invertDirection,
                    largeRadius: {
                        lower: (finalSize) => finalSize.longestSide * 0.14,
                        upper: (finalSize) => finalSize.longestSide * 0.14,
                    },
                    smallRadius: {
                        lower: (finalSize) => finalSize.longestSide * 0.06,
                        upper: (finalSize) => finalSize.longestSide * 0.06,
                    },
                    largeNumberOfRings: {lower: 7, upper: 7},
                    smallNumberOfRings: {lower: 4, upper: 4},
                    ripple: {
                        lower: (finalSize) => finalSize.longestSide * 0.02,
                        upper: (finalSize) => finalSize.longestSide * 0.02,
                    },
                    times: {lower: 2, upper: 2},
                    smallerRingsGroupRadius: {
                        lower: (finalSize) => finalSize.longestSide * 0.06,
                        upper: (finalSize) => finalSize.longestSide * 0.06,
                    },
                    accentRange: {bottom: {lower: 0, upper: 0}, top: {lower: 0, upper: 0}},
                    blurRange: {bottom: {lower: 0, upper: 0}, top: {lower: 0, upper: 0}},
                    featherTimes: {lower: 0, upper: 0},
                })
            }),
        });
    }

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

    await placePulse({color: daatColor, highlight: highlight, center: daatPoint,})
    await placePulse({color: malkuthColor, highlight: highlight, center: malkuthPoint,})
    await placePulse({color: yesodColor, highlight: highlight, center: yesodPoint,})
    await placePulse({color: netzachColor, highlight: highlight, center: netzachPoint, invertDirection:true})
    await placePulse({color: hodColor, highlight: highlight, center: hodPoint, invertDirection:true})
    await placePulse({color: tiferetColor, highlight: highlight, center: tiferetPoint,})
    await placePulse({color: chesedColor, highlight: highlight, center: chesedPoint, invertDirection:true})
    await placePulse({color: gevurahColor, highlight: highlight, center: gevurahPoint, invertDirection:true})
    await placePulse({color: chokhmahColor, highlight: highlight, center: chokhmahPoint, invertDirection:true})
    await placePulse({color: binahColor, highlight: highlight, center: binahPoint, invertDirection:true})
    await placePulse({color: keterColor, highlight: highlight, center: keterPoint,})

    await placePulseOverlay({color: daatColor, highlight: highlight, center: daatPoint,})
    await placePulseOverlay({color: malkuthColor, highlight: highlight, center: malkuthPoint,})
    await placePulseOverlay({color: yesodColor, highlight: highlight, center: yesodPoint,})
    await placePulseOverlay({color: netzachColor, highlight: highlight, center: netzachPoint, invertDirection:true})
    await placePulseOverlay({color: hodColor, highlight: highlight, center: hodPoint, invertDirection:true})
    await placePulseOverlay({color: tiferetColor, highlight: highlight, center: tiferetPoint,})
    await placePulseOverlay({color: chesedColor, highlight: highlight, center: chesedPoint, invertDirection:true})
    await placePulseOverlay({color: gevurahColor, highlight: highlight, center: gevurahPoint, invertDirection:true})
    await placePulseOverlay({color: chokhmahColor, highlight: highlight, center: chokhmahPoint, invertDirection:true})
    await placePulseOverlay({color: binahColor, highlight: highlight, center: binahPoint, invertDirection:true})
    await placePulseOverlay({color: keterColor, highlight: highlight, center: keterPoint,})


    await myTestProject.addFinalEffect({
        layerConfig: new LayerConfig({
            effect: CRTShadowEffect, percentChance: 100, currentEffectConfig: new CRTShadowConfig({
                shadowOpacityRange: {bottom: {lower: 0.7, upper: 0.7}, top: {lower: 0.9, upper: 0.9}},
                linesOpacityRange: {bottom: {lower: 0.6, upper: 0.6}, top: {lower: 0.9, upper: 0.9}},
                opacityTimes: {lower: 8, upper: 8},
                lineRed: {lower: 111, upper: 111},
                lineGreen: {lower: 24, upper: 24},
                lineBlue: {lower: 24, upper: 24},
                lineHeight: {lower: 0.5, upper: 0.5},
                edgePercentage: {lower: 0.15, upper: 0.15},
                maxLineHeight: {lower: 4, upper: 4},
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
                    redRange: {bottom: {lower: 1, upper: 1}, top: {lower: 1.5, upper: 2}},
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
                saturationRange: {bottom: {lower: 1, upper: 1}, top: {lower: 1.2, upper: 1.2}},
                saturationTimes: {lower: 8, upper: 8},
                contrastRange: {bottom: {lower: 1, upper: 1}, top: {lower: 1.5, upper: 1.5}},
                contrastTimes: {lower: 8, upper: 8},
            }),
        }),
    });

    promiseArray.push(myTestProject.generateRandomLoop());
};

await createComposition(keterCrown);

await Promise.all(promiseArray);
