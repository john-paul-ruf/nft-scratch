import {neonLights} from "./assets/color-scheme-store.js";
import {Project} from "../../my-nft-gen/src/app/Project.js";
import {LayerConfig} from "../../my-nft-gen/src/core/layer/LayerConfig.js";
import {CRTScanLinesEffect} from "../../my-nft-gen/src/effects/finalImageEffects/crtScanLines/CRTScanLinesEffect.js";
import {CRTScanLinesConfig} from "../../my-nft-gen/src/effects/finalImageEffects/crtScanLines/CRTScanLinesConfig.js";
import {CRTDegaussConfig} from "../../my-nft-gen/src/effects/keyFrameEffects/crtDegaussEvent/CRTDegaussConfig.js";
import {CRTDegaussEffect} from "../../my-nft-gen/src/effects/keyFrameEffects/crtDegaussEvent/CRTDegaussEffect.js";
import {CRTShadowConfig} from "../../my-nft-gen/src/effects/finalImageEffects/crtShadow/CRTShadowConfig.js";
import {CRTShadowEffect} from "../../my-nft-gen/src/effects/finalImageEffects/crtShadow/CRTShadowEffect.js";
import {Point2D} from "../../my-nft-gen/src/core/layer/configType/Point2D.js";
import {ColorPicker} from "../../my-nft-gen/src/core/layer/configType/ColorPicker.js";
import {getRandomIntInclusive} from "../../my-nft-gen/src/core/math/random.js";
import {RedEyeEffect} from "../../my-nft-gen/src/effects/primaryEffects/red-eye/RedEyeEffect.js";
import {RedEyeConfig} from "../../my-nft-gen/src/effects/primaryEffects/red-eye/RedEyeConfig.js";
import {FuzzFlareEffect} from "../../my-nft-gen/src/effects/primaryEffects/fuzz-flare/FuzzFlareEffect.js";
import {MultiStepDefinitionConfig} from "../../my-nft-gen/src/core/math/MultiStepDefinitionConfig.js";
import {Range} from "../../my-nft-gen/src/core/layer/configType/Range.js";
import {PercentageRange} from "../../my-nft-gen/src/core/layer/configType/PercentageRange.js";
import {PercentageShortestSide} from "../../my-nft-gen/src/core/layer/configType/PercentageShortestSide.js";
import {PercentageLongestSide} from "../../my-nft-gen/src/core/layer/configType/PercentageLongestSide.js";
import {FuzzFlareConfig} from "../../my-nft-gen/src/effects/primaryEffects/fuzz-flare/FuzzFlareConfig.js";
import {AmpEffect} from "../../my-nft-gen/src/effects/primaryEffects/amp/AmpEffect.js";
import {AmpConfig} from "../../my-nft-gen/src/effects/primaryEffects/amp/AmpConfig.js";
import {GlowKeyFrameEffect} from "my-nft-gen/src/effects/keyFrameEffects/glow/GlowKeyFrameEffect.js";
import {GlowKeyFrameConfig} from "my-nft-gen/src/effects/keyFrameEffects/glow/GlowKeyFrameConfig.js";
import {FadeKeyFrameEffect} from "my-nft-gen/src/effects/keyFrameEffects/fade/FadeKeyFrameEffect.js";
import {FadeKeyFrameConfig} from "my-nft-gen/src/effects/keyFrameEffects/fade/FadeKeyFrameConfig.js";


const promiseArray = [];

