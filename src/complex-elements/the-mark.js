import {LayerConfig} from "../../../my-nft-gen/src/core/layer/LayerConfig.js";
import {
    StaticImageKeyFrameConfig
} from "my-nft-gen/src/effects/keyFrameEffects/staticImageKeyFrame/StaticImageKeyFrameConfig.js";
import {
    StaticImageKeyFrameEffect
} from "my-nft-gen/src/effects/keyFrameEffects/staticImageKeyFrame/StaticImageKeyFrameEffect.js";
import {FadeKeyFrameEffect} from "my-nft-gen/src/effects/keyFrameEffects/fade/FadeKeyFrameEffect.js";
import {FadeKeyFrameConfig} from "my-nft-gen/src/effects/keyFrameEffects/fade/FadeKeyFrameConfig.js";
import {Range} from "my-nft-gen/src/core/layer/configType/Range.js";
import {createDegaussEffects} from "../util/glitch.js";
import {GlowKeyFrameEffect} from "my-nft-gen/src/effects/keyFrameEffects/glow/GlowKeyFrameEffect.js";
import {GlowKeyFrameConfig} from "my-nft-gen/src/effects/keyFrameEffects/glow/GlowKeyFrameConfig.js";
import {getRandomIntInclusive} from "my-nft-gen/src/core/math/random.js";

export const createTheMark = async ({
                                        project = null,
                                        center = {x: 0, y: 0},
                                        keyFrames = 30,
                                        glitchFrameCount = 60,
                                        fadeFrom = 0.0,
                                        opacity = 0.5,
                                        buffer = 550,
                                        fadeInOutCount = 5,
                                    }) => {

    //amp
    await project.addPrimaryEffect({
        layerConfig: new LayerConfig({
            effect: StaticImageKeyFrameEffect,
            percentChance: 100,
            currentEffectConfig: new StaticImageKeyFrameConfig({
                fileName: 'src/assets/imageOverlay/image-store/generated/the-mark.png',
                center: center,
                layerOpacity: [opacity],
                buffer: [buffer],
                keyFrames: [keyFrames],
                glitchFrameCount: [glitchFrameCount],
            }),
            possibleSecondaryEffects: [
                new LayerConfig({
                    effect: FadeKeyFrameEffect,
                    percentChance: 100,
                    currentEffectConfig: new FadeKeyFrameConfig({
                        keyFrames: [keyFrames],
                        glitchFrameCount: [fadeInOutCount],
                        lowerRange: new Range(fadeFrom, fadeFrom),
                        upperRange: new Range(1, 1),
                        times: new Range(1, 1),
                    }),
                }),
                new LayerConfig({
                    effect: FadeKeyFrameEffect,
                    percentChance: 100,
                    currentEffectConfig: new FadeKeyFrameConfig({
                        keyFrames: [keyFrames + glitchFrameCount - fadeInOutCount],
                        glitchFrameCount: [fadeInOutCount],
                        lowerRange: new Range(1, 1),
                        upperRange: new Range(fadeFrom, fadeFrom),
                        times: new Range(1, 1),
                    }),
                }),
                new LayerConfig({
                    effect: GlowKeyFrameEffect,
                    percentChance: 100,
                    currentEffectConfig: new GlowKeyFrameConfig({
                        keyFrames: [keyFrames],
                        glitchFrameCount: [glitchFrameCount],
                        lowerRange: new Range(-12, 12),
                        times: new Range(10, 10),
                    }),
                }),
                ...createDegaussEffects([
                    {
                        arraySize: getRandomIntInclusive(5, 10),
                        randomChance: {lower: 100, upper: 100},
                        glitchFrameCount: {lower: 5, upper: 15},
                        keyFrames: {lower: keyFrames, upper: keyFrames + glitchFrameCount},
                        sectionHeight: [1, 2, 5],
                        offset: {lower: 1, upper: 4},
                        direction: [-1, 1],
                        glitchTimes: {lower: 2, upper: 4},
                    },
                    {
                        arraySize: getRandomIntInclusive(5, 10),
                        randomChance: {lower: 100, upper: 100},
                        glitchFrameCount: {lower: 5, upper: 15},
                        keyFrames: {lower: keyFrames, upper: keyFrames + glitchFrameCount},
                        sectionHeight: [1, 2, 5],
                        offset: {lower: 5, upper: 10},
                        direction: [-1, 1],
                        glitchTimes: {lower: 3, upper: 4},
                    },
                ])
            ],
        }),
    })
    ;
}



