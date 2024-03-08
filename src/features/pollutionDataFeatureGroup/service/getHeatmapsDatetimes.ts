import IHeatmapDatetime from "../consts/IHeatmapDatetime.ts";

export default async function getHeatmapsDatetimes(): Promise<IHeatmapDatetime[]> {
    return fetch( `http://localhost:5000/api/simulation/datetime` )
        .then( response => response.json() )
        .then( data => data )
}
