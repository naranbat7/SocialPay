import React, {Component} from 'react';
<<<<<<< HEAD
import {AppRegistry, View} from 'react-native';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
=======
import {AppRegistry, View, StyleSheet, Text} from 'react-native';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';

>>>>>>> 236c4a4eb6ad2d3a71190f4fe99cf8452f30b867
import {createBottomTabNavigator} from 'react-navigation-tabs';

import Icon from 'react-native-vector-icons/dist/FontAwesome';

import {CONSTANTS} from './src/constants/Constants';

<<<<<<< HEAD
import {Root} from 'native-base';

import HomeScreen from './src/screen/mainScreen/InitScreen';
import AdditionalScreen from './src/screen/additionalScreen/InitScreen';
import CardScreen from './src/screen/cardScreen/InitScreen';
import ProfileScreen from './src/screen/profileScreen/InitScreen';
import TransactionScreen from './src/screen/transactionScreen/InitScreen';
import LoginScreen from './src/screen/loginScreen/InitScreen';
import SignupScreen from './src/screen/signupScreen/InitScreen';
=======
import HomeScreen from './src/screen/mainScreen/InitScreen';
import AdditionalScreen from './src/screen/additionalScreen/InitScreen';
import CardScreen from './src/screen/cardScreen/InitScreen';
import ProfileScreen from './src/screen/profileScreen/InitScreen';
import TransactionScreen from './src/screen/transactionScreen/InitScreen';

import {Root} from 'native-base';
>>>>>>> 236c4a4eb6ad2d3a71190f4fe99cf8452f30b867

export default class App extends Component {
  componentDidMount() {}

  render() {
    return (
      <Root>
        <AppNavigator />
      </Root>
    );
  }
}

const AppStack = createBottomTabNavigator(
  {
    Profile: {
      screen: ProfileScreen,
<<<<<<< HEAD
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
=======
>>>>>>> 236c4a4eb6ad2d3a71190f4fe99cf8452f30b867
      navigationOptions: {
        tabBarIcon: ({tintColor, focused}) => (
          <View>
            <Icon
<<<<<<< HEAD
              name="home"
              size={35}
=======
              name="user"
              size={30}
>>>>>>> 236c4a4eb6ad2d3a71190f4fe99cf8452f30b867
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
<<<<<<< HEAD
=======
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
>>>>>>> 236c4a4eb6ad2d3a71190f4fe99cf8452f30b867
    },
    Transaction: {
      screen: TransactionScreen,
      navigationOptions: {
        tabBarIcon: ({tintColor, focused}) => (
<<<<<<< HEAD
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
    SignUp: {
      screen: SignupScreen,
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
    Login: {
      screen: LoginScreen,
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
=======
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
>>>>>>> 236c4a4eb6ad2d3a71190f4fe99cf8452f30b867
                },
              ]}
            />
          </View>
        ),
      },
<<<<<<< HEAD
=======
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
>>>>>>> 236c4a4eb6ad2d3a71190f4fe99cf8452f30b867
    },
  },
  {
    initialRouteName: 'Home',
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
<<<<<<< HEAD
      // AppLoading: AppLoadingScreen,
      // Intro: IntoScreen,
=======
      //AppLoading: AppLoadingScreen,
      //Intro: IntoScreen,
>>>>>>> 236c4a4eb6ad2d3a71190f4fe99cf8452f30b867
      App: AppStack,
    },
    {
      initialRouteName: 'App',
    },
  ),
);

<<<<<<< HEAD
=======
const Styles = StyleSheet.create({
  bottomNav: {
    shadowColor: '#000',
  },
});

>>>>>>> 236c4a4eb6ad2d3a71190f4fe99cf8452f30b867
AppRegistry.registerComponent('myApp', () => Screens);
