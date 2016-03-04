import React from 'react-native';
import BaseRouter from './BaseRouter';
import Route from './Route';
import * as Components from './Common';
import ExNavigator from '@exponent/react-native-navigator';
import ExNavigatorStyles from '@exponent/react-native-navigator/ExNavigatorStyles';
import { BackIcon } from '@exponent/react-native-navigator/ExNavigatorIcons';
import Animations from './Animations';
const {TouchableOpacity, Navigator, StyleSheet, View, Text} = React;
import Router from './Router';
import Actions from './Actions';
import debug from './debug';
import ActionSheet from '@exponent/react-native-action-sheet';

function parentProps(props = {}){
    const {name, sceneConfig, title, children, router, initial, showNavigationBar, renderNavigationBar, hideNavBar, footer, header, ...routerProps} = props;
    return routerProps;

}
export class ExRouteAdapter {
    name: string;
    navigator: ExNavigator;
    route: Route;
    props: { [key: string]: any};

    constructor(route: Route, props:{ [key: string]: any} = {}){
        debug("ExRouter constructor"+props.schema);
        if (!route){
            throw new Error("route is not defined ");
        }
        this.route = route;
        this.name = route.name;
        this.title = props.title || route.title;
        if (!this.name){
            throw new Error("name is not defined for route");
        }
        this.props = props || {};
        this.renderScene = this.renderScene.bind(this);
        if (this.route.props.renderRightButton){
            this.renderRightButton = this.route.props.renderRightButton.bind(this.route);
        }
        if (this.route.props.renderTitle){
            this.renderTitle = this.route.props.renderTitle.bind(this.route);
        }
        if (this.route.props.renderLeftButton){
            this.renderLeftButton = this.route.props.renderLeftButton.bind(this.route);
        }
    }

    configureScene() {
        return this.route.props.sceneConfig || Animations.None;
    }

    renderScene(navigator) {
        const Component = this.route.component;
        const {initial, ...routeProps} = this.route.props;
        const child = Component ?
            !this.route.wrapRouter ? <Component key={this.route.name} name={this.route.name} {...routeProps} {...this.props} route={this.route}/>:
                <Router name={this.route.name+"Router"} {...routeProps} {...this.props} route={this.route} plugin={ExRouter}  initial={"_"+this.route.name} footer={null} header={null}>
                    <Components.Route {...routeProps}  {...this.props} component={Component} name={"_"+this.route.name} type="push" wrapRouter={false} initial={true}/>
                </Router>
            :
            React.cloneElement(React.Children.only(this.route.children), {...routeProps, ...this.props, route:this.route});

        const Header = this.route.header;
        const header = Header ? <Header {...routeProps} {...this.props}/> : null;

        const Footer = this.route.footer;
        const footer = Footer ? <Footer {...routeProps} {...this.props}/> : null;

        return (
            <View style={styles.transparent}>
                {header}
                {child}
                {footer}
            </View>
        );
    }

    getName(){
        return this.route.name;
    }

    getTitle() {
        debug("TITLE ="+this.route.title+" for route="+this.route.name);
        return this.title || "";
    }

    getBackButtonTitle(navigator, index, state){
        let previousIndex = index - 1;
        let previousRoute = state.routeStack[previousIndex];
        let title = previousRoute.getTitle(navigator, previousIndex, state);
        const res = title.length>10 ? null : title;
        return this.route.props.leftTitle || res;
    }

