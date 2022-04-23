const test_api = require('express').Router();
const { asyncSupport } = require('@codedevbrad/serverutils');

const { authenticateTokenMiddleware } = require('../functions/auth.token');
const { matchUserByCredentials , login } = require('../functions/auth.authenticate');
      
// TEST DB QUERY AUTH STATEGY

// / api / test / serviceuser / strategy / auth

test_api.get('/' , ( req , res ) => res.status( 200 ).send( '/auth tests') ) 
 
test_api.post('/matchcredentials' , asyncSupport( async ( req , res ) => {
  let { username , password } = req.body;
  let user = await matchUserByCredentials({ username , password });
  res.status( 200 ).send( user );
}));


test_api.post('/testlogin' , asyncSupport( async ( req , res ) => {
  let { username , password } = req.body;
  let userlogin = await login({ username , password });
  res.status( 200 ).send( userlogin );
}));

// should have a token existing.
test_api.post('/protected' , authenticateTokenMiddleware , asyncSupport( async ( req , res ) => {
  let userToken = req.token;

  res.status( 200 ).send( userToken );
}));


module.exports = test_api;