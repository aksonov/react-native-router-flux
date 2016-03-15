/**
 * Copyright (c) 2015-present, Pavel Aksonov
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import React, {Component, Animated, StyleSheet, ScrollView, Text, NavigationExperimental} from 'react-native';
const {
    AnimatedView: NavigationAnimatedView,
    Card: NavigationCard,
    RootContainer: NavigationRootContainer,
    Header: NavigationHeader,
    } = NavigationExperimental;
import Actions from './Actions';
import getInitialState from './State';
import Reducer from './Reducer';
import TabBar from './TabBar';
import NavBar from './NavBar';

export default class DefaultRenderer extends Component {
    constructor(props) {
        super(props);
        this._renderCard = this._renderCard.bind(this);
        this._renderScene = this._renderScene.bind(this);
        this._renderHeader = this._renderHeader.bind(this);
    }

    render() {
        const navigationState = this.props.navigationState;
        if (!navigationState) {
            return null;
        }
        let Component = navigationState.component;
        if (navigationState.tabs && !Component){
            Component = TabBar;
        }
        if (Component) {
            return <Component {...navigationState} navigationState={navigationState}/>
        }

        const selected = navigationState.children[navigationState.index];
        //return <DefaultRenderer key={selected.key} navigationState={selected}/>

        return (
            <NavigationAnimatedView
                navigationState={navigationState}
                style={styles.animatedView}
                renderOverlay={this._renderHeader}
                setTiming={(pos, navState) => {
          Animated.timing(pos, {toValue: navState.index, duration: selected.duration || 500}).start();
        }}
                renderScene={this._renderCard}
            />
        );
    }

    _renderHeader(/*NavigationSceneRendererProps*/ props) {
        const NavigationBar = props.navigationState.navBar || NavBar;
        return <NavigationBar
                {...props}
                getTitle={state => state.title}
            />;
    }

    _renderCard(/*NavigationSceneRendererProps*/ props) {
        return (
            <NavigationCard
                {...props}
                key={'card_' + props.scene.navigationState.key}
                renderScene={this._renderScene}
            />
        );
    }

    _renderScene(/*NavigationSceneRendererProps*/ props) {
        return <DefaultRenderer key={props.scene.navigationState.key} navigationState={props.scene.navigationState}/>
    }

}

const styles = StyleSheet.create({
    animatedView: {
        flex: 1,
    },
});

