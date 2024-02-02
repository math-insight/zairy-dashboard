import { LatLngTuple } from "leaflet";
import 'leaflet/dist/leaflet.css';
import './styles.css'
import './heatmapButtons.css'
import sensorsCheckboxes from "../../../utils/sensorsCheckboxes.ts";
import { CircularCheckbox } from "../../CircularCheckboxComponent/circularCheckbox.tsx";
import LoadingScreen from "../../LoadingScreenView/LoadingScreen.tsx";
import { LeafletMap } from "../../MapComponent/LeafletMap.tsx";
import { MouseEvent, useEffect, useState } from "react";
import { PolygonData, SimulationData } from "../utils/PollutionSimulationData.ts";
import { format, parseISO } from "date-fns";

export function MapView() {
    const Pollutants = [ "SO2", "NO2", "CO", "O3", "PM10", "PM25" ];
    const ZaryCenter: LatLngTuple = [ 51.62307, 15.15726 ];
    const FrontPartOfSimulationDateTitle = 'Dane z ';

    const [ areSimulationsLoading, setAreSimulationsLoading ] = useState<boolean>( true );
    const [ simulationsData, setSimulationsData ] = useState<SimulationData[]>( [] );
    const [ simulationDate, setSimulationDate ] = useState<string>( '' );
    const [ pickedSimulation, setPickedSimulation ] = useState<string>( '' );
    const [ simulationPolygons, setSimulationPolygons ] = useState<PolygonData[]>( [] );
    const [ displaySensors, setDisplaySensors ] = useState( {
        meteo: false,
        standard: true,
        reference: false,
    } );
    const handleClick = ( event: MouseEvent<HTMLButtonElement> ) => {
        const clickedButton = event.currentTarget.id;

        setPickedSimulation( prevState => (prevState === clickedButton) ? '' : clickedButton );
    }

    useEffect( () => {
        const fetchData = async () => {
            const requests = Pollutants.map( pollutant =>
                fetch( `http://localhost:5000/api/simulation?param=${ pollutant }` )
                    .then( response => response.json() )
                    .then( data => data as SimulationData ) // TODO: add error handling from server
            )

            return await Promise.all( requests );
        }

        if( areSimulationsLoading ) fetchData().then( data => {
            setSimulationsData( data );
            setAreSimulationsLoading( false );
        } )
    } );

    useEffect( () => {
        if( !areSimulationsLoading ) {
            const [ simulationDataForPollutant ] = simulationsData.filter( ( { pollutant } ) => pollutant === pickedSimulation );

            if( simulationDataForPollutant ) {
                const formattedDate = format( parseISO( simulationDataForPollutant.datetime ), 'dd-MM-yyyy HH:mm' )
                setSimulationDate( FrontPartOfSimulationDateTitle + formattedDate );
                setSimulationPolygons( simulationDataForPollutant.polygonSimData );
            }
        }
    }, [ pickedSimulation, areSimulationsLoading ] );

    return (
        <div className="map-container">
            <div>
                { areSimulationsLoading ? (
                        <LoadingScreen/>
                    ) :
                    (
                        <><span className="data-date">{ simulationDate }</span>
                            <div className="leaflet-map-container">
                                <LeafletMap mapCenter={ ZaryCenter } zoom={ 13 } enableScrollZoom={ false }
                                            displaySensors={ displaySensors } heatmapPolygons={ simulationPolygons }/>
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
                                        ) ) }
                                    </div>
                                </div>
                                <div className="display-heatmap">
                                    <h3>{ "Wyświetlane zanieczyszczenie" }</h3>
                                    <div className="buttons-grid">
                                        <button id="SO2"
                                                className={ `badge ${ (pickedSimulation === 'SO2') ? "on" : "off" }` }
                                                onClick={ handleClick }>SO<sub>2</sub>
                                        </button>

                                        <button id="NO2"
                                                className={ `badge ${ (pickedSimulation === 'NO2') ? "on" : "off" }` }
                                                onClick={ handleClick }>NO<sub>2</sub>
                                        </button>

                                        <button id="CO"
                                                className={ `badge ${ (pickedSimulation === 'CO') ? "on" : "off" }` }
                                                onClick={ handleClick }>CO
                                        </button>

                                        <button id="O3"
                                                className={ `badge ${ (pickedSimulation === 'O3') ? "on" : "off" }` }
                                                onClick={ handleClick }>O<sub>3</sub>
                                        </button>

                                        <button id="PM10"
                                                className={ `badge ${ (pickedSimulation === 'PM10') ? "on" : "off" }` }
                                                onClick={ handleClick }>PM10
                                        </button>

                                        <button id="PM25"
                                                className={ `badge ${ (pickedSimulation === 'PM25') ? "on" : "off" }` }
                                                onClick={ handleClick }>PM<span>2,5</span></button>
                                    </div>
                                </div>
                            </div>
                        </>
                    ) }
            </div>

            <div className="map-footer">
                <a href="https://mathinsight.xyz/"
                   className='more-sensors-info'>{ "Dowiedz się więcej o czujnikach i zanieczyszczeniach" }</a>
            </div>
        </div>
    )
}
