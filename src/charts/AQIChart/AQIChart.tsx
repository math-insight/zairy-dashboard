import "./AQIChart.css"
import { CartesianGrid, Line, LineChart, Tooltip, TooltipProps, XAxis, YAxis } from "recharts";
import { format, parseISO } from 'date-fns';
import { AirPollutionData, AirQualityIndices } from "../../types/SensorsData.ts";
import { NameType, ValueType } from "recharts/types/component/DefaultTooltipContent";

type AQIChartProps = {
    data: AirPollutionData[];
    measurement: AirQualityIndices;
};


export function AQIChart( { data, measurement }: AQIChartProps ) {
    const formatXAxis = ( tickItem: string ) => {
        return format( parseISO( tickItem ), 'HH:mm' );
    };

    const prepareChartData = ( data: AirPollutionData[] ): Record<AirQualityIndices, {
        datetime: string;
        value: number
    }[]> => {
        const result: Record<AirQualityIndices, { datetime: string; value: number }[]> = {
            'CO': [],
            'NO2': [],
            'SO2': [],
            'O3': [],
            'PM10': [],
            'PM25': [],
        };

        data.forEach( item => {
            result[item.measurement].push( { datetime: item.datetime, value: item.value } );
        } );

        return result;
    };

    const customTooltip = ( { active, payload, label }: TooltipProps<ValueType, NameType> ) => {
        if( active && payload && payload.length ) {
            const date = format( parseISO( label ), 'yyyy-MM-dd, HH:mm' );
            return (
                <div className="custom-tooltip">
                    <p>{ date }</p>
                    <p>{ `Wartość: ${ payload[0].value }` }</p>
                </div>
            );
        }

        return null;
    };

    return (
        <><h2 className="chart-title"> { measurement } </h2><LineChart
            width={ 800 }
            height={ 300 }
            data={ prepareChartData( data )[measurement] }
            margin={ { top: 5, right: 30, left: 20, bottom: 5 } }
        >
            <CartesianGrid strokeDasharray="3 3"/>
            <XAxis dataKey="datetime" tickFormatter={ formatXAxis }/>
            <YAxis/>
            <Tooltip content={ customTooltip }/>
            <Line type="monotone" dataKey="value" stroke={ "#FF7300FF" } dot={ false }/>
        </LineChart></>
    );
}
