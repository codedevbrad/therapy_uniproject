const express  = require('express');
const cors     = require('cors');
const morgan   = require('morgan');
// const session  = require('express-session');
// const passport = require('passport');

module.exports = {
    development: ( app ) => {
        // dev
        if ( process.env.NODE_ENV === "development" ) {
             console.log('dev: morgan logging')
             app.use( morgan('dev') );
        }
    } ,
    middleware: ( app ) => {
        // body parser middleware
        app.use( express.urlencoded({ extended: true }))
        // parse application/json
        app.use( express.json());
        app.use( cors());
    } ,
    authChecks: ( app ) => {
        // app.use( session ({
        //     secret: 'a cool keyboard cat',
        //     cookie: { maxAge: 960000,  _expires : 500000 },
        //     resave: true, saveUninitialized: true, rolling: true
        // }));
        // app.use( passport.initialize());
        // app.use( passport.session());

        // require('../services/service__auth/service.passport/passport.setup') ( passport );

    }
}
