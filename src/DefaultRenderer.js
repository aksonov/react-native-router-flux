/**
 * Copyright (c) 2015-present, Pavel Aksonov
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import React, {Component, Animated, StyleSheet, ScrollView, View, Text, NavigationExperimental} from "react-native";
const {
    AnimatedView: NavigationAnimatedView,
    Card: NavigationCard,
    RootContainer: NavigationRootContainer,
    Header: NavigationHeader,
    } = NavigationExperimental;

const {
    CardStackPanResponder: NavigationCardStackPanResponder,
    CardStackStyleInterpolator: NavigationCardStackStyleInterpolator
    } = NavigationCard;

import Actions from "./Actions";
import getInitialState from "./State";
import Reducer from "./Reducer";
import TabBar from "./TabBar";
import NavBar from "./NavBar";

export default class DefaultRenderer extends Component {
    constructor(props) {
        super(props);
        this._renderCard = this._renderCard.bind(this);
        this._renderScene = this._renderScene.bind(this);
        this._renderHeader = this._renderHeader.bind(this);
    }

    getChildContext() {
        return {
            navigationState: this.props.navigationState,
        };
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
            return (
                <View style={[{flex: 1}, navigationState.sceneStyle]}>
                    <Component {...navigationState} navigationState={navigationState} />
                </View>
            )
        }

        const selected = navigationState.children[navigationState.index];
        //return <DefaultRenderer key={selected.key} navigationState={selected}/>

        let applyAnimation = selected.applyAnimation || navigationState.applyAnimation;
        let style = selected.style || navigationState.style;

        let optionals = {};
        if (applyAnimation) {
            optionals.applyAnimation = applyAnimation;
        } else {
            let duration = selected.duration;
            if (duration === null || duration === undefined) duration = navigationState.duration;
            if (duration !== null && duration !== undefined) {
                optionals.applyAnimation = function (pos, navState) {
                    if (duration === 0) {
                        pos.setValue(navState.index);
                    } else {
                        Animated.timing(pos, {toValue: navState.index, duration}).start();
                    }
                };
            }
        }

        return (
            <NavigationAnimatedView
                navigationState={navigationState}
                style={[styles.animatedView, style]}
                renderOverlay={this._renderHeader}
                renderScene={this._renderCard}
                {...optionals}
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
        const isVertical = props.scene.navigationState.direction === "vertical";

        const animationStyle = props.scene.navigationState.animationStyle || (isVertical ?
          NavigationCardStackStyleInterpolator.forVertical(props) :
          NavigationCardStackStyleInterpolator.forHorizontal(props));

        const panHandlers = props.scene.navigationState.panHandlers || (isVertical ?
          NavigationCardStackPanResponder.forVertical(props) :
          NavigationCardStackPanResponder.forHorizontal(props));

        return (
            <NavigationCard
                {...props}
                style={[animationStyle, props.scene.navigationState.style]}
                key={"card_" + props.scene.navigationState.key}
                panHandlers={panHandlers}
                renderScene={this._renderScene}
            />
        );
    }

    _renderScene(/*NavigationSceneRendererProps*/ props) {
        return <DefaultRenderer key={props.scene.navigationState.key} navigationState={props.scene.navigationState}/>
    }

}

DefaultRenderer.childContextTypes = {
    navigationState: PropTypes.any,
};

const styles = StyleSheet.create({
    animatedView: {
        flex: 1,
        backgroundColor:"transparent"
    },
});

