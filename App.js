import React, { Component } from "react";
import {
  AppRegistry, View
} from "react-native";
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import Icon from 'react-native-vector-icons/dist/FontAwesome';

import { CONSTANTS } from "./src/constants/Constants";

import CardScreen from "./src/screen/card/InitScreen";
import TransactionScreen from "./src/screen/transaction/InitScreen";
import { Root } from "native-base";

export default class App extends Component {

  componentDidMount() {
  }

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
    Card: {
      screen: CardScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor, focused }) => (
          <View>
            <Icon name="credit-card" size={25}
              style={[{
                fontWeight: 'bold',
                color: tintColor,
              }]} />
          </View>
        )
      }
    },
    Transaction: {
      screen: TransactionScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor, focused }) => (
          <View>
            <Icon name="refresh" size={25}
              style={[{
                fontWeight: 'bold',
                color: tintColor,
              }]} />
          </View>
        )
      }
    },
  },
  {
    initialRouteName: 'Transaction',
    tabBarOptions: {
      activeTintColor: CONSTANTS.color.dark,
      showLabel: false,
      style: {
        height: 50
      }
    },
  }
);

const AppNavigator = createAppContainer(
  createSwitchNavigator(
    {
      // AppLoading: AppLoadingScreen,
      // Intro: IntoScreen,
      App: AppStack
    },
    {
      initialRouteName: 'App',
    }
  )
);

AppRegistry.registerComponent('myApp', () => Screens);