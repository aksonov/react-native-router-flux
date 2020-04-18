import * as React from 'react'
import {View} from 'react-native'
import {createStackNavigator} from '@react-navigation/stack'
import Scene, {SceneProps} from './Scene'
import {RouterContext} from './utils'

export declare type StackHeaderMode = 'float' | 'screen' | 'none';
export declare type StackCardMode = 'card' | 'modal';

export type StackProps = {
  children: SceneProps
  mode?: StackCardMode;
  headerMode?: StackHeaderMode;
  /**
   * If `false`, the keyboard will NOT automatically dismiss when navigating to a new screen.
   * Defaults to `true`.
   */
  keyboardHandlingEnabled?: boolean;
hideNavBar?: boolean
}
let counter = 0

function withParams(Component: any) {
  return ({route, ...props}: any) => <Component route={route} {...props} {...route.params} />
}

const Stack = createStackNavigator()
const StackScene = ({children, hideNavBar = false, ...stackProps}: StackProps) => (
  <RouterContext.Consumer>
    {params => (<Stack.Navigator {...stackProps}>
    {React.Children.map(children, (element: any) => {
      const {props, key, type} = element
      const {title, component, hideBackTitle} = props
      const name = key || `key${(counter += 1)}`
      const isScene = type === Scene
      return <Stack.Screen name={name} component={isScene ? withParams(component) : () => element} options={{...params.options, title, headerTitleAlign: 'center', headerBackTitleVisible: !hideBackTitle, headerShown: !(props.hideNavBar || hideNavBar)}} />
    })}
  </Stack.Navigator>)}
  </RouterContext.Consumer>
)

export default StackScene
