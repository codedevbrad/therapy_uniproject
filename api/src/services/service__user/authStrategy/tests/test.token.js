const test_api = require('express').Router();
const { asyncSupport } = require('@codedevbrad/serverutils');

const { generateAccessToken , authenticateTokenMiddleware , authenticateToken } = require('../functions/auth.token');
      
// TEST TOKEN STATEGY

/* 
  use: recieves a user object and converts to a JWT token.
*/

const generateAtoken = asyncSupport( async ( req , res ) => {
    let { user } = req.body;
    let userToken = await generateAccessToken( user );
    res.status( 200 ).send( userToken );
});

/*
  use: recieves a JWT token from the Header Bearer and converts to a User object.
*/

const stripTokenFunction = asyncSupport( async ( req , res ) => {
    // expect a user from token
    let strippedByMiddleware = req.token;
    let strippedByFunction = await authenticateToken( req );
    res.status( 200 ).send({
        "strippedByFunc: " : strippedByFunction ,
        "strippedByMiddleware " : strippedByMiddleware  || null
    });
});


// @AUTHSTRATEGY TOKEN TESTS (completed)

test_api
  .get('/' , ( req , res ) => res.status( 200 ).send( '/token tests') ) 
  .post('/generatetoken'  , generateAtoken )
  .post('/striptokenfunc' , stripTokenFunction )
  .post('/striptokenmiddleware' , authenticateTokenMiddleware , stripTokenFunction )

  module.exports = test_api;