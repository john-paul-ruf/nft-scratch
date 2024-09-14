/*
import sharp from 'sharp';
import fs from 'fs';
import GifEncoder from 'gifencoder';
import {getRandomFromArray, getRandomIntInclusive, randomNumber} from "../../my-nft-gen/src/core/math/random.js";
import {findValue} from "../../my-nft-gen/src/core/math/findValue.js";

// Parameters

const totalFrames = 15;

const config = {
    sectionHeight: [5, 10, 15 /!*20, 30, 40, 50, 75*!/],
    offset: {lower: 5, upper: 15},
    direction: [-1, 1],
    glitchTimes: {lower: 1, upper: 2},
    glitchFrameCount: [15, 30],
    backgroundRed: {lower: 0, upper: 0},
    backgroundGreen: {lower: 0, upper: 0},
    backgroundBlue: {lower: 0, upper: 0},
    backgroundAlpha: {lower: 1, upper: 1},
}

const runData = {
    glitchFrameCount: getRandomFromArray(config.glitchFrameCount),
    backgroundRed: getRandomIntInclusive(config.backgroundRed.lower, config.backgroundRed.upper),
    backgroundGreen: getRandomIntInclusive(config.backgroundGreen.lower, config.backgroundGreen.upper),
    backgroundBlue: getRandomIntInclusive(config.backgroundBlue.lower, config.backgroundBlue.upper),
    backgroundAlpha: randomNumber(config.backgroundAlpha.lower, config.backgroundAlpha.upper),
    imagePath: 'C:\\Users\\neomo\\WebstormProjects\\nft-scratch\\src\\assets\\scratch\\test.png', // Your source image
    outputGifPath: 'C:\\Users\\neomo\\WebstormProjects\\nft-scratch\\src\\assets\\scratch\\test.gif',
    width: 1080,
    height: 1920,
};


const createRows = (data) => {
    const rows = [];
    let currentY = 0;

    while (currentY < data.height) {
        const row = {
            sectionHeight: getRandomFromArray(config.sectionHeight),
            offset: getRandomIntInclusive(config.offset.lower, config.offset.upper),
            direction: getRandomFromArray(config.direction),
            glitchTimes: getRandomIntInclusive(config.glitchTimes.lower, config.glitchTimes.upper),
        }

        currentY += row.sectionHeight;

        rows.push(row);
    }

    return rows
}

runData.rows = createRows(runData);

// Create a GIF encoder
const encoder = new GifEncoder(runData.width, runData.height); // Adjust size to your image dimensions
encoder.createReadStream().pipe(fs.createWriteStream(runData.outputGifPath));
encoder.start();
encoder.setRepeat(0); // Loop indefinitely
encoder.setDelay(100); // Frame delay in ms
encoder.setQuality(10); // Image quality

// Load the image
const createGlitchFrame = async (frame, amplitude) => {
    const inputBuffer = fs.readFileSync(runData.imagePath);

    const {data, info} = await sharp(inputBuffer).raw().toBuffer({resolveWithObject: true});

    // Create an empty buffer for the output image
    const outputBuffer = Buffer.alloc(data.length);

    let currentLine = 0;

    for (let rowIndex = 0; rowIndex < runData.rows.length; rowIndex++) {
        for (let y = currentLine; y < currentLine + runData.rows[rowIndex].sectionHeight && currentLine + runData.rows[rowIndex].sectionHeight < runData.height; y++) {

            let shiftX = Math.floor(findValue(0, runData.rows[rowIndex].offset, runData.rows[rowIndex].glitchTimes, runData.glitchFrameCount, frame))

            shiftX *= runData.rows[rowIndex].direction

            for (let x = 0; x < runData.width; x++) {
                // Calculate current pixel index (R, G, B, A channels)
                const pixelIndex = (y * runData.width + x) * 4;

                // Calculate the shifted x position without wrapping
                const shiftedX = x + shiftX;

                if (shiftedX >= 0 && shiftedX < runData.width) {
                    const shiftedPixelIndex = (y * runData.width + shiftedX) * 4;

                    // Copy the RGBA values from the original image to the new position
                    outputBuffer[pixelIndex] = data[shiftedPixelIndex];       // Red
                    outputBuffer[pixelIndex + 1] = data[shiftedPixelIndex + 1]; // Green
                    outputBuffer[pixelIndex + 2] = data[shiftedPixelIndex + 2]; // Blue
                    outputBuffer[pixelIndex + 3] = data[shiftedPixelIndex + 3]; // Alpha
                } else {
                    // Optionally, fill pixels that are shifted out of bounds with a background color or transparent
                    outputBuffer[pixelIndex] = runData.backgroundRed;
                    outputBuffer[pixelIndex + 1] = runData.backgroundGreen;
                    outputBuffer[pixelIndex + 2] = runData.backgroundBlue;
                    outputBuffer[pixelIndex + 3] = Math.floor(runData.backgroundAlpha * 255); // Alpha
                }
            }
        }

        currentLine += runData.rows[rowIndex].sectionHeight;
    }


    // Convert the buffer back into a PNG image
    return outputBuffer
};

// Generate frames
(async () => {
    for (let frame = 0; frame < runData.glitchFrameCount; frame++) {

        console.log(`Generating frame ${frame + 1}/${runData.glitchFrameCount}`);

        const frameBuffer = await createGlitchFrame(frame);

        await sharp(frameBuffer, {
            raw: {
                width: runData.width,
                height: runData.height,
                channels: 4
            }
        }).png().toFile(`C:\\Users\\neomo\\WebstormProjects\\nft-scratch\\src\\assets\\scratch\\test${frame}.png`);

        // Add the frame to the GIF encoder
        encoder.addFrame(await sharp(frameBuffer, {
            raw: {
                width: runData.width,
                height: runData.height,
                channels: 4
            }
        }).png().toBuffer());
    }

    encoder.finish();
    console.log(`GIF saved as ${runData.outputGifPath}`);
})();
*/


