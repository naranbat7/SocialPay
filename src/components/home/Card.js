import React, {useState} from 'react';
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
} from 'react-native';
import SocialPinChecker from '../../screen/SocialPinChecker';
import GlobalStyle from '../../constants/GlobalStyle';

const axios = require('axios');

const Card = props => {
  const [isPinCheck, setPinCheck] = useState(false);
  const [isMoneyCheck, setMoneyCheck] = useState(false);
  const [money, setMoney] = useState('');

  const showMoney = () => {
    axios
      .get('http://192.168.205.168:8050/api/info/account/balance', {
        headers: {
          Authorization: 'Bearer ' + props.token,
          'Content-Type': 'application/json',
        },
      })
      .then(response => {
        setMoney(response.data.balance);
        console.log(response.data.balance);
      })
      .catch(error => {
        console.log(error);
      });
    setPinCheck(false);
    setMoneyCheck(true);
  };

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
        {props.isMainAccount && (
          <TouchableOpacity
            onPress={() => setPinCheck(true)}
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
        )}
      </ImageBackground>
      <Modal visible={isPinCheck}>
        <SocialPinChecker ifCorrect={() => showMoney()} />
      </Modal>
      <ShowMoney
        isMoneyCheck={isMoneyCheck}
        account={props.cardNumber}
        closeModal={() => setMoneyCheck(false)}
        money={money}
      />
    </View>
  );
};

const ShowMoney = props => {
  return (
    <Modal visible={props.isMoneyCheck} transparent={true}>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
        }}>
        <View style={{backgroundColor: '#fff', padding: 20}}>
          <View style={{marginHorizontal: 10}}>
            <Text style={{fontSize: 16}}>
              Таны <Text style={{color: '#66b00b'}}>{props.account}</Text>{' '}
              дугаартай дансны
            </Text>
            <Text style={{fontSize: 16}}>
              Үлдэгдэл:{' '}
              {props.money ? (
                <Text style={{color: '#66b00b'}}>
                  {parseFloat(props.money)
                    .toFixed(2)
                    .replace(/\d(?=(\d{3})+\.)/g, '$&,')}{' '}
                  ₮
                </Text>
              ) : (
                <ActivityIndicator />
              )}
            </Text>
          </View>
          <TouchableOpacity
            style={{marginLeft: 240}}
            onPress={props.closeModal}>
            <Text style={{padding: 20, fontSize: 16}}>Хаах</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export {Card};
