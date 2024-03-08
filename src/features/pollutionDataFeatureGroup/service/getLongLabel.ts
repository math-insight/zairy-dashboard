import { pollutants } from "../../shared/consts/pollutants.ts";

export default function getLongLabel( shortLabel: string ) {
    const indicator = pollutants.find( indicator => indicator.value === shortLabel );
    return indicator ? indicator.longLabel : "";
}
