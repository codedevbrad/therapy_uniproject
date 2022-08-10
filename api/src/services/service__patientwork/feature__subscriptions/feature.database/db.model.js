const mongoose = require("mongoose");
const { ObjectId } = mongoose;

const Subscribed = new mongoose.Schema ({
        patient_id: { type: ObjectId , required: true } ,
             delay: { type: String } , 
       activity_id: { type: ObjectId , required: true } ,
              type: { type: String } , 
});


module.exports = mongoose.model( "subscriptions" , Subscribed );


/*    // ================ rules ================ //
    {
        patient_id: "6262c8603cd811dc1bf17226" , 
             delay: "4" , 
       activity_id: "62ed24fbcd0b4127ed9577d8" , 
              type: "custom" | "template"
    }
*/
