/**
 * Copyright (c) 2015, Facebook, Inc.  All rights reserved.
 *
 * Facebook, Inc. ("Facebook") owns all right, title and interest, including
 * all intellectual property and other proprietary rights, in and to the React
 * Native CustomComponents software (the "Software").  Subject to your
 * compliance with these terms, you are hereby granted a non-exclusive,
 * worldwide, royalty-free copyright license to (1) use and copy the Software;
 * and (2) reproduce and distribute the Software as part of your own software
 * ("Your Software").  Facebook reserves all rights not expressly granted to
 * you in this license agreement.
 *
 * THE SOFTWARE AND DOCUMENTATION, IF ANY, ARE PROVIDED "AS IS" AND ANY EXPRESS
 * OR IMPLIED WARRANTIES (INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
 * OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE) ARE DISCLAIMED.
 * IN NO EVENT SHALL FACEBOOK OR ITS AFFILIATES, OFFICERS, DIRECTORS OR
 * EMPLOYEES BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 * EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
 * PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS;
 * OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 * WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR
 * OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THE SOFTWARE, EVEN IF
 * ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 */
import React, {Animated, PixelRatio, Image, StyleSheet, Text, TouchableOpacity, View, NavigationExperimental} from 'react-native';
import Actions from './Actions';
const {
    AnimatedView: NavigationAnimatedView,
    Card: NavigationCard,
    RootContainer: NavigationRootContainer,
    Header: NavigationHeader,
    } = NavigationExperimental;

export default class NavBar extends React.Component {
    componentWillMount(){
        const state = this.props.navigationState;
        this._renderRightButton = this._renderRightButton.bind(this);
        this._renderBackButton = this._renderBackButton.bind(this);
        this._renderLeftButton = this._renderLeftButton.bind(this);
        this._renderTitle = this._renderTitle.bind(this);
        if (state.renderLeftButton){
            this._renderLeftButton = state.renderLeftButton;
        }
        if (state.renderRightButton){
            this._renderRightButton = state.renderRightButton;
        }
        if (state.renderBackButton){
            this._renderBackButton = state.renderBackButton;
        }
    }
    render() {
        const state = this.props.navigationState;
        let selected = state.children[state.index];
        while (selected.hasOwnProperty("children")) {
            selected = selected.children[selected.index]
        }
        if (state.navBar || selected.navBar){
            const Component =  selected.navBar || state.navBar;
            return <Component {...this.props} {...state} {...selected}/>
        }
        if (selected.component && selected.component.renderNavigationBar){
            return selected.component.renderNavigationBar({...this.props,...selected});
        }
        if (state.hideNavBar || selected.hideNavBar){
            return null;
        }
        return (
            <Animated.View
                style={[styles.header, state.navigationBarStyle, selected.navigationBarStyle]}>
                {state.children.map(this._renderTitle, this)}
                {this._renderBackButton()}
                {this._renderLeftButton()}
                {this._renderRightButton()}
            </Animated.View>
        );
    }

    _renderBackButton() {
      let backButtonImage;

      if (this.props.navigationState.index === 0) {
        if(!!this.context.drawer && typeof this.context.drawer.toggle === 'function'){

          backButtonImage = this.props.navigationState.drawerImage || require('./menu_burger.png');

          return (
            <TouchableOpacity style={[styles.backButton, this.props.navigationState.leftButtonStyle]} onPress={() => {
              var drawer = this.context.drawer;
              drawer.toggle();
            }}>
                <Image source={backButtonImage)} style={[styles.backButtonImage, this.props.navigationState.barButtonIconStyle]}/>
            </TouchableOpacity>
          );
        }else{
          return null;
        }
      }

      backButtonImage = this.props.navigationState.backButtonImage || require('./back_chevron.png');

