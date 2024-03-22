import { pollutants } from "../consts/pollutants.ts";
import IHeatmap from "../types/IHeatmap.ts";

export default async function getHeatmaps(): Promise<IHeatmap[]> {
    const requests = pollutants.map( ( { value } ) =>
        fetch( `http://localhost:5000/api/simulation?param=${ value }` )
            .then( response => response.json() )
            .then( data => data )
    )

    return Promise.all( requests );
}
