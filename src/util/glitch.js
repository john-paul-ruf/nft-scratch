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


export function createDegaussEffects(configs = [
    {
        arraySize: 100,
        randomChance: {lower: 10, upper: 25},
        glitchFrameCount: {lower: 25, upper: 160},
        keyFrames: {lower: 0, upper: 1800 - 160},
        sectionHeight: [1, 5, 10],
        offset: {lower: 3, upper: 15},
        direction: [-1, 1],
        glitchTimes: {lower: 3, upper: 8},
    }
]) {

    return configs.flatMap(config =>
        Array.from({length: config.arraySize}, () => (
                new LayerConfig({
                    effect: CRTDegaussEffect,
                    percentChance: getRandomIntInclusive(configs[i].randomChance.lower, configs[i].randomChance.upper),
                    currentEffectConfig: new CRTDegaussConfig({
                        keyFrames: [getRandomIntInclusive(configs[i].glitchFrameCount.lower, configs[i].glitchFrameCount.upper)],
                        glitchFrameCount: [getRandomIntInclusive(configs[i].glitchFrameCount.lower, configs[i].glitchFrameCount.upper)],
                        sectionHeight: configs[i].sectionHeight,
                        offset: configs[i].offset,
                        direction: [-1, 1],
                        glitchTimes: configs[i].glitchTimes,
                        backgroundRed: {lower: 0, upper: 0},
                        backgroundGreen: {lower: 0, upper: 0},
                        backgroundBlue: {lower: 0, upper: 0},
                        backgroundAlpha: {lower: 0, upper: 0},
                    }),
                })
            )
        ));
}

export function createGlowEffects(configs = [
    {
        arraySize: 100,
        randomChance: {lower: 10, upper: 25},
        glitchFrameCount: {lower: 25, upper: 160},
        keyFrames: {lower: 0, upper: 1800 - 160},
        lowerRange: {lower: 16, upper: 32},
        times: {lower: 1, upper: 3},
    }
]) {
    return configs.flatMap(config =>
        Array.from({length: config.arraySize}, () => (
            new LayerConfig({
                effect: GlowKeyFrameEffect,
                percentChance: getRandomIntInclusive(config.randomChance.lower, config.randomChance.upper),
                currentEffectConfig: new GlowKeyFrameConfig({
                    keyFrames: [getRandomIntInclusive(config.glitchFrameCount.lower, config.glitchFrameCount.upper)],
                    glitchFrameCount: [getRandomIntInclusive(config.glitchFrameCount.lower, config.glitchFrameCount.upper)],
                    lowerRange: config.lowerRange,
                    times: config.times,
                }),
            })
        ))
    );
}

export function createFadeEffects(configs = [
    {
        arraySize: 100,
        randomChance: {lower: 10, upper: 25},
        glitchFrameCount: {lower: 25, upper: 160},
        keyFrames: {lower: 0, upper: 1800 - 160},
        lowerRange: {lower: 0.4, upper: 0.8},
        times: {lower: 1, upper: 3},
    }
]) {

    return configs.flatMap(config =>
        Array.from({length: config.arraySize}, () => (
            new LayerConfig({
                effect: FadeKeyFrameEffect,
                percentChance: getRandomIntInclusive(config.randomChance.lower, config.randomChance.upper),
                currentEffectConfig: new FadeKeyFrameConfig({
                    keyFrames: [getRandomIntInclusive(config.glitchFrameCount.lower, config.glitchFrameCount.upper)],
                    glitchFrameCount: [getRandomIntInclusive(config.glitchFrameCount.lower, config.glitchFrameCount.upper)],
                    lowerRange: config.lowerRange,
                    times: config.times,
                }),
            })
        ))
    );
}

export function createBlurEffects(configs = [
    {
        arraySize: 100,
        randomChance: {lower: 10, upper: 25},
        glitchFrameCount: {lower: 25, upper: 160},
        keyFrames: {lower: 0, upper: 1800 - 160},
        lowerRange: {lower: 16, upper: 32},
        times: {lower: 1, upper: 3},
    }
]) {
    return configs.flatMap(config =>
        Array.from({length: config.arraySize}, () => (
            new LayerConfig({
                effect: BlurKeyFrameEffect,
                percentChance: getRandomIntInclusive(config.randomChance.lower, config.randomChance.upper),
                currentEffectConfig: new BlurKeyFrameConfig({
                    keyFrames: [getRandomIntInclusive(config.glitchFrameCount.lower, config.glitchFrameCount.upper)],
                    glitchFrameCount: [getRandomIntInclusive(config.glitchFrameCount.lower, config.glitchFrameCount.upper)],
                    lowerRange: config.lowerRange,
                    times: config.times,
                }),
            })
        ))
    );
}