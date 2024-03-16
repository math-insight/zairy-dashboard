import "../assets/gaugeCard.css";
import GaugeComponent from "react-gauge-component";
import { Measurement } from "../../../shared/types/ISensor.ts";
import { AirQualityThreshold } from "../../../shared/types/IPollutant.ts";
import formatDatetime from "../../../shared/service/formatDatetime.ts";

interface GaugeCardProps {
    pollutantLabel: string,
    pollutantLongLabel: string,
    measurement: Measurement,
    currentThreshold: AirQualityThreshold,
    airQualityThresholds: AirQualityThreshold[]
}

export default function GaugeCard( {
                                       pollutantLabel,
                                       pollutantLongLabel,
                                       measurement,
                                       currentThreshold,
                                       airQualityThresholds
                                   }: GaugeCardProps ) {
    return (
        <>

            <div className="gauge-card-wrapper">
                <div className="pollutant-pill" style={ { backgroundColor: currentThreshold.color } }>
                    <span>{ pollutantLabel }</span>
                </div>
                <GaugeComponent
                    type="semicircle"
                    value={ measurement.value > airQualityThresholds[5].max ? airQualityThresholds[5].max : measurement.value }
                    minValue={ airQualityThresholds[0].min }
                    maxValue={ airQualityThresholds[5].max }
                    arc={ {
                        width: 0.3,
                        padding: 0.001,
                        cornerRadius: 1,
                        subArcs: [
                            {
                                limit: airQualityThresholds[0].max,
                                color: airQualityThresholds[0].color,
                                showTick: true,
                                tooltip: {
                                    text: airQualityThresholds[0].label
                                }
                            },
                            {
                                limit: airQualityThresholds[1].max,
                                color: airQualityThresholds[1].color,
                                showTick: true,
                                tooltip: {
                                    text: airQualityThresholds[1].label
                                }
                            },
                            {
                                limit: airQualityThresholds[2].max,
                                color: airQualityThresholds[2].color,
                                showTick: true,
                                tooltip: {
                                    text: airQualityThresholds[2].label
                                }
                            },
                            {
                                limit: airQualityThresholds[3].max,
                                color: airQualityThresholds[3].color,
                                showTick: true,
                                tooltip: {
                                    text: airQualityThresholds[3].label
                                }
                            },
                            {
                                limit: airQualityThresholds[4].max,
                                color: airQualityThresholds[4].color,
                                showTick: true,
                                tooltip: {
                                    text: airQualityThresholds[4].label
                                }
                            },
                            {
                                limit: airQualityThresholds[5].max,
                                color: airQualityThresholds[5].color,
                                showTick: true,
                                tooltip: {
                                    text: airQualityThresholds[5].label
                                }
                            },
                        ]
                    } }
                    pointer={ {
                        length: 0.95,
                        color: '#1f5066',
                        animationDuration: 10000,
                        animationDelay: 3000
                    } }
                    labels={ { valueLabel: { hide: true } } }/>
                <h3>{ pollutantLongLabel }</h3>
                <p>{ `Poziom ${ pollutantLabel } - ${ currentThreshold.label }` }</p>
                <p>{ `Wynik pomiaru - ${ measurement.value }` }</p>
                <p className="gauge-card-footnote">{ `Dane z ${ formatDatetime( measurement.datetime ) }` }</p>
            </div>
        </>

    )
}
