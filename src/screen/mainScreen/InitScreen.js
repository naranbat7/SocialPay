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

const axios = require('axios');

let width = Dimensions.get('window').width;
let height = Dimensions.get('window').height;
let tranHeight = height - 180 - 105;

class InitScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cardData: null,
      mainAccount: null,
      token: null,
      transactionData: null,
      cardPerX: 100,
    };
  }

  async componentDidMount() {
    AsyncStorage.getItem('information', (errs, result) => {
      if (!errs) {
        if (result !== null) {
          let data = JSON.parse(result);
          axios
            .get(
              'http://192.168.205.168:8050/api/transaction/statement?page=0&size=10',
              {
                headers: {
                  Authorization: 'Bearer ' + data.token,
                  'Content-Type': 'application/json',
                },
              },
            )
            .then(response => {
              this.setState({transactionData: response.data.content});
            })
            .catch(error => {
              console.log('Transaction' + error);
            });
          this.setState({
            cardData: data.accounts,
            token: data.token,
            mainAccount: data.user.mainAccount,
          });
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
          {this.state.mainAccount && (
            <View
              style={{
                width: width * 0.7,
                paddingTop: 20,
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                marginLeft: 55,
                marginRight: 15,
              }}>
              <Card
                index={0}
                token={this.state.token}
                isMainAccount={true}
                img={this.state.mainAccount.bgImg}
                cardNumber={this.state.mainAccount}
                cardType={this.state.mainAccount.cardType}
                amount={this.state.mainAccount.amount}
              />
            </View>
          )}
          {this.state.cardData &&
            this.state.cardData.map((item, idx) => {
              let marginLeft, marginRight;
              if (idx == 0 && this.state.mainAccount == null) {
                marginRight = 15;
                marginLeft = 55;
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
            {this.state.transactionData &&
              this.state.transactionData.map((item, idx) => {
                return (
                  <Tran
                    key={idx}
                    date={item.createdDate}
                    amount={item.amount}
                    description={item.invoice}
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
