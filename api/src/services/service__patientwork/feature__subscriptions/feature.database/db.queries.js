const Subscribed = require('./db.model');


// **** FINDER QUERIES **** //

function getSubscriptionsAll ({ patientId }) {
	return Subscribed.find({ patient_id: patientId }).lean();
}


// **** MUTABLE QUERIES **** //

async function addSubscription ( data ) {
    try {
        let newSession = new Subscriptions( data );
        return newSession.save();
    }
    catch ( err ) {
        throw { status: 500 , message: 'could not save subscription'};
    }
}

// **** DEVELOPER QUERIES ***** //

async function removeAllSubscriptions ( ) {
    return ActivityTemplates.deleteMany({});
}

async function removeAllSubscriptionsByUser ( id ) {
    return ActivityTemplates.deleteMany({ patient_id: id });
}

// EXPORTS...

module.exports.finderQueries = {
	getSubscriptionsAll
}

module.exports.mutableQueries = {
    addSubscription 
}

module.exports.developerQueries = {
    removeAllSubscriptions , removeAllSubscriptionsByUser 
}