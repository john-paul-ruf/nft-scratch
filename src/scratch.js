import {generateSmoothRandomMultistep} from "./util/multistep.js";
import {Range} from "my-nft-gen/src/core/layer/configType/Range.js";

const multi = generateSmoothRandomMultistep({
    numberOfSegments: 8,
    max: new Range(2, 5),
    times: new Range(1, 2),
})

const test = 1 + 1;