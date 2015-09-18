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
        this.routes = [];
        this.currentRoute = null;
        this.bindAction(actions.init, this.onInit);
        this.bindAction(actions.push, this.onPush);
        this.bindAction(actions.pop, this.onPop);
        this.bindAction(actions.dismiss, this.onDismiss);
        this.bindAction(actions.reset, this.onReset);
    }

    onInit(initial){
//        console.log("Init:"+initial);
        this.routes = [initial];
        this.currentRoute = this.routes[this.routes.length-1];
        return false;
    }

    onPush(data){
        data.mode = 'push';
        this.routes.push(data.name);
        this.currentRoute = this.routes[this.routes.length-1];
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
        // add name of closed page
        data.name = this.currentRoute;
        for (var i=0;i<data.num && this.routes.length>1;i++){
            this.routes.pop();
        }
        this.currentRoute = this.routes[this.routes.length-1];
        this.setState(data);
    }

    onDismiss(data){
        if (this.routes.length>1){
            this.routes.pop();
        }
        this.currentRoute = this.routes[this.routes.length-1];
        if (!data){
            data = {};
        }
        data.mode = 'dismiss';
        this.setState(data);
    }

    onReset(data){
        this.routes = [data];
        this.setState({mode:'reset', initial:data});
    }

}


module.exports = alt.createStore(RouterStore, "RouterStore");