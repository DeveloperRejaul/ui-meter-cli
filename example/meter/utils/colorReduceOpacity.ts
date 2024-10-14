
export function reduceColorOpacity(hex: string, opacityPercent: number) {
    // Convert hex to RGB
    const hexToRgb = (hex: string) => {
        let trimmedHex = hex.replace('#', '');
        if (trimmedHex.length === 3) {
            trimmedHex = trimmedHex.split('').map((hexChar) => hexChar + hexChar).join('');
        }
        const bigint = parseInt(trimmedHex, 16);
        const r = (bigint >> 16) & 255;
        const g = (bigint >> 8) & 255;
        const b = bigint & 255;
        return { r, g, b };
    };

    // Convert opacity percent (0-100) to a range between 0 and 1
    const opacity = Math.min(Math.max(opacityPercent, 0), 100) / 100;

    const { r, g, b } = hexToRgb(hex);

    // Return as RGBA string
    return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + opacity + ')';
}
