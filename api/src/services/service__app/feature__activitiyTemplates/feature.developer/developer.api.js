const feature_api__developer = require('express').Router();

// / api / developer / app / activitytemplate

feature_api__developer.get('/' , ( req , res ) => res.status(200).send('/api/developer/app/activityTemplate'));






// ...
module.exports = feature_api__developer;