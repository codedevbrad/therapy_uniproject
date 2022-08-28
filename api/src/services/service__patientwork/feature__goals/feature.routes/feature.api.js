const feature_api = require('express').Router();
const { asyncSupport } = require('@codedevbrad/serverutils');
const { authenticateTokenMiddleware } = require('../../../service__user/authStrategy/functions/auth.token');

const { getGoalsForWeek } = require('../feature.database/db.queries').finderQueries;
const { getSubscriptionsByIds } = require('../../feature__subscriptions/feature.database/db.queries').finderQueries;


// / api / patientwork / goals.

feature_api.use( authenticateTokenMiddleware );

feature_api.get('/' , ( req , res ) => res.status(200).send('/api/patientwork/goals') );

feature_api.get('/fetch' , asyncSupport( async ( req , res , next ) => {
    let { _id } = req.token;
    let goalsThisWeek = await getGoalsForWeek({ patientId: _id });
    console.log( _id );

    res.status( 200 ).send( goalsThisWeek );
}));


module.exports = feature_api;