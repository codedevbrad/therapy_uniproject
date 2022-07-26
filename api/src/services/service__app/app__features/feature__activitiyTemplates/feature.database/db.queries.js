const ActivityTemplates = require('./db.model');


// **** FINDER QUERIES **** //

function getActivityTemplates ( ) {
	return ActivityTemplates.find();
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


// EXPORTS

module.exports.finderQueries = {
	getActivityTemplates
}

module.exports.mutableQueries = {
    addActivityTemplates
}