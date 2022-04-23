const test_api = require('express').Router();
const { asyncSupport } = require('@codedevbrad/serverutils');

const { generateHashedPassword , comparePasswords } = require('../functions/auth.user');
      
// TEST USER STRATEGY ...

/* 
  use: generates a hashed password using bcrypt to replace plaintext password in db.
*/

const createHashPassword = asyncSupport( async ( req , res , next ) => {
    let { password } = req.body;
    let hash = await generateHashedPassword(password);
    res.status( 200 ).send( hash );
});

/*
  use: tests a bcrypt hashed password with a plaintext password.
*/
const testpasswords = asyncSupport( async ( req , res , next ) => {

    let { password , passwordHash } = req.body;
    let userMatches = await comparePasswords( password , passwordHash );
    res.status( 200 ).send( userMatches );
});

// @AUTHSTRATEGY USER TESTS (completed)

test_api
  .get('/' , ( req , res ) => res.status( 200 ).send( '/user tests') ) 
  .post('/hash'     , createHashPassword )
  .post('/testhash' , testpasswords );

module.exports = test_api;