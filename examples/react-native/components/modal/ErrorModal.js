import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Modal from './BaseModal';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
  },
});

const ErrorModal = () => (
  <Modal hideClose>
    <View flex={1} style={styles.container}>
      <Text>Error Modal</Text>
      <Text>Slides up from the bottom, and covers the entire screen with no transparency</Text>
      <Button title="Close" onPress={Actions.pop} />
    </View>
  </Modal>
);

export default ErrorModal;
