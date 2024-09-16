import sharp from 'sharp';

const fileIn = 'C:\\Users\\neomo\\WebstormProjects\\nft-scratch\\src\\assets\\scratch\\img.png';
const fileOut = 'C:\\Users\\neomo\\WebstormProjects\\nft-scratch\\src\\assets\\scratch\\mask.png';

// Function to create a path around the object, grow it, and fill the object with a solid color
async function fillObject(inputPath, outputPath, growBy, fillColor) {
    const baseImage = sharp(inputPath);

    // Step 1: Extract the alpha channel to create a mask of the object
    const { width, height } = await baseImage.metadata();

    const alphaChannel = await baseImage
        .extractChannel('alpha')  // Extract alpha channel to detect the object
        .toColourspace('b-w')     // Convert to a grayscale mask
        .threshold(128)           // Binary mask: object is white, background is black
        .toBuffer();

    // Step 2: Grow the object mask using blur to simulate dilation
    const grownMask = await sharp(alphaChannel)
        .resize(width, height)    // Ensure the mask matches the image size
        .blur(growBy)             // Blur the mask to expand it (simulate dilation)
        .threshold(128)           // Re-threshold to make the grown mask binary again
        .toBuffer();

    // Step 3: Create a solid color image of the same size as the original image
    const solidColorImage = await sharp({
        create: {
            width: width,
            height: height,
            channels: 4,
            background: fillColor, // Example: { r: 255, g: 0, b: 0, alpha: 1 } for solid red
        },
    }).toBuffer();

    // Step 4: Composite the solid color onto the original image where the object mask is
    await sharp(solidColorImage)
        .composite([
            { input: grownMask, blend: 'dest-in' }, // Apply the mask to constrain color fill to the object
            { input: inputPath, blend: 'atop' },    // Overlay the original image on top of the filled object
        ])
        .toFile(outputPath); // Save the output image
}

// Example usage:
fillObject(fileIn, fileOut, 10, { r: 255, g: 0, b: 0, alpha: 1 }) // Fill object with red color
    .then(() => console.log('Image processing completed'))
    .catch((err) => console.error('Error:', err));


