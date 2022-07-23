
const { ObjectId } = require('mongoose');
const mongoose = require('mongoose');

//  * calender tracking (gets all patient data for this day / week ).
//  * notification system to ping all / single - done by establishing websocket / creating a /all room or channel and pushing to specific room.
//  * get patient activity records for the day.
//  * pre-made goals / activities / flashcards. 

// ErrorsLogged       (created)
// ActivityTemplates  (created)
// FlashcardTemplates (created)
// GoalTemplates      (created)
// ChatEvents         (created)


const ErrorLogs = new mongoose.Schema ({
          error_message: { type: String } ,
             error_code: { type: String } ,
               reviewed: { type: Boolean }
});
  
const ActivityTemplates = new mongoose.Schema ({
                words: [ { type: String }] ,
    therapist_attempt: { type: String } ,
         therapy_type: [ { type: ObjectId } ]
});

const FlashcardTemplates = new mongoose.Schema ({
            flashcards: [ { type: Object } ] ,
          therapy_type: [ { type: ObjectId } ]
});

const Goals = new mongoose.Schema ({
            goal_list: [ { type: Object } ] ,
          description: { type: String } , 
         therapy_type: [ { type: ObjectId }]
});

const ChatEvents = new mongoose.Schema ({
           patientId: { type: ObjectId } ,
            messages: [{ type: Object }]
});


module.exports = mongoose.model( 'ChatEvents'         , ChatEvents );

module.exports = mongoose.model( 'ErrorLogs'          , ErrorLogs );
module.exports = mongoose.model( 'ActivityTemplates'  , ActivityTemplates );
module.exports = mongoose.model( 'FlashcardTemplates' , FlashcardTemplates );
module.exports = mongoose.model( 'GoalTemplates'      , Goals );