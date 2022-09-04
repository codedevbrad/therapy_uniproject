const Sessions = require('./db.model');


// **** FINDER QUERIES **** //

function getSessionsAll ({ patientId }) {
	return Sessions.find({ patient_id: patientId }).lean();
}


async function getSessionsByDate({ start = new Date() , patientId }) {

    let end_date = new Date(new Date().getFullYear(), 11, 31);

    let dates = await Sessions.find({
        date: { $gte: start, $lt: end_date } , 
        patient_id: patientId
    }).lean();

    return dates;
}


// **** MUTABLE QUERIES **** //

async function addSession ( data ) {
    try {
        let newSession = new Sessions( data );
        return newSession.save();
    }
    catch ( err ) {
        throw {status: 500 , message: 'could not save session'};
    }
}


async function removeAllSessions ( ) {
    return Sessions.deleteMany({});
}


// EXPORTS...

module.exports.finderQueries = {
	getSessionsAll , getSessionsByDate
}

module.exports.mutableQueries = {
    addSession , removeAllSessions
}