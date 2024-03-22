import "./assets/mobileGaugesPerSensor.css";
import { Measurement } from "../../../shared/types/ISensor.ts";
import { SyntheticEvent, useEffect, useState } from "react";
import getValueThreshold from "../../../shared/service/getValueThreshold.ts";
import { pollutants } from "../../../shared/consts/pollutants.ts";
import GaugeCard from "../../../shared/features/gaugesPerSensor/components/GaugeCard.tsx";
import GaugesPerSensorProps from "../../../shared/types/props/GaugesPerSensorProps.ts";

interface GaugeData {
    index: number,
    pollutant: string,
    measurement: Measurement
}

export default function MobileGaugesPerSensor( { selectedSensor }: GaugesPerSensorProps ) {
    const [ gaugeData, setGaugeData ] = useState<GaugeData[]>( [] );
    const [ currentIndex, setCurrentIndex ] = useState( 0 );
    const [ touchStart, setTouchStart ] = useState( 0 );
    const [ touchEnd, setTouchEnd ] = useState( 0 );

    useEffect( () => {
        if( selectedSensor.data ) {
            const gaugeData = Object.entries( selectedSensor.data ).reduce( ( acc: GaugeData[], [ key, value ], index ) => {
                const lastValue = value[value.length - 1];
                if( lastValue.value !== null ) {
                    acc.push( {
                        index,
                        pollutant: key,
                        measurement: lastValue
                    } );
                }
                return acc;
            }, [] as GaugeData[] );

            setGaugeData( gaugeData );
        }

    }, [ selectedSensor ] );

    const handleTouchStart = ( e: SyntheticEvent ) => {
        if( e.nativeEvent instanceof TouchEvent ) {
            const temp = e as unknown as TouchEvent
            setTouchStart( temp.targetTouches[0].clientX );
        }
    };

    const handleTouchMove = ( e: SyntheticEvent ) => {
        if( e.nativeEvent instanceof TouchEvent ) {
            const temp = e as unknown as TouchEvent
            setTouchEnd( temp.targetTouches[0].clientX );
        }
    };

    const handleTouchEnd = () => {
        if( touchStart - touchEnd > 75 ) {
            handleNextGauge();
        }
        if( touchStart - touchEnd < -75 ) {
            handlePreviousGauge();
        }
    };

    const handleNextGauge = () => {
        setCurrentIndex( prevIndex => (prevIndex + 1) % gaugeData.length );
    };

    const handlePreviousGauge = () => {
        setCurrentIndex( prevIndex => prevIndex === 0 ? gaugeData.length - 1 : prevIndex - 1 );
    };

    return (
        <div className="mobile-gauges-wrapper">
            <div className="selected-sensor-title">
                <h3>{ "Dane dla czujnika" }</h3>
                <h3 id="sensor-name">{ selectedSensor.title + " " + selectedSensor.address }</h3>
            </div>
            <div className="gauge-slide" onTouchStart={ handleTouchStart } onTouchMove={ handleTouchMove }
                 onTouchEnd={ handleTouchEnd }>
                { gaugeData.length > 0 && gaugeData.map( ( { index, pollutant, measurement } ) => {
                    if( index === currentIndex ) {
                        const pollution = pollutants.find( ( { value } ) => value === pollutant );

                        if( pollution ) {
                            const currValueThreshold = getValueThreshold( measurement.value, pollution.airQualityThresholds )

                            return (
                                <GaugeCard key={ `gaugeCard${ pollutant }` } pollutantLabel={ pollutant }
                                           pollutantLongLabel={ pollution.longLabel }
                                           measurement={ measurement } currentThreshold={ currValueThreshold }
                                           airQualityThresholds={ pollution.airQualityThresholds }/>
                            )
                        }
                    }
                } ) }
            </div>
        </div>
    )
}