import sharp from 'sharp';
import fs from 'fs';


const fileIn = 'C:\\Users\\neomo\\WebstormProjects\\nft-scratch\\src\\assets\\scratch\\test.png';
const fileOut = 'C:\\Users\\neomo\\WebstormProjects\\nft-scratch\\src\\assets\\scratch\\wrap-test.png'

function sphericalWarpEdges(inputBuffer, edgePercentage, radius) {
    return sharp(inputBuffer)
        .raw()
        .toBuffer({ resolveWithObject: true })
        .then(({ data, info }) => {
            const { width, height, channels } = info;
            const edgeWidth = Math.round(width * edgePercentage);  // 5% of the width
            const edgeHeight = Math.round(height * edgePercentage); // 5% of the height
            const centerX = Math.floor(width / 2);
            const centerY = Math.floor(height / 2);

            let outputBuffer = Buffer.alloc(data.length);

            for (let y = 0; y < height; y++) {
                for (let x = 0; x < width; x++) {
                    let newX = x;
                    let newY = y;

                    // Check if the pixel is within the outer 5% of the edges
                    if (y < edgeHeight || y >= height - edgeHeight || x < edgeWidth || x >= width - edgeWidth) {
                        // Normalize coordinates for spherical projection
                        let normX = (x - centerX) / centerX;
                        let normY = (y - centerY) / centerY;
                        let thetaX = Math.PI * normX;  // Horizontal angle
                        let thetaY = (Math.PI / 2) * normY;  // Vertical angle

                        // Calculate spherical warp for the edges
                        if (x < edgeWidth || x >= width - edgeWidth) {
                            newX = Math.round(centerX + radius * Math.sin(thetaX));
                        }
                        if (y < edgeHeight || y >= height - edgeHeight) {
                            newY = Math.round(centerY + radius * Math.sin(thetaY));
                        }
                    }

                    // Prevent out of bounds and only copy if the pixel is within the image boundaries
                    if (newX >= 0 && newX < width && newY >= 0 && newY < height) {
                        let srcIdx = (y * width + x) * channels;
                        let destIdx = (newY * width + newX) * channels;

                        // Copy RGBA values
                        for (let c = 0; c < channels; c++) {
                            outputBuffer[destIdx + c] = data[srcIdx + c];
                        }
                    }
                }
            }

            return sharp(outputBuffer, { raw: { width, height, channels } })
                .toFile(fileOut);
        });
}

fs.readFile(fileIn, (err, data) => {
    if (err) throw err;
    sphericalWarpEdges(data, 0.05, 500);  // Apply 5% edge warp with spherical radius of 100
});