      return (
          <TouchableOpacity style={[styles.backButton, this.props.navigationState.leftButtonStyle]} onPress={Actions.pop}>
              <Image source={backButtonImage} style={[styles.backButtonImage, this.props.navigationState.barButtonIconStyle]}/>
          </TouchableOpacity>
      );
    }

    _renderRightButton() {
        const state = this.props.navigationState;
        const childState = this.props.navigationState.children[this.props.navigationState.index];
        if (childState.onRight && childState.rightTitle){
            return (
                <TouchableOpacity style={[styles.rightButton, childState.rightButtonStyle]} onPress={childState.onRight.bind(null, childState)}>
                    <Text style={[styles.barRightButtonText, childState.rightButtonTextStyle]}>{childState.rightTitle}</Text>
                </TouchableOpacity>
            );
        }
        if (state.onRight && state.rightTitle){
            return (
                <TouchableOpacity style={[styles.rightButton, state.rightButtonStyle]} onPress={state.onRight.bind(null, state)}>
                    <Text style={[styles.barRightButtonText, state.rightButtonTextStyle]}>{state.rightTitle}</Text>
                </TouchableOpacity>
            );
        }
    }

    _renderLeftButton() {
        const state = this.props.navigationState;
        const childState = this.props.navigationState.children[this.props.navigationState.index];
        if (childState.onLeft && childState.leftTitle){
            return (
                <TouchableOpacity style={[styles.leftButton, childState.leftButtonStyle]} onPress={childState.onLeft.bind(null, childState)}>
                    <Text style={[styles.barLeftButtonText, childState.leftButtonTextStyle]}>{childState.leftTitle}</Text>
                </TouchableOpacity>
            );
        }
        if (state.onLeft && state.leftTitle){
            return (
                <TouchableOpacity style={[styles.leftButton, state.leftButtonStyle]} onPress={state.onLeft.bind(null, state)}>
                    <Text style={[styles.barLeftButtonText, state.leftButtonTextStyle]}>{state.leftTitle}</Text>
                </TouchableOpacity>
            );
        }
    }

    _renderTitle(childState: NavigationState, index:number) {
        return (
            <Animated.Text
                key={childState.key}
                style={[
          styles.title, this.props.navigationState.titleStyle, childState.titleStyle,
          {
            opacity: this.props.position.interpolate({
              inputRange: [index - 1, index, index + 1],
              outputRange: [0, 1, 0],
            }),
            left: this.props.position.interpolate({
              inputRange: [index - 1, index + 1],
              outputRange: [200, -200],
            }),
            right: this.props.position.interpolate({
              inputRange: [index - 1, index + 1],
              outputRange: [-200, 200],
            }),
          },
        ]}>
                {this.props.getTitle ? this.props.getTitle(childState) : childState.title }
            </Animated.Text>
        );
    }

}


NavBar.contextTypes = {
  drawer: React.PropTypes.object
}

const styles = StyleSheet.create({
    title: {
        textAlign: 'center',
        marginTop: 10,
        fontSize: 18,
        fontWeight: '500',
        color: '#0A0A0A',
        position: 'absolute',
        top: 20,
        left: 0,
        right: 0,
    },
    header: {
        backgroundColor: '#EFEFF2',
        paddingTop: 20,
        top: 0,
        height: 64,
        right: 0,
        left: 0,
        borderBottomWidth: 0.5,
        borderBottomColor: '#828287',
        position: 'absolute',
    },
    backButton: {
        width: 29,
        height: 37,
        position: 'absolute',
        bottom: 4,
        left: 2,
        padding: 8,
    },
    rightButton: {
        width: 100,
        height: 37,
        position: 'absolute',
        bottom: 4,
        right: 2,
        padding: 8,
    },
    leftButton: {
        width: 100,
        height: 37,
        position: 'absolute',
        bottom: 4,
        left: 2,
        padding: 8,
    },
    barRightButtonText: {
        color: 'rgb(0, 122, 255)',
        textAlign:'right',
        fontSize: 17,
    },
    barLeftButtonText: {
        color: 'rgb(0, 122, 255)',
        textAlign:'left',
        fontSize: 17,
    },
    backButtonImage: {
        width: 13,
        height: 21,
    },
});
