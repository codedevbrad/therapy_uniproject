// GET DB QUERIES FROM DB.QUERIES.JS
const db_test_api = require('express').Router();
const { asyncSupport } = require('@codedevbrad/serverutils');

const { getGoalsForWeek } = require('../db.queries').finderQueries;
const { addGoals } = require('../db.queries').mutableQueries;


// / api / test / patientwork / goals / db / queries

db_test_api.get('/' , ( req , res ) => {
    res.status( 200 ).send('/ api / test / patientwork / goals / db / queries');
});


db_test_api.get('/get' , asyncSupport( async ( req , res ) => {
    let { patient_id } = req.body;
    let goalsThisWeek  = await getGoalsForWeek({ patientId: patient_id });
    res.status( 200 ).send({ goals : goalsThisWeek });
}));


module.exports = db_test_api;
