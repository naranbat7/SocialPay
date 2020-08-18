import React, {Component} from 'react';
import {
  Dimensions,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';

const axios = require('axios');

export default class Form extends Component {
  render() {
    let width = Dimensions.get('window').width;
    let height = Dimensions.get('window').height;
    return (
      <View style={styles.container}>
        {/* <View style={styles.container1}>
          <TouchableOpacity style={styles.EntButton}>
            <Text style={styles.buttonText}> Нэвтрэх </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.EntButton}>
            <Text style={styles.buttonText}> Бүртгүүлэх </Text>
          </TouchableOpacity>
        </View> */}
        <TextInput
          style={styles.inputBox}
          underlineColorAndroid="rgba(0,0,0,0)"
          placeholder="Username"
          placeholderTextColor="#000000"
        />
        <TextInput
          style={styles.inputBox}
          underlineColorAndroid="rgba(0,0,0,0)"
          placeholder="Password"
          secureTextEntry={true}
          placeholderTextColor="#000000"
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            this.props.setLoadingTrue();
            axios
              .post(
                'http://192.168.205.168:8050/api/info/auth',
                {password: '86960036', username: 'user1144'},
                {
                  'Content-Type': 'application/json',
                },
              )
              .then(response => {
                console.log('Амжилттай нэвтэрлээ');
                console.log(response.data);
                this.props.setlogIn(response.data);
              })
              .catch(error => {
                console.log('Нэвтэрч чадсангүй');
                console.log(error);
              });
          }}>
          <Text style={styles.buttonText}>{this.props.type}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  EntButton: {
    height: 35,
    width: 130,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#000000',
    backgroundColor: '#ffffff',
    borderRadius: 25,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#0984e3',
    marginVertical: 10,
  },

  inputBox: {
    height: 45,
    width: 300,
    borderWidth: 2,
    borderColor: '#000000',
    backgroundColor: '#ffffff',
    borderRadius: 25,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#0984e3',
    marginVertical: 10,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 45,
    width: 150,
    borderWidth: 2,
    borderColor: '#000000',
    backgroundColor: '#ffffff',
    borderRadius: 25,
    marginVertical: 10,
    paddingVertical: 12,
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
    textAlign: 'center',
  },
});
