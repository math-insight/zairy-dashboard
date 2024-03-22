import { pollutants } from "../consts/pollutants.ts";

export type PollutantsShortNames = (typeof pollutants[number])['value'];

