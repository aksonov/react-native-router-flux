import React from 'react';
import {Text} from 'react-native';
import {when} from 'mobx';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import Router from '../src/Router';
class B extends React.Component {
  render(){
    return <Text>Hello world!</Text>;
  }
}


const scenes = new Router({
  a: {
    component: B,
    props: {},
    login: async(username, password) => await loginStore.login(username, password) ? scenes.c() : scenes.refresh({error: 'wrong password'})
  },
  b: {
    initial: true,
    children: () => [scenes.a, scenes.c],
    props: {},
  },
  c: {
    component: B,
  }
});

class BB {
  get a() {
    return 1;
  }

  a(){
    return "123"
  }
}


test('renders correctly', done => {
  renderer.create(scenes.create());
  when(()=>scenes.screen, ()=>{
    try {
      console.log("STATE:", JSON.stringify(scenes.state));
      scenes.c({data: 'abc'});
      scenes.refresh({data: 'abcde'});
      console.log("STATE:", JSON.stringify(scenes.state));
      scenes.pop();
      console.log("STATE:", JSON.stringify(scenes.state));
      scenes.refresh({a: 3});
      console.log("STATE:", JSON.stringify(scenes.state));
      done();
    } catch (e){
      done(e);
    }
  })
});
