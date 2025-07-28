import {ColorScheme} from "my-nft-gen/src/core/color/ColorScheme.js";
import {LayerConfig} from "my-nft-gen/src/core/layer/LayerConfig.js";
import {CurvedRedEyeEffect} from "my-nft-gen/src/effects/primaryEffects/curved-red-eye/CurvedRedEyeEffect.js";
import {CurvedRedEyeConfig} from "my-nft-gen/src/effects/primaryEffects/curved-red-eye/CurvedRedEyeConfig.js";
import {ColorPicker} from "my-nft-gen/src/core/layer/configType/ColorPicker.js";
import {createFadeEffects} from "../util/glitch.js";
import {getRandomIntInclusive} from 'my-nft-gen/src/core/math/random.js';

export const createCurvedRedEyeReduction = async ({
                                                      project = null,
                                                      stroke,
                                                      thickness,
                                                      center = {x: 0, y: 0},
                                                      numberOfRedEyes = 8,
                                                      lineLength = 10,
                                                      sparsityFactor = 10,
                                                      innerRadius = 20,
                                                      outerRadius = 200,
                                                      radiusGitter,
                                                      loopTimesFunction = (index) => {
                                                          return index + 1
                                                      },
                                                      arcSteps,
                                                      numberOfSpokes,
                                                      possibleJumpRangeInPixels,
                                                      secondaryEffects = []
                                                  }) => {


    const areaSegment = (outerRadius - innerRadius) / (numberOfRedEyes + 1);

    for (let i = 0; i < numberOfRedEyes; i++) {

        const gitter = getRandomIntInclusive(radiusGitter.lower, radiusGitter.upper);

        await project.addPrimaryEffect({
            layerConfig: new LayerConfig({
                effect: CurvedRedEyeEffect,
                percentChance: 100,
                currentEffectConfig: new CurvedRedEyeConfig({
                    innerRadius: gitter + innerRadius + (areaSegment * i),
                    outerRadius: gitter + outerRadius,
                    possibleJumpRangeInPixels: possibleJumpRangeInPixels,
                    lineLength: lineLength,
                    numberOfLoops: {lower: loopTimesFunction(i), upper: loopTimesFunction(i)},
                    invertLayers: true,
                    layerOpacity: 0.6,
                    underLayerOpacity: 0.4,
                    sparsityFactor: sparsityFactor,
                    stroke: stroke,
                    thickness: thickness,
                    accentRange: {bottom: {lower: 4, upper: 6}, top: {lower: 2, upper: 3}},
                    blurRange: {bottom: {lower: 4, upper: 6}, top: {lower: 2, upper: 3}},
                    featherTimes: {lower: 3, upper: 8},
                    center: center,
                    innerColor: new ColorPicker(ColorPicker.SelectionType.neutralBucket),
                    outerColor: new ColorPicker(ColorPicker.SelectionType.colorBucket),
                    arcSteps: arcSteps,
                    numberOfSpokes: numberOfSpokes,
                }),
                possibleSecondaryEffects: [...secondaryEffects],
            }),
        });
    }
}

export const layeredCurvedRedEye = async ({
                                              myTestProject,
                                              stroke,
                                              thickness,
                                              numberOfRedEyes,
                                              lineLength,
                                              sparsityFactor,
                                              center,
                                              innerRadius,
                                              outerRadius,
                                              radiusGitter,
                                              arcSteps,
                                              numberOfSpokes,
                                              possibleJumpRangeInPixels,
                                              numberOfLayers,
                                              loopTimesFunction
                                          }) => {
    for (let i = 0; i < numberOfLayers; i++) {
        await createCurvedRedEyeReduction({
            project: myTestProject,
            stroke: stroke,
            thickness: thickness,
            center: center,
            numberOfRedEyes: numberOfRedEyes,
            lineLength: lineLength,
            sparsityFactor: sparsityFactor,
            innerRadius: innerRadius,
            outerRadius: outerRadius,
            radiusGitter: radiusGitter,
            loopTimesFunction: loopTimesFunction,
            arcSteps,
            numberOfSpokes,
            possibleJumpRangeInPixels,
            secondaryEffects: []
        });
    }
}

