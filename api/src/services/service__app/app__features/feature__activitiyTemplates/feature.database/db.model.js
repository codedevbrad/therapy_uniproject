const mongoose = require('mongoose');

const ActivityTemplates = new mongoose.Schema ({
             words: { type: [ Object ] , required: true } ,
  therapistAttempt: { type: String } , 
              type: { type: String   , required: true } , 
      articulation: { type: [String] , required: true }
});


module.exports = mongoose.model( 'activities'  , ActivityTemplates );