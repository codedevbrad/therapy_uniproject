const mongoose = require('mongoose');

// therapyType
// type: [ '' , '' . '' ]

const TherapyType = new mongoose.Schema({
   type: { type: String }
})

// schema object
const UsersSchema = new mongoose.Schema ({
  username:     { type: String } ,
  password:     { type: String } ,
  therapy_type: [ TherapyType  ] , 
  last_logged:  { type: Date   } ,
  email:        { type: String } , 
  avatarUrl:    { type: String }
});

module.exports = mongoose.model( 'users' , UsersSchema );