    renderLeftButton(navigator, index, state){
        if (this.route.props.onLeft && this.route.props.leftTitle) {
            return (<TouchableOpacity
              touchRetentionOffset={ExNavigator.Styles.barButtonTouchRetentionOffset}
              onPress={() => this.route.props.onLeft({...this.route.props, ...this.props})}
              style={[ExNavigator.Styles.barLeftButton, this.route.props.leftButtonStyle]}>
                <Text
                  style={[ExNavigator.Styles.barLeftButtonText, this.route.props.leftButtonTextStyle]}>{this.route.props.leftTitle}</Text>
            </TouchableOpacity>);
        }

        if (index === 0 || index < navigator.getCurrentRoutes().length-1) {
            return null;
        }

        let previousIndex = index - 1;
        let previousRoute = state.routeStack[previousIndex];
        if (previousRoute.renderBackButton) {
            return previousRoute.renderBackButton(navigator, previousIndex, state);
        }

        let title = this.getBackButtonTitle(navigator, index, state);

        if (title) {
            var buttonText =
                <Text
                    numberOfLines={1}
                    style={[
            ExNavigatorStyles.barButtonText,
            ExNavigatorStyles.barBackButtonText,
            navigator.props.barButtonTextStyle,
          ]}
                >
                    {title}
                </Text>;
        }

        return (
            <TouchableOpacity
                pressRetentionOffset={ExNavigatorStyles.barButtonPressRetentionOffset}
                onPress={() => Actions.pop()}
                style={[ExNavigatorStyles.barBackButton, styles.backButtonStyle]}>
                <BackIcon
                    style={[
            ExNavigatorStyles.barButtonIcon,
            navigator.props.barButtonIconStyle,
          ]}
                />
                {buttonText}
            </TouchableOpacity>
        );
    }

    renderRightButton(navigator, index, state) {
        if (this.route.props.onRight && this.route.props.rightTitle){
            return (<TouchableOpacity
                touchRetentionOffset={ExNavigator.Styles.barButtonTouchRetentionOffset}
                onPress={() => this.route.props.onRight({...this.route.props, ...this.props})}
                style={[ExNavigator.Styles.barRightButton, this.route.props.rightButtonStyle]}>
                <Text style={[ExNavigator.Styles.barRightButtonText, this.route.props.rightButtonTextStyle]}>{this.route.props.rightTitle}</Text>
            </TouchableOpacity>);
        } else {
            return null;
        }
    }
}
class ExNavigationBar extends Navigator.NavigationBar {
    constructor(props){
        super(props);
        this.state = {};
    }
    render(){
        const route = this.props.router.nextRoute || this.props.router.currentRoute;
        const renderNavBar = (route.component && route.component.renderNavigationBar) || route.renderNavigationBar  || this.props.router.renderNavigationBar || this.props.renderNavigationBar;
        let res = renderNavBar ? renderNavBar(this.props) : super.render();

        if (route.props.hideNavBar === false){
            return res;
        }
        if (this.props.router.props.hideNavBar || route.props.hideNavBar){
            return null;
        }
        return res;
    }
}

export default class ExRouter extends React.Component {
    router: BaseRouter;

    constructor(props){
        super(props);
        this.onPop = this.onPop.bind(this);
        this.onPush = this.onPush.bind(this);
        this.onReset = this.onReset.bind(this);
        this.onReplace = this.onReplace.bind(this);
        this.onJump = this.onJump.bind(this);
        this.onActionSheet = this.onActionSheet.bind(this);
        this.onTransitionToTop = this.onTransitionToTop.bind(this);
        this.state = {};
    }

    componentWillUnmount() {
        if (Actions.currentRouter && this === Actions.currentRouter.delegate) {
            Actions.currentRouter = null;
        }
    }

    onPush(route: Route, props:{ [key: string]: any}):boolean {
        if (this.props.onPush){
            const res = this.props.onPush(route, props);
            if (!res){
                return false;
            }
        }
        this.refs.nav.push(new ExRouteAdapter(route, props));
        debug("PUSHED TO:"+route.name);
        return true;
    }

    onReplace(route: Route, props:{ [key: string]: any}):boolean {
        if (this.props.onReplace){
            const res = this.props.onReplace(route, props);
            if (!res){
                return false;
            }
        }
        //this.refs.nav.immediatelyResetRouteStack(this.refs.nav.getCurrentRoutes().splice(-1,1));
        //this.refs.nav.push(new ExRouteAdapter(route, props));
        this.refs.nav.replace(new ExRouteAdapter(route, props));
        return true;
    }

    /***
     * Reset every scene with an array of routes
     * @param route defined route
     */

