import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

class Page extends React.Component {
  render() {
    return (
      <View style={styles.fill}>
        <View style={styles.header}>
          <Text style={styles.text}>Current scene: "{this.props.currentScene}"</Text>
          <Text style={styles.text}>This is an arbitrary page.</Text>
        </View>
        <TouchableOpacity
          style={styles.data}
          onPress={() => {
            this.props.action('This is your data: [1, 2, 3]');
          }}
        >
          <Text style={styles.text}> Get data </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            Actions.home();
          }}
        >
          <Text style={styles.text}>
            {' '}
            {'<'}
            -- Go to "home"{' '}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const action = data => ({
  type: 'data',
  payload: data,
});

const styles = {
  fill: {
    flex: 1,
  },
  header: {
    flex: 4,
    padding: 20,
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    justifyContent: 'center',
  },
  data: {
    flex: 1,
    backgroundColor: 'cyan',
    justifyContent: 'center',
  },
  button: {
    flex: 1,
    backgroundColor: 'yellow',
    justifyContent: 'center',
  },
};

const mapStateToProps = ({ reducer }) => ({ data } = reducer);

export default connect(
  mapStateToProps,
  { action },
)(Page);
