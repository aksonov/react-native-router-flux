import navigationStore from './navigationStore';

export default function createReducer() {
  return (state, action) => navigationStore._router.getStateForAction(action, state);
}
