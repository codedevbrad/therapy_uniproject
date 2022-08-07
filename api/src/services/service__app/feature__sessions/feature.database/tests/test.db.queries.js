// GET DB QUERIES FROM DB.QUERIES.JS
const db_test_api = require('express').Router();
const { asyncSupport } = require('@codedevbrad/serverutils');

const { getSessionsAll , getSessionsByDate } = require('../db.queries').finderQueries;
const { addSession , removeAllSessions } = require('../db.queries').mutableQueries;

const moment = require('moment');


// / api / test / app / sessions / db / queries

db_test_api.get('/' , ( req , res ) => res.status( 200 ).send('/api/test/serviceuser/db/queries'));


db_test_api.get('/getsessions' , asyncSupport( async ( req , res ) => {
    let { patientId } = req.query;
    let sessions = await getSessionsAll({ patientId });
    res.status( 200 ).send( sessions );
}));


db_test_api.get('/getsessionsbydate' , asyncSupport( async ( req , res ) => {

    let { patientId } = req.query;

    // today.
    let dateToday = moment().local().format('YYYY-MM-DD HH:mm');

    let activities_tomorrow = await getSessionsByDate({
        start: dateToday , 
        patientId
    });

    res.status( 200 ).send({ 
        currTime: dateToday , 
        sessions: activities_tomorrow 
    });
}));


// new Date - ignores BST timezone.
// momentJS - converts to BST time under .local()

db_test_api.get('/testtime' , asyncSupport( async ( req, res ) => {

    try {
        let dateOld = new Date('2022-08-07T17:46:33.000+00:00');
        let m = moment( dateOld );

        let dateStandard = new Date();
        let dateMoment = moment().local().format('YYYY-MM-DD HH:mm');

        res.status( 200 ).send({ 
                  timeMoment: dateMoment ,
                timeStandard: dateStandard , 
                timeSince: m.fromNow()
        });
    }
    catch ( err ) {
        console.log( 'failed saving date' , err.message );
        throw { status: 400, message: 'couldnt save data'};
    }
}));


// saving date in mongodb atlas converts the time to GMT 00:00 , not BST 01:00
// a MomentJS BST converted date will still get converted to a GMT Date.

db_test_api.post('/addsession' , asyncSupport( async ( req, res ) => {
    try {

        let { data } = req.body;
        let date = moment().local().format('YYYY-MM-DD HH:mm');
        let timeConverted = moment().local().format("dddd, MMMM Do YYYY, h:mm:ss a");

        let sessionCreated = await addSession({ 
            ...data , 
            date , 
            date_timezone: timeConverted 
        });
        res.status( 200 ).send({
             sessionCreated , 
             timeStamped: date , 
        });
    }
    catch ( err ) {
        console.log( 'failed saving date' , err.message );
        throw { status: 400, message: 'couldnt save data'};
    }
}));


db_test_api.delete('/removesessions' , asyncSupport( async ( req, res ) => {
    await removeAllSessions( );
    res.status(200).send( 'deleted sessions' );
}));


module.exports = db_test_api;
