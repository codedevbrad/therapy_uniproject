import moment from 'moment';

export const timeSinceDate = ( timestamp ) => {
    let dateOld = new Date(timestamp);
    let m = moment( dateOld );

    return m.fromNow();
}