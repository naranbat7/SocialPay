import React from 'react';
import {View} from 'react-native';

import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

import {CONSTANTS} from '../constants/Constants';

import HomeScreen from '../screen/mainScreen/InitScreen';
import AdditionalScreen from '../screen/additionalScreen/InitScreen';
import CardScreen from '../screen/cardScreen/InitScreen';
import ProfileScreen from '../screen/profileScreen/InitScreen';
import TransactionScreen from '../screen/transactionScreen/InitScreen';
import LoginScreen from '../screen/loginScreen/InitScreen';

const AppStack = createBottomTabNavigator(
  {
    Profile: {
      screen: ProfileScreen,
      navigationOptions: {
        tabBarIcon: ({tintColor, focused}) => (
          <View>
            <Icon
              name="user"
              size={25}
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
    Transaction: {
      screen: TransactionScreen,
      navigationOptions: {
        tabBarIcon: ({tintColor, focused}) => (
          <View>
            <Icon
              name="angle-double-up"
              size={30}
              style={[
                {
                  backgroundColor: '#2d88ff',
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
              size={25}
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
              size={25}
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
    initialRouteName: 'Transaction',
    tabBarOptions: {
      activeTintColor: CONSTANTS.color.dark,
      showLabel: false,
      style: {
        height: 40,
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
      Login: LoginScreen,
      App: AppStack,
    },
    {
      initialRouteName: 'App',
    },
  ),
);

export default AppNavigator;
