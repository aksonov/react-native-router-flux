# ExNavigator [![Slack](http://slack.exponentjs.com/badge.svg)](http://slack.exponentjs.com)

ExNavigator is a scene navigator that is centered around routes and is built on top of React Native's Navigator. You define ExRoutes, which are plain JavaScript objects with functions to render the scene for the route and the components to display in the nav bar.

The API is in ExRoute.js and ExRouteRenderer.js.

Otherwise ExNavigator is very similar to Navigator.

## Why?
[This post](https://medium.com/the-exponent-log/routing-and-navigation-in-react-native-6b27bee39603#.13j2waolq) explains the ideas that are in ExNavigator and how we use it so you can assess whether it is useful for your project, too.

## Installation

```
npm install @exponent/react-native-navigator --save
```

You'll also need to enable several ES6 and ES7 features with Babel. In the root of your project create a file called ".babelrc" with the following JSON:

```js
{
  "whitelist": [
    "es6.modules",
    "es7.classProperties",
    "es7.decorators"
  ]
}
```

## Usage

ExNavigator's component API looks very similar to Navigator's. You specify a `routeStack` and/or `initialRoute`, along with some styles. ExNavigator will render the navigation bar for you and accepts some props to style its contents. See `ExNavigator.propTypes` for the list of accepted props.

**You must use JavaScript's `import` keyword to import ExNavigator. Do not use `require()`.**

```js
import ExNavigator from '@exponent/react-native-navigator';

class Example extends React.Component {
  render() {
    return (
      <ExNavigator
        initialRoute={YourRouter.getHomeRoute()}
        style={{ flex: 1 }}
        sceneStyle={{ paddingTop: 64 }}
      />
    );
  }
}
```

### Routing

The main difference between ExNavigator and Navigator is what the route objects look like. With ExNavigator, you define what each scene looks like, what its navigation bar's contents should be, and what to do when the scene gains or loses focus. A common pattern is to define a router where you create routes:

```js

let YourRouter = {
  getHomeRoute() {
    return {
      // Return a React component class for the scene. It receives a prop
      // called `navigator` that you can use to push on more routes.
      getSceneClass() {
        return require('./HomeScene');
      },

      // When this scene receives focus, you can run some code. We're just
      // proxying the `didfocus` event that Navigator emits, so refer to
      // Navigator's source code for the semantics.
      onDidFocus(event) {
        console.log('Home Scene received focus.');
      },

      // Return a string to display in the title section of the navigation bar.
      // This route's title is displayed next to the back button when you push
      // a new route on top of this one.
      getTitle() {
        return 'Home';
      },
    };
  },


  getProfileRoute(profile) {
    return {
      // You can also render a scene yourself when you need more control over
      // the props of the scene component
      renderScene(navigator) {
        let ProfileScene = require('./ProfileScene');
        return <ProfileScene navigator={navigator} profile={profile} />;
      },

      // There are onWillBlur and onDidBlur events when the scene loses focus.
      // These events occur when another scene will focus or did focus,
      // respectively. The difference between "will" and "did" is the start and
      // end of the scene transition.
      onDidBlur(event) {
        console.log(`Profile Scene for ${profile} lost focus.`);
      },

      // You can render arbitrary views for the title component. Note that you
      // also need to implement getTitle if you want the title of this route to
      // show up in the back button to it.
      renderTitle() {
        return (
          <View style={{ flexDirection: 'row' }}>
            <Image source={profile.photoUrl} style={styles.titlePhoto} />
            <Text style={styles.titleName}>{profile.name}</Text>
          </View>
        );
      },

      getTitle() {
        return profile.name;
      },

      // Render the view to display on the right side of the navigation bar. It
      // is typically a button but doesn't have to be.
      renderRightButton() {
        return (
          <Button onPress={() => { console.log('Tapped right button'); }}>
            Log
          <Button>
        );
      },
    };
  },
};
```

### Navigating

To navigate to a new scene, you use an API very similar to Navigator's. Create a route object—perhaps with the help of your router—and give it to the ExNavigator:

```js
class HomeScene extends React.Component {
  render() {
    return (
      <View style={{ justifyContent: 'center' }}>
        <Button onPress={() => {
          // Get a route object from the router
          let profile = {
            name: 'Alex',
            photoUrl: 'https://images.example.com/alex.jpeg',
          };
          let route = YourRouter.getProfileRoute(profile);

          // `navigator` is passed into your scene component when you have
          // implemented getSceneClass in your route
          this.props.navigator.push(route);
        }}>
          Navigate to a profile
        </Button>
      </View>
    );
  }
}
```
