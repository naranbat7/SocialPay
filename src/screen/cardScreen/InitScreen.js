import React, {Component} from 'react';
import {
  Animated,
  Dimensions,
  SafeAreaView,
  View,
  ScrollView,
  Text,
  Easing,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from 'react-native';
import {Card} from '../../components/card/Card';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

class InitScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cardData: [
        {
          bgImg: require('../../../assets/images/card-carbon.jpg'),
          cardNumber: '12331311',
          amount: '9,900',
          leftValue: new Animated.Value(0),
          opacity: new Animated.Value(0),
          isOpen: false,
        },
        {
          bgImg: require('../../../assets/images/card-khan.jpg'),
          cardNumber: '12345214',
          amount: '9,900',
          leftValue: new Animated.Value(0),
          opacity: new Animated.Value(0),
          isOpen: false,
        },
        {
          bgImg: require('../../../assets/images/card-virtual.png'),
          cardNumber: '98765432',
          cardType: 'Virtual',
          amount: '9,900',
          leftValue: new Animated.Value(0),
          opacity: new Animated.Value(0),
          isOpen: false,
        },
        {
          bgImg: require('../../../assets/images/card-virtual.png'),
          cardNumber: '541234861',
          cardType: 'Virtual',
          amount: '9,900',
          leftValue: new Animated.Value(0),
          opacity: new Animated.Value(0),
          isOpen: false,
        },
      ],
    };
  }

  componentDidMount() {}

  toggleCard = item => {
    Animated.timing(item.leftValue, {
      toValue: item.isOpen ? -115 : 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
    this.showCardDetails(item);
  };

  showCardDetails = item => {
    Animated.timing(item.opacity, {
      toValue: item.isOpen ? 1 : 0,
      duration: 500,
      delay: item.isOpen ? 700 : 0,
      useNativeDriver: true,
    }).start();
  };

  deleteCard = index => {
    const {cardData} = this.state;
    cardData.splice(index, 1);
    this.setState({...this.state, cardData});
  };

  render() {
    let width = Dimensions.get('window').width;
    let height = Dimensions.get('window').height;
    return (
      <SafeAreaView
        style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <View style={{marginTop: 20}}>
          <Text
            style={{
              fontSize: 18,
              textTransform: 'uppercase',
              color: '#0959E3',
            }}>
            Таны картууд
          </Text>
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{marginVertical: '5%'}}>
          {this.state.cardData.map((item, idx) => {
            return (
              <View key={idx}>
                <Animated.View
                  style={[css.cardSettingsView, {opacity: item.opacity}]}>
                  <TouchableOpacity
                    style={css.list}
                    onPress={() => alert('Хянах')}>
                    <Icon
                      name="bookmark"
                      size={30}
                      style={[
                        {
                          fontWeight: 'bold',
                          color: '#0959E3',
                        },
                      ]}
                    />
                    <Text style={css.cardSettingsText}>ХЯНАХ</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={css.list}
                    onPress={() => alert('Тохиргоо')}>
                    <Icon
                      name="cog"
                      size={30}
                      style={[
                        {
                          fontWeight: 'bold',
                          color: '#0959E3',
                        },
                      ]}
                    />
                    <Text style={css.cardSettingsText}>Тохиргоо</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={css.list}
                    onPress={() => this.deleteCard(idx)}>
                    <Icon
                      name="trash"
                      size={30}
                      style={[
                        {
                          fontWeight: 'bold',
                          color: '#0959E3',
                        },
                      ]}
                    />
                    <Text style={css.cardSettingsText}>Устгах</Text>
                  </TouchableOpacity>
                </Animated.View>
                <Animated.View
                  style={{transform: [{translateX: item.leftValue}]}}>
                  <TouchableOpacity
                    activeOpacity={1}
                    style={{marginVertical: 10}}
                    onPress={() => {
                      const {cardData} = this.state;
                      cardData.map((item, index) => {
                        if (index == idx)
                          cardData[idx].isOpen = !cardData[idx].isOpen;
                        else item.isOpen = false;
                        this.toggleCard(item);
                      });

                      this.setState({...this.state, cardData});
                    }}>
                    <Card
                      img={item.bgImg}
                      cardNumber={item.cardNumber}
                      cardType={item.cardType}
                      amount={item.amount}
                    />
                  </TouchableOpacity>
                </Animated.View>
              </View>
            );
          })}
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default InitScreen;

const css = StyleSheet.create({
  cardSettingsView: {
    position: 'absolute',
    right: 0,
    top: 30,
    justifyContent: 'space-around',
    width: 110,
    height: 140,
  },
  cardSettingsText: {
    color: '#0959E3',
    marginLeft: 10,
    textTransform: 'uppercase',
  },
  list: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
