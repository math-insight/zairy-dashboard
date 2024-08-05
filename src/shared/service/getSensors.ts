import ISensor from "../types/ISensor.ts";
import InvalidResponseForm from "../types/invalidResponseForm.ts";

export default async function getSensors(): Promise<ISensor[]> {
    return fetch( `http://localhost:5000/api/sensors` ).then( response => response.json() ).then( data => {
        if( !Array.isArray( data ) ) throw new InvalidResponseForm( "Received invalid sensors data." )

        return data
    } )
}
