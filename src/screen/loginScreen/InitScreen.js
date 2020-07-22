import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';

import Logo from '../../components/login/Logo';
import Form from '../../components/login/Form';

export default class InitScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Logo />
        <Form type="Нэвтрэх" logIn={this.props.logIn} />
        <View style={styles.SignUpTextCont}>
          <Text style={styles.SignUpButton}> Бүртгүүлэх </Text>
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
