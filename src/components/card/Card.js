import React from 'react';
import {Animated, Dimensions, View, Text, ImageBackground} from 'react-native';
import GlobalStyle from '../../constants/GlobalStyle';

const width = Dimensions.get('window').width;

const Card = props => {
  return (
    <Animated.View
      style={[{height: (width * 180) / 300, width: width}, props.style]}>
      <ImageBackground
        style={{
          flex: 1,
          resizeMode: 'cover',
          padding: 25,
        }}
        borderRadius={props.borderRadius}
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
    </Animated.View>
  );
};

export {Card};
