const mongoose = require("mongoose");
const { ObjectId } = mongoose;

const Sessions = new mongoose.Schema ({
        patient_id: { type: ObjectId , required: true } ,
              date: {
                   type: Date,
                   max: new Date(new Date().getFullYear( ) , 11 , 31 ) , 
                   required: true
              } , 
     session_notes: { type: String } , 
    session_reason: { type: String } , 
});

module.exports = mongoose.model( "sessions" , Sessions );


/*    // ================ rules ================ //

      {
      }
*/