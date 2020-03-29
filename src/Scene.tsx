import * as React from 'react'

export type StackProps = {
  children: React.ReactNode
}
export type NodeProps<T = any> = T & {
  component: React.Component<T>
  type?: 'push' | 'replace'
}

export type SceneProps = StackProps | NodeProps

const Scene = ({component}: {component: React.FunctionComponent<any> | React.Component<any>; title?: string; icon?: any; wrap?: boolean; hideBackTitle?: boolean; hideNavBar?: boolean}) => {
  return null
}
export default Scene
// export default class Scene<T = any> extends React.Component<SceneProps> {
//   render() {
//     return null
//   }
// }

// type MyProps = {
//   id: string
// }

class A extends React.Component {
  render() {
    return null
  }
}

const a = <Scene сomponent={A} />
