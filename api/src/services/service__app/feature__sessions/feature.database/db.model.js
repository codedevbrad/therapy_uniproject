const mongoose = require("mongoose");
const { ObjectId } = mongoose;

const Sessions = new mongoose.Schema ({
        patient_id: { type: ObjectId , required: true } ,
              date: { type: Date , required: true } , 
     session_notes: { type: String } , 
    session_reason: { type: String } ,
     date_timezone: { type: String , required: true }
});

module.exports = mongoose.model( "sessions" , Sessions );


/*    // ================ rules ================ //

      {
      }
*/