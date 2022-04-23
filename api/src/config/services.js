const express  = require('express');
const mongoose = require('mongoose');

module.exports = {
    database: ( ) => {
        // connect to atlas.
        let dbConnection;
        if ( process.env.NODE_ENV == 'development' ) dbConnection = process.env.DB_ATLAS_dev;
        if ( process.env.NODE_ENV == 'production'  ) dbConnection = process.env.DB_ATLAS_prod;

        mongoose.connect( dbConnection , { useNewUrlParser: true } )
            .then ( ()  => console.log(`mongodb in: ${ process.env.NODE_ENV }`))
            .catch( err => console.log( err ));
    }
}

