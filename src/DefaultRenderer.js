/**
 * Copyright (c) 2015-present, Pavel Aksonov
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import React, {Component, Animated, PropTypes, StyleSheet, View, NavigationExperimental} from "react-native";
const {
    AnimatedView: NavigationAnimatedView,
    Card: NavigationCard
} = NavigationExperimental;

const {
    CardStackPanResponder: NavigationCardStackPanResponder,
    CardStackStyleInterpolator: NavigationCardStackStyleInterpolator
} = NavigationCard;

import TabBar from "./TabBar";
import NavBar from "./NavBar";
import Actions from './Actions';

export default class DefaultRenderer extends Component {
    constructor(props) {
        super(props);
        this._renderCard = this._renderCard.bind(this);
        this._renderScene = this._renderScene.bind(this);
        this._renderHeader = this._renderHeader.bind(this);
    }

    static childContextTypes = {
        navigationState: PropTypes.any,
    };

    componentDidMount() {
        this.dispatchFocusAction(this.props);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.navigationState !== this.props.navigationState) {
          this.dispatchFocusAction(nextProps);
        }
    }

    dispatchFocusAction({navigationState}) {
        if (!navigationState || navigationState.component || navigationState.tabs) {
            return;
        }
        const scene = navigationState.children[navigationState.index];
        Actions.focus({scene});
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
        if (navigationState.tabs && !Component) {
            Component = TabBar;
        }
        if (Component) {
            return (
                <View style={[{flex: 1}, navigationState.sceneStyle]}>
                    <Component {...navigationState} navigationState={navigationState}/>
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
        const {key, direction, getSceneStyle} = props.scene.navigationState;
        let {panHandlers, animationStyle} = props.scene.navigationState;

        // Since we always need to pass a style for the direction, we can avoid #526
        let style = {};
        if (getSceneStyle) style = getSceneStyle(props);

        const isVertical = direction === "vertical";

        if (typeof(animationStyle) === 'undefined') {
            animationStyle = (isVertical ?
                NavigationCardStackStyleInterpolator.forVertical(props) :
                NavigationCardStackStyleInterpolator.forHorizontal(props));
        }

        if (typeof(panHandlers) === 'undefined') {
            panHandlers = panHandlers || (isVertical ?
                    NavigationCardStackPanResponder.forVertical(props) :
                    NavigationCardStackPanResponder.forHorizontal(props));
        }

        return (
            <NavigationCard
                {...props}
                key={'card_' + key}
                style={[animationStyle, style]}
                panHandlers={panHandlers}
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
        backgroundColor: "transparent"
    },
});
