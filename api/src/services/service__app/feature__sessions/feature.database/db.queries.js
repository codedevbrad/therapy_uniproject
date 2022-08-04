const Sessions = require('./db.model');


// **** FINDER QUERIES **** //

function getSessionsAll ( ) {
	return Sessions.find();
}

function getSessionsByDate( start ) {
    let end_date = new Date(new Date().getFullYear(), 11, 31);
    return Sessions.find({
        date: { $gte: start, $lt: end_date }
    });
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
    return ActivityTemplates.deleteMany({});
}


// EXPORTS...

module.exports.finderQueries = {
	getSessionsAll , getSessionsByDate
}

module.exports.mutableQueries = {
    addSession , removeAllSessions
}