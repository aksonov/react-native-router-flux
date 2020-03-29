import * as React from 'react'
import Scene, {SceneProps} from './Scene'
import Stack from './Stack'
import Actions, {navigationStore} from './Actions'
import {NavigationContainer} from '@react-navigation/native'
import {StyleProp, ViewStyle} from 'react-native'
import {RouterContext} from './utils'

type ChildrenProps = {
  sceneStyle?: StyleProp<ViewStyle>
  tintColor?: string
  navigationBarStyle?: StyleProp<ViewStyle>
}

type RouterProps = ChildrenProps & {
  children: SceneProps
}

let counter = 0

const Router = ({children, sceneStyle, navigationBarStyle, tintColor}: RouterProps) => {
  const scenes = []
  const ref = React.useRef(null)
  React.useEffect(() => {
    navigationStore.setRef(ref.current)
  }, [])
  React.Children.forEach(children, child => {
    if (!child) {
      return
    }
    const {type, props} = child
    const key = child.key || `key${(counter += 1)}`
    scenes.push(props)
    // console.log('CHILD: ', key, props, type === Scene)
  })

  const params = {options: {cardStyle: sceneStyle, headerStyle: navigationBarStyle, headerTintColor: tintColor}}
  // if (scenes.length > 1) return <Stack>{scenes}</Stack>

  return <RouterContext.Provider value={params}><NavigationContainer ref={ref}>{children}</NavigationContainer></RouterContext.Provider>
}

export default Router
