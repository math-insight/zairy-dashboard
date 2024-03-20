import { pollutants } from "../../../../../shared/consts/pollutants.ts";

export default function LegendHelpPopup() {

    return (
        <>
            <table className="legend-table">
                <thead>
                <tr>
                    <th>{ 'Indeks jakości powietrza' }</th>
                    { pollutants.map( ( pollutant ) => (
                        <th key={ pollutant.value }>
                            { pollutant.label }
                        </th>
                    ) ) }
                </tr>
                </thead>
                <tbody>
                { pollutants[0].airQualityThresholds.map( ( threshold, index ) => (
                    <tr key={ index }>
                        <td style={ { backgroundColor: threshold.color, color: 'white' } }>
                            { threshold.label }
                        </td>
                        { pollutants.map( ( pollutant, pollutantIndex ) => {
                            // Check if it's the last row
                            const isLastRow = index === pollutants[0].airQualityThresholds.length - 1;
                            return (
                                <td key={ pollutantIndex }>
                                    { isLastRow ? `>${ pollutant.airQualityThresholds[index - 1]?.max }` : `${ pollutant.airQualityThresholds[index]?.min } - ${ pollutant.airQualityThresholds[index]?.max }` }
                                </td>
                            );
                        } ) }
                    </tr>
                ) ) }
                </tbody>
            </table>
            <p>
                { "Wszystkie normy podawane są w mikrometrach na metr sześcienny.\n" +
                    "Normy dla różnych zanieczyszczeń odczytywane są na różnych przedziałach czasowych" }
            </p>
        </>
    );
}
