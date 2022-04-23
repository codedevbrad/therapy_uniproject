const api_test = require('express').Router();

// /api/test/serviceuser

api_test.get('/' , ( req , res ) => res.status(200).send('/api/test/auth/'));

// AUTH STRATEGY TESTS
api_test.use('/strategy/user'  , require('./authStrategy/tests/test.user')     );
api_test.use('/strategy/token' , require('./authStrategy/tests/test.token')    );
api_test.use('/strategy/auth'  , require('./authStrategy/tests/test.authenticate'));

// DATABASE TESTS
api_test.use('/database/queries' , require('./service.database/tests/test.db.queries.js'));

// UTIL TESTS
module.exports = api_test;
