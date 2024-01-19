import {DateTime} from "luxon";

export function DateToString( 
    date,
    format = "yyyy-MM-dd ZZZZ",
){
    return( date.toFormat( format ) );
}

export function StringToDate(
    string,
    format = "yyyy-MM-dd ZZZZ"
){
    return( DateTime.fromFormat(string, format).toJSDate() );
}

export function StringDateArray( 
    endDate,
    startDate = null,
    format = "yyyy-MM-dd ZZZZ",
){
    console.log( "Hi I'm in date func");
    endDate = DateTime.fromJSDate(endDate);
    if( !startDate )
        startDate = endDate
    else
        startDate = DateTime.fromJSDate(startDate);
    console.log( startDate );
    console.log( endDate);
    const dateArray = [];
    let currentDate = endDate;

    while( currentDate >= startDate ){
        dateArray.push( DateToString( currentDate, format ) );
        currentDate = currentDate.minus( { days: 1 } );
    }

    return( dateArray );
}