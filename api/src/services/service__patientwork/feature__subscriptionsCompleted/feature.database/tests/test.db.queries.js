// GET DB QUERIES FROM DB.QUERIES.JS
const db_test_api = require('express').Router();
const { asyncSupport } = require('@codedevbrad/serverutils');

const { getSubscriptionsAll } = require('../db.queries').finderQueries;
const { addSubscription } = require('../db.queries').mutableQueries;


// / api / test / patientwork / completedwork / db / queries

db_test_api.get('/' , ( req , res ) => {
    res.status( 200 ).send('/ api / test / patientwork / completedwork / db / queries');
});


db_test_api.get('/get' , asyncSupport( async ( req , res ) => {
    let { id } = req.body;
    let subscriptions = await getSubscriptionsAll({ patientId: id });
    res.status( 200 ).send( subscriptions );
}));


module.exports = db_test_api;
