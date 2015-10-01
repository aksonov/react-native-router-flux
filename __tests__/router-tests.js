jest.setMock('../Animations', {FlatFloatFromRight:{}, FlatFloatFromBottom:{}, None:{}});
jest.setMock('alt/components/AltNativeContainer');
var React = require('react/addons');
var TestUtils = React.addons.TestUtils;
jest.dontMock('../store');
jest.dontMock('../actions');
jest.dontMock('../index');

var Actions = require('../actions');

var {Router, Route, Schema, Action} = require('../index');

describe('Router', function() {
    it('route', function () {
        var router = TestUtils.renderIntoDocument(
          <Router>
              <Schema name="default" navBar="navBar1" customProp="a"/>
              <Schema name="modal" navBar="navBar2" customProp="b" ownProp="c"/>

              <Route name="launch" component="launchComponent" hideNavBar={true} customProp="a"/>
              <Route name="signin" component="signinComponent" schema="modal"/>
              <Route name="signup" component="signupComponent"/>
              <Route name="main" component="mainComponent"/>
          </Router>
        );
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

        expect(React.findDOMNode(signinComponent).data).toEqual('Hello world2!');
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

        Actions.pop(2);
        len = router.refs.nav.getCurrentRoutes().length;
        expect(len).toEqual(2);

        expect(router.refs.nav.getCurrentRoutes()[len-1].name).toEqual('signin');
        expect(router.refs.nav.getCurrentRoutes()[len-1].passProps.data).toEqual("Hello world!");
        expect(router.refs.nav.getCurrentRoutes()[len-1].passProps.id).toEqual(undefined);

        Actions.pop();
        len = router.refs.nav.getCurrentRoutes().length;
        expect(len).toEqual(1);

        expect(router.refs.nav.getCurrentRoutes()[len-1].name).toEqual('launch');
        launchComponent = TestUtils.findRenderedDOMComponentWithTag(
            router, 'launchComponent');

        expect(launchComponent.props.customProp).toEqual("a");

    });
});