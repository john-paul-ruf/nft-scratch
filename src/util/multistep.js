import {MultiStepDefinitionConfig} from "my-nft-gen/src/core/math/MultiStepDefinitionConfig.js";
import {getRandomIntExclusive} from "my-nft-gen/src/core/math/random.js";
import {Range} from "my-nft-gen/src/core/layer/configType/Range.js";


export function generateSmoothRandomMultistep(
    {
        numberOfSegments = 4,
        max = new Range(2, 5),
        times = new Range(1, 2),
    }
) {

    const result = [];
    const seg = 100 / numberOfSegments;

    for (let i = 0; i < numberOfSegments; i++) {
        result.push(
            new MultiStepDefinitionConfig({
                minPercentage: Math.ceil(seg * i),
                maxPercentage: Math.ceil(seg * (i +1)),
                max: max,
                times: times,
            })
        );
    }

    return result;
}

export const getMultiStep = () => {

    const availableMultiSteps = [
        [
            new MultiStepDefinitionConfig({
                minPercentage: 0,
                maxPercentage: 20,
                max: new Range(5, 15),
                times: new Range(1, 2),
            }),
            new MultiStepDefinitionConfig({
                minPercentage: 20,
                maxPercentage: 40,
                max: new Range(5, 20),
                times: new Range(1, 2),
            }),
            new MultiStepDefinitionConfig({
                minPercentage: 40,
                maxPercentage: 60,
                max: new Range(5, 25),
                times: new Range(1, 2),
            }),
            new MultiStepDefinitionConfig({
                minPercentage: 60,
                maxPercentage: 80,
                max: new Range(5, 20),
                times: new Range(1, 2),
            }),
            new MultiStepDefinitionConfig({
                minPercentage: 80,
                maxPercentage: 100,
                max: new Range(5, 15),
                times: new Range(1, 2),
            }),
        ],
        [
            new MultiStepDefinitionConfig({
                minPercentage: 0,
                maxPercentage: 20,
                max: new Range(2, 8),
                times: new Range(1, 2),
            }),
            new MultiStepDefinitionConfig({
                minPercentage: 20,
                maxPercentage: 40,
                max: new Range(2, 10),
                times: new Range(1, 2),
            }),
            new MultiStepDefinitionConfig({
                minPercentage: 40,
                maxPercentage: 60,
                max: new Range(2, 8),
                times: new Range(1, 2),
            }),
            new MultiStepDefinitionConfig({
                minPercentage: 60,
                maxPercentage: 80,
                max: new Range(2, 10),
                times: new Range(1, 1),
            }),
            new MultiStepDefinitionConfig({
                minPercentage: 80,
                maxPercentage: 100,
                max: new Range(2, 8),
                times: new Range(1, 2),
            }),
        ],
        [
            new MultiStepDefinitionConfig({
                minPercentage: 0,
                maxPercentage: 25,
                max: new Range(2, 8),
                times: new Range(1, 2),
            }),
            new MultiStepDefinitionConfig({
                minPercentage: 25,
                maxPercentage: 50,
                max: new Range(2, 10),
                times: new Range(1, 2),
            }),
            new MultiStepDefinitionConfig({
                minPercentage: 50,
                maxPercentage: 75,
                max: new Range(2, 8),
                times: new Range(1, 2),
            }),
            new MultiStepDefinitionConfig({
                minPercentage: 75,
                maxPercentage: 100,
                max: new Range(2, 10),
                times: new Range(1, 2),
            }),
        ],
        [
            new MultiStepDefinitionConfig({
                minPercentage: 0,
                maxPercentage: 25,
                max: new Range(4, 8),
                times: new Range(1, 2),
            }),
            new MultiStepDefinitionConfig({
                minPercentage: 25,
                maxPercentage: 50,
                max: new Range(4, 12),
                times: new Range(1, 2),
            }),
            new MultiStepDefinitionConfig({
                minPercentage: 50,
                maxPercentage: 75,
                max: new Range(4, 12),
                times: new Range(1, 2),
            }),
            new MultiStepDefinitionConfig({
                minPercentage: 75,
                maxPercentage: 100,
                max: new Range(4, 8),
                times: new Range(1, 2),
            }),
        ],
        [
            new MultiStepDefinitionConfig({
                minPercentage: 0,
                maxPercentage: 25,
                max: new Range(4, 12),
                times: new Range(1, 2),
            }),
            new MultiStepDefinitionConfig({
                minPercentage: 25,
                maxPercentage: 50,
                max: new Range(4, 8),
                times: new Range(1, 2),
            }),
            new MultiStepDefinitionConfig({
                minPercentage: 50,
                maxPercentage: 75,
                max: new Range(4, 8),
                times: new Range(1, 2),
            }),
            new MultiStepDefinitionConfig({
                minPercentage: 75,
                maxPercentage: 100,
                max: new Range(4, 12),
                times: new Range(1, 2),
            }),
        ],
    ]

    return availableMultiSteps[getRandomIntExclusive(0, availableMultiSteps.length)];

}