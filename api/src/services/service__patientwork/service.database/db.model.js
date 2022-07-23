const { ObjectId } = require('mongoose');
const mongoose = require('mongoose');

/*
    TasksCompleted       (created)
    FlaggedPatientEvents (created)
    PatientSubscriptions (created)
    PatientGoals         (created)
*/

/*
    todo:
      - patientId should reference user model
      - activity and flashcard should reference activity and flashcard models.
*/

const TasksCompleted = new mongoose.Schema ({
          patientId: { type: ObjectId } ,
  images_associated: [ { type: String }] ,
     date_completed: { type: Date , default: Date.now } ,
         sound_file: [ TherapyType ] , 
         flashcards: [ ] ,
});

const FlaggedPatientEvents = new mongoose.Schema ({
    patientId: { type: ObjectId } ,
         type: { type: String } ,
         date: { type: Date , default: Date.now } , 
         note: { type: String } ,
});
  
const Patientsubscriptions = new mongoose.Schema ({
              patientId: { type: ObjectId } ,
     activity_templates: [{ type: ObjectId }] ,
    flashcard_templates: [{ type: ObjectId }]
});

const PatientGoals = new mongoose.Schema ({
        patientId: { type: ObjectId } ,
          message: { type: String } , 
     is_completed: { type: Boolean } , 
         set_date: { type: Date } , 
             list: [ { type: ObjectId } ]
});
  

module.exports = mongoose.model( 'TasksCompleted'       , TasksCompleted );
module.exports = mongoose.model( 'FlaggedPatientEvents' , FlaggedPatientEvents );
module.exports = mongoose.model( 'PatientSubscrptions'  , Patientsubscriptions );
module.exports = mongoose.model( 'PatientGoals'         , PatientGoals );
