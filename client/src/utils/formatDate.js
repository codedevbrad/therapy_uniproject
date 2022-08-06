
export function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}

export function getTimeFromDateUTC( date ) {
    return new Date( date ).toUTCString();
    // "Thu, 11 Aug 2022 14:48:23 GMT"
}

export function getTimeAndDate( date ) {
    // get a new date (locale machine date time)
    var date = new Date();
    var n = date.toDateString();
    var time = date.toLocaleTimeString();

    return `${ n } , ${ time }`
}