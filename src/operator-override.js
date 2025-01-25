import {Project} from "my-nft-gen/src/app/Project.js";
import {createOrbElement} from "./complex-elements/orbs.js";
import {getMultiStep} from "./util/multistep.js";
import {createDegaussEffects} from "./util/glitch.js";
import {MultiStepDefinitionConfig} from "my-nft-gen/src/core/math/MultiStepDefinitionConfig.js";
import {MappedFramesConfig} from "my-nft-gen/src/effects/primaryEffects/mappedFrames/MappedFramesConfig.js";
import {MappedFramesEffect} from "my-nft-gen/src/effects/primaryEffects/mappedFrames/MappedFramesEffect.js";
import {LayerConfig} from "my-nft-gen/src/core/layer/LayerConfig.js";
import {Range} from "my-nft-gen/src/core/layer/configType/Range.js";

import {
    binahUnderstanding,
    chesedKindness,
    chokhmahWisdom,
    gevurahSeverity,
    hodSplendor,
    keterCrown,
    malkuthKingdom,
    netzachVictory,
    tiferetBeauty,
    yesodFoundation
} from "./assets/color-scheme-store.js";
import {ViewportEffect} from "../../my-nft-gen/src/effects/primaryEffects/viewport/ViewportEffect.js";
import {ViewportConfig} from "../../my-nft-gen/src/effects/primaryEffects/viewport/ViewportConfig.js";
import {ColorPicker} from "my-nft-gen/src/core/layer/configType/ColorPicker.js";
import {CRTShadowEffect} from "my-nft-gen/src/effects/finalImageEffects/crtShadow/CRTShadowEffect.js";
import {CRTShadowConfig} from "my-nft-gen/src/effects/finalImageEffects/crtShadow/CRTShadowConfig.js";
import {CRTScanLinesEffect} from "my-nft-gen/src/effects/finalImageEffects/crtScanLines/CRTScanLinesEffect.js";
import {CRTScanLinesConfig} from "my-nft-gen/src/effects/finalImageEffects/crtScanLines/CRTScanLinesConfig.js";


const promiseArray = [];

