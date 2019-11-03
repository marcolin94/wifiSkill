const common = require('../methods/common');
const intents = require('../constants/intents');

const InvocationHandler = {
    canHandle(handlerInput) {
        return common.checkRequestType(intents.INVOCATION)
    },
    handle(handlerInput){
        
    }
}

module.exports = InvocationHandler;
