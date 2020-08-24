import React, {Component} from 'react';
import {
  AppRegistry,
  Text,
  SafeAreaView,
  ActivityIndicator,
  StyleSheet,
  View,
  TouchableOpacity,
  Modal,
  TextInput,
  AsyncStorage,
} from 'react-native';

import Form from '../components/login/Form';


const axios = require('axios');

  export class PhoneAuth extends Component{

    constructor(props) {
        super(props); 
      }
      componentDidMount() {}
      render() {
        return (
          <SafeAreaView style={styles.container} >
                
                <TextInput  
          placeholder="Enter Your Mobile Number"  
          underlineColorAndroid='transparent'  
          style={styles.TextInputStyle}  
          keyboardType={'numeric'}  
/>  


          </SafeAreaView>
        );
      }
  }
  


  const styles = StyleSheet.create({
    container: {
      backgroundColor: '#fff',
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    TextForm: {
      textAlign: 'center',
    },
    headerText: {  
      fontSize: 20,  
      textAlign: "center",  
      margin: 10,  
      fontWeight: "bold"  
  },  
  TextInputStyle: {  
      textAlign: 'center',  
      height: 50,  
      borderRadius: 10,  
      borderWidth: 2,  
      borderColor: '#009688',  
      marginBottom: 10  
  }  
    
  });

  export default PhoneAuth;
  