const User = require('./db.model');


// **** FINDER QUERIES **** //

function getUserByUsername ( username ) {
	return User.findOne({ username }).lean();
}

function getUserById( id ) {
	return User.findById( id ).lean()
}

function getUserandReturnByField( id , property ) {
	return User.findById( id ).select(`name ${ property }`).lean()
}


// **** MUTABLE QUERIES **** //


function updateField ( id , USER_MODEL ) {
	return User.update( USER_MODEL , { where: { username: username } });
}


module.exports.finderQueries = {
	getUserById , getUserByUsername , getUserandReturnByField
}

module.exports.mutableQueries = {
	updateField
}