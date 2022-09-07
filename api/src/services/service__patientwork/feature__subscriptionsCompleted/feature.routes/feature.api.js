const express = require('express');
const feature_api = require('express').Router();
const { asyncSupport } = require('@codedevbrad/serverutils');
const { authenticateTokenMiddleware } = require('../../../service__user/authStrategy/functions/auth.token');

const { getCompletedWork } = require('../feature.database/db.queries').finderQueries;
const { addAsCompleted }  = require('../feature.database/db.queries').mutableQueries;

// / api / patientwork / completedwork.

feature_api.use( authenticateTokenMiddleware );


feature_api.get('/' , ( req , res ) => res.status(200).send('/api/patientwork/completedwork'));

feature_api.get('/fetch' , asyncSupport( async ( req , res , next ) => {
    // user id 
    let { _id } = req.token;
    let completed = await getCompletedWork({ patientId : _id });
    res.status( 200 ).send( completed );
}));

/*
  REQ.BODY.WORK- EXPECTS {
            patient_id: { type: ObjectId , required: true } ,
        date_completed: { type: Date , default: Date.now } , 
    activity_completed: { 
                audioFile: { type: String , required: true } ,
              activity_id: { type: String , required: true }
            }
  }
*/

feature_api.post('/save' , express.json({limit: '1000500mb'}) , asyncSupport( async ( req , res , next ) => {
    let { _id } = req.token;
    let { audioFile , activity_id } = req.body;
    console.log( 'adio in server: ' , audioFile );
    await addAsCompleted( {
        patient_id: _id , 
        activity_completed : {
            audioFile , activity_id
        }
    });
    res.status( 201 ).send('saved audio file');
}));

module.exports = feature_api;