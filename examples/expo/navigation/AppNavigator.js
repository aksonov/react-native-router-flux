import React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { StackViewStyleInterpolator } from 'react-navigation-stack';
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
} from 'react-native-router-flux';
import TabBarIcon from '../components/TabBarIcon';
import MenuIcon from '../components/MenuIcon';
import DrawerContent from '../components/DrawerContent';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabBarStyle: {
    backgroundColor: '#eee',
  },
  tabBarSelectedItemStyle: {
    backgroundColor: '#ddd',
  },
});

const reducerCreate = params => {
  const defaultReducer = new Reducer(params);
  return (state, action) => {
    console.log('reducer: ACTION:', action);
    return defaultReducer(state, action);
  };
};

const stateHandler = (prevState, newState, action) => {
  console.log('onStateChange: ACTION:', action);
};

const getSceneStyle = () => ({
  backgroundColor: '#F5FCFF',
  shadowOpacity: 1,
  shadowRadius: 3,
});

// on Android, the URI prefix typically contains a host in addition to scheme
const prefix = Platform.OS === 'android' ? 'mychat://mychat/' : 'mychat://';

const transitionConfig = () => ({
  screenInterpolator:
    StackViewStyleInterpolator.forFadeFromBottomAndroid,
});

const AppNavigator = () => (
  <Router
    createReducer={reducerCreate}
    onStateChange={stateHandler}
    getSceneStyle={getSceneStyle}
    uriPrefix={prefix}>
    <Overlay key="overlay">
      <Modal key="modal" hideNavBar transitionConfig={transitionConfig}>
        <Lightbox key="lightbox">
          <Stack key="root" hideNavBar titleStyle={{ alignSelf: 'center' }}>

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
              drawerIcon={MenuIcon}
              drawerWidth={300}>
              <Scene hideNavBar>
                <Tabs
                  key="tabbar"
                  backToInitial
                  onTabOnPress={() => {
                    console.log('Back to initial and also print this');
                  }}
                  swipeEnabled
                  tabBarStyle={styles.tabBarStyle}
                  activeBackgroundColor="white"
                  inactiveBackgroundColor="rgba(255, 0, 0, 0.5)">
                  <Scene
                    key="main_home"
                    component={HomeScreen}
                    title="Home"
                    tabBarLabel="Home"
                    icon={TabBarIcon}
                  />
                  <Scene
                    key="main_links"
                    component={LinksScreen}
                    title="Links"
                    tabBarLabel="Links"
                    icon={TabBarIcon}
                  />
                  <Scene
                    key="main_settings"
                    component={SettingsScreen}
                    title="Settings"
                    tabBarLabel="Settings"
                    icon={TabBarIcon}
                  />
                </Tabs>
              </Scene>
            </Drawer>
          </Stack>
        </Lightbox>
      </Modal>
    </Overlay>
  </Router>
);

export default AppNavigator;
