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

export const createTheMark = async ({
                                        project = null,
                                        center = {x: 0, y: 0},
                                        keyFrames = 30,
                                        glitchFrameCount = 60,
                                        fadeFrom = 0.0,
                                        opacity = 0.5,
                                        buffer = 550,

                                    }) => {


    //amp
    await project.addPrimaryEffect({
        layerConfig: new LayerConfig({
            effect: StaticImageKeyFrameEffect,
            percentChance: 100,
            currentEffectConfig: new StaticImageKeyFrameConfig({
                fileName: 'src/assets/imageOverlay/image-store/original-artwork/remix-logo.png',
                center: center,
                layerOpacity: [1],
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
                        glitchFrameCount: [glitchFrameCount / 2],
                        lowerRange: new Range(fadeFrom, fadeFrom),
                        upperRange:new Range(opacity, opacity),
                        times: new Range(1, 1),
                    }),
                }),
                new LayerConfig({
                    effect: FadeKeyFrameEffect,
                    percentChance: 100,
                    currentEffectConfig: new FadeKeyFrameConfig({
                        keyFrames: [keyFrames + (glitchFrameCount / 2)],
                        glitchFrameCount: [glitchFrameCount / 2],
                        lowerRange: new Range(opacity, opacity),
                        upperRange:new Range(fadeFrom, fadeFrom),
                        times: new Range(1, 1),
                    }),
                }),
                ...createDegaussEffects([
                    {
                        arraySize: 5,
                        randomChance: {lower: 100, upper: 100},
                        glitchFrameCount: {lower: 5, upper: 15},
                        keyFrames: {lower: keyFrames, upper: keyFrames + glitchFrameCount},
                        sectionHeight: [1, 2, 3],
                        offset: {lower: 2, upper: 8},
                        direction: [-1, 1],
                        glitchTimes: {lower: 1, upper: 3},
                    },
                ])
            ],
        }),
    })
    ;
}



