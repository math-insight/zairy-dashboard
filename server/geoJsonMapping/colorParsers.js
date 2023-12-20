export function hexToRgb(hex) {
    const bigint = parseInt(hex.slice(1), 16);
    return {
        r: (bigint >> 16) & 255,
        g: (bigint >> 8) & 255,
        b: bigint & 255
    };
}

export function rgbToHex(rgb) {
    return "#" + ((1 << 24) + (rgb.r << 16) + (rgb.g << 8) + rgb.b).toString(16).slice(1);
}

export function mixColor(rgb1, rgb2, rate) {
    return {
        r: Math.round(rgb1.r + rate * (rgb2.r - rgb1.r)),
        g: Math.round(rgb1.g + rate * (rgb2.g - rgb1.g)),
        b: Math.round(rgb1.b + rate * (rgb2.b - rgb1.b))
    };
}
