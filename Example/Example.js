import React, {
  Component,
} from "react";
import {
  StyleSheet,
  Text,
  View,
} from "react-native";
import Launch from "./components/Launch";
import Register from "./components/Register";
import Login from "./components/Login";
import Login2 from "./components/Login2";
import Login3 from "./components/Login3";
import CardStackStyleInterpolator from 'react-navigation/src/views/CardStackStyleInterpolator';
import {
  Scene,
  Router,
  Actions,
  Reducer,
  ActionConst,
  Overlay,
  Tabs,
  Modal,
  Drawer,
  Stack,
  Lightbox,
} from "react-native-router-flux";
import Error from "./components/Error";
import Home from "./components/Home";
import TabView from "./components/TabView";
import TabIcon from "./components/TabIcon";
import EchoView from "./components/EchoView";
import MessageBar from "./components/MessageBar";
import CustomNavBarView from "./components/CustomNavBarView";
import CustomNavBar from "./components/CustomNavBar";
import CustomNavBar2 from "./components/CustomNavBar2";


const styles = StyleSheet.create({
  container: {
    flex: 1, backgroundColor: "transparent", justifyContent: "center",
    alignItems: "center",
  },
  tabBarStyle: {
    backgroundColor: "#eee",
  },
  tabBarSelectedItemStyle: {
    backgroundColor: "#ddd",
  },
});

const reducerCreate = params => {
  const defaultReducer = new Reducer(params);
  return (state, action) => {
    console.log("ACTION:", action);
    return defaultReducer(state, action);
  };
};
const getSceneStyle = () => ({
  backgroundColor: "#F5FCFF",
  shadowOpacity: 1,
  shadowRadius: 3,
});
const BackgroundView = () => <View style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, backgroundColor:'red' }}/>
const Example = () => (
  <Router createReducer={reducerCreate} tintColor="red" getSceneStyle={getSceneStyle}>
    <Overlay>
      <Modal hideNavBar
             transitionConfig={() => ({screenInterpolator: CardStackStyleInterpolator.forFadeFromBottomAndroid})}>
        <Lightbox leftButtonTextStyle={{color: 'green'}} backButtonTextStyle={{color: 'red'}}>
          <Stack hideNavBar hideTabBar titleStyle={{alignSelf: 'center'}}>
            <Scene key="echo" back clone component={EchoView} getTitle={({navigation}) => navigation.state.key}/>
            <Scene key="register" back duration={0}>
              <Scene key="_register" component={Register} title="Register"/>
              <Scene key="register2" component={Register} title="Register2"/>
              <Scene key="home" component={Home} title="Replace" type={ActionConst.REPLACE}/>
            </Scene>
            <Scene key="launch" component={Launch} title="Launch" initial/>
            <Stack key="customNavBar" hideTabBar titleStyle={{alignSelf: 'center'}}>
              <Scene
                key="customNavBar1"
                title="CustomNavBar 1"
                navBar={CustomNavBar}
                component={CustomNavBarView}
                back
              />
              <Scene
                key="customNavBar2"
                title="CustomNavBar 2"
                navBar={CustomNavBar}
                component={CustomNavBarView}
                back
              />
              <Scene
                key="customNavBar3"
                title="Another CustomNavBar"
                navBar={CustomNavBar2}
                component={CustomNavBarView}
                back
              />
              <Scene
                key="hiddenNavBar"
                title="hiddenNavBar"
                component={CustomNavBarView}
                hideNavBar={true}
                back
              />
            </Stack>
            <Drawer contentComponent={TabView}>
              <Tabs key="tabbar" gestureEnabled={false} showLabel={false} tabs tabBarStyle={styles.tabBarStyle}
                    activeBackgroundColor="white"
                    inactiveBackgroundColor="red">
                <Stack
                  key="tab1"
                  title="Tab #1"
                  tabBarLabel="TAB #1"
                  inactiveBackgroundColor='white' activeBackgroundColor='#dddddd'
                  icon={TabIcon}
                  navigationBarStyle={{backgroundColor: 'green'}}
                  titleStyle={{color: 'white', alignSelf: 'center'}}
                >
                  <Overlay>
                    <Scene component={BackgroundView} />
                    <Scene
                      key="tab1_1"
                      component={TabView}
                      title="Tab #1_1"
                      onRight={() => alert('Right button')}
                      rightTitle="Right"
                    />
                  </Overlay>
                  <Scene
                    key="tab1_2"
                    component={TabView}
                    title="Tab #1_2"
                    back
                    titleStyle={{color: 'black', alignSelf: 'center'}}
                  />
                </Stack>
                <Scene key="tab2" initial title="Tab #2" icon={TabIcon}>
                  <Scene
                    key="tab2_1"
                    component={TabView}
                    title="Tab #2_1"
                    renderRightButton={() => <Text>Right</Text>}
                  />
                  <Scene
                    key="tab2_2"
                    component={TabView}
                    title="Tab #2_2"
                    onBack={() => alert('onBack button!')}
                    backTitle="Back!"
                    panHandlers={null}
                  />
                </Scene>
                <Scene key="tab3" component={TabView} title="Tab #3" icon={TabIcon} rightTitle="Right3" onRight={() => {
                }}/>
                <Scene key="tab4" component={TabView} title="Tab #4" hideNavBar icon={TabIcon}/>
                <Scene key="tab5" component={TabView} title="Tab #5" icon={TabIcon}/>
              </Tabs>
            </Drawer>
          </Stack>
          <Scene key="error" component={Error}/>
        </Lightbox>
        <Stack key="login" titleStyle={{alignSelf: "center"}}>
          <Scene component={Login} title="Login"
                 key="loginModal"
                 onExit={() => console.log("onExit")}
                 leftTitle="Cancel" onLeft={Actions.pop}/>
          <Scene
            key="loginModal2"
            component={Login2}
            title="Login2"
            backTitle="Back"
            panHandlers={null}
            duration={1}
          />
          <Scene
            key="loginModal3"
            hideNavBar
            component={Login3}
            title="Login3"
            panHandlers={null}
            duration={1}
          />
        </Stack>
      </Modal>
      <Scene component={MessageBar} />
    </Overlay>
  </Router>
);

export default Example;
