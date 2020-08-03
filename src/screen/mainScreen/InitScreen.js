import React, {Component} from 'react';
import {
  Dimensions,
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {Card} from '../../components/home/Card';
import {Tran} from '../../components/home/Tran';
import {ScrollView} from 'react-native-gesture-handler';

let width = Dimensions.get('window').width;
let height = Dimensions.get('window').height;
let tranHeight = height - 180 - 135;

class InitScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cardData: [
        {
          bgImg: require('../../../assets/images/card-carbon.jpg'),
          cardNumber: '12331311',
          amount: '9,900',
          selected: true,
        },
        {
          bgImg: require('../../../assets/images/card-khan.jpg'),
          cardNumber: '12345214',
          amount: '9,900',
          selected: false,
        },
        {
          bgImg: require('../../../assets/images/card-virtual.png'),
          cardNumber: '98765432',
          cardType: 'Virtual',
          amount: '9,900',
          selected: false,
        },
        {
          bgImg: require('../../../assets/images/card-virtual.png'),
          cardNumber: '541234861',
          cardType: 'Virtual',
          amount: '9,900',
          selected: false,
        },
        {
          bgImg: require('../../../assets/images/card-virtual.png'),
          cardNumber: '541234861',
          cardType: 'Virtual',
          amount: '9,900',
          selected: false,
        },
        {
          bgImg: require('../../../assets/images/card-virtual.png'),
          cardNumber: '541234861',
          cardType: 'Virtual',
          amount: '9,900',
          selected: false,
        },
        {
          bgImg: require('../../../assets/images/card-virtual.png'),
          cardNumber: '541234861',
          cardType: 'Virtual',
          amount: '9,900',
          selected: false,
        },
        {
          bgImg: require('../../../assets/images/card-virtual.png'),
          cardNumber: '541234861',
          cardType: 'Virtual',
          amount: '9,900',
          selected: false,
        },
      ],
      transactionData: [
        {
          date: '2020-07-12',
          amount: '-1,900.00',
          description: 'TRF=000311100818-949618XXXXXX4493ATM1216>UB',
        },
        {
          date: '2020-07-13',
          amount: '+15,600.00',
          description: 'TRF=000372300818-949618XXXXXX4493ATM1216>UB',
        },
        {
          date: '2020-07-14',
          amount: '-11,200.00',
          description: 'TRF=000312300818-949618XXXXXX4493ATM1216>UB',
        },
        {
          date: '2020-07-15',
          amount: '+10,000.00',
          description: 'TRF=000300000818-949618XXXXXX4493ATM1216>UB',
        },
        {
          date: '2020-07-16',
          amount: '-3,500.00',
          description: 'TRF=000356400818-949618XXXXXX4493ATM1216>UB',
        },
      ],
      cardPerX: 100,
    };
  }

  componentDidMount() {}

  onScroll = index => {
    this.refs.cardScrollView.scrollTo({x: width * index * 0.725, y: 0});
    const {cardData} = this.state;
    cardData.map((item, idx) => {
      item.selected = idx == index;
    });
    this.setState({
      ...this.state,
      cardData: cardData,
    });
  };

  render() {
    return (
      <SafeAreaView>
        <ScrollView
          ref="cardScrollView"
          horizontal
          pagingEnabled
          decelerationRate={0.5}
          snapToInterval={width * 0.725}
          snapToAlignment={'center'}
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={e => {
            let index = Math.round(
              e.nativeEvent.contentOffset.x /
                (e.nativeEvent.contentSize.width / this.state.cardData.length),
            );
            const {cardData} = this.state;
            cardData[index].selected = true;
            cardData.map((item, idx) => {
              item.selected = idx == index;
            });
            this.setState({
              ...this.state,
              cardData: cardData,
            });
          }}>
          {this.state.cardData.map((item, idx) => {
            let marginLeft, marginRight;
            if (idx == 0) marginLeft = 55;
            else if (idx == this.state.cardData.length - 1) marginRight = 55;
            else {
              marginRight = 5;
              marginLeft = 5;
            }
            return (
              <View
                key={idx}
                style={[
                  {
                    width: width * 0.7,
                    paddingTop: 20,
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginLeft: marginLeft,
                    marginRight: marginRight,
                  },
                  item.selected ? null : {scaleY: 0.85},
                  item.selected ? null : {scaleX: 0.85},
                ]}>
                <Card
                  img={item.bgImg}
                  cardNumber={item.cardNumber}
                  cardType={item.cardType}
                  amount={item.amount}
                />
              </View>
            );
          })}
        </ScrollView>
        <View
          style={{
            marginTop: 30,
            flex: 1,
            flexDirection: 'row',
            width: width,
            height: height,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {this.state.cardData.length > 0
            ? this.state.cardData.map((item, idx) => {
                return (
                  <TouchableOpacity
                    key={idx}
                    style={{
                      height: 10,
                      width: 10,
                      borderRadius: 50,
                      backgroundColor: item.selected ? '#2d88ff' : '#ACACAC',
                      marginHorizontal: 5,
                    }}
                    onPress={() => {
                      this.onScroll(idx);
                    }}
                  />
                );
              })
            : null}
        </View>
        <View style={Styles.tran}>
          <Text style={Styles.tranTitle}>Сүүлийн гүйлгээ</Text>
          <ScrollView bounces={false} style={Styles.tranScroll}>
            {this.state.transactionData.map((item, idx) => {
              return (
                <Tran
                  key={idx}
                  date={item.date}
                  amount={item.amount}
                  description={item.description}
                />
              );
            })}
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}

const Styles = StyleSheet.create({
  tran: {
    backgroundColor: '#fff',
    width: '90%',
    marginLeft: '5%',
    marginTop: 30,
    height: tranHeight,
    borderRadius: 10,
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.8,
    shadowRadius: 30,
    elevation: 5,
  },
  tranTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 20,
    marginTop: 10,
  },
  tranScroll: {
    backgroundColor: '#fff',
    margin: 20,
    marginBottom: 20,
  },
});

export default InitScreen;
