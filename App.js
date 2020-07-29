import React, {Component} from 'react';
import {AppRegistry, View, Alert} from 'react-native';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';

import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

import PushNotification from 'react-native-push-notification';

import LoginScreen from './src/screen/loginScreen/InitScreen';
import SignupScreen from './src/screen/signupScreen/InitScreen';

import Icon from 'react-native-vector-icons/dist/FontAwesome';

import {CONSTANTS} from './src/constants/Constants';

import HomeScreen from './src/screen/mainScreen/InitScreen';
import AdditionalScreen from './src/screen/additionalScreen/InitScreen';
import CardScreen from './src/screen/cardScreen/InitScreen';
import ProfileScreen from './src/screen/profileScreen/InitScreen';
import TransactionScreen from './src/screen/transactionScreen/InitScreen';

const Stack = createStackNavigator();

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      login: true,
    };
  }

  logIn = () => {
    this.setState({login: true});
  };

  async componentDidMount() {
    PushNotification.configure({
      onNotification: function(notification) {
        console.log('NOTIFICATION:', notification);
        Alert.alert('hello');
      },
    });
  }

  render() {
    return this.state.login ? (
      <AppNavigator />
    ) : (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Signup" component={SignupScreen} />
        </Stack.Navigator>
      </NavigationContainer>
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
    initialRouteName: 'Card',
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
