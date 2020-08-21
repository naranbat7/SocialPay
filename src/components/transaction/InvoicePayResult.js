import React from 'react';
import {Text, View, TouchableOpacity, Modal} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const axios = require('axios');

const InvoicePayResult = props => {
  const invoiceCancel = () => {
    console.log(props.data);
    axios
      .post(
        'http://192.168.205.168:8050/api/transaction/invoice/reject',
        {
          id: props.data.id,
          invoiceNumber: props.data.invoiceNumber,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + props.token,
          },
        },
      )
      .then(response => {
        props.answerTrue();
      })
      .catch(err => {
        props.answerFalse();
        console.log(err);
      });
    props.deletePayResult();
  };

  const invoicePay = () => {
    console.log(props.data);
    axios
      .post(
        'http://192.168.205.168:8050/api/transaction/invoice/pay?language=mn',
        {
          id: props.data.id,
          invoiceNumber: props.data.invoiceNumber,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + props.token,
          },
        },
      )
      .then(response => {
        props.answerTrue();
      })
      .catch(err => {
        console.log('Invoice Pay Error');
        props.answerFalse();
        console.log(err);
      });
    props.deletePayResult();
  };

  return (
    <Modal visible={props.modalVisible} transparent={true}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
          width: '100%',
          backgroundColor: 'rgba(0,0,0,0.3)',
        }}>
        <View
          style={{
            width: 300,
            height: 420,
            backgroundColor: '#fff',
            borderRadius: 10,
            justifyContent: 'center',
          }}>
          <Text
            style={{
              fontSize: 18,
              color: '#2d88ff',
              textAlign: 'center',
              textTransform: 'uppercase',
              fontWeight: 'bold',
            }}>
            Нэхэмжлэл
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: 'rgba(0,0,0,0.5)',
              textAlign: 'center',
              marginTop: 7,
              marginBottom: 10,
            }}>
            {props.data.createdDate}
          </Text>
          <View
            style={{
              width: '100%',
              flexDirection: 'row-reverse',
              marginVertical: 15,
            }}>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontSize: 14,
                  color: '#1dd1a1',
                  textTransform: 'uppercase',
                }}>
                Нэхэмжлэгч
              </Text>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginVertical: 8,
                }}>
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: 'bold',
                    textTransform: 'uppercase',
                    color: 'rgba(0,0,0,0.5)',
                  }}>
                  Дугаар:{' '}
                </Text>
                <Text style={{fontSize: 18}}>{props.data.creditPhone}</Text>
              </View>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginVertical: 8,
                }}>
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: 'bold',
                    textTransform: 'uppercase',
                    color: 'rgba(0,0,0,0.5)',
                  }}>
                  Данс:{' '}
                </Text>
                <Text style={{fontSize: 18}}>{props.data.creditAccount}</Text>
              </View>
            </View>
            <View
              style={{
                width: 50,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Icon name="angle-double-right" size={30} color="#2d88ff" />
            </View>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontSize: 14,
                  color: '#ff6b6b',
                  textTransform: 'uppercase',
                }}>
                Төлбөр хийх
              </Text>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginVertical: 8,
                }}>
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: 'bold',
                    textTransform: 'uppercase',
                    color: 'rgba(0,0,0,0.5)',
                  }}>
                  Дугаар:{' '}
                </Text>
                <Text style={{fontSize: 18}}>{props.data.debitPhone}</Text>
              </View>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginVertical: 8,
                }}>
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: 'bold',
                    textTransform: 'uppercase',
                    color: 'rgba(0,0,0,0.5)',
                  }}>
                  Данс:{' '}
                </Text>
                <Text style={{fontSize: 18}}>{props.data.debitAccount}</Text>
              </View>
            </View>
          </View>
          <View>
            <Text
              style={{
                textAlign: 'center',
                marginVertical: 20,
                fontSize: 28,
                color: '#ff6b6b',
              }}>
              {props.data.amount.format()} ₮
            </Text>
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row-reverse',
              flexWrap: 'wrap',
            }}>
            <TouchableOpacity
              onPress={() => invoicePay()}
              style={{
                backgroundColor: '#1dd1a1',
                width: 100,
                borderRadius: 5,
                marginHorizontal: 10,
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  color: '#fff',
                  paddingVertical: 7,
                }}>
                ТӨЛӨХ
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => invoiceCancel()}
              style={{
                backgroundColor: '#ff6b6b',
                width: 100,
                borderRadius: 5,
                marginHorizontal: 10,
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  color: '#fff',
                  paddingVertical: 7,
                }}>
                ЦУЦЛАХ
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={props.closeResult}
              style={{
                backgroundColor: '#0abde3',
                width: 100,
                borderRadius: 5,
                marginHorizontal: 10,
                marginTop: 20,
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  color: '#fff',
                  paddingVertical: 7,
                }}>
                БУЦАХ
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default InvoicePayResult;
