import React, {Component} from 'react';
import {
  StyleSheet,
  Animated,
  Modal,
  TouchableOpacity,
  Text,
  View,
  Alert,
  AsyncStorage,
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome5';

const axios = require('axios');

const s = StyleSheet.create({
  switch: {
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  container: {
    backgroundColor: '#F5F5F5',
  },
  label: {
    color: 'black',
    fontSize: 12,
  },
  input: {
    fontSize: 16,
    color: 'black',
  },
  check: {
    color: '#00C23A',
    marginRight: 20,
  },
});

export default class CardAdd extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalOpacity: new Animated.Value(0),
      selectedAccount: null,
      token: null,
    };
  }

  // * Modal toggle animation function

  async componentDidMount() {
    AsyncStorage.getItem('information', (errs, result) => {
      if (!errs) {
        if (result !== null) {
          let data = JSON.parse(result);
          this.setState({token: data.token});
        } else console.log('result is null');
      } else console.log('errs');
    });
  }

  showModal = value => {
    Animated.timing(this.state.modalOpacity, {
      toValue: value ? 1 : 0,
      duration: 400,
      useNativeDriver: true,
    }).start();
  };

  render() {
    // * Modal toggle condition depends on Parent button effect
    if (this.props.visible == true) {
      this.showModal(true);
    } else {
      this.showModal(false);
    }
    return (
      <Modal visible={this.props.visible} transparent={true}>
        <View
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0,0,0,.5)',
          }}>
          <Animated.View
            style={[
              s.container,
              {
                opacity: this.state.modalOpacity,
                borderRadius: 10,
                width: '80%',
                height: '60%',
                marginLeft: '10%',
                marginTop: '30%',
                shadowColor: '#000000',
                shadowOffset: {width: 0, height: 0},
                shadowOpacity: 0.8,
                shadowRadius: 30,
                elevation: 5,
              },
            ]}>
            <View style={{flex: 1, paddingVertical: 20}}>
              <Text
                style={{
                  fontSize: 16,
                  textAlign: 'center',
                  marginBottom: 20,
                  textTransform: 'uppercase',
                }}>
                Холбох боломжтой данс:
              </Text>
              {this.props.accounts &&
                this.props.accounts.map((item, idx) => {
                  return (
                    <TouchableOpacity
                      key={idx}
                      activeOpacity={0.5}
                      style={{
                        marginVertical: 7,
                        borderBottomWidth: 0.5,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}
                      onPress={() => this.setState({selectedAccount: item})}>
                      <Text
                        style={{
                          fontSize: 16,
                          marginHorizontal: 20,
                          marginVertical: 5,
                        }}>
                        {idx + 1}. {item}
                      </Text>
                      {this.state.selectedAccount == item && (
                        <Icon
                          name="check-circle"
                          solid
                          size={15}
                          style={s.check}
                        />
                      )}
                    </TouchableOpacity>
                  );
                })}
            </View>
            <View
              style={{
                width: '100%',
                height: 150,
                alignItems: 'center',
              }}>
              {this.state.selectedAccount && (
                <TouchableOpacity
                  style={{
                    backgroundColor: '#2ecc71',
                    marginBottom: 10,
                    width: 200,
                    borderRadius: 5,
                  }}
                  onPress={() => {
                    axios
                      .post(
                        'http://192.168.205.168:8050/api/info/account/link',
                        {account: this.state.selectedAccount},
                        {
                          headers: {
                            Authorization: 'Bearer ' + this.state.token,
                            'Content-Type': 'application/json',
                          },
                        },
                      )
                      .then(response => {
                        console.log('Амжилттай холболоо');
                        Alert.alert(
                          'Амжилттай',
                          'Үндсэн дансаа амжилттай холболоо.',
                        );
                        console.log(response.data);
                      })
                      .catch(error => {
                        console.log('Холбож чадсангүй');
                        console.log(error);
                        if (
                          error == 'Error: Network Error' ||
                          error == 'Network Error'
                        ) {
                          Alert.alert('Алдаа', 'Холболт салсан байна');
                        } else {
                          Alert.alert('Алдаа', 'Алдаа гарлаа');
                          AsyncStorage.removeItem('information', errs => {
                            if (!errs) {
                              console.log('Амжилттай устгалаа');
                            } else console.log(errs);
                          });
                        }
                      });
                    this.props.closeCardInfo();
                  }}>
                  <Text
                    style={{
                      color: '#fff',
                      paddingVertical: 12,
                      textAlign: 'center',
                      textTransform: 'uppercase',
                      fontSize: 14,
                    }}>
                    Холбох
                  </Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity
                style={{
                  backgroundColor: '#3498db',
                  width: 200,
                  borderRadius: 5,
                }}
                onPress={this.props.closeCardInfo}>
                <Text
                  style={{
                    color: '#fff',
                    paddingVertical: 12,
                    textAlign: 'center',
                    textTransform: 'uppercase',
                    fontSize: 14,
                  }}>
                  Болих
                </Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </View>
      </Modal>
    );
  }
}
