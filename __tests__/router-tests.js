jest.setMock('../Animations', {FlatFloatFromRight:{}, FlatFloatFromBottom:{}, None:{}});
jest.setMock('alt/components/AltNativeContainer');
var React = require('react/addons');
var alt = require('../alt');
var TestUtils = React.addons.TestUtils;
jest.dontMock('../store');
jest.dontMock('../actions');
jest.dontMock('../index');

var Actions = require('../actions');

var {Router, Route, Schema, Action} = require('../index');

class Store {
    constructor(){
        this.bindAction(Actions.custom, this.onCustom);
        this.data = undefined;
    }

    onCustom(data){
        this.setState({data})
    }

}
var TestStore = alt.createStore(Store ,"TestStore");

describe('Router', function() {
    beforeEach(function(){
        this.router = TestUtils.renderIntoDocument(
            <Router>
                <Schema name="default" navBar="navBar1" customProp="a"/>
                <Schema name="modal" navBar="navBar2" customProp="b" ownProp="c"/>

                <Action name="custom1" navBar="navBar2" customProp="b" ownProp="c" type="custom2"/>
                <Action name="custom2" navBar="navBar2" customProp="b" ownProp="c" type="custom3"/>

                <Route name="launch" component="launchComponent" hideNavBar={true} customProp="a"/>
                <Route name="signin" component="signinComponent" schema="modal"/>
                <Route name="signup" component="signupComponent"/>
                <Route name="main" component="mainComponent"/>
                <Route name="home" component="homeComponent" type="replace" schema="modal"/>
            </Router>
        );
    });

    it('route', function () {
        var router = this.router;
        expect(router.refs.nav.props.initialRoute.name).toEqual('launch');
        var len = router.refs.nav.getCurrentRoutes().length;
        expect(len).toEqual(1);
        var launchComponent = TestUtils.findRenderedDOMComponentWithTag(
            router, 'launchComponent');

        expect(launchComponent.props.customProp).toEqual("a");

        expect(function(){TestUtils.findRenderedDOMComponentWithTag(
            router, 'navBar1')}).toThrow(new Error("Did not find exactly one match for tag:navBar1"));
        expect(function(){TestUtils.findRenderedDOMComponentWithTag(
            router, 'signinComponent')}).toThrow(new Error("Did not find exactly one match for tag:signinComponent"));

        Actions.signin("Hello world!");
        len = router.refs.nav.getCurrentRoutes().length;
        expect(len).toEqual(2);
        expect(router.refs.nav.getCurrentRoutes()[len-1].name).toEqual('signin');
        expect(router.refs.nav.getCurrentRoutes()[len-1].passProps.data).toEqual("Hello world!");

        Actions.signin({data:"Hello world2!", id:1});
        len = router.refs.nav.getCurrentRoutes().length;
        expect(len).toEqual(3);
        expect(router.refs.nav.getCurrentRoutes()[len-1].name).toEqual('signin');
        expect(router.refs.nav.getCurrentRoutes()[len-1].passProps.data).toEqual("Hello world2!");
        expect(router.refs.nav.getCurrentRoutes()[len-1].passProps.id).toEqual(1);

        var signinComponent = TestUtils.findRenderedDOMComponentWithTag(
            router, 'signinComponent');

        var navBar = TestUtils.findRenderedDOMComponentWithTag(
            router, 'navBar2');

        expect(signinComponent.props.data).toEqual('Hello world2!');
        expect(navBar.props.customProp).toEqual("b");
        expect(navBar.props.ownProp).toEqual("c");
        expect(navBar.props.data).toEqual('Hello world2!');
        expect(navBar.props.id).toEqual(1);

        Actions.main();
        len = router.refs.nav.getCurrentRoutes().length;
        expect(len).toEqual(4);
        expect(router.refs.nav.getCurrentRoutes()[len-1].name).toEqual('main');
        expect(router.refs.nav.getCurrentRoutes()[len-1].passProps.data).toEqual(undefined);
        expect(router.refs.nav.getCurrentRoutes()[len-1].passProps.id).toEqual(undefined);

        expect(function(){TestUtils.findRenderedDOMComponentWithTag(
            router, 'navBar2')}).toThrow(new Error("Did not find exactly one match for tag:navBar2"));
        navBar = TestUtils.findRenderedDOMComponentWithTag(
            router, 'navBar1');

        expect(navBar.props.customProp).toEqual("a");
        expect(navBar.props.ownProp).toEqual(undefined);

        Actions.home({data:"Hello world home!", id:111, customProp:'bb'});
        len = router.refs.nav.getCurrentRoutes().length;
        expect(len).toEqual(4);
        var homeComponent = TestUtils.findRenderedDOMComponentWithTag(
            router, 'homeComponent');

        expect(homeComponent.props.data).toEqual('Hello world home!');
        navBar = TestUtils.findRenderedDOMComponentWithTag(
            router, 'navBar2');
        //
        //expect(navBar.props.customProp).toEqual("bb");
        //expect(navBar.props.ownProp).toEqual("c");
        //expect(navBar.props.id).toEqual(111);
        //expect(navBar.props.data).toEqual("Hello world home!");
        //
        //expect(navBar.props.customProp).toEqual("bb");
        //expect(navBar.props.ownProp).toEqual("c");
        //
        //Actions.pop(2);
        //len = router.refs.nav.getCurrentRoutes().length;
        //expect(len).toEqual(2);
        //
        //expect(router.refs.nav.getCurrentRoutes()[len-1].name).toEqual('signin');
        //expect(router.refs.nav.getCurrentRoutes()[len-1].passProps.data).toEqual("Hello world!");
        //expect(router.refs.nav.getCurrentRoutes()[len-1].passProps.id).toEqual(undefined);
        //
        //Actions.pop();
        //len = router.refs.nav.getCurrentRoutes().length;
        //expect(len).toEqual(1);
        //
        //expect(router.refs.nav.getCurrentRoutes()[len-1].name).toEqual('launch');
        //launchComponent = TestUtils.findRenderedDOMComponentWithTag(
        //    router, 'launchComponent');
        //
        //expect(launchComponent.props.customProp).toEqual("a");
        //


    });

    //it('custom actions', function(){
    //    var router = this.router;
    //    expect(router.refs.nav.props.initialRoute.name).toEqual('launch');
    //    var len = router.refs.nav.getCurrentRoutes().length;
    //    expect(len).toEqual(1);
    //    var launchComponent = TestUtils.findRenderedDOMComponentWithTag(
    //        router, 'launchComponent');
    //
    //    expect(launchComponent.props.customProp).toEqual("a");
    //    var state = TestStore.getState();
    //    expect(state.data).toEqual(undefined);
    //
    //
    //    // no changes within current component should be
    //    Actions.custom1({url: 'hello world'});
    //
    //    len = router.refs.nav.getCurrentRoutes().length;
    //    expect(len).toEqual(1);
    //    var launchComponent = TestUtils.findRenderedDOMComponentWithTag(
    //        router, 'launchComponent');
    //
    //    expect(launchComponent.props.customProp).toEqual("a");
    //    state = TestStore.getState();
    //    expect(state.data.name).toEqual("custom1");
    //    expect(state.data.data.url).toEqual('hello world');
    //
    //});
});