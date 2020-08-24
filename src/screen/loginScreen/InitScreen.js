import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

import Logo from '../../components/login/Logo';
import Form from '../../components/login/Form';

export default class InitScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Logo />
        <Form
          type="Нэвтрэх"
          login={this.props.login}
          setlogIn={this.props.setlogIn}
          setLoadingTrue={this.props.setLoadingTrue}
        />
        
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
    marginBottom: '25%'
  },
  SignUpButton: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '500',
  },
});
