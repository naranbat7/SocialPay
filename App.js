import React, {Component} from 'react';
import {AppRegistry, View} from 'react-native';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';

import Icon from 'react-native-vector-icons/dist/FontAwesome';

import {CONSTANTS} from './src/constants/Constants';

import {Root} from 'native-base';
import PushNotification from 'react-native-push-notification';

import HomeScreen from './src/screen/mainScreen/InitScreen';
import AdditionalScreen from './src/screen/additionalScreen/InitScreen';
import CardScreen from './src/screen/cardScreen/InitScreen';
import ProfileScreen from './src/screen/profileScreen/InitScreen';
import TransactionScreen from './src/screen/transactionScreen/InitScreen';
import LoginScreen from './src/screen/loginScreen/InitScreen';
import SignupScreen from './src/screen/signupScreen/InitScreen';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      login: false,
    };
  }

  logIn = () => {
    this.setState({login: true});
  };

  async componentDidMount() {
    PushNotification.configure({
      onNotification: function(notification) {
        console.log('NOTIFICATION:', notification);
      },
    });
  }

  render() {
    return (
      <Root>
        {this.state.login ? (
          <AppNavigator />
        ) : (
          <LoginScreen logIn={this.logIn} />
        )}
      </Root>
    );
  }
}

const AppStack = createBottomTabNavigator(
  {
    Profile: {
      screen: ProfileScreen,
      navigationOptions: {
        tabBarIcon: ({tintColor, focused}) => (
          <View>
            <Icon
              name="user"
              size={30}
              style={[
                {
                  fontWeight: 'bold',
                  color: tintColor,
                },
              ]}
            />
          </View>
        ),
      },
    },
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        tabBarIcon: ({tintColor, focused}) => (
          <View>
            <Icon
              name="home"
              size={35}
              style={[
                {
                  fontWeight: 'bold',
                  color: tintColor,
                },
              ]}
            />
          </View>
        ),
      },
    },
    Transaction: {
      screen: TransactionScreen,
      navigationOptions: {
        tabBarIcon: ({tintColor, focused}) => (
          <View>
            <Icon
              name="angle-double-up"
              size={40}
              style={[
                {
                  backgroundColor: '#0959E3',
                  paddingTop: 5,
                  paddingBottom: 5,
                  paddingLeft: 15,
                  paddingRight: 15,
                  borderRadius: 8,
                  fontWeight: 100,
                  color: '#fff',
                },
              ]}
            />
          </View>
        ),
      },
    },
    Card: {
      screen: CardScreen,
      navigationOptions: {
        tabBarIcon: ({tintColor, focused}) => (
          <View>
            <Icon
              name="credit-card"
              size={30}
              style={[
                {
                  fontWeight: 'bold',
                  color: tintColor,
                },
              ]}
            />
          </View>
        ),
      },
    },
    Additional: {
      screen: AdditionalScreen,
      navigationOptions: {
        tabBarIcon: ({tintColor, focused}) => (
          <View>
            <Icon
              name="bars"
              size={30}
              style={[
                {
                  fontWeight: 'bold',
                  color: tintColor,
                },
              ]}
            />
          </View>
        ),
      },
    },
  },
  {
    initialRouteName: 'Additional',
    tabBarOptions: {
      activeTintColor: CONSTANTS.color.dark,
      showLabel: false,
      style: {
        height: 50,
        backgroundColor: '#fff',
        width: '100%',
        shadowColor: '#000000',
        shadowOffset: {width: 0, height: 0},
        shadowOpacity: 0.8,
        shadowRadius: 30,
        elevation: 5,
      },
    },
  },
);

const AppNavigator = createAppContainer(
  createSwitchNavigator(
    {
      // AppLoading: AppLoadingScreen,
      // Intro: IntoScreen,
      App: AppStack,
    },
    {
      initialRouteName: 'App',
    },
  ),
);

AppRegistry.registerComponent('myApp', () => Screens);
