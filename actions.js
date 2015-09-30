'use strict';
var alt = require('./alt');

function filterParam(data){
    if (typeof(data)!='object') 
        return data;
    if (!data){
        return;
    }
    var proto = (data||{}).constructor.name;
    // avoid passing React Native parameters 
    if (proto != 'Object'){
        data = {};
    }
    if (data.data){
        data.data = filterParam(data.data);
    }
    return data;
}

class Actions {
    push(data){
        this.dispatch(filterParam(data));
    }
    pop(data){
        this.dispatch(filterParam(data));
    }
    dismiss(data){
        this.dispatch(filterParam(data));
    }
    reset(data){
        this.dispatch(filterParam(data));
    }
    init(data){
        this.dispatch(filterParam(data));
    }
    custom(data){
        this.dispatch(filterParam(data));
    }
}

module.exports = alt.createActions(Actions);