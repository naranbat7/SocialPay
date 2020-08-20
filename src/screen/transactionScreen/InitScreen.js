import React, {Component} from 'react';
import {
  Text,
  SafeAreaView,
  ActivityIndicator,
  StyleSheet,
  View,
  TouchableOpacity,
  Modal,
  AsyncStorage,
  Animated,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import InvoiceSender from '../InvoiceSender';
import TransactionSender from '../TransactionSender';
import InvoiceShow from '../InvoiceShow';

const buttonData = [
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '000',
  '0',
  'back',
];

Number.prototype.format = function(n, x) {
  var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\.' : '$') + ')';
  return this.toFixed(Math.max(0, ~~n)).replace(new RegExp(re, 'g'), '$&,');
};

export class InitScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      money: 0,
      transactionVisible: false,
      invoiceVisible: false,
      showInvoiceList: true,
      isPinCorrect: null,
      token: null,
      transY: new Animated.Value(0),
      loaderVisible: false,
      resultVisible: false,
      text: 'Амжилтгүй',
      color: '#ff6b6b',
      loading: false,
    };
  }

  componentDidMount() {
    AsyncStorage.getItem('information', (errs, result) => {
      if (!errs) {
        if (result !== null) {
          let data = JSON.parse(result);
          this.setState({token: data.token});
        } else console.log('result is null');
      } else console.log('errs');
    });
  }

  componentDidUpdate() {
    this.runAnimation1();
  }

  runAnimation1() {
    Animated.timing(this.state.transY, {
      toValue: -10,
      delay: 5000,
      duration: 200,
      useNativeDriver: true,
    }).start(() => this.runAnimation2());
  }

  runAnimation2() {
    Animated.timing(this.state.transY, {
      toValue: 10,
      duration: 200,
      useNativeDriver: true,
    }).start(() => this.runAnimation3());
  }

  runAnimation3() {
    Animated.timing(this.state.transY, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => this.runAnimation1());
  }

  animationWarn() {
    setTimeout(() => {
      this.setState({loaderVisible: false});
    }, 1500);
  }

  showTransaction = value => {
    if (value) {
      if (this.state.money < 100) {
        this.setState({loaderVisible: true});
        this.animationWarn();
      } else this.setState({transactionVisible: value});
    } else {
      this.setState({transactionVisible: value});
    }
  };

  showInvoiceList = value => {
    this.setState({showInvoiceList: value});
  };

  showInvoice = value => {
    if (value) {
      if (this.state.money < 100) {
        this.setState({loaderVisible: true});
        this.animationWarn();
      } else this.setState({invoiceVisible: value});
    } else {
      this.setState({invoiceVisible: value});
    }
  };

  btnHandler = item => {
    if (item == 'back') {
      if (this.state.money > 0) {
        this.setState(prevState => ({
          money: parseInt(prevState.money / 10),
        }));
      }
    } else if (item == '000') {
      if (this.state.money < 10000) {
        this.setState(prevState => ({
          money: prevState.money * 1000,
        }));
      } else if (this.state.money < 100000) {
        this.setState(prevState => ({
          money: prevState.money * 100,
        }));
      } else if (this.state.money < 1000000) {
        this.setState(prevState => ({
          money: prevState.money * 10,
        }));
      }
    } else {
      if (this.state.money < 1000000) {
        this.setState(prevState => ({
          money: prevState.money * 10 + parseInt(item),
        }));
      }
    }
  };

  answerWarn() {
    setTimeout(() => {
      this.setState({resultVisible: false});
    }, 1500);
  }

  answer = value => {
    this.setLoading(false);
    let title = value ? 'Амжилттай' : 'Амжилтгүй';
    let col = value ? '#1dd1a1' : '#ff6b6b';
    this.setState({resultVisible: true, text: title, color: col});
    this.answerWarn();
  };

  setLoading = value => {
    this.setState({loading: value});
  };

  render() {
    return (
      <SafeAreaView style={css.container}>
        <View style={css.topContainer}>
          <TouchableOpacity
            onPress={() => this.showInvoiceList(true)}
            style={[
              top.modalTransaction,
              {transform: [{translateX: this.state.transY}]},
            ]}>
            <Text style={top.modalTxt}>Нэхэмжлэлүүд харах</Text>
          </TouchableOpacity>
          <View style={top.moneyContainer}>
            <Text style={top.moneyTxt}>
              {this.state.money.format()}
              <Text style={top.moneyTxtSign}> ₮</Text>
            </Text>
          </View>
        </View>
        <View style={css.midContainer}>
          {buttonData.map((item, idx) => {
            return item ? (
              <TouchableOpacity
                style={css.btn}
                key={idx}
                onPress={() => this.btnHandler(item)}>
                {item == 'back' ? (
                  <Icon name="backspace" style={css.icon} size={20} />
                ) : (
                  <View style={css.btnContainer}>
                    <Text style={css.btnText}>{item}</Text>
                  </View>
                )}
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={css.btn} key={idx} activeOpacity={1}>
                <Text style={css.btnText}> </Text>
              </TouchableOpacity>
            );
          })}
        </View>
        <View style={css.bottomContainer}>
          <TouchableOpacity
            onPress={() => this.showInvoice(true)}
            style={[
              css.bottomBtn,
              {
                borderBottomRightRadius: 10,
                borderTopRightRadius: 10,
                backgroundColor: '#ff6b6b',
              },
            ]}>
            <Text style={css.bottomTxt}>Нэхэмжлэх</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.showTransaction(true)}
            style={[
              css.bottomBtn,
              {
                borderBottomLeftRadius: 10,
                borderTopLeftRadius: 10,
                backgroundColor: '#1dd1a1',
              },
            ]}>
            <Text style={css.bottomTxt}>Гүйлгээ хийх</Text>
          </TouchableOpacity>
        </View>
        <Loader modalVisible={this.state.loaderVisible} />
        <ChangeScreenShowInvoice
          modalVisible={this.state.showInvoiceList}
          showModal={() => this.showInvoiceList(false)}
          token={this.state.token}
        />
        <ChangeScreenTransaction
          modalVisible={this.state.transactionVisible}
          showModal={() => this.showTransaction(false)}
          money={this.state.money}
          answerTrue={() => this.answer(true)}
          answerFalse={() => this.answer(false)}
          setLoading={() => this.setLoading(true)}
        />
        <ChangeScreenInvoice
          modalVisible={this.state.invoiceVisible}
          showModal={() => this.showInvoice(false)}
          money={this.state.money}
          answerTrue={() => this.answer(true)}
          answerFalse={() => this.answer(false)}
          setLoading={() => this.setLoading(true)}
        />
        <Result
          modalVisible={this.state.resultVisible}
          color={this.state.color}
          text={this.state.text}
        />
        <Loading modalVisible={this.state.loading} />
      </SafeAreaView>
    );
  }
}

