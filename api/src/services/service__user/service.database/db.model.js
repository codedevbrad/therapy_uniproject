const mongoose = require('mongoose');
// schema object
const UsersSchema = new mongoose.Schema ({
  username:  { type: String } ,
  password:  { type: String } 
});

module.exports = mongoose.model( 'users' , UsersSchema );
