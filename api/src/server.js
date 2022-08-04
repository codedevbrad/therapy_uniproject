const express = require('express');

const app    = express();
const PORT   = process.env.PORT || 5000;
const server = require('http').createServer( app );

// add a database connection ...
var config = require('./config/settings.js');
var services = require('./config/services.js');

config.development( app , __dirname );
config.middleware(  app , __dirname );

services.database();

app.get('/' , ( req , res ) => res.status(200).send('server') );


// @SERVICE__USER

// serviceUSER : NO AUTH
app.use('/api/serviceuser/0'    , require('./services/service__user/service.routes/api.noAuth') );
// serviceUSER : AUTH protected
app.use('/api/serviceuser/1'    , require('./services/service__user/service.routes/api.authed' ) );
// serviceUSER : tests.
app.use('/api/test/serviceuser' , require( './services/service__user/service.routes/api.test') );


// @SERVICE__APP

// activityTemplate : api
app.use('/api/app/activitytemplate'           , require('./services/service__app/feature__activitiyTemplates/feature.routes/feature.api') );
// activityTemplate : tests
app.use('/api/test/app/activitytemplate'      , require('./services/service__app/feature__activitiyTemplates/feature.routes/feature.api.test') );
// activityTemplate : developer 
app.use('/api/developer/app/activitytemplate' , require('./services/service__app/feature__activitiyTemplates/feature.developer/developer.api') );

// sessions : API.
app.use('/api/app/sessions'           , require('./services/service__app/feature__sessions/feature.routes/feature.api') );
// sessions : TESTS.
app.use('/api/test/app/sessions'      , require('./services/service__app/feature__sessions/feature.routes/feature.api.test') );
// sessions : DEVELOPER.
app.use('/api/developer/app/sessions' , require('./services/service__app/feature__sessions/feature.developer/developer.api') );


// @SERVICE__PATIENTWORK


// END

app.get('/api/end' , ( req , res ) => {
    console.log('hit route')
    res.status(200).send('can pass without auth')
});

// error middleware
require('./errors').errors( app );

server.listen( PORT, ( ) => console.log(`Listening on ${ PORT }`));