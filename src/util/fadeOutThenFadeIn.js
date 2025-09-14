import {LayerConfig} from "my-nft-gen/src/core/layer/LayerConfig.js";
import {FadeKeyFrameEffect} from "my-nft-effects-core/src/effects/keyFrameEffects/fade/FadeKeyFrameEffect.js";
import {getRandomIntInclusive} from "my-nft-gen/src/core/math/random.js";
import {FadeKeyFrameConfig} from "my-nft-effects-core/src/effects/keyFrameEffects/fade/FadeKeyFrameConfig.js";
import {
    SetOpacityKeyFrameEffect
} from "my-nft-effects-core/src/effects/keyFrameEffects/setOpacity/SetOpacityKeyFrameEffect.js";
import {
    SetOpacityKeyFrameConfig
} from "my-nft-effects-core/src/effects/keyFrameEffects/setOpacity/SetOpacityKeyFrameConfig.js";

export const fadeOutThenFadeIn = ({
                                      keyFrameStart = 30,
                                      fadeTo = 0.5,
                                      fadeFrameCount = 15,
                                      holdFrameCount = 60,
                                  }) => {

    return [
        new LayerConfig({
            effect: FadeKeyFrameEffect,
            percentChance: 100,
            currentEffectConfig: new FadeKeyFrameConfig({
                keyFrames: [keyFrameStart],
                glitchFrameCount: [fadeFrameCount],
                lowerRange: {lower: 1, upper: 1},
                upperRange: {lower: fadeTo, upper: fadeTo},
                times: 1,
            }),
        }),

        new LayerConfig({
            effect: SetOpacityKeyFrameEffect,
            percentChance: 100,
            currentEffectConfig: new SetOpacityKeyFrameConfig({
                keyFrames: [keyFrameStart + fadeFrameCount],
                glitchFrameCount: [holdFrameCount],
                opacity: fadeTo,
            }),
        }),

        new LayerConfig({
            effect: FadeKeyFrameEffect,
            percentChance: 100,
            currentEffectConfig: new FadeKeyFrameConfig({
                keyFrames: [keyFrameStart + fadeFrameCount + holdFrameCount],
                glitchFrameCount: [fadeFrameCount],
                lowerRange: {lower: fadeTo, upper: fadeTo},
                upperRange: {lower: 1, upper: 1},
                times: 1,
            }),
        }),
    ]
}

/**
 * Generates a list of fade-out-then-fade-in effects safely within a total frame budget.
 * @param {number} count - How many effects to return.
 * @param {number} maxFrame - Maximum total frames to work within.
 * @param {object} options - Optional config overrides: fadeTo, fadeFrameCount, holdFrameCount
 * @returns {LayerConfig[]} Array of LayerConfig instances
 */
export const getRandomFadeInFadeOutEffects = ({
                                                  count,
                                                  maxFrame,
                                                  fadeTo = 0.5,
                                                  fadeFrameCount = 15,
                                                  holdFrameCount = 60,
                                              }) => {
    const totalDuration = fadeFrameCount * 2 + holdFrameCount;
    const availableFrame = maxFrame - totalDuration;

    if (availableFrame <= 0) {
        throw new Error(`maxFrame (${maxFrame}) is too small to fit a full fade cycle (${totalDuration} frames)`);
    }

    const usedStartFrames = new Set();
    const effects = [];

    while (usedStartFrames.size < count) {
        const candidate = getRandomIntInclusive(0, availableFrame);

        // Optional: Skip duplicates to avoid overlap
        if (usedStartFrames.has(candidate)) continue;
        usedStartFrames.add(candidate);

        const layers = fadeOutThenFadeIn({
            keyFrameStart: candidate,
            fadeTo,
            fadeFrameCount,
            holdFrameCount,
        });

        effects.push(...layers);
    }

    return effects;
};
