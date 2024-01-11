import "./styles.css";
import { LeafletMap } from "../../MapComponent/LeafletMap.tsx";
import { ZaryMapInfo } from "../utils/mapInfo.ts";
import { BaseSyntheticEvent, useState } from "react";
import sensorsCheckboxes from "../../../utils/sensorsCheckboxes.ts";
import { CircularCheckbox } from "../../CircularCheckboxComponent/circularCheckbox.tsx";
import { PollutionsButtonGrid } from "../../PollutionButtonsGrid/PollutionsButtonGrid.tsx";

export function MobileMapView() {
    const [ displaySensors, setDisplaySensors ] = useState( {
        meteo: false,
        standard: true,
        reference: false,
    } );
    const [ displayTab, setDisplayTab ] = useState( {
        sensors: true,
        pollutions: false
    } )
    const [ turnOnButton, setTurnOnButton ] = useState( {
        SO2: false,
        NO2: false,
        CO: false,
        O3: false,
        PM10: false,
        PM25: false,
    } )

    const handleTabClick = ( event: BaseSyntheticEvent ) => {
        const clickedTabId = event.target.id;

        setDisplayTab( {
            sensors: clickedTabId === 'sensors',
            pollutions: clickedTabId === 'pollutions'
        } );
    };

    return (
        <div className="mobile-map-view-container">
            <div className="leaflet-map-container">
                <LeafletMap mapCenter={ ZaryMapInfo.cityCenter } zoom={ ZaryMapInfo.zoom } enableScrollZoom={ true }
                            displaySensors={ displaySensors }/>
            </div>
            <div className="map-control-panel">
                <div className="control-tabs" onClick={ handleTabClick }>
                    <div id="sensors" className={ `tab ${ displayTab.sensors ? 'picked' : '' }` }>{ "Czujniki" }</div>
                    <div id="pollutions"
                         className={ `tab ${ displayTab.pollutions ? 'picked' : '' }` }>{ "Zanieczyszczenia" }</div>
                </div>
                <div className={ `control-tab display-sensors }` }
                     style={ { display: displayTab.sensors ? "flex" : "none" } }>
                    <div className="checkbox-wrapper mobile-checkbox-wrapper">
                        { sensorsCheckboxes.map( ( { id, label, checked } ) => (
                            <CircularCheckbox
                                key={ id }
                                id={ id }
                                label={ label }
                                checked={ checked }
                                setDisplaySensors={ setDisplaySensors }
                            />
                        ) ) }
                    </div>
                </div>
                <div className="control-tab display-heatmap"
                     style={ { display: displayTab.pollutions ? "flex" : "none" } }>
                    <PollutionsButtonGrid turnOnButton={ turnOnButton } setTurnOnButton={ setTurnOnButton }/>
                </div>
            </div>
            <span className="data-date">{ "Dane z 03.01.2024, 17:55" }</span>
            <div className="map-footer">
                <a href="https://mathinsight.xyz/"
                   className='more-sensors-info'>{ "Dowiedz się więcej o czujnikach i zanieczyszczeniach" }</a>
            </div>
        </div>
    )
}
