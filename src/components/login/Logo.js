import React, {Component} from 'react';
import {
  Dimensions,
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Button,
  Platform,
  TextInput,
  StatusBar,
  Image,
} from 'react-native';

export default class Logo extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Image
          style={{width: 130, height: 180}}
          source={require('../../../assets/images/socialpay.png')}
        />
        <Text style={styles.logoText}> Social Pay </Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    marginVertical: 15,
    fontSize: 18,
    color: '#0984e3',
    justifyContent: 'flex-end',
  },
});
