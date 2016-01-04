/**
 * Copyright (c) 2015-present, Pavel Aksonov
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from 'react-native'
import Router from './Router';
import ExRouter from './ExRouter';
const {StyleSheet, View} = React;
import Actions from './Actions';
export default class extends React.Component {

    constructor(props){
        super(props);
        const createRouter = props.createRouter || this.createRouter;
        this.router = createRouter(props);
    }

    createRouter(props){
        const schemas = React.Children.map(props.children, child=>child).filter(child=>child.type.prototype.className() === "Schema").map(child=>child.props);
        const routes = React.Children.map(props.children, child=>child).filter(child=>child.type.prototype.className() === "Route").map(child=>child.props);
        return new Router(routes, schemas, props.initialRoutes || (props.initial && [props.initial]), props);
    }

    componentDidMount(){
        this.router.delegate = this.refs.router;
    }

    render(){
        const Component = this.props.router || ExRouter;
        return (<Component ref="router" {...this.props} router={this.router} />);
    }
}
