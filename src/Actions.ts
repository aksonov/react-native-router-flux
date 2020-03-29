import {NavigationContext} from '@react-navigation/native'
import {CommonActions} from '@react-navigation/native'

class NavigationStore {
  _ref: any = undefined
  setRef(ref: any) {
    this._ref = ref
  }
  refresh(params: any) {
    this._ref!.dispatch(CommonActions.setParams(params))
  }
}
export const navigationStore = new NavigationStore()

const Actions = new Proxy(navigationStore, {
  get(target: any, propKey: string, receiver) {
    if (propKey.startsWith('_') || propKey in ['pop', 'refresh']) {
      return target[propKey]
    }
    return function(...args: any) {
      //   alert(propKey + ' ' + target._ref.dispatch)
      //   alert(JSON.stringify(args))
      target._ref.dispatch(CommonActions.navigate(propKey, args[0]))
      //   const navigation = useNavigation()
      //   navigation.navigate(propKey, args)
    }
  },
})
export default Actions
