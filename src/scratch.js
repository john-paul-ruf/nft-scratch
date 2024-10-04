import sharp from 'sharp';

const fileIn = 'C:\\Users\\neomo\\WebstormProjects\\nft-scratch\\src\\assets\\scratch\\test.png';
const fileOut = 'C:\\Users\\neomo\\WebstormProjects\\nft-scratch\\src\\assets\\scratch\\';


// Function to create fade-out and fade-in transparency gradients
function createRadialTransparencyGradient(imageBuffer, width, height, innerRadius, outerRadius, fadeIn, frameNumber, maxInnerRadius, maxOuterRadius ) {
    const centerX = width / 2;
    const centerY = height / 2;

    return sharp(imageBuffer)
        .raw()
        .ensureAlpha() // Ensure the image has an alpha channel
        .toBuffer({ resolveWithObject: true })
        .then(({ data, info }) => {
            const { width, height, channels } = info;

            // Loop through each pixel to adjust alpha based on distance from center
            for (let y = 0; y < height; y++) {
                for (let x = 0; x < width; x++) {
                    const offset = (y * width + x) * channels;
                    const distanceFromCenter = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2);

                    if (fadeIn) {
                        // Fade in: fully opaque at inner radius, fully transparent at outer radius
                        if (distanceFromCenter <= innerRadius) {
                            data[offset + 3] = 255; // Fully opaque inside the inner radius
                        } else if (distanceFromCenter >= outerRadius) {
                            data[offset + 3] =0; // Fully transparent outside the outer radius
                        } else {
                            const t = (distanceFromCenter - innerRadius) / (outerRadius - innerRadius);
                            data[offset + 3] = Math.round(255 * t); // Interpolated alpha (increasing)
                        }
                    } else {
                        // Fade out: fully transparent at inner radius, fully opaque at outer radius
                        if (distanceFromCenter <= innerRadius) {
                            data[offset + 3] = 0; // Fully transparent inside the inner radius
                        } else if (distanceFromCenter >= outerRadius) {
                            data[offset + 3] = 255; // Fully opaque outside the outer radius
                        } else {
                            const t = (distanceFromCenter - innerRadius) / (outerRadius - innerRadius);
                            data[offset + 3] = Math.round(255 * t); // Interpolated alpha (increasing)
                        }
                    }
                }
            }

            return sharp(Buffer.from(data), { raw: { width, height, channels } })
                .toFile(fileOut+`frame-${frameNumber}.png`); // Save the frame
        });
}

// Generate 60 frames: 30 for fade-out and 30 for fade-in
function generateFadeOutInFrames(imagePath, totalFrames = 50) {
    const fadeOutFrames = totalFrames / 2;
    const fadeInFrames = totalFrames / 2;

    sharp(imagePath)
        .metadata()
        .then(({ width, height }) => {
            const startInnerRadius = 10;  // Starting inner radius
            const startOuterRadius = 50;  // Starting outer radius
            const endOuterRadius = Math.min(width, height) / 2; // Final outer radius
            const endInnerRadius = endOuterRadius - 100; // Final inner radius (100px difference)

            sharp(imagePath)
                .toBuffer()
                .then(buffer => {
                    // Fade-out phase (first 30 frames)
                    for (let i = 0; i < fadeOutFrames; i++) {
                        const t = i / fadeOutFrames;

                        // Interpolating inner and outer radii for each frame
                        const currentInnerRadius = startInnerRadius + t * (endInnerRadius - startInnerRadius);
                        const currentOuterRadius = startOuterRadius + t * (endOuterRadius - startOuterRadius);

                        createRadialTransparencyGradient(buffer, width, height, currentInnerRadius, currentOuterRadius, false, i);
                    }

                    // Fade-in phase (next 30 frames)
                    for (let i = 0; i < fadeInFrames; i++) {
                        const t = i / fadeInFrames;

                        // Interpolating inner and outer radii for each frame (reverse direction)
                        const currentInnerRadius = startInnerRadius + t * (endInnerRadius - startInnerRadius);
                        const currentOuterRadius = startOuterRadius + t * (endOuterRadius - startOuterRadius);

                        createRadialTransparencyGradient(buffer, width, height, currentInnerRadius, currentOuterRadius, true, i + fadeOutFrames);
                    }
                });
        });
}

// Example usage
const imagePath = fileIn;
generateFadeOutInFrames(imagePath);