const ChangeScreenShowInvoice = props => {
  return (
    <Modal visible={props.modalVisible} transparent={true}>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <View style={{flex: 1, width: '100%'}}>
          <InvoiceShow showModal={props.showModal} token={props.token}/>
        </View>
      </View>
    </Modal>
  );
};

const ChangeScreenTransaction = props => {
  return (
    <Modal visible={props.modalVisible} transparent={true}>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <View style={{flex: 1, width: '100%'}}>
          <TransactionSender
            showModal={props.showModal}
            money={props.money}
            answerFalse={props.answerFalse}
            answerTrue={props.answerTrue}
            setLoading={props.setLoading}
          />
        </View>
      </View>
    </Modal>
  );
};

const ChangeScreenInvoice = props => {
  return (
    <Modal visible={props.modalVisible} transparent={true}>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <View style={{flex: 1, width: '100%'}}>
          <InvoiceSender
            showModal={props.showModal}
            money={props.money}
            answerFalse={props.answerFalse}
            answerTrue={props.answerTrue}
            setLoading={props.setLoading}
          />
        </View>
      </View>
    </Modal>
  );
};

const Loader = props => {
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
            height: 100,
            backgroundColor: '#fff',
            borderRadius: 10,
            marginBottom: 300,
            justifyContent: 'center',
          }}>
          <Text style={{textAlign: 'center', marginTop: 20, fontSize: 18}}>
            Үнийн дүн хамгийн багадаа 100₮ байна.
          </Text>
        </View>
      </View>
    </Modal>
  );
};

const Loading = props => {
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
            height: 100,
            backgroundColor: '#fff',
            borderRadius: 10,
            marginBottom: 300,
            justifyContent: 'center',
          }}>
          <Text style={{textAlign: 'center', marginTop: 20, fontSize: 18}}>
            Уншиж байна, түр хүлээнэ үү
          </Text>
          <ActivityIndicator size={25} />
        </View>
      </View>
    </Modal>
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

const top = StyleSheet.create({
  moneyContainer: {
    marginTop: 50,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.2)',
    width: 250,
    justifyContent: 'center',
    alignItems: 'center',
  },
  moneyTxt: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#74b9ff',
  },
  moneyTxtSign: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#74b9ff',
  },
  modalTransaction: {
    position: 'absolute',
    top: 10,
    backgroundColor: '#74b9ff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  modalTxt: {
    fontSize: 14,
    color: '#fff',
  },
});

const css = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topContainer: {
    flex: 2,
    backgroundColor: '#fff',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  midContainer: {
    flex: 3,
    backgroundColor: '#fff',
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bottomContainer: {
    height: 50,
    backgroundColor: '#fff',
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  circleContainer: {
    marginTop: 100,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  circle: {
    borderWidth: 1.3,
    borderColor: '#fff',
    height: 15,
    width: 15,
    borderRadius: 50,
    marginHorizontal: 10,
  },
  circleChecked: {
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 18,
    color: '#fff',
    textTransform: 'uppercase',
    marginBottom: 3,
  },
  parag: {
    fontSize: 16,
    color: '#f0f0f0',
  },
  btn: {
    width: '33%',
    height: '23.8%',
    marginVertical: '0.4%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 1,
  },
  btnText: {
    fontSize: 22,
    fontFamily: 'Rubik-Regular',
  },
  icon: {
    color: '#5c5c5c',
  },
  btnContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnBottomText: {
    color: '#5c5c5c',
    fontSize: 12,
    fontFamily: 'Rubik-Regular',
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  check: {
    color: '#0be881',
  },
  bottomBtn: {
    height: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomTxt: {
    fontSize: 15,
    color: '#fff',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});

export default InitScreen;
