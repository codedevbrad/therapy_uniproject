
const Sessions = require('../../db.model');
const assert = require('assert');

// https://www.geeksforgeeks.org/how-to-use-mocha-with-mongoose/


describe('Creating documents in MongoDB' , function () {
    it('Creates a New Session without patient_id', (done) => {
        let outOfYear = new Sessions({ 
            session_notes: "note added",
            session_reason: "scheduled by patient" , 
            date: "2022-11-11T14:48:23.000+00:00" 
        });
        outOfYear.save() // returns a promise after some time
            .then( ( ) => {
                //if the new session is saved in db and it is not new
                assert(!outOfYear.isNew);
                done();
            });
    });

    it('Creates a New Session without date', (done) => {
        let outOfYear = new Sessions({ 
            patient_id: "6262c8603cd811dc1bf17226",
            session_notes: "note added",
            session_reason: "scheduled by patient"
        });
        outOfYear.save() // returns a promise after some time
            .then( ( ) => {
                //if the new session is saved in db and it is not new
                assert(!outOfYear.isNew);
                done();
            });
    });


    // it('cannot create a New Session out of bounds of date start', (done) => {

    //     let dateBeforeToday = new Date();

    //     let outOfYear = new Sessions({ 
    //         patient_id: "6262c8603cd811dc1bf17226",
    //         session_notes: "note added",
    //         session_reason: "scheduled by patient" , 
    //         date: dateBeforeToday
    //     });
    //     outOfYear.save(function (err) {
    //         if (err) {
    //             assert.ok('date is out of bounds');
    //             done();
    //         }
    //         else {
    //             done();
    //         };
    //     });
    // });

    
    // it('cannot create a New Session out of bounds of date end', (done) => {
    //     let outOfYear = new Sessions({ 
    //         patient_id: "6262c8603cd811dc1bf17226",
    //         session_notes: "note added",
    //         session_reason: "scheduled by patient" , 
    //         date: "2023-11-11T14:48:23.000+00:00" 
    //     });
    //     outOfYear.save(function (err) {
    //         if (err) {
    //             assert.ok('date is out of bounds');
    //             done();
    //         }
    //         else {
    //             done();
    //         };
    //     });
    // });
});