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
    CardStackStyleInterpolator: CardStackStyleInterpolator,
    LinearPanResponder: LinearPanResponder
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

        const DEFAULT_DURATION = 250;
        const stateDuration = navigationState.duration >= 0 ? navigationState.duration : DEFAULT_DURATION;
        const duration = selected.duration >= 0 ? selected.duration : stateDuration;

        return (
            <NavigationAnimatedView
                navigationState={navigationState}
                style={[styles.animatedView, navigationState.style]}
                renderOverlay={this._renderHeader}
                direction={navigationState.direction || 'horizontal'}
                applyAnimation={(pos, navState) =>
                    Animated.timing(pos, {toValue: navState.index, duration}).start()
                }
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
        const isVertical = props.scene.navigationState.direction === 'vertical';

        const style = isVertical ? CardStackStyleInterpolator.forVertical(props) : CardStackStyleInterpolator.forHorizontal(props);
        const defaultPanHandlers = isVertical ? LinearPanResponder.forVertical(props) : LinearPanResponder.forHorizontal(props);
        const panHandlers = props.scene.navigationState.panHandlers || defaultPanHandlers;

        return (
            <NavigationCard
                {...props}
                key={'card_' + props.scene.navigationState.key}
                panHandlers={panHandlers}
                style = {style}
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
        backgroundColor:'transparent'
    },
});

