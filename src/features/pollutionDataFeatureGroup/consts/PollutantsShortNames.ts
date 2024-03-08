import { pollutants } from "../../shared/consts/pollutants.ts";

export type PollutantsShortNames = (typeof pollutants[number])['value'];

