module.exports.errors = function( app ) {

    app.use( ( req , res , next ) => {
          res.status( 404 ).send( 'error 404');
    });

    // errors.
    app.use( ( err , req , res , next ) => {
          console.log( 'error with api' , err.status , err.message );

          if ( err.status == 500 ) {
              console.log('you would submit error in database if env is production');
          }

          res.status( err.status || 500 );
          res.send( {
                msg : err.message || err ,
            portMsg : 'the app doesnt seem to be working as intended. please refresh your broweser.'
          });
    });
}
