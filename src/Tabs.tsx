import * as React from 'react'
import {View} from 'react-native'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {createStackNavigator} from '@react-navigation/stack'
import Scene, {SceneProps} from './Scene'

export type TabsProps = {
  children: SceneProps
  hideNavBar?: boolean
}
let counter = 0

const Tabs = createBottomTabNavigator()
const Stack = createStackNavigator()

function withParams(Component: any) {
  return ({route, ...props}: any) => <Component {...props} {...route.params} />
}
const TabsScene = ({children, hideNavBar = false, ...props}: TabsProps) => {
  return (
    <Tabs.Navigator tabBarOptions={props}>
      {React.Children.map(children, (element: any) => {
        const {props, key, type} = element
        const {title, component, wrap = true, icon} = props
        const name = key || `key${(counter += 1)}`
        if (key) {
          console.log('KEY: ', key)
        }
        const isScene = type === Scene
        return (
          <Tabs.Screen
            name={name}
            component={
              isScene
                ? wrap
                  ? () => (
                      <Stack.Navigator>
                        <Stack.Screen name={'_' + name} component={component} options={{title}} />
                      </Stack.Navigator>
                    )
                  : withParams(component)
                : () => element
            }
            options={{title, tabBarIcon: icon}}
          />
        )
      })}
    </Tabs.Navigator>
  )
}

export default TabsScene
