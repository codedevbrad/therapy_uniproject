const ActivityTemplates = require('./db.model');


// **** FINDER QUERIES **** //

function getActivityTemplates ( ) {
	return ActivityTemplates.find();
}

function getActivityTemplatesWithout( query ) {
    return ActivityTemplates.find().select(['-words'])
}


// **** MUTABLE QUERIES **** //

async function addActivityTemplates ( data ) {
    try {
        let newActivity = new ActivityTemplates( data );
        return newActivity.save();
    }
    catch ( err ) {
        throw {status: 500 , message: 'could not save activity'};
    }
}


async function removeAllActivities ( ) {
    return ActivityTemplates.deleteMany({});
}

// EXPORTS

module.exports.finderQueries = {
	getActivityTemplates , getActivityTemplatesWithout
}

module.exports.mutableQueries = {
    addActivityTemplates , removeAllActivities
}