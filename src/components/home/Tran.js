<<<<<<< HEAD
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import GlobalStyle from '../../constants/GlobalStyle';

const Tran = props => {
  return (
    <View {...props} style={Styles.container}>
      <Text>{props.date}</Text>
      <Text
        style={[
          Styles.amount,
          parseInt(props.amount) > 0 ? Styles.amountPlus : Styles.amountMinus,
        ]}>
        {props.amount}
      </Text>
      <Text>{props.description}</Text>
    </View>
  );
};

const Styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    padding: 10,
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.8,
    shadowRadius: 30,
    elevation: 5,
    borderRadius: 5,
    borderColor: 'rgba(0,0,0,0.2)',
    borderWidth: 0.5,
    marginVertical: 5,
  },
  amount: {
    position: 'absolute',
    right: 20,
    top: 5,
  },
  amountPlus: {
    color: '#27ae60',
  },
  amountMinus: {
    color: '#BB0000',
  },
});

export {Tran};
=======
import React from "react";
import { View, Text, StyleSheet } from 'react-native';
import GlobalStyle from "../../constants/GlobalStyle";

const Tran = props => {
    return (
       <View style={Styles.container}>
           <Text>{props.date}</Text>
           <Text style={[Styles.amount,parseInt(props.amount) > 0 ? Styles.amountPlus : Styles.amountMinus]}>{props.amount}</Text>
           <Text>{props.description}</Text>
       </View>
    );
};

const Styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFF',
        padding: 10,
        shadowColor: '#000000',
        shadowOffset: {width: 0, height: 0},
        shadowOpacity: 0.8,
        shadowRadius: 30,
        elevation: 5,
        borderRadius: 5,
        borderColor: 'rgba(0,0,0,0.2)',
        borderWidth: 0.5,
        marginVertical: 5,
    },
    amount: {
        position: 'absolute',
        right: 20,
        top: 5
    },
    amountPlus: {
        color: '#27ae60'
    },
    amountMinus: {
        color: '#BB0000'
    }
});

export { Tran };
>>>>>>> 236c4a4eb6ad2d3a71190f4fe99cf8452f30b867
