'use strict';
var alt = require('./alt');

class Actions {
    constructor(){
        this.generateActions('push', 'pop','dismiss');
    }
}

module.exports = alt.createActions(Actions, "Actions");