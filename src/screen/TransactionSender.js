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
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const axios = require('axios');

export class TransactionSender extends Component {
  constructor(props) {
    super(props);

    this.state = {
      code: '',
      modalVisible: false,
      isPinCorrect: null,
      token: null,
      tel: null,
      remark: null,
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

  componentDidUpdate() {}

  animationWarn() {
    setTimeout(() => {
      this.setState({successVisible: false, errorVisible: false});
    }, 1500);
  }

  sendInvoice = props => {
    props.setLoading();
    axios
      .post(
        'http://192.168.205.168:8050/api/transaction',
        {
          amount: props.money,
          phone: this.state.tel,
          remarks: this.state.remark,
        },
        {
          headers: {
            Authorization: 'Bearer ' + this.state.token,
            'Content-Type': 'application/json',
          },
        },
      )
      .then(response => {
        props.answerTrue();
        console.log('Амжилттай гүйлгээ хийлээ');
      })
      .catch(error => {
        props.answerFalse();
        console.log('Гүйлгээ хийхэд алдаа гарлаа');
        console.log(error);
      });
    props.showModal();
  };

  render() {
    return (
      <SafeAreaView style={css.container}>
        <View style={css.topContainer}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 20,
            }}>
            <Icon name="angle-double-down" size={20} color="#2d88ff" />
            <Text
              style={{
                textTransform: 'uppercase',
                color: '#2d88ff',
                fontWeight: 'bold',
                textAlign: 'center',
                fontSize: 18,
                marginHorizontal: 20,
              }}>
              Гүйлгээ хийх
            </Text>
            <Icon name="angle-double-down" size={20} color="#2d88ff" />
          </View>
          <Text
            style={{
              fontSize: 16,
              marginLeft: 20,
              marginVertical: 10,
            }}>
            Утасны дугаар
          </Text>
          <View
            style={{
              flexDirection: 'row',
              marginHorizontal: 20,
              alignItems: 'center',
            }}>
            <Icon name="phone" size={18} color="#2d88ff" />
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: '#2d88ff',
                marginLeft: 15,
                width: 250,
                height: 40,
                borderRadius: 5,
              }}
              value={this.state.tel}
              keyboardType="numeric"
              onChangeText={value => this.setState({tel: value})}
            />
          </View>
          <Text
            style={{
              fontSize: 16,
              marginLeft: 20,
              marginVertical: 10,
            }}>
            Гүйлгээний утга
          </Text>
          <View
            style={{
              flexDirection: 'row',
              marginHorizontal: 20,
              alignItems: 'center',
            }}>
            <Icon name="paper-plane" size={18} color="#2d88ff" />
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: '#2d88ff',
                marginLeft: 15,
                width: 250,
                height: 40,
                borderRadius: 5,
              }}
              value={this.state.remark}
              onChangeText={value => this.setState({remark: value})}
            />
          </View>
          <View style={{marginHorizontal: 15, marginVertical: 20}}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 'bold',
                marginLeft: 15,
                marginTop: 30,
                marginBottom: 10,
              }}>
              Таны хадгалсан загварууд
            </Text>
            <TouchableOpacity
              onPress={() =>
                this.setState({tel: '89094948', remark: 'Амжилттай'})
              }
              style={{
                borderWidth: 1,
                borderColor: '#2d88ff',
                borderRadius: 10,
                marginVertical: 10,
                paddingHorizontal: 10,
                paddingVertical: 5,
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={css.textB}>Дугаар: </Text>
                <Text>89094948</Text>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={css.textB}>Гүйлгээний утга: </Text>
                <Text>Амжилттай</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                this.setState({tel: '95258389', remark: 'Дууслаа'})
              }
              style={{
                borderWidth: 1,
                borderColor: '#2d88ff',
                borderRadius: 10,
                paddingHorizontal: 10,
                paddingVertical: 5,
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={css.textB}>Дугаар: </Text>
                <Text>95258389</Text>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={css.textB}>Гүйлгээний утга: </Text>
                <Text>Дууслаа</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              marginVertical: 50,
            }}>
            <TouchableOpacity
              onPress={() => this.props.showModal()}
              style={{
                borderColor: '#fff',
                backgroundColor: '#ff6b6b',
                borderWidth: 1,
                marginTop: 30,
                width: '40%',
                borderRadius: 10,
              }}>
              <Text
                style={{
                  color: '#fff',
                  textAlign: 'center',
                  fontSize: 16,
                  padding: 10,
                }}>
                Хаах
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.sendInvoice(this.props)}
              style={{
                borderColor: '#fff',
                backgroundColor: '#1dd1a1',
                borderWidth: 1,
                marginTop: 30,
                width: '40%',
                borderRadius: 10,
              }}>
              <Text
                style={{
                  color: '#fff',
                  textAlign: 'center',
                  fontSize: 16,
                  padding: 10,
                }}>
                Илгээх
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const css = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topContainer: {
    flex: 6,
    backgroundColor: '#fff',
    width: '100%',
  },
  textB: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  textDes: {
    fontSize: 16,
  },
});

export default TransactionSender;
