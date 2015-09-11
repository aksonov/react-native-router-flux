'use strict';
var alt = require('./alt');

class Actions {
    constructor(){
        this.generateActions('push', 'pop','dismiss','reset','init');
    }
}

module.exports = alt.createActions(Actions);