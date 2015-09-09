'use strict';

var alt = require('./alt');
var Actions = require('./actions');

class ContainerStore {
    constructor() {
        this.page = {};
        this.mode = null;
        Actions.switch = alt.createAction('switch', (x)=>x);
        this.bindListeners({
            onSwitch: Actions.switch
        });
    }

    onSwitch(page){
        this.mode = 'switch';
        this.page = page;
    }

}

module.exports = alt.createStore(ContainerStore);