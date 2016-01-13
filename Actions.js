import Route from './Route';
import Router from './Router';
import debug from './debug';

function isNumeric(n){
    return !isNaN(parseFloat(n)) && isFinite(n);
}

function filterParam(data){
    if (data.toString()!='[object Object]')
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
    currentRouter: ?Router;

    constructor(){
        this.pop = this.pop.bind(this);
        this.route = this.route.bind(this);
    }

    route(name: string, props: { [key: string]: any} = {}){
        if (!this.currentRouter){
            throw new Error("No current router is set");
        }
        if (props.toString()!='[object Object]')
            props = {data : props};

        props = filterParam(props);
        // check if route is in children, current or parent routers
        let router: Router = this.currentRouter;

        debug("Route to "+name+" current router="+this.currentRouter.name+ " current route="+this.currentRouter.currentRoute.name);
        while (!router.routes[name]){
            const route = router.parentRoute;
            if (!route || !route.parent){
                throw new Error("Cannot find router for route="+name+" current router="+router.name);
            }
            router = route.parent;
            debug("Switching to router="+router.name);
        }
        if (router.route(name, props)){
            
            // deep into child router
            while (router.currentRoute.childRouter){
                router = router.currentRoute.childRouter;
                debug("Switching to child router="+router.name);
            }

            this.currentRouter = router;
            return true;
        }
        return false;
    }
    pop(num: number = 1){
        if (!isNumeric(num)){
            num = 1;
        }
        if (!this.currentRouter){
            throw new Error("No current router is set");
        }
        if (num > 1){
            for (let i=0;i<num;i++){
                if (!Actions.pop()){
                    return false;
                }
            }
            return true;
        } else {
            let router: Router = this.currentRouter;
            debug("Pop, router="+router.name);
            while (router.stack.length <= 1 || router.currentRoute.type === 'switch'){
                router = router.parentRoute.parent;
                debug("Switching to parent router="+router.name);
            }
            if (router.pop()){
                this.currentRouter = router;
                return true;
            } else {
                return false;
            }

        }
    }
}

export default new Actions();
