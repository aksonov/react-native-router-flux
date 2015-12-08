/**
 * Copyright (c) 2015-present, Pavel Aksonov
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import Button from 'react-native-button';
import React from 'react-native';
const {StyleSheet, View} = React;
import Animations from './Animations';

/**
 * Class is used to return Router info for exNavigator component
 */
export default class Route {
    /**
     * All properties for this route. name field is required and should be unique for the route
     * 'title' represents title
     *
     * @param name
     * @param title
     * @param onRightButton
     * @param rightButtonTitle
     * @param header
     * @param footer
     * @param component
     * @param child
     * @param props
     * @param schemas
     */
    constructor(props, schemas){
        if (!props){
            throw new Error("No props is defined for this Route");
        }
        if (!props.name){
            throw new Error("No name is defined for this Route");
        }
        if (props.schema && (!schemas || !schemas[props.schema])){
            throw new Error("No schema="+props.schema+" is defined for route="+props.name);
        }
        const schema = schemas ? schemas[props.schema || 'default'] || {} : {};
        const {name, type, title, sceneConfig, onRightButton, rightButtonTitle, header, footer, component, children} = {...schema, ...props};
        if (!component && !children){
            throw new Error("Component class or scene instance (child) should be passed");
        }
        this.title = title;
        this.onRightButton = onRightButton;
        this.rightButtonTitle = rightButtonTitle;
        this.sceneConfig = sceneConfig;
        this.props = props;
        this.type = type;
        this.name = name;
        this.header = header;
        this.footer = footer;
        this.schemas = schemas;
        this.component = component;
        this.children = children;
    }

    configureScene() {
        return this.sceneConfig || Animations.None;
    }

    renderScene(navigator) {
        const Component = this.component;
        const Header = this.header;
        const Footer = this.footer;
        let child;
        if (Component){
            child = <Component key={this.name} navigator={navigator} {...this.props} schemas={this.schemas}/>
        } else {
            child = React.Children.only(this.children);
            child = React.cloneElement(child, {navigator, schemas: this.schemas});
        }
        return (
            <View style={styles.transparent}>
                {Header && <Header navigator={navigator} {...this.props}/>}
                {child}
                {Footer && <Footer navigator={navigator} {...this.props}/>}
            </View>
        )
    }

    getName(){
        return this.name;
    }

    getTitle() {
        return this.title || "";
    }

    getType() {
        return this.type || "push";
    }

    renderRightButton() {
        if (this.onRightButton && this.rightButtonTitle){
            this.onRightButton(this.props);
        } else {
            return null;
        }
    }
}

const styles = StyleSheet.create({
    transparent: {
        flex:1,
        backgroundColor: "transparent"
    }
});

