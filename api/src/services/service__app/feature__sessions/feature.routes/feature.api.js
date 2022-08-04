const feature_api = require('express').Router();
const { asyncSupport } = require('@codedevbrad/serverutils');
const { authenticateTokenMiddleware } = require('../../../service__user/authStrategy/functions/auth.token');

// / api / app / sessions.

feature_api.use( authenticateTokenMiddleware );

feature_api.get('/' , ( req , res ) => res.status(200).send('/api/app/sessions'));

feature_api.get('/fetch' , asyncSupport( async ( req , res , next ) => {
    // user id 
    let { _id } = req.token;
    res.status(200).send( _id );
}));


// ...
module.exports = feature_api;