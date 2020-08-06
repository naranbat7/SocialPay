import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {CONSTANTS} from '../../constants/Constants';

const Name = props => {
  return (
    <View style={styles.container}>
      <Image style={styles.img} source={props.img} />
      <Text style={styles.txt}>{props.text}</Text>
    </View>
  );
};

export default Name;

const styles = StyleSheet.create({
  container: {
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  img: {
    height: 65,
    width: 60,
    marginBottom: 20,
  },
  txt: {
    fontSize: 22,
    fontWeight: 'bold',
    color: CONSTANTS.color.dark,
    textTransform: 'uppercase',
  },
});
