const Goals = require('./db.model');


// **** FINDER QUERIES **** //

function getGoals ({ patientId }) {
	return Goals.find({ patient_id: patientId });
}


async function getGoalsForWeek ({ patientId }) {

    let sevenDaysLater = new Date( );
    sevenDaysLater.setDate( sevenDaysLater.getDate( ) + 7 );

	let goalsThisWeek = await Goals.find({ 
        patient_id: patientId ,
         goal_date: { $lt: sevenDaysLater } 
    });
    return goalsThisWeek[0];
}


// **** MUTABLE QUERIES **** //

async function addGoals ( data ) {
    try {
        let newGoaldObj = new Goals( data );
        return newGoaldObj.save();
    }
    catch ( err ) {
        throw { status: 500 , message: 'could not save a new Goal for patient'};
    }
}


// **** DEVELOPER QUERIES ***** //

async function removeAllGoals ( ) {
    return Goals.deleteMany({});
}

async function removeAllGoalsByUser ( id ) {
    return Goals.deleteMany({ patient_id: id });
}


// EXPORTS...

module.exports.finderQueries = {
	getGoals , getGoalsForWeek
}

module.exports.mutableQueries = {
    addGoals
}

module.exports.developerQueries = {
    removeAllGoals , removeAllGoalsByUser 
}