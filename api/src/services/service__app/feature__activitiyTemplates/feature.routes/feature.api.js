const feature_api = require('express').Router();
const { asyncSupport } = require('@codedevbrad/serverutils');
const { authenticateTokenMiddleware } = require('../../../service__user/authStrategy/functions/auth.token');
const { getActivityTemplates } = require('../feature.database/db.queries').finderQueries;

// / api / app / activitytemplate

feature_api.use( authenticateTokenMiddleware );

feature_api.get('/' , ( req , res ) => res.status(200).send('/api/app/activityTemplate'));

// fetches activities.

feature_api.get('/fetch' , asyncSupport( async ( req , res , next ) => {
    let actvitities = await getActivityTemplates( );
    res.status( 200 ).send( actvitities );
}));


// ...
module.exports = feature_api;