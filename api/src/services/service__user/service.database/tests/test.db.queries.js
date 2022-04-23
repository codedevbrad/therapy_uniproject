// GET DB QUERIES FROM DB.QUERIES.JS
const db_test_api = require('express').Router();
const { asyncSupport } = require('@codedevbrad/serverutils');

const { getUserById , getUserByUsername , getUserandReturnByField } = require('../db.queries').finderQueries;

// /api/test/serviceuser/database/queries

db_test_api.get('/' , ( req , res ) => res.status( 200 ).send('/api/test/serviceuser/database/queries'))

db_test_api.get('/findbyusername' , asyncSupport( async ( req, res ) => {
    let { username } = req.query;
    let user = await getUserByUsername( username );
    res.status( 200 ).send( user );
}));

db_test_api.get('/findbyid' , asyncSupport( async (req, res, next) => {
    let { id } = req.query;
    let user = await getUserById( id );
    res.status( 200 ).send( user );
}));

db_test_api.get('/findandreturnproperty' , asyncSupport( async (req, res, next) => {
    let { id } = req.query;
    let userEmail = await getUserandReturnByField( id , 'password_reminder' );
    res.status( 200 ).send( userEmail );
}));

module.exports = db_test_api;