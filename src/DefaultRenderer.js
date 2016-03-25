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
                style={[styles.animatedView, navigationState.style]}
                renderOverlay={this._renderHeader}
                direction={navigationState.direction || 'horizontal'}
                setTiming={(pos, navState) => {
          Animated.timing(pos, {toValue: navState.index, duration: navState.duration || navigationState.duration || selected.duration || 250}).start();}}
                renderScene={this._renderCard}
            />
        );
    }

    _renderHeader(/*NavigationSceneRendererProps*/ props) {
        return <NavBar
                {...props}
                getTitle={state => state.title}
            />;
    }

    _renderCard(/*NavigationSceneRendererProps*/ props) {
        return (
            <NavigationCard
                {...props}
                key={'card_' + props.scene.navigationState.key}
                direction={props.scene.navigationState.direction || 'horizontal'}
                panHandlers={props.scene.navigationState.panHandlers }
                renderScene={this._renderScene}
                style={{backgroundColor:'transparent'}}
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
        backgroundColor:'transparent'
    },
});

