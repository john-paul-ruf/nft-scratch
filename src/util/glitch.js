import {LayerConfig} from "my-nft-gen/src/core/layer/LayerConfig.js";
import {CRTDegaussConfig} from "my-nft-gen/src/effects/keyFrameEffects/crtDegaussEvent/CRTDegaussConfig.js";
import {CRTDegaussEffect} from "my-nft-gen/src/effects/keyFrameEffects/crtDegaussEvent/CRTDegaussEffect.js";
import {getRandomIntInclusive} from "my-nft-gen/src/core/math/random.js";

import {GlowKeyFrameEffect} from "my-nft-gen/src/effects/keyFrameEffects/glow/GlowKeyFrameEffect.js";
import {GlowKeyFrameConfig} from "my-nft-gen/src/effects/keyFrameEffects/glow/GlowKeyFrameConfig.js";
import {FadeKeyFrameEffect} from "my-nft-gen/src/effects/keyFrameEffects/fade/FadeKeyFrameEffect.js";
import {FadeKeyFrameConfig} from "my-nft-gen/src/effects/keyFrameEffects/fade/FadeKeyFrameConfig.js";
import {BlurKeyFrameEffect} from "my-nft-gen/src/effects/keyFrameEffects/blur/BlurKeyFrameEffect.js";
import {BlurKeyFrameConfig} from "my-nft-gen/src/effects/keyFrameEffects/blur/BlurKeyFrameConfig.js";


export function createDegaussEffects(config) {
    return Array.from({length: config.arraySize}, () => (
            new LayerConfig({
                effect: CRTDegaussEffect,
                percentChance: getRandomIntInclusive(10, 25),
                currentEffectConfig: new CRTDegaussConfig({
                    keyFrames: [getRandomIntInclusive(0, 1800 - 240)],
                    glitchFrameCount: [getRandomIntInclusive(120, 240)],
                    sectionHeight: [1, 5, 10],
                    offset: {lower: 3, upper: 15},
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

export function createGlowEffects(config) {
    return Array.from({length: config.arraySize}, () => (
            new LayerConfig({
                effect: GlowKeyFrameEffect,
                percentChance: getRandomIntInclusive(20, 40),
                currentEffectConfig: new GlowKeyFrameConfig({
                    keyFrames: [getRandomIntInclusive(0, (1800 - 160))],
                    glitchFrameCount: [getRandomIntInclusive(120, 160)],
                    lowerRange: {lower: 16, upper: 32},
                    times: {lower: 1, upper: 4},
                }),
            })
        )
    );
}

export function createFadeEffects(config) {
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

export function createBlurffects(config) {
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