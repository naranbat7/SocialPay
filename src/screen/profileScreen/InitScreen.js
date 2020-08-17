import React, {Component} from 'react';
import {
  Dimensions,
  View,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  Text,
  AsyncStorage,
} from 'react-native';
import Name from '../../components/user/Name';
import Item from '../../components/user/Item';
import NonItem from '../../components/user/NonItem';
import {CONSTANTS} from '../../constants/Constants';
import CardAdd from '../../components/user/CardAdd';

class InitScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
      account: null,
      token: null,
      cardAddVisible: false,
    };
  }

  async componentDidMount() {
    AsyncStorage.getItem('information', (errs, result) => {
      if (!errs) {
        if (result !== null) {
          let data = JSON.parse(result);
          this.setState({user: data.user});
          this.setState({account: data.accounts});
          this.setState({token: data.token});
        } else console.log('result is null');
      } else console.log('errs');
    });
  }

  showCardAdd = async value => {
    this.setState({...this.state, cardAddVisible: value});
  };

  render() {
    let width = Dimensions.get('window').width;
    let height = Dimensions.get('window').height;

    return (
      <SafeAreaView>
        <Name
          img={require('./../../../assets/images/hacker.png')}
          text={this.state.user ? this.state.user.firstName : null}
        />
        <ScrollView style={{marginBottom: '45%'}}>
          <View style={styles.infoCon}>
            <Text style={styles.h1}>Social данс</Text>
            <Item
              icon="credit-card"
              size={12}
              text={this.state.user ? this.state.user.socialName : null}
              number={this.state.user ? this.state.user.socialNumber : null}
              func={() => this.showCardAdd(true)}
            />

            <Text style={styles.h1}>Бусад банкны данс</Text>
            <Item
              icon="university"
              size={13}
              text={this.state.user ? this.state.user.otherName : null}
              number={this.state.user ? this.state.user.otherNumber : null}
            />
            <NonItem color="#1068FF" text="Банкны дансандаа мөнгөө авах" />
            <Text style={styles.h1}>Холболт</Text>
            <Item
              icon="phone"
              size={13}
              text="Утасны дугаар"
              number={this.state.user ? this.state.user.phone : null}
            />
            <Item
              icon="envelope"
              size={13}
              text="Имэйл"
              style={{width: 170}}
              number={this.state.user ? this.state.user.email : null}
            />
            <Item
              icon="facebook"
              size={13}
              text="Facebook"
              number={this.state.user ? this.state.user.facebookNumber : null}
            />
            <Item
              icon="twitter"
              size={13}
              text="Twitter"
              number={this.state.user ? this.state.user.twitterNumber : null}
            />
            <Text style={styles.h1}>EBarimt</Text>
            <Item
              icon="edit"
              size={12}
              text="EBarimt холбох"
              number={this.state.user ? this.state.user.eBarimtNumber : null}
            />
            <Text style={styles.h1}>Тохиргоо</Text>
            <Item
              id="fingerprint"
              icon="fingerprint"
              size={13}
              text="Хурууны хээ"
              number={this.state.user ? this.state.user.fingerPrint : null}
            />
            <Item
              id="socialPin"
              icon="lock"
              size={13}
              style={{marginLeft: 17}}
              text="Social PIN"
              number={this.state.user ? this.state.user.socialPin : null}
            />
            <NonItem
              color="#FF3B3B"
              text="Холболт салгах"
              style={{borderBottomWidth: 0}}
              func={() => {
                this.props.navigation.navigate('Login');
                // this.props.setlogin;
                AsyncStorage.removeItem('information', errs => {
                  if (!errs) {
                    console.log('Амжилттай устгалаа');
                  } else console.log(errs);
                });
              }}
            />
          </View>
        </ScrollView>
        <CardAdd
          visible={this.state.cardAddVisible}
          closeCardInfo={() => this.showCardAdd(false)}
          accounts={this.state.account}
        />
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
