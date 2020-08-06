import React, {Component} from 'react';
import {
  Animated,
  Dimensions,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
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
      virtualCardData: {
        bgImg: require('../../../assets/images/card-virtual.png'),
        cardNumber: '541234861',
        cardType: 'Virtual',
        amount: '9,900',
        scaleX: new Animated.Value(0.8),
        scaleY: new Animated.Value(0.8),
        locationY: new Animated.Value(-10),
        borderRadius: 10,
      },
      cardData: [
        {
          bgImg: require('../../../assets/images/card-khan.jpg'),
          cardNumber: '12345214',
          amount: '9,900',
          scaleX: new Animated.Value(0.66),
          scaleY: new Animated.Value(0.66),
          locationY: new Animated.Value(0),
          borderRadius: 10,
        },
        {
          bgImg: require('../../../assets/images/card-virtual.png'),
          cardNumber: '98765432',
          cardType: 'Virtual',
          amount: '9,900',
          scaleX: new Animated.Value(0.73),
          scaleY: new Animated.Value(0.73),
          locationY: new Animated.Value(0),
          borderRadius: 10,
        },
        {
          bgImg: require('../../../assets/images/card-carbon.jpg'),
          cardNumber: '12331311',
          amount: '9,900',
          scaleX: new Animated.Value(0.8),
          scaleY: new Animated.Value(0.8),
          locationY: new Animated.Value(0),
          borderRadius: 10,
        },
      ],
    };
  }

  componentDidMount() {}

  /*    Animation Start    */

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
  /*    Animation End    */

  render() {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            paddingVertical: 20,
            width: '90%',
            backgroundColor: '#fff',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
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
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <TouchableOpacity style={{marginRight: 15}}>
              <Icon
                name="plus-circle"
                size={25}
                color={CONSTANTS.color.light}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Icon name="redo" size={20} color={CONSTANTS.color.light} />
            </TouchableOpacity>
          </View>
        </View>
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
            {this.state.cardData.map((item, idx) => {
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
                        img={item.bgImg}
                        cardNumber={item.cardNumber}
                        cardType={item.cardType}
                        amount={item.amount}
                        style={{
                          shadowColor: '#000000',
                          shadowOffset: {width: 0, height: 0},
                          shadowOpacity: 0.8,
                          shadowRadius: 30,
                          elevation: 5,
                          scaleX: item.scaleX,
                          scaleY: item.scaleY,
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
      </SafeAreaView>
    );
  }
}

export default InitScreen;
