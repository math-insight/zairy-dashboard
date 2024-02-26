// Output date would be DD.MM.YYYY | HH:MM
export default function formatDatetime( dateTimeStr: string ): string {
    const date = new Date( dateTimeStr );

    const day = date.getUTCDate().toString().padStart( 2, '0' );
    const month = (date.getUTCMonth() + 1).toString().padStart( 2, '0' ); // getUTCMonth() returns 0-11
    const year = date.getUTCFullYear();

    const hours = date.getUTCHours().toString().padStart( 2, '0' );
    const minutes = date.getUTCMinutes().toString().padStart( 2, '0' );

    return `${ day }.${ month }.${ year } | ${ hours }:${ minutes }`;
}
