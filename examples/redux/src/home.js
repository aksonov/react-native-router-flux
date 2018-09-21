import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

class Home extends React.Component {
  render() {
    return (
      <View style={styles.fill}>
        <View style={styles.header}>
          <Text style={styles.text}>Current scene: "{this.props.currentScene}"</Text>
          <Text style={styles.text}>Welcome to the home scene.</Text>
          <Text style={styles.data}>{this.props.data ? this.props.data : 'No data...'}</Text>
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            Actions.page();
          }}
        >
          <Text style={styles.text}> Go to "page" --> </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = {
  fill: {
    flex: 1,
  },
  header: {
    flex: 2,
    padding: 20,
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    justifyContent: 'center',
  },
  data: {
    marginTop: 100,
    fontSize: 30,
    textAlign: 'center',
  },
  button: {
    flex: 1,
    backgroundColor: 'green',
    justifyContent: 'center',
  },
};

const mapStateToProps = ({ reducer }) => ({ data } = reducer);

export default connect(
  mapStateToProps,
  {},
)(Home);
