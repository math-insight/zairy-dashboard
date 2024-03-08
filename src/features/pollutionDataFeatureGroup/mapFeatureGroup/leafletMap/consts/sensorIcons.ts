import { Icon } from "leaflet";
import meteoIcon from "../../../../shared/assets/meteoIcon.svg";
import regularIcon from "../../../../shared/assets/regularIcon.svg";
import referenceIcon from "../../../../shared/assets/referenceIcon.svg";

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
