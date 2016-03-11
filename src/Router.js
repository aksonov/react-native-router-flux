/**
 * Copyright (c) 2015-present, Pavel Aksonov
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import React, {Component, StyleSheet, ScrollView, Text, NavigationExperimental} from 'react-native';
const {
    AnimatedView: NavigationAnimatedView,
    Card: NavigationCard,
    RootContainer: NavigationRootContainer,
    Header: NavigationHeader,
    } = NavigationExperimental;
import Actions from './Actions';
import getInitialState from './State';
import Reducer from './Reducer';

export default class Router extends Component {
    constructor(props) {
        super(props);
        this._renderNavigation = this._renderNavigation.bind(this);
        this._renderCard = this._renderCard.bind(this);
        this._renderScene = this._renderScene.bind(this);
        this._renderHeader = this._renderHeader.bind(this);
        const routes = Actions.create(props.children);
        const initialState = getInitialState(routes);
        this.reducer = this.props.reducer || Reducer({initialState, routes});
    }

    _renderNavigation(navigationState, onNavigate) {
        if (!navigationState) {
            return null;
        }
        return (
            <NavigationAnimatedView
                navigationState={navigationState}
                style={styles.animatedView}
                renderOverlay={this._renderHeader}
                setTiming={(pos, navState) => {
          Animated.timing(pos, {toValue: navState.index, duration: 500}).start();
        }}
                renderScene={this._renderCard}
            />
        );
    }

    _renderHeader(/*NavigationSceneRendererProps*/ props) {
        if (props.navigationState.hideNavBar){
            return null;
        }
        return (
            <NavigationHeader
                {...props}
                getTitle={state => state.key}
            />
        );
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
        const {component: Component, ...compProps} = props.scene.navigationState;
        return <Component {...compProps}/>;
    }

    render(){
        return <NavigationRootContainer
            reducer={this.reducer}
            renderNavigation={this._renderNavigation}
        />
    }
}

const styles = StyleSheet.create({
    animatedView: {
        flex: 1,
    },
    scrollView: {
        marginTop: 64
    },
});
