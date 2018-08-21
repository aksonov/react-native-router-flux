import { ActionConst } from 'react-native-router-flux';

const INITIAL_STATE = { data: null, currentScene: 'home' };

export default (state = INITIAL_STATE, { type, payload, routeName }) => {
  switch (type) {
    case ActionConst.FOCUS:
      console.log('FOCUS event fired with scene parameter: ', routeName);
      return { ...state, currentScene: routeName };
    case 'data':
      return { ...state, data: payload };

    default:
      return state;
  }
};
