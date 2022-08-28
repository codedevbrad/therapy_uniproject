const mongoose = require("mongoose");
const { ObjectId } = mongoose;

const goals = new mongoose.Schema ({
      patient_id: { type: ObjectId , required: true } ,
       goal_date: { type: Date } ,
            data: {
               is_completed: { type: Boolean  , default: false } , 
               goals: [ 
                  {
                     amount: { type: Number } ,
                     isCompleted: { type: Boolean } , 
                     goal: { 
                        case: { type: String } , 
                        data: [ ]
                     }
                  }
               ]
      } 
});

module.exports = mongoose.model( "goals" , goals );