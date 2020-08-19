import React, {useState} from 'react';
import {
  Dimensions,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';

const axios = require('axios');

const Form = props => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.inputBox}
        underlineColorAndroid="rgba(0,0,0,0)"
        placeholder="Username"
        placeholderTextColor="#000000"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.inputBox}
        underlineColorAndroid="rgba(0,0,0,0)"
        placeholder="Password"
        secureTextEntry={true}
        placeholderTextColor="#000000"
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          props.setLoadingTrue();
          axios
            .post(
              'http://192.168.205.168:8050/api/info/auth',
              {password: `${password}`, username: `${username}`},
              {
                'Content-Type': 'application/json',
              },
            )
            .then(response => {
              console.log('Амжилттай нэвтэрлээ');
              console.log(response.data);
              props.setlogIn(response.data);
            })
            .catch(error => {
              console.log('Нэвтэрч чадсангүй');
              props.setlogIn('error');
              console.log(error);
            });
        }}>
        <Text style={styles.buttonText}>{props.type}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Form;

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
