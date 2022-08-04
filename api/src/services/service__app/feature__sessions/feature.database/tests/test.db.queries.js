// GET DB QUERIES FROM DB.QUERIES.JS
const db_test_api = require('express').Router();
const { asyncSupport } = require('@codedevbrad/serverutils');

const { getSessionsAll , getSessionsByDate } = require('../db.queries').finderQueries;
const { addSession } = require('../db.queries').mutableQueries;


// / api / test / app / sessions / db / queries

db_test_api.get('/' , ( req , res ) => res.status( 200 ).send('/api/test/serviceuser/db/queries'));


db_test_api.get('/getsessions' , asyncSupport( async ( req , res ) => {
    let sessions = await getSessionsAll(  );
    res.status( 200 ).send( sessions );
}));


db_test_api.get('/getsessionsbydate' , asyncSupport( async ( req , res ) => {
    // tomorrow  : 4/8/2022.
    let tomorrow = new Date();
    tomorrow.setDate( today.getDate() + 1 );

    let activities_tomorrow = await getSessionsByDate( tomorrow );
    res.status( 200 ).send( activities_tomorrow );
}));



db_test_api.post('/addsession' , asyncSupport( async ( req, res ) => {
    try {
        // fails
        let outOfYear = await addSession({ 
            patient_id: "6262c8603cd811dc1bf17226",
            session_notes: "note added",
            session_reason: "scheduled by patient" , 
            date: "2023-11-11T14:48:23.000+00:00" 
        });
        let missingPatientID = await addSession({
            session_notes: "note added",
            session_reason: "scheduled by patient" , 
            date: "2023-11-11T14:48:23.000+00:00" 
        });
        console.log('hit after');
        res.status( 200 ).send( 'saved' );
    }
    catch ( err ) {
        console.log( 'failed saving date' , err.message );
        throw { status: 400, message: 'couldnt save data'};
    }
}));


module.exports = db_test_api;
