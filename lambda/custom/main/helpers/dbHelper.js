const AWS = require('aws-sdk');
const lodash = require('lodash');
const CONSTANT_AWS = require('../constants/constantAws');
AWS.config.update({region: CONSTANT_AWS.REGION});

let singleton = null;

class DbHelper {
    constructor() {
        this.docClient = new AWS.DynamoDB({apiVersion: '2012-08-10'});
    }

    static initialize() {
        singleton = new DbHelper();
    }

    static isInitialized() {
        return !!singleton;
    }

    static get() {
        if (!DbHelper.isInitialized()) {
            throw new Error('Not initialized.');
        }
        return singleton;
    }
}

module.exports = DbHelper;
