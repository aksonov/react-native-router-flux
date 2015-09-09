'use strict';
var alt = require('./alt');
var actions = require('./actions');

function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

function clone(map){
    var el = {};
    for (var i in map)
        if (typeof(map[i])!='object')
            el[i] = map[i];
    return el;
}

class RouterStore {
    constructor(){
        this.bindAction(actions.push, this.onPush);
        this.bindAction(actions.pop, this.onPop);
        this.bindAction(actions.dismiss, this.onDismiss);
    }

    onPush(data){
//        console.log("Push ("+JSON.stringify(data)+")");
        data.mode = 'push';
        this.setState(data);
    }

    onPop(data){
        if (!data){
            data = {};
        }
        if (isNumeric(data)){
            data = {num: data};
        } else {
            data.num = 1;
        }
        data.mode = 'pop';
        this.setState(data);
    }

    onDismiss(data){
        if (!data){
            data = {};
        }
        data.mode = 'dismiss';
        this.setState(data);
    }

}


module.exports = alt.createStore(RouterStore, "RouterStore");