# Mini-Tutorial

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
          <Scene key="pageOne" component={PageOne} title="PageOne" initial={true} />
          <Scene key="pageTwo" component={PageTwo} title="PageTwo" />
        </Scene>
      </Router>
    )
  }
}
```

In `react-native-router-flux`, each route (or page) is called a `<Scene>`. Conventionally, your Scenes should be wrapped inside a root Scene before being finally wrapped inside a `<Router>` component that is returned in the `render()` function.

At the very minimum, each `<Scene>` component should have the following props:

- **key**: A unique string that can be used to refer to the particular scene.
- **component**: The component to be rendered for that `Scene` or page.
- **title**: The string to be displayed in the nav bar at the top of the screen.

Note that the first scene we wish to load has the prop `initial={true}` to indicate that it's the scene that should be initially rendered.

## From Page to Page

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
Actions.SCENE_KEY(PARAMS)
```

Where `SCENE_KEY` must match the `key` prop defined in one of the Scenes of the `Router` component in the root file. And `PARAMS` refers to a javascript object that will be passed into the resulting scene as props (more on this later).

Since the PageTwo component has the key of `pageTwo`, all we need to do is to pass in the function `Actions.pageTwo` into the `<Text>` component so that it executes the page transition when the text is pressed.

## Passing Information

Now let's try to extend our example so that we can pass data from `PageOne` to `PageTwo`.

In `PageOne.js`, instead of simply passing in `Actions.pageTwo`, we can replace it with `Actions.pageTwo({text: 'Hello World!'})`. In this case, we need to wrap the Action call inside a function to prevent it from executing when this component is rendered. As a result, the render function inside `PageOne.js` should look like this:

```jsx
render() {
  const goToPageTwo = () => Actions.pageTwo({text: 'Hello World!'}); 
  return (
    <View style={{margin: 128}}>
      <Text onPress={goToPageTwo}>This is PageOne!</Text>
    </View>
  )
}
```

And in `PageTwo.js`, we can use the data being passed in by adding an additional `<Text>` component below the existing one like so:

```jsx
render() {
  return (
    <View style={{margin: 128}}>
      <Text>This is PageTwo!</Text>
      <Text>{this.props.text}</Text>
    </View>
  )
}
```

Now, if we navigate to the PageTwo Scene as before, we should see:

```
This is PageTwo!
Hello World!
```

## Going Forward (or backwards?)

That pretty much concludes this mini-tutorial, we've covered most of the basics here. There are a lot of things you can do to customize `react-native-router-flux`, this is only the beginning.

For example, you may want to programmatically go back to the previous Scene. The included navbar already allows you to do this by pressing on the arrow icon at the upper left corner. But you can also call this function at any point in your app for the same effect:

```js
Actions.pop()
```

And should you ever want to refresh the same Scene with new props, you can use:

```js
Actions.refresh(PARAMS)
```

Don't be afraid to explore the docs, you'll be surprised at how much you're able to customize with `react-native-router-flux`!
