import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';

const Other = props => {
  return (
    <TouchableOpacity
      style={css.container}
      onPress={() => Alert.alert(props.title)}>
      <Image source={props.img} style={css.img} />
      <Text style={css.txt}>{props.title}</Text>
    </TouchableOpacity>
  );
};

export default Other;

const css = StyleSheet.create({
  container: {
    height: 60,
    width: 75,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    marginHorizontal: 3,
  },
  img: {
    width: 30,
    height: 30,
  },
  txt: {
    fontSize: 10,
    marginTop: 5,
    flexWrap: 'wrap',
    textAlign: 'center',
  },
});
