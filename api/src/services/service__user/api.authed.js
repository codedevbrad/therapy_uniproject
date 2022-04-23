const api = require('express').Router();
const { asyncSupport } = require('@codedevbrad/serverutils');

const { authenticateTokenMiddleware }  = require('./authStrategy/functions/auth.token');
const { getUserUsingTokenCredentials } = require('./authStrategy/functions/auth.authenticate');

// api / serviceuser / 1

api.use( authenticateTokenMiddleware );

api.get('/' , ( req , res ) => res.status(200).send('authed'));

api.get('/getuser' , asyncSupport( async ( req , res , next ) => {
        // token credentials.
        let { _id } = req.token;
        // get user from database using token creds.
        let user = await getUserUsingTokenCredentials( _id );
        res.status( 200 ).send( user );
}));


module.exports = api;