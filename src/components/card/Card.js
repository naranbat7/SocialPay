import React from 'react';
import {Animated, Dimensions, View, Text, ImageBackground} from 'react-native';
import GlobalStyle from '../../constants/GlobalStyle';

const width = Dimensions.get('window').width;
let imgLink;

const Card = props => {
  if (props.index % 3 == 2) {
    imgLink = require('../../../assets/images/card-front.png');
  } else if (props.index % 3 == 1) {
    imgLink = require('../../../assets/images/card-green.png');
  } else {
    imgLink = require('../../../assets/images/card-blue.jpg');
  }
  return (
    <Animated.View
      style={[{height: (width * 180) / 300, width: width}, props.style]}>
      <ImageBackground
        style={{
          flex: 1,
          resizeMode: 'cover',
          padding: 25,
        }}
        borderRadius={15}
        source={props.img ? props.img : imgLink}>
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
            alignItems: 'center',
            justifyContent: 'center',
            top: 40,
          }}>
          <Text
            style={[
              GlobalStyle.fontRegular,
              {fontSize: 34, color: '#fff', letterSpacing: 2},
            ]}>
            {props.cardNumber.length == 10
              ? props.cardNumber.slice(0, 3) +
                ' **** ' +
                props.cardNumber.slice(7, 10)
              : props.cardNumber}
          </Text>
        </View>
      </ImageBackground>
    </Animated.View>
  );
};

export {Card};
