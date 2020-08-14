import React, {Component} from 'react';
import {
  Animated,
  Dimensions,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  AsyncStorage,
} from 'react-native';
import {Card} from '../../components/card/Card';
import {CONSTANTS} from '../../constants/Constants';
import CardInfo from '../../components/card/CardInfo';
import Icon from 'react-native-vector-icons/FontAwesome5';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

class InitScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalVisible: false,
      cardAddVisible: false,
      virtualCardData: {
        bgImg: require('../../../assets/images/card-virtual.png'),
        cardNumber: 'SocialPay карт',
        cardType: 'Virtual',
        scaleX: new Animated.Value(0.8),
        scaleY: new Animated.Value(0.8),
        locationY: new Animated.Value(-10),
      },
      cardData: null,
    };
  }

  async componentDidMount() {
    AsyncStorage.getItem('information', (errs, result) => {
      if (!errs) {
        if (result !== null) {
          let data = JSON.parse(result);
          this.setState({cardData: data.accounts});
          this.setState({token: data.token});
        } else console.log('result is null');
      } else console.log('errs');
    });
  }

  // *    Animation Start

  showCardInfo = (item, value) => {
    Animated.timing(item.scaleX, {
      toValue: value ? 1 : 0.8,
      duration: 400,
      useNativeDriver: true,
    }).start();

    Animated.timing(item.scaleY, {
      toValue: value ? 1 : 0.8,
      duration: 400,
      useNativeDriver: true,
    }).start();

    Animated.timing(item.locationY, {
      toValue: value ? -70 : -10,
      duration: 400,
      useNativeDriver: true,
    }).start();

    this.setState({...this.state, modalVisible: value});
  };
  // *    Animation End

  // TODO --> Make all component to individual

  render() {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {/* // * Header Component start */}
        <View
          style={{
            paddingVertical: 20,
            width: '90%',
            backgroundColor: '#fff',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          {/* // * Header Title Component Start */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Icon name="square" size={20} color={CONSTANTS.color.light} solid />
            <Text
              style={{
                marginLeft: 10,
                fontSize: 16,
                textTransform: 'uppercase',
                color: CONSTANTS.color.light,
                textAlign: 'center',
              }}>
              Таны картууд
            </Text>
          </View>
          {/* // * Header Title Component End */}

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginRight: 20,
            }}>
            <TouchableOpacity>
              <Icon name="redo" size={20} color={CONSTANTS.color.light} />
            </TouchableOpacity>
          </View>
        </View>
        {/* // * Header Component end */}
        {/* // * Card List Component Start */}
        <View
          style={{
            width: '100%',
            height: height - 125,
            backgroundColor: '#fff',
          }}>
          <View>
            <Animated.View
              style={{
                alignItems: 'center',
                translateY: this.state.virtualCardData.locationY,
              }}>
              <TouchableOpacity
                activeOpacity={1}
                onPress={() =>
                  this.showCardInfo(this.state.virtualCardData, true)
                }>
                <Card
                  img={this.state.virtualCardData.bgImg}
                  cardNumber={this.state.virtualCardData.cardNumber}
                  cardType={this.state.virtualCardData.cardType}
                  amount={this.state.virtualCardData.amount}
                  style={{
                    shadowColor: '#000000',
                    shadowOffset: {width: 0, height: 0},
                    shadowOpacity: 0.8,
                    shadowRadius: 30,
                    elevation: 5,
                    scaleX: this.state.virtualCardData.scaleX,
                    scaleY: this.state.virtualCardData.scaleY,
                  }}
                  borderRadius={this.state.virtualCardData.borderRadius}
                />
              </TouchableOpacity>
              <CardInfo
                visible={this.state.modalVisible}
                closeCardInfo={() =>
                  this.showCardInfo(this.state.virtualCardData, false)
                }
              />
            </Animated.View>
          </View>
          <View style={{flex: 1, translateY: -20}}>
            {this.state.cardData &&
              this.state.cardData.map((item, idx) => {
                return (
                  <Animated.View
                    key={idx}
                    style={{
                      translateY: -(height / 3.7) * idx - 10,
                    }}>
                    <View
                      style={{
                        alignItems: 'center',
                      }}>
                      <TouchableOpacity activeOpacity={1}>
                        <Card
                          index={idx}
                          cardNumber={item}
                          cardType={item.cardType}
                          style={{
                            shadowColor: '#000000',
                            shadowOffset: {width: 0, height: 0},
                            shadowOpacity: 0.8,
                            shadowRadius: 30,
                            elevation: 5,
                            scaleX:
                              0.8 -
                              0.07 * (this.state.cardData.length - idx - 1),
                            scaleY:
                              0.8 -
                              0.07 * (this.state.cardData.length - idx - 1),
                          }}
                          borderRadius={item.borderRadius}
                        />
                      </TouchableOpacity>
                    </View>
                  </Animated.View>
                );
              })}
          </View>
        </View>
        {/* // * Card List Component End */}
      </SafeAreaView>
    );
  }
}

export default InitScreen;