const createComposition = async (colorScheme) => {
    const myTestProject = new Project({
        artist: 'John Ruf',
        projectName: 'operator-override',
        projectDirectory: 'src/key-frame',
        neutrals: ['#FFFFFF'],
        backgrounds: ['#848484'],
        numberOfFrame: 1800,
        colorScheme: colorScheme,
        longestSideInPixels: 1920,
        shortestSideInPixels: 1080,
        isHorizontal: false,
        maxConcurrentFrameBuilderThreads: 3,
    });

    const topYBuffer = 15;

    await createOrbElement({project: myTestProject, colorScheme: keterCrown, center: {x: 540, y: 200+topYBuffer}})
    await createOrbElement({project: myTestProject, colorScheme: binahUnderstanding, center: {x: 240, y: 420+topYBuffer}})
    await createOrbElement({project: myTestProject, colorScheme: chokhmahWisdom, center: {x: 840, y: 420+topYBuffer}})
    await createOrbElement({project: myTestProject, colorScheme: gevurahSeverity, center: {x: 240, y: 780+topYBuffer}})
    await createOrbElement({project: myTestProject, colorScheme: chesedKindness, center: {x: 840, y: 780+topYBuffer}})
    await createOrbElement({project: myTestProject, colorScheme: tiferetBeauty, center: {x: 540, y: 960+topYBuffer}})
    await createOrbElement({project: myTestProject, colorScheme: hodSplendor, center: {x: 240, y: 1130+topYBuffer}})
    await createOrbElement({project: myTestProject, colorScheme: netzachVictory, center: {x: 840, y: 1130+topYBuffer}})
    await createOrbElement({project: myTestProject, colorScheme: yesodFoundation, center: {x: 540, y: 1330+topYBuffer}})
    await createOrbElement({project: myTestProject, colorScheme: malkuthKingdom, center: {x: 540, y: 1700+topYBuffer}})


    await myTestProject.addPrimaryEffect({
        layerConfig: new LayerConfig({
            effect: ViewportEffect,
            percentChance: 100,
            currentEffectConfig: new ViewportConfig({
                invertLayers: true,
                layerOpacity: 0.7,
                underLayerOpacity: 0.5,
                center: {x: 540, y: 940+topYBuffer},
                color: new ColorPicker(ColorPicker.SelectionType.color, tiferetBeauty.getColorFromBucket()),
                innerColor: new ColorPicker(ColorPicker.SelectionType.neutralBucket),
                stroke: 4,
                thickness: 2,
                ampStroke: 0,
                ampThickness: 0,
                radius: [80],
                startAngle: [270],
                ampLength: [50, 75, 100],
                ampRadius: [40],
                sparsityFactor: [3, 4, 5, 6],
                amplitude: {lower: 40, upper: 40},
                times: {lower: 4, upper: 4},
                accentRange: {bottom: {lower: 5, upper: 10}, top: {lower: 15, upper: 20}},
                blurRange: {bottom: {lower: 2, upper: 4}, top: {lower: 4, upper: 6}},
                featherTimes: {lower: 2, upper: 8},
            }),
            possibleSecondaryEffects: []
        }),
    });
    

    await myTestProject.addPrimaryEffect({
        layerConfig: new LayerConfig({
            effect: MappedFramesEffect,
            percentChance: 100,
            currentEffectConfig: new MappedFramesConfig({
                folderName: '/Users/the.dude/WebstormProjects/nft-scratch/src/assets/mappedFrames/og-eye-flux/',
                layerOpacity: [0.6],
                buffer: [750],
                center: {x: 540, y: 600+topYBuffer},
                loopTimesMultiStep: [
                    new MultiStepDefinitionConfig({
                        minPercentage: 0,
                        maxPercentage: 25,
                        max: new Range(2, 8),
                        times: new Range(8, 8),
                    }),
                    new MultiStepDefinitionConfig({
                        minPercentage: 25,
                        maxPercentage: 50,
                        max: new Range(2, 10),
                        times: new Range(12, 12),
                    }),
                    new MultiStepDefinitionConfig({
                        minPercentage: 50,
                        maxPercentage: 75,
                        max: new Range(2, 8),
                        times: new Range(12, 12),
                    }),
                    new MultiStepDefinitionConfig({
                        minPercentage: 75,
                        maxPercentage: 100,
                        max: new Range(2, 10),
                        times: new Range(8, 8),
                    }),
                ],
            }),
            possibleSecondaryEffects: [...createDegaussEffects({arraySize: 50})]
        }),
    });

    await myTestProject.addFinalEffect({
        layerConfig: new LayerConfig({
            effect: CRTShadowEffect,
            percentChance: 100,
            currentEffectConfig: new CRTShadowConfig({
                shadowOpacityRange: {bottom: {lower: 0.7, upper: 0.7}, top: {lower: 0.9, upper: 0.9}},
                linesOpacityRange: {bottom: {lower: 0.6, upper: 0.6}, top: {lower: 0.9, upper: 0.9}},
                opacityTimes: {lower: 2, upper: 2},
                lineRed: {lower: 0, upper: 0},
                lineGreen: {lower: 127, upper: 127},
                lineBlue: {lower: 0, upper: 0},
                lineHeight: {lower: 0.5, upper: 0.5},
                edgePercentage: {lower: 0.15, upper: 0.15},
                maxLineHeight: {lower: 4, upper: 4},
                numberOfEdgeSections: {lower: 40, upper: 40},
            })
        }),
    });

    await myTestProject.addFinalEffect({
        layerConfig: new LayerConfig({
            effect: CRTScanLinesEffect,
            percentChance: 100,
            currentEffectConfig: new CRTScanLinesConfig({
                lines: {lower: 100, upper: 100},
                loopTimes: {lower: 1, upper: 3},
                brightnessRange: {bottom: {lower: 10, upper: 15}, top: {lower: 20, upper: 25}},
                brightnessTimes: {lower: 2, upper: 8},
                thicknessRange: {bottom: {lower: 4, upper: 8}, top: {lower: 10, upper: 12}},
                thicknessTimes: {lower: 2, upper: 8},
                lineBlurRange: {bottom: {lower: 10, upper: 20}, top: {lower: 30, upper: 40}},
                lineBlurTimes: {lower: 2, upper: 8},
                colorTintRange: {
                    redRange: {bottom: {lower: 0.5, upper: 0.6}, top: {lower: 0.7, upper: 0.8}},
                    greenRange: {bottom: {lower: 1.5, upper: 1.6}, top: {lower: 1.7, upper: 1.8}},
                    blueRange: {bottom: {lower: 0.5, upper: 0.6}, top: {lower: 0.7, upper: 0.8}},
                },
                colorTintTimes: {lower: 2, upper: 8},
                opacityRange: {bottom: {lower: 0.3, upper: 0.4}, top: {lower: 0.5, upper: 0.6}},
                opacityTimes: {lower: 2, upper: 8},
            }),
        }),
    });

    promiseArray.push(myTestProject.generateRandomLoop());
};

await createComposition(malkuthKingdom);

await Promise.all(promiseArray);
