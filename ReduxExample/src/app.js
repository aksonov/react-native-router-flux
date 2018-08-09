import React from "react";
import { createStore } from "redux";
import { Provider, connect } from "react-redux";
import { Scene, Actions, Router } from "react-native-router-flux";
import Home from "./home";
import Page from "./page";
import reducers from "./reducers";
import routeReducer from "./route-reducer";

const navigator = Actions.create(
  <Scene key="root" hideNavBar>
    <Scene key="home" component={Home} />
    <Scene key="page" component={Page} />
  </Scene>
);

const ReduxRouter = connect()(Router);

export default class App extends React.Component {
  render() {
    return (
      <Provider store={createStore(reducers)}>
        <ReduxRouter createReducer={() => routeReducer} navigator={navigator} />
      </Provider>
    );
  }
}
