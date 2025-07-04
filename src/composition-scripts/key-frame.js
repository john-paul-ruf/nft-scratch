import {
    activatingSahasrara,
    activatingVishuddha,
    earthenVeil,
    eternalRise,
    neonHarmony
} from "../assets/color-scheme-store.js";
import {Project} from "my-nft-gen/src/app/Project.js";
import {LayerConfig} from "my-nft-gen/src/core/layer/LayerConfig.js";
import {CRTScanLinesEffect} from "my-nft-gen/src/effects/finalImageEffects/crtScanLines/CRTScanLinesEffect.js";
import {CRTScanLinesConfig} from "my-nft-gen/src/effects/finalImageEffects/crtScanLines/CRTScanLinesConfig.js";
import {CRTDegaussConfig} from "my-nft-gen/src/effects/keyFrameEffects/crtDegaussEvent/CRTDegaussConfig.js";
import {CRTDegaussEffect} from "my-nft-gen/src/effects/keyFrameEffects/crtDegaussEvent/CRTDegaussEffect.js";
import {CRTShadowConfig} from "my-nft-gen/src/effects/finalImageEffects/crtShadow/CRTShadowConfig.js";
import {CRTShadowEffect} from "my-nft-gen/src/effects/finalImageEffects/crtShadow/CRTShadowEffect.js";
import {Point2D} from "my-nft-gen/src/core/layer/configType/Point2D.js";
import {ColorPicker} from "my-nft-gen/src/core/layer/configType/ColorPicker.js";
import {getRandomIntInclusive} from "my-nft-gen/src/core/math/random.js";
import {FuzzFlareEffect} from "my-nft-gen/src/effects/primaryEffects/fuzz-flare/FuzzFlareEffect.js";
import {MultiStepDefinitionConfig} from "my-nft-gen/src/core/math/MultiStepDefinitionConfig.js";
import {Range} from "my-nft-gen/src/core/layer/configType/Range.js";
import {PercentageRange} from "my-nft-gen/src/core/layer/configType/PercentageRange.js";
import {PercentageShortestSide} from "my-nft-gen/src/core/layer/configType/PercentageShortestSide.js";
import {PercentageLongestSide} from "my-nft-gen/src/core/layer/configType/PercentageLongestSide.js";
import {FuzzFlareConfig} from "my-nft-gen/src/effects/primaryEffects/fuzz-flare/FuzzFlareConfig.js";
import {AmpEffect} from "my-nft-gen/src/effects/primaryEffects/amp/AmpEffect.js";
import {AmpConfig} from "my-nft-gen/src/effects/primaryEffects/amp/AmpConfig.js";
import {GlowKeyFrameEffect} from "my-nft-gen/src/effects/keyFrameEffects/glow/GlowKeyFrameEffect.js";
import {GlowKeyFrameConfig} from "my-nft-gen/src/effects/keyFrameEffects/glow/GlowKeyFrameConfig.js";
import {FadeKeyFrameEffect} from "my-nft-gen/src/effects/keyFrameEffects/fade/FadeKeyFrameEffect.js";
import {FadeKeyFrameConfig} from "my-nft-gen/src/effects/keyFrameEffects/fade/FadeKeyFrameConfig.js";
import {BlurKeyFrameEffect} from "my-nft-gen/src/effects/keyFrameEffects/blur/BlurKeyFrameEffect.js";
import {BlurKeyFrameConfig} from "my-nft-gen/src/effects/keyFrameEffects/blur/BlurKeyFrameConfig.js";


const promiseArray = [];

function createDegaussEffects(config) {
    return Array.from({length: config.arraySize}, () => (
            new LayerConfig({
                effect: CRTDegaussEffect,
                percentChance: getRandomIntInclusive(10, 25),
                currentEffectConfig: new CRTDegaussConfig({
                    keyFrames: [getRandomIntInclusive(0, 1800 - 240)],
                    glitchFrameCount: [getRandomIntInclusive(120, 240)],
                    sectionHeight: [1, 5, 10],
                    offset: {lower: 5, upper: 30},
                    direction: [-1, 1],
                    glitchTimes: {lower: 3, upper: 8},
                    backgroundRed: {lower: 0, upper: 0},
                    backgroundGreen: {lower: 0, upper: 0},
                    backgroundBlue: {lower: 0, upper: 0},
                    backgroundAlpha: {lower: 0, upper: 0},
                }),
            })
        )
    );
}

