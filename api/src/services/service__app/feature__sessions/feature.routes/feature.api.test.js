const feature_api__test = require('express').Router();

// / api / test / app / sessions

feature_api__test.get('/' , ( req , res ) => res.status(200).send('/api/test/app/sessions'));

// API tests.


// QUERIES.

feature_api__test.use('/db/queries' , require('../feature.database/tests/test.db.queries') );


// ...
module.exports = feature_api__test;