import { Desktop } from "./screens/desktop/Desktop.tsx";

function App() {
    // const [ displayCharts, setDisplayCharts ] = useState<DisplayChartsInfo>( {
    //     toggleView: false,
    //     sensorId: ''
    // } )
    //
    // const [ displayPollutionSimulation, setDisplayPollutionSimulation ] = useState<DisplayPollutionSimulation>( {
    //     userChangedPollutionType: false,
    //     pollutionType: "CO",
    // } )
    //
    // const [ displaySensors, setDisplaySensors ] = useState<DisplaySensors>( {
    //     meteo: true,
    //     normal: true,
    //     reference: true,
    // } );
    //
    // const toggleDisplayedSensors = ( checkedSensors: CheckboxValueType[] ) => {
    //     const displaySensors: DisplaySensors = {
    //         meteo: false,
    //         normal: false,
    //         reference: false
    //     }
    //
    //     if( checkedSensors.includes( 'meteoSensors' ) ) displaySensors.meteo = true;
    //     if( checkedSensors.includes( 'normalSensors' ) ) displaySensors.normal = true;
    //     if( checkedSensors.includes( 'referenceSensors' ) ) displaySensors.reference = true;
    //
    //     setDisplaySensors( displaySensors );
    // }
    //
    // return (
    //     <>
    //         <LeafletMap displaySensors={ displaySensors }
    //                     setDisplayCharts={ setDisplayCharts }
    //                     displayPollutionSimulation={ displayPollutionSimulation }
    //                     setDisplayPollutionSimulation={ setDisplayPollutionSimulation }
    //         />
    //         <ButtonsRow toggleDisplayedSensors={ toggleDisplayedSensors }
    //                     setDisplayPollutionSimulation={ setDisplayPollutionSimulation }
    //         />
    //         { displayCharts.toggleView && <Charts displayChartsInfo={ displayCharts }/> }
    //     </>
    // );

    return (
        <Desktop/>
    )
}

export default App;
