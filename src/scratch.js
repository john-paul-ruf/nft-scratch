import sharp from 'sharp';

const fileIn = 'C:\\Users\\neomo\\WebstormProjects\\nft-scratch\\src\\assets\\scratch\\test.png';
const fileOut = 'C:\\Users\\neomo\\WebstormProjects\\nft-scratch\\src\\assets\\scratch\\wrap-cylindrical-rounded.png';

// Function to apply a pronounced cylindrical warp with rounded edges and softened transitions
function applyPronouncedCylindricalWarp(inputPath, outputPath, strength = 0.5, edgeThreshold = 0.1) {
    sharp(inputPath)
        .raw()
        .ensureAlpha()
        .toBuffer({ resolveWithObject: true })
        .then(({ data, info }) => {
            const { width, height, channels } = info;
            const warpedBuffer = Buffer.alloc(data.length);
            const centerX = width / 2;
            const centerY = height / 2;

            // Calculate the pixel threshold for edge effects
            const pixelThreshold = Math.min(width, height) * edgeThreshold;

            for (let y = 0; y < height; y++) {
                for (let x = 0; x < width; x++) {
                    const distX = Math.min(x, width - x - 1);
                    const distY = Math.min(y, height - y - 1);
                    const distToCenterX = x - centerX;
                    const distToCenterY = y - centerY;
                    const distToEdge = Math.min(distX, distY);
                    const distanceFromCorner = Math.sqrt(distToCenterX**2 + distToCenterY**2);

                    let warpFactor = 1;
                    if (distToEdge < pixelThreshold) {
                        // Modify the warp factor with a smoothing function
                        warpFactor = 1 + strength * (1 - Math.sin((Math.PI / 2) * (distToEdge / pixelThreshold)));
                    }

                    // Further refine the warp factor near the corners
                    if (distanceFromCorner > Math.max(width, height) * 0.85) {
                        warpFactor *= 1 - 0.5 * (1 - Math.cos((Math.PI / 2) * ((distanceFromCorner / Math.max(width, height) - 0.85) / 0.15)));
                    }

                    const newX = Math.round(centerX + distToCenterX * warpFactor);
                    const newY = Math.round(centerY + distToCenterY * warpFactor);
                    const srcX = Math.min(Math.max(newX, 0), width - 1);
                    const srcY = Math.min(Math.max(newY, 0), height - 1);

                    const srcIdx = (srcY * width + srcX) * channels;
                    const destIdx = (y * width + x) * channels;
                    for (let c = 0; c < channels; c++) {
                        warpedBuffer[destIdx + c] = data[srcIdx + c];
                    }
                }
            }

            sharp(warpedBuffer, { raw: { width, height, channels } })
                .toFile(outputPath)
                .then(() => {
                    console.log(`Warped image with rounded edges and softened transitions saved to ${outputPath}`);
                })
                .catch(err => {
                    console.error('Error writing warped image:', err);
                });
        })
        .catch(err => {
            console.error('Error processing image:', err);
        });
}

// Apply the effect
applyPronouncedCylindricalWarp(fileIn, fileOut, 0.04, 0.05);
