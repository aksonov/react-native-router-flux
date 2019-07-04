import NavigationStore from './Store';

let storeSingleton = null;

export default function getDefaultNavigationStore() {
  if (!storeSingleton) {
    storeSingleton = new NavigationStore();
  }
  return storeSingleton;
}
