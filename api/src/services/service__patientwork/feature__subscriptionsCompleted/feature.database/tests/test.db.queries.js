// GET DB QUERIES FROM DB.QUERIES.JS
const db_test_api = require('express').Router();
const { asyncSupport } = require('@codedevbrad/serverutils');

const { getCompletedWork } = require('../db.queries').finderQueries;
const { addAsCompleted }  = require('../db.queries').mutableQueries;


// / api / test / patientwork / completedwork / db / queries

db_test_api.get('/' , ( req , res ) => {
    res.status( 200 ).send('/ api / test / patientwork / completedwork / db / queries');
});

// not currently working as i need to pass the right id token

db_test_api.get('/get' , asyncSupport( async ( req , res ) => {
    let { patient_id } = req.body;
    let subscriptions = await getCompletedWork({ patientId: patient_id });
    res.status( 200 ).send( subscriptions );
}));


module.exports = db_test_api;
