const mongoose = require('mongoose');
  
// tells mongoose to use ES6 implementation of promises
mongoose.Promise = global.Promise;
const MONGODB_URI = `mongodb+srv://brad:12345@testapp.ubvfy.mongodb.net/uni_speechTherapy__test?retryWrites=true&w=majority`;
mongoose.connect(MONGODB_URI);
  
mongoose.connection
    .once('open', () => console.log('Connected!'))
    .on('error', (error) => {
        console.warn('Error : ', error);
    });
      
    // runs before each test
    // beforeEach((done) => {
    //     mongoose.connection.collections.sessions.drop(() => {
    //           done();
    //     }); 
    // }); 