const mongoose = require("mongoose");

const ActivityTemplates = new mongoose.Schema ({
             words: { type: [ Object ] , required: true } ,
  therapistAttempt: { type: String } , 
              type: { type: String   , required: true } , 
      articulation: { type: [String] } , 
});

module.exports = mongoose.model( "activities" , ActivityTemplates );


/*    // ================ rules ================ //
      {
            "words": [ 
                  { "word": "run"    , "inflection": [ 0 , 2 ] , "position": "start"  } 
            ] ,
            "therapistAttempt": "cloudinary_url" ,  
            "type": "words",
            "articulation": [ "r" ]
      }

      {
            "words": [
                  { "word": "the"   , "inflection": [ 1 ]  } 
            ] ,
            "therapistAttempt": "cloudinary.vid" 
            "type" : "sentances" ,
      }
*/