const Alexa = require('ask-sdk')

const skillBuilder = Alexa.SkillBuilders.standard();

exports.handler = skillBuilder
    .addRequestHandlers(
    )
    .addErrorHandlers(
    )
    .lambda();
