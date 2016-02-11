/**
 * Copyright (c) 2015-present, Pavel Aksonov
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from 'react-native'
import BaseRouter from './BaseRouter';
import ExRouter from './ExRouter';
const {StyleSheet, View} = React;
import debug from './debug';
import Actions from './Actions';
export default class Router extends React.Component {

    constructor(props){
        super(props);
        const createRouter = props.createRouter || this.createRouter;
        this.router = createRouter(props);
    }

    createRouter(props){
        const schemas = React.Children.map(props.children, child=>child).filter(child=>child.type.prototype.className() === "Schema").map(child=>child.props);
        const routes = React.Children.map(props.children, child=>child).filter(child=>child.type.prototype.className() === "Route").map(child=>child.props);
        return new BaseRouter(routes, schemas, props.initialRoutes || (props.initial && [props.initial]), props);
    }

    componentDidMount(){
        this.router.delegate = this.refs.router;

        this.router.delegate.refs.nav.navigationContext.addListener('willfocus', function (ev) {
          let name = ev.data.route.name;
          let title = ev.data.route.title;

          this.props.dispatch({
            type: Actions.BEFORE_FOCUS,
            name: name,
            title: title
          });
        }.bind(this));

        this.router.delegate.refs.nav.navigationContext.addListener('didfocus', function (ev) {
          let name = ev.data.route.name;
          let title = ev.data.route.title;

          this.props.dispatch({
            type: Actions.AFTER_FOCUS,
            name: name,
            title: title
          });
        }.bind(this));
    }

    render(){
        const Component = this.props.plugin || ExRouter;
        return (<Component ref="router" {...this.props} router={this.router} dispatch={this.props.dispatch}/>);
    }
}
