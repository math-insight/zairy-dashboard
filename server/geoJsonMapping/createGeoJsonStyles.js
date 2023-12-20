import {hexToRgb, mixColor, rgbToHex} from "./colorParsers.js";

export default function createGeoJsonStyles(measuredValue, colorThresholds) {
    const color = getColorForValue(measuredValue, colorThresholds);
    return {
        weight: 1,
        color,
        fillColor: color,
        fillOpacity: 0.6
    }
}

function getColorForValue(measuredValue, colorThresholds) {
    const n = colorThresholds.length;
    let color = '#000000';
    for (let i = 0; i < n; i++) {
        if (measuredValue <= colorThresholds[i].value) {
            if (i === 0 || i === n - 1) return colorThresholds[i].color;
            else {
                const v1 = colorThresholds[i - 1].value;
                const v2 = colorThresholds[i].value;
                const c1 = hexToRgb(colorThresholds[i - 1].color);
                const c2 = hexToRgb(colorThresholds[i].color);
                let rate = (measuredValue - v1) / (v2 - v1);
                rate = Math.pow(rate, 1 / 4);
                color = rgbToHex(mixColor(c1, c2, rate));
                return color;
            }
        }
    }
    return color;
}
