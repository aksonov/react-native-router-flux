// @flow
import NavigationStore from './NavigationStore';

let _navigationStore: NavigationStore;

export default function () {
  if (_navigationStore) {
    return _navigationStore;
  }
  _navigationStore = new NavigationStore();
  return _navigationStore;
};
