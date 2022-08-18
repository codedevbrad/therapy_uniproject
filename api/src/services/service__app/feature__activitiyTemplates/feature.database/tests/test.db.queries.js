// GET DB QUERIES FROM DB.QUERIES.JS
const db_test_api = require('express').Router();
const { asyncSupport } = require('@codedevbrad/serverutils');

const { getActivityTemplates , getActivityTemplatesWithout } = require('../db.queries').finderQueries;
const { addActivityTemplates , removeAllActivities } = require('../db.queries').mutableQueries;


// / api / test / app / activitytemplate / db / queries

db_test_api.get('/' , ( req , res ) => res.status( 200 ).send('/api/test/serviceuser/db/queries'))

db_test_api.get('/getactivities' , asyncSupport( async ( req, res ) => {
    let actvitities = await getActivityTemplates( );
    res.status( 200 ).send( actvitities );
}));


db_test_api.get('/getactivitiesExcluding' , asyncSupport( async ( req, res ) => {
    let actvitities = await getActivityTemplatesWithout();
    res.status( 200 ).send( actvitities );
}));


db_test_api.post('/saveactivity' , asyncSupport( async ( req, res ) => {
    let activityData = req.body;
    let saved = await addActivityTemplates( activityData );
    console.log('hit after');
    res.status( 200 ).send( saved );
}));

db_test_api.get('/removeactivities' , asyncSupport( async ( req, res ) => {
    await removeAllActivities( );
    res.status( 200 ).send('removed all activities');
}));

db_test_api.put('addwordstoactivity' , asyncSupport( async ( req, res ) => {
    let { activityID } = req.body;
    res.status( 200 ).send('added word to actvitiy');
}));


module.exports = db_test_api;