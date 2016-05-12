export function assert(expr, failDescription) {
  if (!expr) {
    throw new Error(`[react-native-router-flux] ${failDescription}`);
  }
}

export default {

  // searches for the deepest explicitly set value for a key
  // in a navigationState tree.
  deepestExplicitValueForKey(navigationState, key) {
    const selected = navigationState.children[navigationState.index];
    let current = selected[key];
    if (typeof(current) === 'undefined') {
      current = navigationState[key];
    }
    let innerSelected = selected;
    while (innerSelected.hasOwnProperty('children')) {
      innerSelected = innerSelected.children[innerSelected.index];
      if (typeof(innerSelected[key]) !== 'undefined') {
        current = innerSelected[key];
      }
    }
    return current;
  },
};