function createGlowEffects(config) {
    return Array.from({length: config.arraySize}, () => (
            new LayerConfig({
                effect: GlowKeyFrameEffect,
                percentChance: getRandomIntInclusive(20, 40),
                currentEffectConfig: new GlowKeyFrameConfig({
                    keyFrames: [getRandomIntInclusive(0, (1800 - 160))],
                    glitchFrameCount: [getRandomIntInclusive(120, 160)],
                    lowerRange: {lower: 32, upper: 64},
                    times: {lower: 1, upper: 2},
                }),
            })
        )
    );
}

function createFadeEffects(config) {
    return Array.from({length: config.arraySize}, () => (
            new LayerConfig({
                effect: FadeKeyFrameEffect,
                percentChance: getRandomIntInclusive(10, 25),
                currentEffectConfig: new FadeKeyFrameConfig({
                    keyFrames: [getRandomIntInclusive(0, (1800 - 160))],
                    glitchFrameCount: [getRandomIntInclusive(120, 160)],
                    lowerRange: {lower: 0.8, upper: 0.9},
                    times: {lower: 1, upper: 1},
                }),
            })
        )
    );
}

function createBlurffects(config) {
    return Array.from({length: config.arraySize}, () => (
            new LayerConfig({
                effect: BlurKeyFrameEffect,
                percentChance: getRandomIntInclusive(20, 30),
                currentEffectConfig: new BlurKeyFrameConfig({
                    keyFrames: [getRandomIntInclusive(0, (1800 - 160))],
                    glitchFrameCount: [getRandomIntInclusive(120, 160)],
                    upperRange: {lower: 4, upper: 12},
                    times: {lower: 1, upper: 2},
                }),
            })
        )
    );
}

