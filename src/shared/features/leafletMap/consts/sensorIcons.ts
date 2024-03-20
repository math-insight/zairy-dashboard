import { Icon } from "leaflet";
import meteoIcon from "../../../assets/meteoIcon.svg";
import referenceIcon from "../../../assets/referenceIcon.svg";
import regularIcon from "../../../assets/regularIcon.svg";


export const meteoSensorIcon = new Icon( {
    iconUrl: meteoIcon,
    iconSize: [ 32, 32 ]
} );

export const regularSensorIcon = new Icon( {
    iconUrl: regularIcon,
    iconSize: [ 32, 32 ]
} )

export const referenceSensorIcon = new Icon( {
    iconUrl: referenceIcon,
    iconSize: [ 32, 32 ]
} )
