import React, {useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  AppRegistry,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
[]
import PhoneAuth from '../../screen/PhoneAuth';

const axios = require('axios');

const Form = props => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
 

  return (
   


    <View style={styles.container}>
       
      
      <TouchableOpacity
        style={styles.button}
        title="Form"
       
        >
        <Text style={styles.buttonText}>{props.type}</Text>
      </TouchableOpacity>
    </View>
  );
};



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
    borderRadius:5 ,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#0984e3',
    marginVertical: 10,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 45,
    width: 350,
    borderWidth: 0,
    borderColor: '#000000',
    backgroundColor: '#5100FF',
    borderRadius: 5,
    marginVertical: 10,
    paddingVertical: 12,
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 16,
    fontWeight: '500',
    color: '#ffffff',
    textAlign: 'center',
  },
});

export default Form;