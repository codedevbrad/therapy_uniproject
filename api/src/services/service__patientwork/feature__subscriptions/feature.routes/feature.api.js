const feature_api = require('express').Router();
const { asyncSupport } = require('@codedevbrad/serverutils');
const { authenticateTokenMiddleware } = require('../../../service__user/authStrategy/functions/auth.token');

const { getSubscriptionsAll } = require('../feature.database/db.queries').finderQueries;
const { getActivityTemplatesByIds } = require('../../../service__app/feature__activitiyTemplates/feature.database/db.queries').finderQueries;
// / api / patientwork / subscriptions.

feature_api.use( authenticateTokenMiddleware );

feature_api.get('/' , ( req , res ) => res.status(200).send('/api/app/subscriptions'));

feature_api.get('/fetch' , asyncSupport( async ( req , res , next ) => {
    // user id 
    let { _id } = req.token;

    // activity_id
    let subscribedTo = await getSubscriptionsAll({ patientId: _id });
    let idsMapped = subscribedTo.map( ( { activity_id } ) => activity_id ); 

    // _id
    let activityTemplatesSubscribedById = await getActivityTemplatesByIds( idsMapped );

    let combined = activityTemplatesSubscribedById.map( itm => ({
        ...subscribedTo.find( ( item ) => item.activity_id.toString() == itm._id.toString() ) , 
        ...itm
    }));

    res.status( 200 ).send( combined );
}));

module.exports = feature_api;