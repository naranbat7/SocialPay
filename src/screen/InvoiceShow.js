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
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import InvoiceResult from '../components/transaction/InvoiceResult';
import InvoicePayResult from '../components/transaction/InvoicePayResult';

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
      isPay: true,
      loading: true,
      invoices: [],
      sentInvoices: [],
      modalVisible: false,
      modalPayVisible: false,
      resultIndex: 0,
      resultData: {amount: 0},
      resultVisible: false,
      text: 'Амжилтгүй',
      color: '#ff6b6b',
    };
  }

  sendAxios = () => {
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
  };

  componentDidMount() {
    this.sendAxios();
  }

  answerWarn = () => {
    setTimeout(() => {
      this.setState({resultVisible: false});
    }, 1500);
  };

  answer = value => {
    let title = value ? 'Амжилттай' : 'Амжилтгүй';
    let col = value ? '#1dd1a1' : '#ff6b6b';
    this.setState({resultVisible: true, text: title, color: col});
    this.sendAxios();
    this.answerWarn();
  };

  showResult = value => [this.setState({modalVisible: value})];
  showPayResult = value => [this.setState({modalPayVisible: value})];

  changeIndex = value => {
    this.setState({modalVisible: true, resultData: value});
  };

  changePayIndex = value => {
    this.setState({modalPayVisible: true, resultData: value});
  };

  deleteResult = () => {
    this.showResult(false);
  };

  deletePayResult = () => {
    this.sendAxios();
    this.showPayResult(false);
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
              <PayList1
                data={this.state.invoices}
                modalVisible={this.state.modalPayVisible}
                closeResult={() => this.showPayResult(false)}
                openResult={() => this.showPayResult(true)}
                resultIndex={this.state.resultIndex}
                changeIndex={this.changePayIndex}
                resultData={this.state.resultData}
                token={this.props.token}
                deletePayResult={() => this.deletePayResult()}
                answerTrue={() => this.answer(true)}
                answerFalse={() => this.answer(false)}
              />
            ) : (
              <PayList2
                data={this.state.sentInvoices}
                modalVisible={this.state.modalVisible}
                closeResult={() => this.showResult(false)}
                openResult={() => this.showResult(true)}
                resultIndex={this.state.resultIndex}
                changeIndex={this.changeIndex}
                resultData={this.state.resultData}
                token={this.props.token}
                deleteResult={() => this.deleteResult()}
                answerTrue={() => this.answer(true)}
                answerFalse={() => this.answer(false)}
              />
            )}
          </View>
          <Result
            modalVisible={this.state.resultVisible}
            color={this.state.color}
            text={this.state.text}
          />
        </View>
      </SafeAreaView>
    );
  }
}

const PayList1 = props => {
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
      <InvoicePayResult
        modalVisible={props.modalVisible}
        closeResult={props.closeResult}
        data={props.resultData}
        resultIndex={props.resultIndex}
        token={props.token}
        deletePayResult={props.deletePayResult}
        answerTrue={props.answerTrue}
        answerFalse={props.answerFalse}
      />
    </ScrollView>
  );
};

const PayList2 = props => {
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
      <InvoiceResult
        modalVisible={props.modalVisible}
        closeResult={props.closeResult}
        data={props.resultData}
        resultIndex={props.resultIndex}
        token={props.token}
        deleteResult={props.deleteResult}
        answerTrue={props.answerTrue}
        answerFalse={props.answerFalse}
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
            width: 200,
            height: 70,
            backgroundColor: '#fff',
            borderRadius: 10,
            marginBottom: 300,
            justifyContent: 'center',
          }}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 18,
              color: props.color && props.color,
            }}>
            {props.text && props.text}
          </Text>
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
    height: '87%',
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
