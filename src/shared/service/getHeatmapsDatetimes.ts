import IHeatmapDatetime from "../types/IHeatmapDatetime.ts";

export default async function getHeatmapsDatetimes(): Promise<IHeatmapDatetime[]> {
    return fetch( `https://api.zairymon.pl/api/simulation/datetime` )
        .then( response => response.json() )
        .then( data => data )
}
