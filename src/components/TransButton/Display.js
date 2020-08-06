import React, {Component} from 'react';
import {
  Dimensions,
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

class Display extends Component {
  static defaultProps = {
    display: '',
    value: '',
  };
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.display}>{this.props.display}</Text>
      </View>
    );
  }
}

export default Display;

const styles = StyleSheet.create({
  container: {
    paddingTop: 100,
  },
  display: {
    fontSize: 70,
    color: '#002EFF',
    textAlign: 'center',
    
  },
  value: {
    fontSize: 40,
    color: '#002EFF',
    textAlign: 'center',
  },
});
