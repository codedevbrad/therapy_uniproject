// database queries.
const { getUserByUsername , getUserById } = require('../../service.database/db.queries').finderQueries;
// auth.user functions.
const { comparePasswords } = require('./auth.user');
const { generateAccessToken } = require('./auth.token');

/*
saved in localstorage
	token
	- _id , password

saved in state
	login()
	- full user object without password.

for each new page refreshing state
	getuser() - requires bearer token.
	- full user object without password.
*/

/**
 * strips sensitive properties from an object.
 * @param {object} object - must be a plain object not mongoose model.
 */

const stripSensitiveUserData = ( object ) => {	
	// expects the object to be a plain object and not a mongoose imutable object.
	return (({ password, password_reminder , ...o }) => o)( object ); // remove sensitive data.
}

const getUserUsingTokenCredentials = ( id ) => new Promise( async ( resolve , reject ) => {
	try {
		// make sure id and password matches?
		let user = await getUserById( id );
		let userWithoutSensitive = stripSensitiveUserData( user );
		resolve( userWithoutSensitive );
	} 
	catch ( err ) {
		reject( err );
	}
});

/**
 * 
 * @param {} userObject 
 * @returns success : boolean , object: plain js object
 */
const matchUserByCredentials = ( userObject ) => new Promise( async ( resolve , reject ) => {
	try {
		let { username , password } = userObject;

		let usernameMatch = await getUserByUsername( username );

		if ( !usernameMatch ) resolve({ 
			success: false ,
		    reason: 'username does not match' 
		});

		// checks if password given matches user found from querying username.
		// returns a BOOLEAN true or false.
		let isUser = await comparePasswords( password , usernameMatch.password );
 
		if ( !isUser ) resolve({ 
			success: false ,
		    reason: 'username matches. password does not match' 
		});

		// return the user object
		resolve({ 
			success: true ,
		    user : usernameMatch
		});
	} 
	catch ( err ) {
		reject( err );
	}
});


const login = ( { username , password } ) => new Promise( async ( resolve , reject ) => {
	try {
		// see if username = db username and password matches the BCRYPT string stored in db.
		let userFoundResponse = await matchUserByCredentials( { username , password } );

		if ( !userFoundResponse.success ) {
			resolve({ didLogin: false , response: userFoundResponse })
		} 
		else {

			let userObject = userFoundResponse.user;

			// convert user id and password to a jwt token.
			let token = await generateAccessToken({ _id: userObject._id , password: userObject.password });

			// keep user without sensitive information.
			let userWithoutSensitive = stripSensitiveUserData( userObject );

			resolve({ 
				didLogin: true , 
				response: { 
					user: userWithoutSensitive , token 
				}
			});
		}
	}
	catch( err ) {
		reject( err )
	}
});




module.exports = {
	login , matchUserByCredentials , getUserUsingTokenCredentials
}


/*
    1. user logs in with username and password.
    2. user is found and user is generated into a token using the id field.
	3. user saves JWT TOKEN IN BROWSER WHICH HOLDS THE ID AND USERNAME
*/