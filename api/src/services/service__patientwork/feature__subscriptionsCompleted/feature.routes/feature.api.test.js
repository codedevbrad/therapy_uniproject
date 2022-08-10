const feature_api__test = require('express').Router();

// / api / test / patientwork / completedwork

feature_api__test.get('/' , ( req , res ) => res.status(200).send('/api/test/patientwork/completedwork'));

// API tests.


// QUERIES.

feature_api__test.use('/db/queries' , require('../feature.database/tests/test.db.queries') );


// ...
module.exports = feature_api__test;