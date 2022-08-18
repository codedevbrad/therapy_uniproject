const mongoose = require("mongoose");

const ActivityTemplates = new mongoose.Schema ({
                 words: { type: [ Object ] , required: true } ,
      therapistAttempt: { type: String } , 
                  type: { type: String , required: true } , 
          articulation: { type: [ String ] } , 
        therapist_tips: { type: String }
});

module.exports = mongoose.model( "activities" , ActivityTemplates );


/*   // ================ schema retrieved  ================ //

      {
            words: [
                  {
                        word: "the" , 
                        inflection: [ 1 ]
                  },
                  {
                        word: "girl",
                        inflection: [ 2 ]
                  },
                  {
                        word: "wore",
                        inflection: [ 2 ]
                  },
                  {
                        word: "long",
                        inflection: [ 3 ]
                  },
                  {
                        word: "jeans"
                        inflection: [ 0 ]
                  },
                  {
                        word: "with",
                        inflection: [ 2 ]
                  },
                  {
                        word: "blue",
                        inflection: [ 0 ]
                  },
                  {
                        word: "bows",
                        inflection: [ 3 ]
                  }
            ] , 
            type: "sentances", 
            therapistAttempt: "",
            articulation: [ 'th' , 'r' , 's' ]
      }

      {
            "words": [
                  {
                        "word": "run",
                        "inflection": [
                              0,
                              2
                        ],
                        "position": "start"
                  },
                  {
                        "word": "rice",
                        "inflection": [
                              4,
                              5
                        ],
                        "position": "start"
                  },
                  {
                        "word": "carrot",
                        "inflection": [
                              2,
                              3
                        ],
                        "position": "middle"
                  },
                  {
                        "word": "bird",
                        "inflection": [
                              2,
                              3
                        ],
                        "position": "middle"
                  }
            ],
            "articulation": [ "r" ],
            "type": "words",
            "therapistAttempt": "cloudinary_url",
            "therapist_tips": "some useful advice"
      },
*/