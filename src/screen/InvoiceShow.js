import React, {Component} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  Modal,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {ScrollView} from 'react-native-gesture-handler';

const axios = require('axios');

const {width, height} = Dimensions.get('window');

Number.prototype.format = function(n, x) {
  var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\.' : '$') + ')';
  return this.toFixed(Math.max(0, ~~n)).replace(new RegExp(re, 'g'), '$&,');
};

export class InvoiceShow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPay: false,
      loading: true,
      invoices: [],
      sentInvoices: [],
      modalVisible: false,
      resultIndex: 0,
      resultData: {amount: 0},
    };
  }

  componentDidMount() {
    console.log(this.props.token);
    axios
      .get('http://192.168.205.168:8050/api/transaction/invoice', {
        headers: {
          Authorization: 'Bearer ' + this.props.token,
        },
      })
      .then(response => {
        console.log('Success');
        console.log(response.data);
        this.setState({
          invoices: response.data.invoices,
          sentInvoices: response.data.sentInvoices,
        });
      })
      .catch(err => {
        console.log(err);
      });
    this.setState({loading: false});
  }

  showResult = value => [this.setState({modalVisible: value})];

  changeIndex = value => {
    this.setState({modalVisible: true, resultData: value});
  };

  render() {
    return (
      <SafeAreaView style={css.container}>
        <View style={css.header}>
          <TouchableOpacity
            onPress={() => this.props.showModal()}
            style={{left: 0, paddingHorizontal: 15, position: 'absolute'}}>
            <Icon name="angle-left" size={30} color="#2d88ff" />
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 16,
              textTransform: 'uppercase',
              color: '#2d88ff',
            }}>
            Нэхэмжлэлийн жагсаалт
          </Text>
        </View>
        <View style={css.body}>
          <View style={css.bodyHeader}>
            <TouchableOpacity
              onPress={() => this.setState({isPay: true})}
              style={[css.tag, this.state.isPay && css.selectedTag]}>
              <Text
                style={[css.tagText, this.state.isPay && css.selectedTagText]}>
                Төлөх
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.setState({isPay: false})}
              style={[css.tag, this.state.isPay == false && css.selectedTag]}>
              <Text
                style={[
                  css.tagText,
                  this.state.isPay == false && css.selectedTagText,
                ]}>
                Илгээсэн
              </Text>
            </TouchableOpacity>
          </View>
          <View style={css.content}>
            {this.state.loading ? (
              <ActivityIndicator />
            ) : this.state.isPay ? (
              <PayList
                data={this.state.invoices}
                modalVisible={this.state.modalVisible}
                showResult={() => this.showResult(false)}
                openResult={() => this.showResult(true)}
                resultIndex={this.state.resultIndex}
                changeIndex={this.changeIndex}
                resultData={this.state.resultData}
              />
            ) : (
              <PayList
                data={this.state.sentInvoices}
                modalVisible={this.state.modalVisible}
                closeResult={() => this.showResult(false)}
                openResult={() => this.showResult(true)}
                resultIndex={this.state.resultIndex}
                changeIndex={this.changeIndex}
                resultData={this.state.resultData}
              />
            )}
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const PayList = props => {
  return (
    <ScrollView>
      {props.data.length > 0 ? (
        props.data.map((item, idx) => {
          return (
            <TouchableOpacity
              key={idx}
              style={css.invoiceList}
              onPress={() => props.changeIndex(item)}>
              <View style={css.invoiceListContent}>
                <Text style={{fontSize: 12, color: 'rgba(0,0,0,0.5)'}}>
                  {item.createdDate}
                </Text>
                <Text style={{fontSize: 14, marginTop: 5}}>
                  {item.debitPhone}
                </Text>
              </View>
              <View style={css.amountContainer}>
                <Text style={css.amount}>{item.amount.format()} ₮</Text>
              </View>
              <Icon
                name="angle-right"
                size={20}
                color="rgba(45, 136, 255, 0.7)"
              />
            </TouchableOpacity>
          );
        })
      ) : (
        <Text style={{marginTop: 10, textAlign: 'center'}}>
          Өгөгдөл хоосон байна
        </Text>
      )}
      <Result
        modalVisible={props.modalVisible}
        closeResult={props.closeResult}
        data={props.resultData}
        resultIndex={props.resultIndex}
      />
    </ScrollView>
  );
};

const Result = props => {
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
            height: 400,
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
              marginBottom: 15,
            }}>
            {props.data.createdDate}
          </Text>
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              marginVertical: 20,
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
              <Icon name="angle-double-left" size={30} color="#2d88ff" />
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
                fontSize: 24,
                color: '#ff6b6b',
              }}>
              {props.data.amount.format()} ₮
            </Text>
          </View>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <TouchableOpacity
              onPress={props.closeResult}
              style={{
                backgroundColor: '#0abde3',
                width: 100,
                borderRadius: 5,
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

const css = StyleSheet.create({
  container: {
    height: height,
    width: width,
    backgroundColor: '#fff',
  },
  header: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomColor: 'rgba(0,0,0,0.5)',
    borderBottomWidth: 0.3,
  },
  body: {
    flex: 1,
  },
  bodyHeader: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  tag: {
    marginHorizontal: 20,
    paddingVertical: 7,
    paddingHorizontal: 15,
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: 'rgba(0,0,0,0.5)',
    backgroundColor: '#fff',
    zIndex: 5,
  },
  selectedTag: {
    borderColor: '#2d88ff',
    color: '#fff',
    transform: [{translateY: 9}],
    borderBottomWidth: 0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  tagText: {
    fontSize: 14,
  },
  selectedTagText: {
    color: '#2d88ff',
  },
  content: {
    borderColor: '#2d88ff',
    borderWidth: 0.5,
    borderRadius: 10,
    marginHorizontal: 10,
    flex: 1,
  },
  invoiceList: {
    borderBottomWidth: 0.3,
    borderBottomColor: 'rgba(0,0,0,0.5)',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  invoiceListContent: {
    width: '60%',
    paddingHorizontal: 20,
  },
  amount: {
    fontSize: 16,
    color: '#1dd1a1',
  },
  amountContainer: {
    width: '30%',
    paddingHorizontal: 10,
  },
});

export default InvoiceShow;