const createComposition = async (colorScheme) => {
    const myTestProject = new Project({
        artist: 'John Ruf',
        projectName: 'key-frame',
        projectDirectory: 'src/key-frame',
        neutrals: ['#E6E6FA'],
        backgrounds: ['#3A003A'],
        numberOfFrame: 1800,
        colorScheme: colorScheme,
        longestSideInPixels: 1920,
        shortestSideInPixels: 1080,
        isHorizontal: false,
        maxConcurrentFrameBuilderThreads: 10,
    });

    const stroke = 20;
    const thickness = 6;

    //const elementCount = 1;

    const elementCount = 10;

    const lineStartInitial = myTestProject.shortestSideInPixels * 0.1;
    const gap = 16;
    const gapReduction = 3;
    const lineLength = 60;
    const lineReduction = 5;

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

    for (let i = 0; i < 12; i++) {
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
                    sparsityFactor: [8],
                    stroke: stroke,
                    thickness: thickness,
                    accentRange: {bottom: {lower: 10, upper: 20}, top: {lower: 30, upper: 40}},
                    blurRange: {bottom: {lower: 4, upper: 5}, top: {lower: 8, upper: 10}},
                    featherTimes: {lower: 5, upper: 5},
                    speed: {lower: 1, upper: 1},
                    length: getLineLength(i),
                    lineStart: getLineStart(i),
                    center: {x: myTestProject.shortestSideInPixels / 2, y: myTestProject.longestSideInPixels / 2},
                    innerColor: new ColorPicker(ColorPicker.SelectionType.neutralBucket),
                    outerColor: new ColorPicker(ColorPicker.SelectionType.colorBucket),
                }),
                possibleSecondaryEffects: []//createSecondaryEffects(),
            }),
        });
    }


    for (let i = 0; i < 20; i++) {
        await myTestProject.addPrimaryEffect({
            layerConfig: new LayerConfig({
                effect: FuzzFlareEffect,
                percentChance: 100,
                currentEffectConfig: new FuzzFlareConfig({
                    center: new Point2D(myTestProject.shortestSideInPixels / 2, myTestProject.longestSideInPixels / 2),
                    invertLayers: true,

                    outerColor: new ColorPicker(ColorPicker.SelectionType.colorBucket),
                    innerColor: new ColorPicker(ColorPicker.SelectionType.neutralBucket),

                    layerOpacity: 0.7,

                    underLayerOpacityRange: {bottom: {lower: 0.55, upper: 0.55}, top: {lower: 0.65, upper: 0.65}},
                    underLayerOpacityTimes: {lower: 2, upper: 12},

                    elementGastonMultiStep: [
                        new MultiStepDefinitionConfig({
                            minPercentage: 0,
                            maxPercentage: 20,
                            max: new Range(5, 15),
                            times: new Range(1, 1),
                        }),
                        new MultiStepDefinitionConfig({
                            minPercentage: 20,
                            maxPercentage: 40,
                            max: new Range(5, 20),
                            times: new Range(1, 1),
                        }),
                        new MultiStepDefinitionConfig({
                            minPercentage: 40,
                            maxPercentage: 60,
                            max: new Range(5, 25),
                            times: new Range(1, 1),
                        }),
                        new MultiStepDefinitionConfig({
                            minPercentage: 60,
                            maxPercentage: 80,
                            max: new Range(5, 20),
                            times: new Range(1, 1),
                        }),
                        new MultiStepDefinitionConfig({
                            minPercentage: 80,
                            maxPercentage: 100,
                            max: new Range(5, 15),
                            times: new Range(1, 1),
                        }),
                    ],

                    numberOfFlareRings: new Range(0, 0),
                    flareRingsSizeRange: new PercentageRange(new PercentageShortestSide(0.01), new PercentageShortestSide(0.45)),
                    flareRingStroke: new Range(stroke, stroke),
                    flareRingThickness: new Range(thickness, thickness),

                    numberOfFlareRays: new Range(4, 4),
                    flareRaysSizeRange: new PercentageRange(new PercentageLongestSide(0.75), new PercentageLongestSide(1)),
                    flareRaysStroke: new Range(stroke, stroke),
                    flareRayThickness: new Range(thickness, thickness),
                    flareOffset: new PercentageRange(new PercentageShortestSide(0.2), new PercentageShortestSide(0.45)),

                    accentRange: {bottom: {lower: 10, upper: 20}, top: {lower: 30, upper: 40}},
                    blurRange: {bottom: {lower: 4, upper: 5}, top: {lower: 8, upper: 10}},
                    featherTimes: {lower: 5, upper: 5},
                }),
                possibleSecondaryEffects: [...createDegaussEffects({arraySize: 20})],
            }),
        });
    }


    for (let i = 0; i < 12; i++) {
        await myTestProject.addPrimaryEffect({
            layerConfig: new LayerConfig({
                effect: FuzzFlareEffect,
                percentChance: 100,
                currentEffectConfig: new FuzzFlareConfig({
                    center: new Point2D(myTestProject.shortestSideInPixels / 2, myTestProject.longestSideInPixels / 2),
                    invertLayers: true,

                    outerColor: new ColorPicker(ColorPicker.SelectionType.colorBucket),
                    innerColor: new ColorPicker(ColorPicker.SelectionType.neutralBucket),

                    layerOpacity: 0.7,

                    underLayerOpacityRange: {bottom: {lower: 0.55, upper: 0.55}, top: {lower: 0.65, upper: 0.65}},
                    underLayerOpacityTimes: {lower: 2, upper: 12},

                    elementGastonMultiStep: [
                        new MultiStepDefinitionConfig({
                            minPercentage: 0,
                            maxPercentage: 20,
                            max: new Range(5, 15),
                            times: new Range(1, 1),
                        }),
                        new MultiStepDefinitionConfig({
                            minPercentage: 20,
                            maxPercentage: 40,
                            max: new Range(5, 20),
                            times: new Range(1, 1),
                        }),
                        new MultiStepDefinitionConfig({
                            minPercentage: 40,
                            maxPercentage: 60,
                            max: new Range(5, 25),
                            times: new Range(1, 1),
                        }),
                        new MultiStepDefinitionConfig({
                            minPercentage: 60,
                            maxPercentage: 80,
                            max: new Range(5, 20),
                            times: new Range(1, 1),
                        }),
                        new MultiStepDefinitionConfig({
                            minPercentage: 80,
                            maxPercentage: 100,
                            max: new Range(5, 15),
                            times: new Range(1, 1),
                        }),
                    ],

                    numberOfFlareRings: new Range(1, 1),
                    flareRingsSizeRange: new PercentageRange(new PercentageShortestSide(0.01), new PercentageShortestSide(0.45)),
                    flareRingStroke: new Range(stroke, stroke),
                    flareRingThickness: new Range(thickness, thickness),

                    numberOfFlareRays: new Range(0, 0),
                    flareRaysSizeRange: new PercentageRange(new PercentageLongestSide(0.75), new PercentageLongestSide(1)),
                    flareRaysStroke: new Range(stroke, stroke),
                    flareRayThickness: new Range(thickness, thickness),
                    flareOffset: new PercentageRange(new PercentageShortestSide(0.2), new PercentageShortestSide(0.45)),

                    accentRange: {bottom: {lower: 10, upper: 20}, top: {lower: 30, upper: 40}},
                    blurRange: {bottom: {lower: 4, upper: 5}, top: {lower: 8, upper: 10}},
                    featherTimes: {lower: 5, upper: 5},
                }),
                possibleSecondaryEffects: [],
            }),
        });
    }

    /* const redEyeCount = 12;

     for (let i = 0; i < redEyeCount; i++) {
         await myTestProject.addPrimaryEffect({
             layerConfig: new LayerConfig({
                 effect: RedEyeEffect,
                 percentChance: 100,
                 currentEffectConfig: new RedEyeConfig({
                     invertLayers: true,
                     layerOpacity: 0.7,
                     underLayerOpacity: 0.5,
                     center: new Point2D(1080 / 2, 1920 / 2),
                     innerColor: new ColorPicker(ColorPicker.SelectionType.neutralBucket),
                     outerColor: new ColorPicker(ColorPicker.SelectionType.colorBucket),
                     stroke: 1,
                     thickness: 1,
                     sparsityFactor: [9, 10, 12],
                     innerRadius: getRandomIntInclusive(myTestProject.shortestSideInPixels * 0.48, myTestProject.shortestSideInPixels * 0.58),
                     outerRadius: getRandomIntInclusive(myTestProject.longestSideInPixels * 0.45, myTestProject.longestSideInPixels * 0.45),
                     possibleJumpRangeInPixels: {lower: 10, upper: 20},
                     lineLength: {lower: 100, upper: 400},
                     numberOfLoops: {lower: 1, upper: 4},
                     accentRange: {bottom: {lower: 1, upper: 1}, top: {lower: 4, upper: 4}},
                     blurRange: {bottom: {lower: 1, upper: 1}, top: {lower: 3, upper: 3}},
                     featherTimes: {lower: 3, upper: 3},
                 }),
                 possibleSecondaryEffects: createSecondaryEffects(),
             }),
         });
     }*/

    /////////////////////////////////////
    ///
    ///
    /// FINAL EFFECTS
    ///
    ///
    /////////////////////////////////////

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
                lineBlue: {lower: 64, upper: 64},
                lineHeight: {lower: 0.5, upper: 0.5},
                edgePercentage: {lower: 0.3, upper: 0.3},
                maxLineHeight: {lower: 4, upper: 4},
                numberOfEdgeSections: {lower: 40, upper: 40},
            })
        }),
    });

    await myTestProject.addFinalEffect({
        layerConfig: new LayerConfig({
            effect: CRTScanLinesEffect,
            percentChance: 0,
            currentEffectConfig: new CRTScanLinesConfig({
                lines: {lower: 100, upper: 100},
                loopTimes: {lower: 1, upper: 2},
                brightnessRange: {bottom: {lower: 20, upper: 25}, top: {lower: 50, upper: 75}},
                brightnessTimes: {lower: 2, upper: 8},
                thicknessRange: {bottom: {lower: 4, upper: 8}, top: {lower: 10, upper: 12}},
                thicknessTimes: {lower: 2, upper: 8},
                lineBlurRange: {bottom: {lower: 10, upper: 20}, top: {lower: 30, upper: 40}},
                lineBlurTimes: {lower: 2, upper: 8},
                colorTintRange: {
                    redRange: {bottom: {lower: 0.5, upper: 0.6}, top: {lower: 0.7, upper: 0.8}},
                    greenRange: {bottom: {lower: 0.5, upper: 0.6}, top: {lower: 0.7, upper: 0.8}},
                    blueRange: {bottom: {lower: 1.25, upper: 1.5}, top: {lower: 1.75, upper: 2}},
                },
                colorTintTimes: {lower: 2, upper: 8},
                opacityRange: {bottom: {lower: 0.5, upper: 0.6}, top: {lower: 0.7, upper: 0.8}},
                opacityTimes: {lower: 2, upper: 8},
            }),
        }),
    });

    /*  await myTestProject.addFinalEffect({
          layerConfig: new LayerConfig({
              effect: CRTBarrelEffect,
              percentChance: 100,
              currentEffectConfig: new CRTBarrelConfig({
                  strength: {lower: 0.15, upper: 0.15},
                  edgeThreshold: {lower: 0.1, upper: 0.1},
                  corner: {lower: 0.2, upper: 0.2},
              }),
          }),
      });
  */
    promiseArray.push(myTestProject.generateRandomLoop());
};

await createComposition(earthenVeil);

await Promise.all(promiseArray);
