const express  = require('express');
const cors     = require('cors');
const morgan   = require('morgan');

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
        app.use( express.json());
        app.use( cors());
    }
}
