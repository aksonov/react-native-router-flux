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
import DefaultRenderer from './DefaultRenderer';

export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this._renderNavigation = this._renderNavigation.bind(this);
        this._handleProps = this._handleProps.bind(this);
    }

    _handleProps(props){
        const scenesMap = props.scenes || Actions.create(props.children);
        const {children, style, scenes, reducer, createReducer, ...parentProps} = props;
        scenesMap.rootProps = parentProps;
        const initialState = getInitialState(scenesMap);
        const ReducerCreator = props.createReducer || Reducer;
        this.setState({reducer: props.reducer || ReducerCreator({initialState, scenes:scenesMap})});
    }

    componentWillReceiveProps(props){
        this._handleProps(props);
    }

    componentDidMount(){
        this._handleProps(this.props);
    }

    _renderNavigation(navigationState, onNavigate) {
        if (!navigationState) {
            return null;
        }
        Actions.callback = props=>onNavigate(props);
        return <DefaultRenderer navigationState={navigationState}/>;
    }

    render(){
        if (!this.state.reducer){
            return null;
        }
        return <NavigationRootContainer
            reducer={this.state.reducer}
            renderNavigation={this._renderNavigation}
        />
    }
}
