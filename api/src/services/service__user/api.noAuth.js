
const api = require('express').Router();
const { asyncSupport } = require('@codedevbrad/serverutils');

const { login } = require('./authStrategy/functions/auth.authenticate');

// api / serviceuser / 0 / 

api.get('/' , ( req , res ) => res.status(200).send('users v0'));


api.post('/login' , asyncSupport( async ( req , res , next ) => {

    let { username , password } = req.body;

    if ( !username || !password ) {
        throw new Error( 'missing username or password' );
    }

    // login
    let userlogin = await login({ username , password });
    res.status( 200 ).send( userlogin );
}));


module.exports = api;