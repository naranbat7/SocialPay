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
  TouchableOpacity,
} from 'react-native';

import Logo from '../../components/login/Logo';
import Form from '../../components/login/Form';

export default class InitScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Logo />
        <Form type="Бүртгүүлэх" />
        <View style={styles.SignUpTextCont}>
          <Text style={styles.SignUpButton}> Нэвтрэх </Text>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
    textAlign: 'center',
  },
  SignUpTextCont: {
    flexGrow: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  SignUpButton: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '500',
  },
});
