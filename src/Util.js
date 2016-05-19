export function assert(expr, failDescription) {
  if (!expr) {
    throw new Error(`[react-native-router-flux] ${failDescription}`);
  }
}
