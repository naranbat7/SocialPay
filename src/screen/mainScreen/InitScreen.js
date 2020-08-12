import React, {Component} from 'react';
import {
  Dimensions,
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  AsyncStorage,
} from 'react-native';
import {Card} from '../../components/home/Card';
import {Tran} from '../../components/home/Tran';
import {ScrollView} from 'react-native-gesture-handler';
import {CONSTANTS} from '../../constants/Constants';

let width = Dimensions.get('window').width;
let height = Dimensions.get('window').height;
let tranHeight = height - 180 - 105;

class InitScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cardData: null,
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

  render() {
    return (
      <SafeAreaView>
        <ScrollView
          horizontal
          pagingEnabled
          decelerationRate={0.5}
          snapToInterval={width * 0.785}
          snapToAlignment={'center'}
          showsHorizontalScrollIndicator={false}>
          {this.state.cardData &&
            this.state.cardData.map((item, idx) => {
              let marginLeft, marginRight;
              if (idx == 0) {
                marginLeft = 55;
                marginRight = 15;
              } else if (
                idx == (this.state.cardData && this.state.cardData.length - 1)
              ) {
                marginRight = 55;
                marginLeft = 15;
              } else {
                marginRight = 15;
                marginLeft = 15;
              }
              return (
                <View
                  key={idx}
                  style={{
                    width: width * 0.7,
                    paddingTop: 20,
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginLeft: marginLeft,
                    marginRight: marginRight,
                  }}>
                  <Card
                    index={idx}
                    img={item.bgImg}
                    cardNumber={item}
                    cardType={item.cardType}
                    amount={item.amount}
                  />
                </View>
              );
            })}
        </ScrollView>
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
    marginTop: 20,
    height: tranHeight,
    borderRadius: 10,
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.8,
    shadowRadius: 30,
    elevation: 5,
  },
  tranTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 20,
    marginTop: 10,
  },
  tranScroll: {
    backgroundColor: '#fff',
    marginHorizontal: 15,
    marginTop: 10,
    marginBottom: 20,
  },
});

export default InitScreen;
