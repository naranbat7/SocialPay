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
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const axios = require('axios');

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
  null,
  '0',
  'back',
];

const buttonBottomData = [
  null,
  'abc',
  'def',
  'ghi',
  'jkl',
  'mno',
  'pqrs',
  'tuv',
  'wxyz',
  null,
  null,
  null,
];

export class SocialPinConnect extends Component {
  constructor(props) {
    super(props);

    this.state = {
      code: '',
      modalVisible: false,
      isPinCorrect: null,
      token: null,
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
    if (this.state.code.length == 4)
      if (!this.state.modalVisible) {
        this.setState({modalVisible: true});
        console.log('Сервер рүү хүсэлт илгээлээ');
        axios
          .post(
            'http://192.168.205.168:8050/api/info/auth/pin/change',
            {pin: this.state.code},
            {
              headers: {
                Authorization: 'Bearer ' + this.state.token,
                'Content-Type': 'application/json',
              },
            },
          )
          .then(response => {
            this.setState({isPinCorrect: true, modalVisible: false, code: ''});
            console.log('Нууц үг амжилттай солилоо');
            try {
              AsyncStorage.setItem('isPin', 'true');
            } catch (error) {
              console.log(error);
            }
            console.log(response.data);
            this.props.then();
          })
          .catch(error => {
            this.setState({isPinCorrect: false, modalVisible: false, code: ''});
            console.log('Нууц үг амжилтгүй солилоо');
            console.log(error);
          });
      }
  }

  btnHandler = item => {
    if (item == 'back') {
      if (this.state.code.length > 0) {
        this.setState(prevState => ({
          code: prevState.code.substr(0, this.state.code.length - 1),
        }));
      }
    } else {
      if (this.state.code.length < 4) {
        this.setState(prevState => ({code: prevState.code.concat(item)}));
      }
    }
  };

  render() {
    return (
      <SafeAreaView style={css.container}>
        <View style={css.topContainer}>
          <Text style={css.title}>SocialPin</Text>
          <Text style={css.parag}>нууц үгээ холбоно уу</Text>
          <View style={css.circleContainer}>
            <View
              style={[
                css.circle,
                this.state.code.length > 0 && css.circleChecked,
              ]}
            />
            <View
              style={[
                css.circle,
                this.state.code.length > 1 && css.circleChecked,
              ]}
            />
            <View
              style={[
                css.circle,
                this.state.code.length > 2 && css.circleChecked,
              ]}
            />
            <View
              style={[
                css.circle,
                this.state.code.length > 3 && css.circleChecked,
              ]}
              
            />
          </View>
          {this.state.isPinCorrect ? (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 30,
              }}>
              <Icon
                name="check-circle"
                size={30}
                style={[css.check, {color: '#05c46b'}]}
              />
              <Text style={{color: '#05c46b', fontSize: 16, marginLeft: 10}}>
                Нууц үг амжилттай солилоо
              </Text>
            </View>
          ) : (
            this.state.isPinCorrect === false && (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 30,
                }}>
                <Icon
                  name="times-circle"
                  size={30}
                  style={[css.check, {color: '#ff5e57'}]}
                />
                <Text style={{color: '#ff5e57', fontSize: 16, marginLeft: 10}}>
                  Амжилтгүй боллоо, дахин оролдоно уу
                </Text>
              </View>
            )
          )}
        </View>
        <View style={css.bottomContainer}>
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
                    {buttonBottomData[idx] && (
                      <Text style={css.btnBottomText}>
                        {buttonBottomData[idx]}
                      </Text>
                    )}
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
        <Loader modalVisible={this.state.modalVisible} />
      </SafeAreaView>
    );
  }
}

const Loader = props => {
  return (
    <Modal visible={props.modalVisible} transparent={true}>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <View
          style={{
            width: 250,
            height: 120,
            backgroundColor: 'rgba(227,227,227,0.5)',
            borderRadius: 10,
            justifyContent: 'center',
          }}>
          <ActivityIndicator size={30} />
          <Text style={{textAlign: 'center', marginTop: 20}}>
            Уншиж байна, түр хүлээнэ үү
          </Text>
        </View>
      </View>
    </Modal>
  );
};

const css = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topContainer: {
    flex: 6,
    backgroundColor: '#74b9ff',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomContainer: {
    flex: 5,
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
    width: '32%',
    height: '24%',
    marginVertical: '0.4%',
    justifyContent: 'center',
    alignItems: 'center',
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
});

export default SocialPinConnect;
