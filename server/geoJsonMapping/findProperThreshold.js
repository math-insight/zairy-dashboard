import ColorThresholdsIndex from "./colorThresholdsIndex.js";

export default function findProperThreshold(parameter) {
    return ColorThresholdsIndex.find(({name}) => name === parameter).colorThresholds;
}