function createSecondaryEffects() {
    const secondaryEffects = [];

    for (let i = 0; i < 50; i++) {
        secondaryEffects.push(new LayerConfig({
            effect: CRTDegaussEffect,
            percentChance: getRandomIntInclusive(20, 40),
            currentEffectConfig: new CRTDegaussConfig({
                keyFrames: [getRandomIntInclusive(0, 1675)],
                glitchFrameCount: [getRandomIntInclusive(15, 125)],
                sectionHeight: [1, 5, 10],
                offset: {lower: 1, upper: 5},
                direction: [-1, 1],
                glitchTimes: {lower: 1, upper: 5},
                backgroundRed: {lower: 0, upper: 0},
                backgroundGreen: {lower: 0, upper: 0},
                backgroundBlue: {lower: 0, upper: 0},
                backgroundAlpha: {lower: 0, upper: 0},
            }),
        }));
    }


    for (let i = 0; i < 50; i++) {
        secondaryEffects.push(new LayerConfig({
            effect: GlowKeyFrameEffect,
            percentChance: getRandomIntInclusive(20, 40),
            currentEffectConfig: new GlowKeyFrameConfig({
                keyFrames: [getRandomIntInclusive(0, 1725)],
                glitchFrameCount: [getRandomIntInclusive(15, 75)],
                lowerRange: {lower: 30, upper: 60},
                times: {lower: 1, upper: 2},
            }),
        }));
    }

    for (let i = 0; i < 50; i++) {
        secondaryEffects.push(new LayerConfig({
            effect: FadeKeyFrameEffect,
            percentChance: getRandomIntInclusive(20, 40),
            currentEffectConfig: new FadeKeyFrameConfig({
                keyFrames: [getRandomIntInclusive(0, 1725)],
                glitchFrameCount: [getRandomIntInclusive(15, 75)],
                lowerRange: { lower: 0.6, upper: 0.8 },
                times: {lower: 1, upper: 2},
            }),
        }));
    }

    /*   for (let i = 0; i < 25; i++) {
           secondaryEffects.push(new LayerConfig({
               effect: PixelateKeyFrameEffect,
               percentChance: getRandomIntInclusive(25, 25),
               currentEffectConfig: new PixelateKeyFrameConfig({
                   keyFrames: [getRandomIntInclusive(0, 1725)],
                   glitchFrameCount: [getRandomIntInclusive(15, 75)],
                   lowerRange: {lower: 0, upper: 0},
                   upperRange: {lower: 3, upper: 8},
                   times: {lower: 1, upper: 1},
               }),
           }));
       }*/

    return secondaryEffects;
}

