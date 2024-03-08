import { PollutantsNames } from "../../../../shared/consts/pollutants.ts";
import { useMap } from "react-leaflet";
import { useEffect } from "react";
import { Layer } from "leaflet";

interface LayerInspectorProps {
    visibleHeatmap: PollutantsNames | "";
    updateRenderingStatus: () => void;
}

export default function LayerInspector( { visibleHeatmap, updateRenderingStatus }: LayerInspectorProps ) {
    const map = useMap();
    const amountOfElementsInMapContainer = 28543;

    useEffect( () => {
        const layers: Layer[] = [];
        map.eachLayer( layer => {
            layers.push( layer );
        } );

        if( amountOfElementsInMapContainer === layers.length ) updateRenderingStatus()
    }, [ map, visibleHeatmap ] );

    return null;
}
