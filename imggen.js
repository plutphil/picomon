function generateCreatureBase64(gridWidth = 8, gridHeight = 8, pixelSize = 8) {
    // Create an off-screen canvas
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = gridWidth * pixelSize;
    canvas.height = gridHeight * pixelSize;

    // Generate random creature pattern
    const halfGrid = Math.floor(gridWidth / 2);
    const pattern = Array.from({ length: gridHeight }, () =>
        Array.from({ length: halfGrid }, () => Math.random() > 0.5 ? 1 : 0)
    );

    // Function to get random color
    const getRandomColor = () => {
        const colors = ["#FF5733", "#33FF57", "#3357FF", "#FFFF33", "#FF33FF"];
        return colors[Math.floor(Math.random() * colors.length)];
    };

    // Draw the creature
    for (let y = 0; y < gridHeight; y++) {
        for (let x = 0; x < halfGrid; x++) {
            if (pattern[y][x]) {
                ctx.fillStyle = getRandomColor();
                // Draw left side
                ctx.fillRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
                // Draw mirrored side
                const mirroredX = gridWidth - x - 1;
                ctx.fillRect(mirroredX * pixelSize, y * pixelSize, pixelSize, pixelSize);
            }
        }
    }

    // Draw eyes
    const eyeY = 4 * pixelSize; // Y position of eyes
    const leftEyeX = 5 * pixelSize; // X position of left eye
    const rightEyeX = (gridWidth - 6) * pixelSize; // X position of right eye

    // Convert to Base64 image
    return canvas.toDataURL("image/png");
}
