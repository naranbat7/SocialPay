import React from 'react';
import {Dimensions, View, Text, ImageBackground} from 'react-native';
import GlobalStyle from '../../constants/GlobalStyle';

const Card = props => {
  return (
    <View
      {...props}
      style={{
        height: 188,
        width: 300,
      }}>
      <ImageBackground
        style={{
          flex: 1,
          resizeMode: 'cover',
          padding: 25,
        }}
        borderRadius={25}
        source={props.img}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          {/* <Text style={[GlobalStyle.fontRegular, { fontSize: 24, color: '#fff' }]}>Карт</Text> */}
          <View
            style={{
              paddingLeft: 5,
              paddingRight: 5,
              borderRadius: 10,
              borderWidth: 0,
              borderColor: '#fff',
            }}
          />
          <Text
            style={[GlobalStyle.fontRegular, {fontSize: 30, color: '#fff'}]}>
            {props.cardType}
          </Text>
        </View>
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            padding: 25,
          }}>
          <Text
            style={[GlobalStyle.fontRegular, {fontSize: 14, color: '#fff'}]}>
            {props.cardNumber}
          </Text>
          {props.amount ? (
            <Text
              style={[GlobalStyle.fontRegular, {fontSize: 22, color: '#fff'}]}>
              {props.amount} ₮
            </Text>
          ) : null}
        </View>
      </ImageBackground>
    </View>
  );
};

export {Card};
