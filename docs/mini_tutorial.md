# Getting Started

This document will walk you through the basics of using this router.

## Super Simple Example

![super_simple.gif](super_simple.gif)

In this super simple example, we will just have three files:

1. Your root index file: `index.js`
2. The first page that is loaded automatically: `PageOne.js`
3. A second page you can navigate to: `PageTwo.js`

### index.js
```jsx
import React, { Component } from 'react';
import { Router, Scene } from 'react-native-router-flux';

import PageOne from './PageOne';
import PageTwo from './PageTwo';

export default class App extends Component {
  render() {
    return (
      <Router>
        <Scene key="root">
          <Scene key="pageOne" component={PageOne} title="PageOne"/>
          <Scene key="pageTwo" component={PageTwo} title="PageTwo"/>
        </Scene>
      </Router>
    )
  }
}
```

In `react-native-router-flux`, each route (or page) is called a `<Scene>`. Conventionally, your Scenes should be wrapped inside a root scene before being finally wrapped inside a `<Router>` component that is returned in the `render()` function.

At the very minimum, each `<Scene>` component should have the following props:

- **key**: A unique string that can be used to refer to the particular scene.
- **component**: The component to be rendered for that `Scene` or page.
- **title**: The string to be displayed in the nav bar at the top of the screen.

### PageOne.js
```jsx
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';

export default class PageOne extends Component {
  render() {
    return (
      <View style={{margin: 128}}>
        <Text onPress={Actions.pageTwo}>This is PageOne!</Text>
      </View>
    )
  }
}
```

To navigate from one route to another, an `Action` must be called. This takes the form of:

```
Actions.SCENE_KEY()
```

Where `SCENE_KEY` must match the `key` prop defined in one of the Scenes of the `Router` component in the root file.

Since the PageTwo component has the key of `pageTwo`, all we need to do is to pass in the function `Actions.pageTwo` into the `<Text>` component so that it executes the page transition when the text is pressed.

That's it for the super simple example! You've just learned how to setup routes and navigate from one page to another.
