var alt = require('./alt');

class FetchActions {
    fetch(route, data){
        this.dispatch({route, data});
    }

    load(routes){
        this.dispatch(routes);
    }

    error(message){
        this.dispatch(message);
    }

    success(data){
        this.dispatch(data);
    }

    loading(){
        this.dispatch();
    }
}


module.exports = alt.createActions(FetchActions, "FetchActions");
