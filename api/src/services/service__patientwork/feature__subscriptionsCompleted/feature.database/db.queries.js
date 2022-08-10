const Completed = require('./db.model');


// **** FINDER QUERIES **** //

function getCompletedWork ({ patientId }) {
	return Completed.find({ patient_id: patientId });
}


// **** MUTABLE QUERIES **** //

async function addAsCompleted ( data ) {
    try {
        let newCompletedObj = new Completed( data );
        return newCompletedObj.save();
    }
    catch ( err ) {
        throw { status: 500 , message: 'could not save an activity finished by patient'};
    }
}

// **** DEVELOPER QUERIES ***** //

async function removeAllSavedWork ( ) {
    return ActivityTemplates.deleteMany({});
}

async function removeAllSavedWorkByUser ( id ) {
    return ActivityTemplates.deleteMany({ patient_id: id });
}


// EXPORTS...

module.exports.finderQueries = {
	getCompletedWork
}

module.exports.mutableQueries = {
   addAsCompleted
}

module.exports.developerQueries = {
    removeAllSavedWork , removeAllSavedWorkByUser 
}