import { Icon } from "leaflet";
import meteoIcon from "../../../assets/meteoIcon.svg";
import standardIcon from "../../../assets/standardIcon.svg";
import referenceIcon from "../../../assets/referenceIcon.svg"

export const meteoSensorIcon = new Icon( {
    iconUrl: meteoIcon,
    iconSize: [ 32, 32 ]
} );

export const standardSensorIcon = new Icon( {
    iconUrl: standardIcon,
    iconSize: [ 32, 32 ]
} )

export const referenceSensorIcon = new Icon( {
    iconUrl: referenceIcon,
    iconSize: [ 32, 32 ]
} )
