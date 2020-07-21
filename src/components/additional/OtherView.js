import React from 'react';
import {StyleSheet, Text, View, Dimensions} from 'react-native';

let width = Dimensions.get('window').width;
let height = Dimensions.get('window').height;

const OtherView = props => {
  return <View style={styles.container}>{props.children}</View>;
};

export default OtherView;

const styles = StyleSheet.create({
  container: {
    width: width,
    height: 80,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
});