     onReset(route: Route, props:{ [key: string]: any}):boolean {
        if (this.props.onReset){
            const res = this.props.onReset(route, props);
            if (!res){
                return false;
            }
        }
        this.refs.nav.immediatelyResetRouteStack([new ExRouteAdapter(route, props)]);
        return true;
    }

    onJump(route: Route, props:{ [key: string]: any}):boolean {
        if (this.props.onJump){
            const res = this.props.onJump(route, props);
            if (!res){
                return false;
            }
        }
        const navigator = this.refs.nav;
        const routes = navigator.getCurrentRoutes();
        const exist = routes.filter(el=>el.getName()==route.name);
        if (exist.length){
            // navigator.jumpTo does not allow us to pass new props to an
            // existing route, so we do it manually.
            exist[0].props = props;
            navigator.jumpTo(exist[0]);
        } else {
            navigator.push(new ExRouteAdapter(route, props));
        }
        this.setState({selected: route.name});
        return true;
    }

    onPop(num: number){
        if (this.props.onPop){
            const res = this.props.onPop(num);
            if (!res){
                return false;
            }
        }

        if (num === 1) {
            this.refs.nav.pop();
        } else {
            this.refs.nav.popBack(num);
        }
        return true;
    }

    onTransitionToTop(route:Route, props:{ [key: string]: any}) {
        if (this.props.onTransitionToTop) {
            const res = this.props.onTransitionToTop(route, props);
            if (!res) {
                return false;
            }
        }
        const navigator = this.refs.nav;
        let router:BaseRouter = route.parent;

        // reset router stack
        router._stack = [route.name];

        // you can use navigator.transitionToTop or  navigator.immediatelyResetRouteStack + navigator.push
        // navigator.immediatelyResetRouteStack + navigator.push is more beter ,
        // if target route's parent(router) stack only have one route  eg ['someroute']

        //navigator.transitionToTop(new ExRouteAdapter(route, props));

        navigator.immediatelyResetRouteStack([]);
        navigator.push(new ExRouteAdapter(route, props));

        return true;
    }

    onModal(route: Route, props:{ [key: string]: any}):boolean {
        let element = React.createElement(route.component, Object.assign({}, route.props, props));
        this.setState({modal: element});
        return true;
    }

    onDismiss(){
        this.setState({modal: null});
    }

    onRefresh(props:{ [key: string]: any}){
        this.setState(props);
    }

    onActionSheet(route: Route, props:{ [key: string]: any}){
        this.refs.actionsheet.showActionSheetWithOptions({...route.props, ...props}, props.callback);
    }

    render() {
        const router = this.props.router;
        if (!router){
            throw new Error("No router is defined");
        }
        const Header = this.props.header;
        const header = Header ? <Header {...this.props} {...this.state}/> : null;

        const Footer = this.props.footer;
        const footer = Footer ? <Footer {...this.props} {...this.state}/> : null;

        const routerViewStyle = this.props.routerViewStyle || {};

        debug("RENDER ROUTER:"+router.name);
        return (
            <ActionSheet ref="actionsheet">
                <View style={[styles.transparent, routerViewStyle]}>
                    {header}
                    <ExNavigator ref="nav" initialRouteStack={router.stack.map(route => {
                            debug("REBUILDING STACK!");
                            const oldProps = router.routes[route].props
                            router.routes[route].props = {...oldProps, ...parentProps(this.props), ...this.state}
                            return new ExRouteAdapter(router.routes[route])
                        })}
                        style={styles.transparent}
                        sceneStyle={{ paddingTop: 0, backgroundColor:'transparent' }}
                        {...this.props}
                        renderNavigationBar={props=><ExNavigationBar {...this.props} {...props} {...this.state} router={router}/>}
                    />
                    {footer}
                    {this.state.modal}
                </View>
            </ActionSheet>
        );
    }


}


var styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top:0,
        bottom:0,
        left:0,
        right:0,
        backgroundColor:'transparent',
        justifyContent: 'center',
        alignItems: 'center',
    },
    transparent: {
        flex:1,
        backgroundColor: "transparent"
    },
    barTitleText: {
        fontFamily: '.HelveticaNeueInterface-MediumP4',
        fontSize: 17,
        marginTop: 11,
    },

});

