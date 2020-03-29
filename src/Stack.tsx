import * as React from 'react'
import {View} from 'react-native'
import {createStackNavigator} from '@react-navigation/stack'
import Scene, {SceneProps} from './Scene'
import {RouterContext} from './utils'

export type StackProps = {
  children: SceneProps
  hideNavBar?: boolean
}
let counter = 0

function withParams(Component: any) {
  return ({route, ...props}: any) => <Component route={route} {...props} {...route.params} />
}

const Stack = createStackNavigator()
const StackScene = ({children, hideNavBar = false}: StackProps) => (
  <RouterContext.Consumer>
    {params => (<Stack.Navigator>
    {React.Children.map(children, (element: any) => {
      const {props, key, type} = element
      const {title, component, hideBackTitle} = props
      const name = key || `key${(counter += 1)}`
      const isScene = type === Scene
      return <Stack.Screen name={name} component={isScene ? withParams(component) : () => element} options={{...params.options, title, headerBackTitleVisible: !hideBackTitle, headerShown: !(props.hideNavBar || hideNavBar)}} />
    })}
  </Stack.Navigator>)}
  </RouterContext.Consumer>
)

export default StackScene
