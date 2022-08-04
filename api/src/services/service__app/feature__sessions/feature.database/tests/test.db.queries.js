// GET DB QUERIES FROM DB.QUERIES.JS
const db_test_api = require('express').Router();
const { asyncSupport } = require('@codedevbrad/serverutils');

const { getSessionsAll , getSessionsByDate } = require('../db.queries').finderQueries;
const { addSession } = require('../db.queries').mutableQueries;


// / api / test / app / sessions / db / queries

db_test_api.get('/' , ( req , res ) => res.status( 200 ).send('/api/test/serviceuser/db/queries'))

db_test_api.get('/getsessionsbydate' , asyncSupport( async ( req, res ) => {
    let today = new Date();
    let activities = await getSessionsByDate( today );
    res.status( 200 ).send( activities );
}));

db_test_api.post('/addsession' , asyncSupport( async ( req, res ) => {
    let sessionData = req.body;
    let saved = await addSession( sessionData );
    console.log('hit after');
    res.status( 200 ).send( saved );
}));


module.exports = db_test_api;
