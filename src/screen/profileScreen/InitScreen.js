import React, {Component} from 'react';
import {
  Dimensions,
  View,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  Text,
} from 'react-native';
import Name from '../../components/user/Name';
import Item from '../../components/user/Item';
import NonItem from '../../components/user/NonItem';
import {CONSTANTS} from '../../constants/Constants';

class InitScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: {
        userName: 'Эвсанаа',
        socialName: 'Голомт банк',
        socialNumber: '2705137424',
        otherName: 'Хаан банк',
        otherNumber: '5057567024',
        telNumber: '86960036',
        emailNumber: 'null',
        facebookNumber: 'null',
        twitterNumber: 'null',
        eBarimtNumber: 'null',
        fingerPrint: 'null',
        socialPin: 'null',
      },
    };
  }

  componentDidMount() {}

  render() {
    let width = Dimensions.get('window').width;
    let height = Dimensions.get('window').height;

    return (
      <SafeAreaView>
        <Name
          img={require('./../../../assets/images/hacker.png')}
          text={this.state.items.userName}
        />
        <ScrollView style={{marginBottom: '45%'}}>
          <View style={styles.infoCon}>
            <Text style={styles.h1}>Social данс</Text>
            <Item
              icon="credit-card"
              size={12}
              text={this.state.items.socialName}
              number={this.state.items.socialNumber}
            />
            <Text style={styles.h1}>Бусад банкны данс</Text>
            <Item
              icon="university"
              size={13}
              text={this.state.items.otherName}
              number={this.state.items.otherNumber}
            />
            <NonItem color="#1068FF" text="Банкны дансандаа мөнгөө авах" />
            <Text style={styles.h1}>Холболт</Text>
            <Item
              icon="phone"
              size={13}
              text="Утасны дугаар"
              number={this.state.items.telNumber}
            />
            <Item
              icon="envelope"
              size={13}
              text="Имэйл"
              number={this.state.items.emailNumber}
            />
            <Item
              icon="facebook"
              size={13}
              text="Facebook"
              number={this.state.items.facebookNumber}
            />
            <Item
              icon="twitter"
              size={13}
              text="Twitter"
              number={this.state.items.twitterNumber}
            />
            <Text style={styles.h1}>EBarimt</Text>
            <Item
              icon="edit"
              size={12}
              text="EBarimt холбох"
              number={this.state.items.eBarimtNumber}
            />
            <Text style={styles.h1}>Тохиргоо</Text>
            <Item
              id="fingerprint"
              icon="fingerprint"
              size={13}
              text="Хурууны хээ"
              number={this.state.items.fingerPrint}
            />
            <Item
              id="socialPin"
              icon="lock"
              size={13}
              style={{marginLeft: 17}}
              text="Social PIN"
              number={this.state.items.socialPin}
            />
            <NonItem
              color="#FF3B3B"
              text="Холболт салгах"
              style={{borderBottomWidth: 0}}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  infoCon: {
    paddingBottom: 0,
    marginHorizontal: 20,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: 'rgba(0,0,0,0.5)',
  },
  h1: {
    fontWeight: 'bold',
    fontSize: 20,
    marginVertical: 5,
    marginLeft: 20,
  },
});

export default InitScreen;
