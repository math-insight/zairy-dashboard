import { LatLngTuple } from "leaflet";
import 'leaflet/dist/leaflet.css';
import './styles.css'
import './heatmapButtons.css'
import { LeafletMap } from "../MapComponent/LeafletMap.tsx";
import sensorsCheckboxes from "../../utils/sensorsCheckboxes.ts";
import { CircularCheckbox } from "../CircularCheckboxComponent/circularCheckbox.tsx";
import { MouseEvent, useState } from "react";

export function MapView() {
    const dataDate = "Dane z 03.01.2024, 17:55"
    const zaryCenter: LatLngTuple = [ 51.62307, 15.15726 ];

    const [ displaySensors, setDisplaySensors ] = useState( {
        meteo: false,
        standard: true,
        reference: false,
    } );

    const [ SO2Active, setSO2Active ] = useState<boolean>( false )
    const [ NO2Active, setNO2Active ] = useState<boolean>( false )
    const [ COActive, setCOActive ] = useState<boolean>( false )
    const [ O3Active, setO3Active ] = useState<boolean>( false )
    const [ PM10Active, setPM10Active ] = useState<boolean>( false )
    const [ PM25Active, setPM25Active ] = useState<boolean>( false )

    const handleClick = ( event: MouseEvent<HTMLButtonElement> ) => {
        switch ( event.currentTarget.id ) {
            case "SO2":
                setSO2Active( true );
                setNO2Active( false );
                setCOActive( false );
                setO3Active( false );
                setPM10Active( false );
                setPM25Active( false );
                break;
            case "NO2":
                setSO2Active( false );
                setNO2Active( true );
                setCOActive( false );
                setO3Active( false );
                setPM10Active( false );
                setPM25Active( false );
                break;
            case "CO":
                setSO2Active( false );
                setNO2Active( false );
                setCOActive( true );
                setO3Active( false );
                setPM10Active( false );
                setPM25Active( false );
                break;
            case "O3":
                setSO2Active( false );
                setNO2Active( false );
                setCOActive( false );
                setO3Active( true );
                setPM10Active( false );
                setPM25Active( false );
                break;
            case "PM10":
                setSO2Active( false );
                setNO2Active( false );
                setCOActive( false );
                setO3Active( false );
                setPM10Active( true );
                setPM25Active( false );
                break;
            case "PM25":
                setSO2Active( false );
                setNO2Active( false );
                setCOActive( false );
                setO3Active( false );
                setPM10Active( false );
                setPM25Active( true );
                break;
            default:
                break;
        }
    };


    return (
        <div className="map-container">
            <span className="data-date">{ dataDate }</span>
            <div className="leaflet-map-container">
                <LeafletMap mapCenter={ zaryCenter } zoom={ 13 } enableScrollZoom={ false }
                            displaySensors={ displaySensors }/>
            </div>

            <div className="map-display-options">
                <div className="display-sensors">
                    <h3>{ "Wyświetlane czujniki" }</h3>
                    <div className="checkbox-wrapper">
                        { sensorsCheckboxes.map( ( { id, label, checked } ) => (
                            <CircularCheckbox
                                key={ id }
                                id={ id }
                                label={ label }
                                checked={ checked }
                                setDisplaySensors={ setDisplaySensors }
                            />
                        ) )
                        }
                    </div>
                </div>
                <div className="display-heatmap">
                    <h3>{ "Wyświetlane zanieczyszczenie" }</h3>
                    <div className="buttons-grid">
                        <button id="SO2" className={ `badge ${ SO2Active ? "on" : "off" }` }
                                onClick={ handleClick }>SO<sub>2</sub>
                        </button>

                        <button id="NO2" className={ `badge ${ NO2Active ? "on" : "off" }` }
                                onClick={ handleClick }>NO<sub>2</sub>
                        </button>

                        <button id="CO" className={ `badge ${ COActive ? "on" : "off" }` }
                                onClick={ handleClick }>CO
                        </button>

                        <button id="O3" className={ `badge ${ O3Active ? "on" : "off" }` }
                                onClick={ handleClick }>O<sub>3</sub>
                        </button>

                        <button id="PM10" className={ `badge ${ PM10Active ? "on" : "off" }` }
                                onClick={ handleClick }>PM10
                        </button>

                        <button id="PM25" className={ `badge ${ PM25Active ? "on" : "off" }` }
                                onClick={ handleClick }>PM<span>2,5</span></button>
                    </div>
                </div>
            </div>
            <div className="map-footer">
                <a href="https://mathinsight.xyz/"
                   className='more-sensors-info'>{ "Dowiedz się więcej o czujnikach i zanieczyszczeniach" }</a>
            </div>
        </div>
    )
}
