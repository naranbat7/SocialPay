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
    title1:  '',
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
        <Text style={[ {color: this.props.color}]}>
         <Text style={[styles.text]}>{this.props.title}</Text> 
         <Text style={[styles.text]}>{this.props.title1}</Text>
         <Text style={[styles.text]}>{this.props.title2}</Text>
         <Text style={[styles.text]}>{this.props.title3}</Text>
         <Text style={[styles.text4]}>{this.props.title4}</Text>
        </Text>
      </TouchableOpacity>
    );
  }
}

export default Button;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'space-around',
    margin: 7,
    width: 100,
    height: 70,
    borderBottomWidth: 1,
    borderBottomColor: '#0984E3',

  },
  text: {fontSize: 35, fontWeight: 'normal'},
  text4: {fontSize: 16, fontWeight: 'normal'},
});
