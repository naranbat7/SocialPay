import React from 'react';
import {
  Dimensions,
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Alert,
} from 'react-native';
import GlobalStyle from '../../constants/GlobalStyle';

const Card = props => {
  let imgLink;
  if (props.index % 3 == 0) {
    imgLink = require('../../../assets/images/card-front.png');
  } else if (props.index % 3 == 1) {
    imgLink = require('../../../assets/images/card-green.png');
  } else {
    imgLink = require('../../../assets/images/card-blue.jpg');
  }
  return (
    <View
      style={[
        {
          height: 163,
          width: 260,
        },
        props.style,
      ]}>
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
            // position: 'absolute',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={[
              GlobalStyle.fontRegular,
              {fontSize: 24, color: '#fff', letterSpacing: 2},
            ]}>
            {props.cardNumber.slice(0, 3)} **** {props.cardNumber.slice(7, 10)}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => console.log('500₮ хха')}
          style={{
            marginTop: 25,
            right: 10,
            borderColor: '#fff',
            borderWidth: 1,
            width: 120,
            borderRadius: 5,
          }}>
          <Text
            style={{
              fontSize: 10,
              color: '#fff',
              textTransform: 'uppercase',
              paddingVertical: 7,
              textAlign: 'center',
            }}>
            Үлдэгдэл шалгах
          </Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

export {Card};
