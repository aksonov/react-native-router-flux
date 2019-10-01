import React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { StackViewStyleInterpolator } from 'react-navigation-stack';
import { Scene, Router, Actions, Reducer, ActionConst, Overlay, Tabs, Modal, Drawer, Stack, Lightbox } from 'react-native-router-flux';
import Launch from './components/Launch';
import Register from './components/Register';
import Login from './components/Login';
import Login2 from './components/Login2';
import Login3 from './components/Login3';
import Home from './components/Home';
import DrawerContent from './components/drawer/DrawerContent';
import TabView from './components/TabView';
import TabIcon from './components/TabIcon';
import EchoView from './components/EchoView';
import MessageBar from './components/MessageBar';
import ErrorModal from './components/modal/ErrorModal';
import DemoLightbox from './components/lightbox/DemoLightbox';
import MenuIcon from './images/menu_burger.png';
import CustomNavBarView from './components/CustomNavBarView';
import CustomNavBar from './components/CustomNavBar';
import CustomNavBar2 from './components/CustomNavBar2';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scene: {
    backgroundColor: '#F5FCFF',
    shadowOpacity: 1,
    shadowRadius: 3,
  },
  tabBarStyle: {
    backgroundColor: '#eee',
  },
  tabBarSelectedItemStyle: {
    backgroundColor: '#ddd',
  },
});

const stateHandler = (prevState, newState, action) => {
  console.log('onStateChange: ACTION:', action);
};

// on Android, the URI prefix typically contains a host in addition to scheme
const prefix = Platform.OS === 'android' ? 'mychat://mychat/' : 'mychat://';

const transitionConfig = () => ({
  screenInterpolator: StackViewStyleInterpolator.forFadeFromBottomAndroid,
});

const Example = () => (
  <Router onStateChange={stateHandler} sceneStyle={styles.scene} uriPrefix={prefix}>
    <Overlay key="overlay">
      <Modal key="modal" hideNavBar transitionConfig={transitionConfig}>
        <Lightbox key="lightbox">
          <Stack key="root" titleStyle={{ alignSelf: 'center' }} hideNavBar>
            <Scene key="echo" back clone component={EchoView} getTitle={({ navigation }) => navigation.state.key} />
            <Scene key="launch" component={Launch} title="Launch" initial type={ActionConst.RESET} />

            <Stack key="customNavBar" hideTabBar headerLayoutPreset="center">
              <Scene key="customNavBar1" title="CustomNavBar 1" navBar={CustomNavBar} component={CustomNavBarView} back />
              <Scene key="customNavBar2" title="CustomNavBar 2" navBar={CustomNavBar} component={CustomNavBarView} back />
              <Scene key="customNavBar3" title="Another CustomNavBar" navBar={CustomNavBar2} component={CustomNavBarView} back />
              <Scene key="hiddenNavBar" title="hiddenNavBar" component={CustomNavBarView} hideNavBar={true} back />
            </Stack>

            <Stack back backTitle="Back" key="register" duration={0} navTransparent>
              <Scene key="_register" component={Register} title="Register" />
              <Scene key="register2" component={Register} title="Register2" />
              <Scene key="home" component={Home} title="Replace" type={ActionConst.REPLACE} />
            </Stack>

            <Drawer
              hideNavBar
              key="drawer"
              onExit={() => {
                console.log('Drawer closed');
              }}
              onEnter={() => {
                console.log('Drawer opened');
              }}
              contentComponent={DrawerContent}
              drawerImage={MenuIcon}
              drawerWidth={300}
            >
              {/*
                Wrapper Scene needed to fix a bug where the tabs would
                reload as a modal ontop of itself
              */}
              <Scene hideNavBar panHandlers={null}>
                <Tabs
                  key="tabbar"
                  routeName="tabbar"
                  backToInitial
                  onTabOnPress={() => {
                    console.log('Back to initial and also print this');
                  }}
                  showLabel={false}
                  tabBarStyle={styles.tabBarStyle}
                  activeBackgroundColor="white"
                  inactiveBackgroundColor="rgba(255, 0, 0, 0.5)"
                >
                  <Stack
                    key="tab_1"
                    title="Tab #1"
                    tabBarLabel="TAB #1"
                    inactiveBackgroundColor="#FFF"
                    activeBackgroundColor="#DDD"
                    icon={TabIcon}
                    navigationBarStyle={{ backgroundColor: 'green' }}
                    titleStyle={{ color: 'white', alignSelf: 'center' }}
                  >
                    <Scene key="tab_1_1" component={TabView} title="Tab #1_1" onRight={() => alert('Right button')} rightTitle="Right" />

                    <Scene key="tab_1_2" component={TabView} title="Tab #1_2" back titleStyle={{ color: 'black', alignSelf: 'center' }} />
                  </Stack>

                  <Stack key="tab_2" title="Tab #2" icon={TabIcon} initial>
                    <Scene key="tab_2_1" component={TabView} title="Tab #2_1" renderRightButton={() => <Text>Right</Text>} />
                    <Scene key="tab_2_2" component={TabView} title="Tab #2_2" back onBack={() => alert('onBack button!')} hideDrawerButton backTitle="Back!" panHandlers={null} />
                  </Stack>

                  <Stack key="tab_3" icon={TabIcon} title="Tab #3">
                    <Scene key="tab_3_1" component={TabView} rightTitle="Reset to 'tabbar'" onRight={() => Actions.reset('tabbar')} />
                  </Stack>
                  <Scene key="tab_4_1" component={TabView} title="Tab #4" hideNavBar icon={TabIcon} />
                  <Stack key="tab_5" icon={TabIcon} title="Tab #5">
                    <Scene key="tab_5_1" component={TabView} />
                  </Stack>
                </Tabs>
              </Scene>
            </Drawer>
          </Stack>

          <Scene key="demo_lightbox" component={DemoLightbox} />
        </Lightbox>
        <Scene key="error" component={ErrorModal} />
        <Stack key="login" headerLayoutPreset="center" path="login/:data" titleStyle={{ alignSelf: 'center' }}>
          <Scene key="loginModal" component={Login} title="Login" onExit={() => console.log('Login: onExit')} leftTitle="Cancel" onLeft={Actions.pop} />
          <Scene key="loginModal2" component={Login2} title="Login2" onEnter={() => console.log('Login2: onEnter')} backTitle="Back" panHandlers={null} duration={1} />
          <Scene
            key="loginModal3"
            hideNavBar
            component={Login3}
            title="Login3"
            onEnter={() => console.log('Login3: onEnter')}
            onExit={() => console.log('Login3: onExit')}
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
