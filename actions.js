'use strict';
var alt = require('./alt');

class Actions {
    constructor(){
        this.generateActions('push', 'pop','dismiss','reset','init','custom');
    }
}

module.exports = alt.createActions(Actions);