import Route from './Route';
import BaseRouter from './BaseRouter';
import debug from './debug';

const BEFORE_ROUTE = 'BEFORE_ROUTER_ROUTE';
const AFTER_ROUTE = 'AFTER_ROUTER_ROUTE';
const BEFORE_POP = 'BEFORE_ROUTER_POP';
const AFTER_POP = 'AFTER_ROUTER_POP';
const BEFORE_DISMISS = 'BEFORE_ROUTER_DISMISS';
const AFTER_DISMISS = 'AFTER_ROUTER_DISMISS';
const AFTER_FOCUS = 'AFTER_ROUTER_FOCUS';
const BEFORE_FOCUS = 'BEFORE_ROUTER_FOCUS';
const AFTER_REFRESH = 'AFTER_ROUTER_REFRESH';
const BEFORE_REFRESH = 'BEFORE_ROUTER_REFRESH';

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
    currentRouter: ?BaseRouter;

    constructor(){
        this.pop = this.pop.bind(this);
        this.route = this.route.bind(this);
        this.dismiss = this.dismiss.bind(this);
    }

    route(name: string, props: { [key: string]: any} = {}){
        if (!this.currentRouter){
            throw new Error("No current router is set");
        }
        if (props.toString()!='[object Object]')
            props = {data : props};

        props = filterParam(props);
        // check if route is in children, current or parent routers
        let router: BaseRouter = this.currentRouter;

        // deep into child router
        while (router.currentRoute.childRouter){
            router = router.currentRoute.childRouter;
            debug("Switching to child router="+router.name);
        }

        debug("Route to "+name+" current router="+this.currentRouter.name+ " current route="+this.currentRouter.currentRoute.name);
        while (!router.routes[name]){
            const route = router.parentRoute;
            if (!route || !route.parent){
                throw new Error("Cannot find router for route="+name+" current router="+router.name);
            }
            router = route.parent;
            debug("Switching to router="+router.name);
        }
        debug("ROUTER DELEGATE PROPS:"+ router.delegate.props.dispatch)
        const currentRoute = router.routes[name];
        if (router.delegate.props && router.delegate.props.dispatch){
            router.delegate.props.dispatch({...props, type: BEFORE_ROUTE, route:currentRoute, name})
        }
        if (router.route(name, props)){
            // deep into child router
            while (router.currentRoute.childRouter){
                router = router.currentRoute.childRouter;
                debug("Switching to child router="+router.name);
            }

            this.currentRouter = router;
            if (router.delegate.props && router.delegate.props.dispatch){
                router.delegate.props.dispatch({...props, type: AFTER_ROUTE, route:currentRoute, name})
            }
            return true;
        }
        return false;
    }
    dismiss(props: { [key: string]: any} = {}){
        props = filterParam(props);
        let router: BaseRouter = this.currentRouter;
        // go to root router
        while (router.parentRoute){
            router = router.parentRoute.parent;
            debug("Switching to parent router="+router.name);
        }
        if (router.delegate.props && router.delegate.props.dispatch){
            router.delegate.props.dispatch({...props, type: BEFORE_DISMISS, route:router.currentRoute, name:router.currentRoute.name})
        }
        const res = router.dismiss();
        if (router.delegate.props && router.delegate.props.dispatch){
            router.delegate.props.dispatch({...props, type: AFTER_DISMISS, route:router.currentRoute, name:router.currentRoute.name})
        }
        return res;
    }
    refresh(props: { [key: string]: any} = {}){
        props = filterParam(props);
        let router: BaseRouter = this.currentRouter;
        if (router.delegate.props && router.delegate.props.dispatch){
            router.delegate.props.dispatch({...props, type: BEFORE_REFRESH, route:router.currentRoute, name:router.currentRoute.name})
        }
        const res = router.refresh(props);
        if (router.delegate.props && router.delegate.props.dispatch){
            router.delegate.props.dispatch({...props, type: AFTER_REFRESH, route:router.currentRoute, name:router.currentRoute.name})
        }
        return res;
    }
    pop(num: number = 1, props: { [key: string]: any} = {}, parentRouter: BaseRouter = {}){
        props = filterParam(props);
        if (!isNumeric(num)){
            num = 1;
        }

        let router:BaseRouter;
        if (parentRouter) {
            router = parentRouter;
        }
        else {
            if (!this.currentRouter) {
                throw new Error("No current router is set");
            }

            router = this.currentRouter;
        }

        debug("Pop, router="+router.name+" stack length:"+router.stack.length);
        debug("Current route="+router.currentRoute.name+" type="+router.currentRoute.type);
        while (router.stack.length <= 1 || router.currentRoute.type === 'switch'){
            if (router.parentRoute) {
              router = router.parentRoute.parent;
              debug("Switching to parent router="+router.name);
            } else {
              break;
            }
        }
        if (router.delegate.props && router.delegate.props.dispatch){
            router.delegate.props.dispatch({...props, type: BEFORE_POP, route:router.currentRoute, name:router.currentRoute.name})
        }
        if (router.pop(num, props)){
            if (!parentRouter)
                this.currentRouter = router;
            if (router.delegate.props && router.delegate.props.dispatch){
                router.delegate.props.dispatch({...props, type: AFTER_POP, route:router.currentRoute, name:router.currentRoute.name})
            }
            return true;
        } else {
            return false;
        }

    }
}
const actions = new Actions();
actions.BEFORE_ROUTE = BEFORE_ROUTE;
actions.AFTER_ROUTE = AFTER_ROUTE;
actions.BEFORE_POP = BEFORE_POP;
actions.AFTER_POP = AFTER_POP;
actions.BEFORE_DISMISS = BEFORE_DISMISS;
actions.AFTER_DISMISS = AFTER_DISMISS;
actions.BEFORE_FOCUS = BEFORE_FOCUS;
actions.AFTER_FOCUS = AFTER_FOCUS;
export default actions;
