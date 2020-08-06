import React from 'react';
import {StyleSheet, Text, TouchableOpacity, Alert} from 'react-native';

const NonItem = props => {
  return (
    <TouchableOpacity
      style={[styles.container, props.style]}
      onPress={() => {
        Alert.alert(props.text);
      }}>
      <Text style={[styles.txt, {color: props.color}]}>{props.text}</Text>
    </TouchableOpacity>
  );
};

export default NonItem;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    borderBottomWidth: 1,
    height: 44,
  },
  txt: {
    fontSize: 17,
    color: '#1068FF',
    textAlign: 'center',
  },
});
