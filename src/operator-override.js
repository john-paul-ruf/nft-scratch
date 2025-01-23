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


const promiseArray = [];

const createComposition = async (colorScheme) => {
    const myTestProject = new Project({
        artist: 'John Ruf',
        projectName: 'operator-override',
        projectDirectory: 'src/key-frame',
        neutrals: ['#FFFFFF'],
        backgrounds: ['#000000'],
        numberOfFrame: 1800,
        colorScheme: colorScheme,
        longestSideInPixels: 1920,
        shortestSideInPixels: 1080,
        isHorizontal: false,
        maxConcurrentFrameBuilderThreads: 1,
    });

    await createOrbElement({project: myTestProject, colorScheme: keterCrown, center: {x: 560, y: 180}})
    await createOrbElement({project: myTestProject, colorScheme: binahUnderstanding, center: {x: 180, y: 420}})
    await createOrbElement({project: myTestProject, colorScheme: chokhmahWisdom, center: {x: 900, y: 420}})
    await createOrbElement({project: myTestProject, colorScheme: gevurahSeverity, center: {x: 180, y: 780}})
    await createOrbElement({project: myTestProject, colorScheme: chesedKindness, center: {x: 900, y: 780}})
    await createOrbElement({project: myTestProject, colorScheme: tiferetBeauty, center: {x: 560, y: 960}})
    await createOrbElement({project: myTestProject, colorScheme: hodSplendor, center: {x: 180, y: 1160}})
    await createOrbElement({project: myTestProject, colorScheme: netzachVictory, center: {x: 900, y: 1160}})
    await createOrbElement({project: myTestProject, colorScheme: yesodFoundation, center: {x: 560, y: 1400}})
    await createOrbElement({project: myTestProject, colorScheme: malkuthKingdom, center: {x: 560, y: 1760}})

    await myTestProject.addPrimaryEffect({
        layerConfig: new LayerConfig({
            effect: MappedFramesEffect,
            percentChance: 100,
            currentEffectConfig: new MappedFramesConfig({
                folderName: '/Users/the.dude/WebstormProjects/nft-scratch/src/assets/mappedFrames/all-seeing/',
                layerOpacity: [0.5],
                buffer: [750],
                center: {x: 560, y: 600},
                loopTimesMultiStep: [
                    new MultiStepDefinitionConfig({
                        minPercentage: 0,
                        maxPercentage: 25,
                        max: new Range(2, 8),
                        times: new Range(3, 3),
                    }),
                    new MultiStepDefinitionConfig({
                        minPercentage: 25,
                        maxPercentage: 50,
                        max: new Range(2, 10),
                        times: new Range(6, 6),
                    }),
                    new MultiStepDefinitionConfig({
                        minPercentage: 50,
                        maxPercentage: 75,
                        max: new Range(2, 8),
                        times: new Range(6, 6),
                    }),
                    new MultiStepDefinitionConfig({
                        minPercentage: 75,
                        maxPercentage: 100,
                        max: new Range(2, 10),
                        times: new Range(3, 3),
                    }),
                ],
            }),
            possibleSecondaryEffects: [...createDegaussEffects({arraySize: 20})]
        }),
    });

    promiseArray.push(myTestProject.generateRandomLoop());
};

await createComposition(malkuthKingdom);

await Promise.all(promiseArray);
