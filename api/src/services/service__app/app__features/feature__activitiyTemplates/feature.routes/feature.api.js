const feature_api = require('express').Router();
const { asyncSupport } = require('@codedevbrad/serverutils');
const { authenticateTokenMiddleware , authenticateToken } = require('../../../../service__user/authStrategy/functions/auth.token');

// / api / app / activitytemplate

feature_api.use( authenticateTokenMiddleware );


feature_api.get('/' , ( req , res ) => res.status(200).send('/api/app/activityTemplate'));

feature_api.get('/fetch' , asyncSupport( async ( req , res , next ) => {
    // user id 
    let { _id } = req.token;
    res.status(200).send( _id );
}));


// ...
module.exports = feature_api;