import React, {Component} from 'react';
import {
  Dimensions,
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

class Button extends Component {
  static defaultProps = {
    onPress: function() {},
    title: '',
    color: 'white',
    backgroundColor: 'black',
    style: {},
  };

  render() {
    var bc = this.props.backgroundColor;
    return (
      <TouchableOpacity
        onPress={this.props.onPress}
        style={[
          styles.container,
          {backgroundColor: bc},
          {...this.props.style},
        ]}>
        <Text style={[styles.text, {color: this.props.color}]}>
          {this.props.title}
        </Text>
      </TouchableOpacity>
    );
  }
}

export default Button;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 7,
    width: 80,
    height: 80,
    borderBottomColor: 'black',
    
  },
  text: {fontSize: 35, fontWeight: 'normal'},
});
