// GET DB QUERIES FROM DB.QUERIES.JS
const db_test_api = require('express').Router();
const { asyncSupport } = require('@codedevbrad/serverutils');

const { getActivityTemplates } = require('../db.queries').finderQueries;
const { addActivityTemplates } = require('../db.queries').mutableQueries;


// / api / test / app / activitytemplate / db / queries

db_test_api.get('/' , ( req , res ) => res.status( 200 ).send('/api/test/serviceuser/database/queries'))

db_test_api.get('/getactivities' , asyncSupport( async ( req, res ) => {
    let actvitities = await getActivityTemplates( );
    res.status( 200 ).send( actvitities );
}));

/*
    {
        "words": [ 
            { "word": "apple"    , "inflection": [ 0 , 2 ] } , 
            { "word": "attitude" , "inflection": [ 4 , 5 ] }
        ] , 
        "therapistAttempt": "cloudinary_url" , 
        "type": "words",
        "articulation": [ "r" ]
    }
*/

db_test_api.post('/saveactivity' , asyncSupport( async ( req, res ) => {
    let activityData = req.body;
    let saved = await addActivityTemplates( activityData );
    console.log('hit after');
    res.status( 200 ).send( saved );
}));


module.exports = db_test_api;
