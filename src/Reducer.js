import navigationStore from './navigationStore';

export default function createReducer(params) {
  return (state, action) => navigationStore._router.getStateForAction(action, state);
}
