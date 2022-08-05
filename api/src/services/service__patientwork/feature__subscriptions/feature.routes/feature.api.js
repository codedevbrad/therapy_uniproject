const feature_api = require('express').Router();
const { asyncSupport } = require('@codedevbrad/serverutils');
const { authenticateTokenMiddleware } = require('../../../service__user/authStrategy/functions/auth.token');

const { getSubscriptionsAll } = require('../feature.database/db.queries').finderQueries;

// / api / patientwork / subscriptions.

feature_api.use( authenticateTokenMiddleware );

feature_api.get('/' , ( req , res ) => res.status(200).send('/api/app/subscriptions'));

feature_api.get('/fetch' , asyncSupport( async ( req , res , next ) => {
    // user id 
    let { _id } = req.token;
    let subscriptions = await getSubscriptionsAll({ patientId: _id });
    res.status( 200 ).send( subscriptions );
}));

module.exports = feature_api;