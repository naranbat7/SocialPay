import React, {Component} from 'react';
import {
  Text,
  SafeAreaView,
  ActivityIndicator,
  StyleSheet,
  Image,
} from 'react-native';

export class SplashScreen extends Component {
  render() {
    return (
      <SafeAreaView style={css.container}>
        <Image
          source={require('../../assets/images/SocialPayLogo.jpg')}
          style={css.img}
        />

        <Text style={css.txt}> Түр хүлээнэ үү </Text>
        <ActivityIndicator size={25} />
      </SafeAreaView>
    );
  }
}

const css = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    height: 170,
    width: 170,
  },
  txt: {
    fontSize: 16,
    marginTop: 10,
    marginBottom: 30,
  },
});

export default SplashScreen;
