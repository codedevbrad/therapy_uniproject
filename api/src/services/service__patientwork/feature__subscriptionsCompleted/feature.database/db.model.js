const mongoose = require("mongoose");
const { ObjectId } = mongoose;

const SubscribedCompleted = new mongoose.Schema ({
            patient_id: { type: ObjectId , required: true } ,
        date_completed: { type: Date , default: Date.now } , 
    activity_completed: { 
        audioFile:   { type: String , required: true } ,
        activity_id: { type: String , required: true }
    },
});


module.exports = mongoose.model( "completedsubscriptions" , SubscribedCompleted );


/*    // ================ rules ================ //
    {
        patient_id: "6262c8603cd811dc1bf17226" , 
    }
*/
