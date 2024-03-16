export default class InvalidResponseForm extends Error {
    constructor( message: string ) {
        super( message );
        this.name = "InvalidResponseForm";

        if( Error.captureStackTrace ) {
            Error.captureStackTrace( this, InvalidResponseForm );
        }
    }

}