const createComposition = async (colorScheme) => {
    const myTestProject = new Project({
        artist: 'John Ruf',
        projectName: 'key-frame',
        projectDirectory: 'src/key-frame',
        neutrals: ['#FFFFFF'],
        backgrounds: ['#001F14'],
        numberOfFrame: 1800,
        colorScheme: colorScheme,
    });

    for (let i = 0; i < 3; i++) {
        await myTestProject.addPrimaryEffect({
            layerConfig: new LayerConfig({
                effect: FuzzFlareEffect,
                percentChance: 100,
                currentEffectConfig: new FuzzFlareConfig({
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
                            max: new Range(4, 12),
                            times: new Range(1, i+1),
                        }),
                        new MultiStepDefinitionConfig({
                            minPercentage: 20,
                            maxPercentage: 40,
                            max: new Range(4, 12),
                            times: new Range(1, i+1),
                        }),
                        new MultiStepDefinitionConfig({
                            minPercentage: 40,
                            maxPercentage: 60,
                            max: new Range(4, 12),
                            times: new Range(1, i+1),
                        }),
                        new MultiStepDefinitionConfig({
                            minPercentage: 60,
                            maxPercentage: 80,
                            max: new Range(4, 12),
                            times: new Range(1, i+1),
                        }),
                        new MultiStepDefinitionConfig({
                            minPercentage: 80,
                            maxPercentage: 100,
                            max: new Range(4, 12),
                            times: new Range(1, i+1),
                        }),
                    ],

                    numberOfFlareRings: new Range(10, 10),
                    flareRingsSizeRange: new PercentageRange(new PercentageShortestSide(0.01), new PercentageLongestSide(0.7)),
                    flareRingStroke: new Range(3, 3),
                    flareRingThickness: new Range(1, 1),

                    numberOfFlareRays: new Range(15, 15),
                    flareRaysSizeRange: new PercentageRange(new PercentageLongestSide(0.75), new PercentageLongestSide(1)),
                    flareRaysStroke: new Range(3, 3),
                    flareRayThickness: new Range(1, 1),
                    flareOffset: new PercentageRange(new PercentageShortestSide(0.05), new PercentageShortestSide(0.15)),

                    accentRange: {bottom: {lower: 5, upper: 10}, top: {lower: 15, upper: 20}},
                    blurRange: {bottom: {lower: 4, upper: 5}, top: {lower: 8, upper: 10}},
                    featherTimes: {lower: 5, upper: 5},
                }),
                possibleSecondaryEffects: createSecondaryEffects(),
            }),
        });
    }

    const ampCount = 6;
    const lineStartInitial = 80;
    const gap = 20;
    const gapReduction = 2;
    const lineLength = 80;
    const lineReduction = 10;

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

    for (let i = 0; i < ampCount; i++) {
        await myTestProject.addPrimaryEffect({
            layerConfig: new LayerConfig({
                effect: AmpEffect,
                percentChance: 100,
                currentEffectConfig: new AmpConfig({
                    invertLayers: true,
                    invertDirection: ampCount % i === 0,
                    layerOpacity: 0.7,
                    underLayerOpacity: 0.5,
                    sparsityFactor: [ampCount - i],
                    stroke: 1,
                    thickness: 1,
                    accentRange: {bottom: {lower: 1, upper: 1}, top: {lower: 3, upper: 6}},
                    blurRange: {bottom: {lower: 1, upper: 1}, top: {lower: 1, upper: 1}},
                    featherTimes: {lower: 2, upper: 4},
                    speed: {lower: 36, upper: 36},
                    length: getLineLength(i),
                    lineStart: getLineStart(i),
                    center: {x: 1080 / 2, y: 1920 / 2},
                    innerColor: new ColorPicker(ColorPicker.SelectionType.neutralBucket),
                    outerColor: new ColorPicker(ColorPicker.SelectionType.colorBucket),
                }),
                possibleSecondaryEffects: createSecondaryEffects(),
            }),
        });
    }


    const redEyeCount = 8;

    for (let i = 0; i < redEyeCount; i++) {
        await myTestProject.addPrimaryEffect({
            layerConfig: new LayerConfig({
                effect: RedEyeEffect,
                percentChance: 100,
                currentEffectConfig: new RedEyeConfig({
                    invertLayers: true,
                    layerOpacity: 0.8,
                    underLayerOpacity: 0.7,
                    center: new Point2D(1080 / 2, 1920 / 2),
                    innerColor: new ColorPicker(ColorPicker.SelectionType.neutralBucket),
                    outerColor: new ColorPicker(ColorPicker.SelectionType.colorBucket),
                    stroke: 1,
                    thickness: 1,
                    sparsityFactor: [9, 10, 12],
                    innerRadius: getRandomIntInclusive(myTestProject.shortestSideInPixels * 0.5, myTestProject.shortestSideInPixels * 0.5),
                    outerRadius: getRandomIntInclusive(myTestProject.shortestSideInPixels * 0.8, myTestProject.shortestSideInPixels * 0.8),
                    possibleJumpRangeInPixels: {lower: 10, upper: 20},
                    lineLength: {lower: 150, upper: 300},
                    numberOfLoops: {lower: 1, upper: 2},
                    accentRange: {bottom: {lower: 1, upper: 1}, top: {lower: 4, upper: 4}},
                    blurRange: {bottom: {lower: 1, upper: 1}, top: {lower: 3, upper: 3}},
                    featherTimes: {lower: 3, upper: 3},
                }),
                possibleSecondaryEffects: createSecondaryEffects(),
            }),
        });
    }


    /////////////////////////////////////
    ///
    ///
    /// FINAL EFFECTS
    ///
    ///
    /////////////////////////////////////

    await myTestProject.addFinalEffect({
        layerConfig: new LayerConfig({
            effect: CRTScanLinesEffect,
            percentChance: 100,
            currentEffectConfig: new CRTScanLinesConfig({
                lines: {lower: 50, upper: 50},
                loopTimes: {lower: 1, upper: 2},
                brightness: {lower: 3000, upper: 4000},
                thickness: {lower: 12, upper: 12},
                lineBlur: {lower: 4, upper: 4},
            }),
        }),
    });


   /* await myTestProject.addFinalEffect({
        layerConfig: new LayerConfig({
            effect: CRTShadowEffect,
            percentChance: 100,
            currentEffectConfig: new CRTShadowConfig({
                shadowOpacityRange: {bottom: {lower: 0.9, upper: 0.9}, top: {lower: 0.9, upper: 0.9}},
                linesOpacityRange: {bottom: {lower: 0.7, upper: 0.7}, top: {lower: 0.7, upper: 0.7}},
                opacityTimes: {lower: 2, upper: 2},
                lineRed: {lower: 127, upper: 127},
                lineGreen: {lower: 0, upper: 0},
                lineBlue: {lower: 127, upper: 127},
                lineHeight: {lower: 0.5, upper: 0.5},
                edgePercentage: {lower: 0.4, upper: 0.4},
                maxLineHeight: {lower: 4, upper: 4},
                numberOfEdgeSections: {lower: 40, upper: 40},
            })
        }),
    });*/

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

await createComposition(neonLights);

await Promise.all(promiseArray);
