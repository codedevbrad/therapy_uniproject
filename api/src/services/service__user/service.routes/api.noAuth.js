const api = require('express').Router();
const { asyncSupport } = require('@codedevbrad/serverutils');

const { login } = require('../authStrategy/functions/auth.authenticate');
const { getUserByUsername } = require('../service.database/db.queries').finderQueries;

// api / serviceuser / 0 / 

api.get('/' , ( req , res ) => res.status(200).send('users v0'));


api.get('/checkusername' , asyncSupport( async ( req , res , next ) => {

    let { username } = req.query;

    if ( !username ) {
        throw {status: 400, message: 'detailed message'};
    }
    // check username.
    let userNameExists = await getUserByUsername( username );

    let exists = userNameExists ? true : false;

    res.status( 200 ).send(  exists );
}));


api.post('/login' , asyncSupport( async ( req , res , next ) => {

    let { username , password } = req.body;

    if ( !username || !password ) {
        throw { status: 400, message: 'missing username or password'};
    }

    // login
    let userlogin = await login({ username , password });
    res.status( 200 ).send( userlogin );
}));


module.exports = api;
