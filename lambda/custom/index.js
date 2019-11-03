const Alexa = require('ask-sdk')
const DbHelper = require('./main/helpers/dbHelper');
const handlers = require('./main/handlers/index');

DbHelper.initialize()
const skillBuilder = Alexa.SkillBuilders.standard();

exports.handler = skillBuilder
    .addRequestHandlers(
        ...handlers.request,
    )
    .addErrorHandlers(
        ...handlers.error,
    )
    .lambda();
