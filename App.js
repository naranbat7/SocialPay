import React, {Component} from 'react';
import {
  AppRegistry,
  View,
  Alert,
  Image,
  Text,
  TouchableOpacity,
  Animated,
  Easing,
} from 'react-native';
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
//import {TouchableOpacity} from 'react-native-gesture-handler';

const axios = require('axios');

const Stack = createStackNavigator();

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      login: true,
      notif: false,
      positionValue: new Animated.Value(-110),
      notificationDetails: {
        title: null,
        message: null,
        image: null,
      },
    };
  }

  logIn = () => {
    this.setState({...this.state, login: true});
  };

  isNotif = value => {
    this.setState({...this.state, notif: value});
    Animated.timing(this.state.positionValue, {
      toValue: value ? 0 : -110,
      duration: 400,
      useNativeDriver: true,
    }).start();
  };

  notificationChecker = notification => {
    if (notification) {
      this.setState({
        ...this.state,
        notificationDetails: {
          title: notification.title,
          message: notification.message,
          image: notification.data.image,
        },
      });
      this.isNotif(true);
    }
  };

  async componentDidMount() {
    // axios
    //   .get('http://10.0.2.2:3000/')
    //   .then(response => {
    //     console.log(Alert.alert('response'));
    //   })
    //   .catch(error => {
    //     console.log('error');
    //   });

    PushNotification.configure({
      onNotification: notification => {
        this.notificationChecker(notification);
      },
    });
  }

  /* Notification End */

  render() {
    return this.state.login ? (
      <View style={{flex: 1}}>
        <AppNavigator />

        <NotificationView
          close={() => this.isNotif(false)}
          data={this.state.notificationDetails}
          value={this.state}
        />
      </View>
    ) : (
      <View style={{flex: 1}}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    );
  }
}

const NotificationView = props => {
  return (
    <Animated.View
      style={{
        width: '96%',
        alignSelf: 'center',
        position: 'absolute',
        backgroundColor: '#fff',
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 0},
        shadowOpacity: 0.8,
        shadowRadius: 30,
        elevation: 5,
        paddingHorizontal: 20,
        paddingVertical: 10,
        height: 100,
        display: 'none',
        translateY: props.value.positionValue,
      }}>
      <View style={{height: '75%', flexDirection: 'row'}}>
        <View style={{width: '80%'}}>
          <Text style={{color: '#000', fontSize: 16, fontWeight: 'bold'}}>
            {props.data.title}
          </Text>
          <Text style={{color: '#000', fontSize: 14}}>
            {props.data.message}
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-start',
            alignItems: 'center',
            marginTop: 10,
          }}>
          <Image
            source={{uri: props.data.image}}
            style={{
              position: 'absolute',
              height: 35,
              width: 35,
            }}
          />
        </View>
      </View>
      <TouchableOpacity
        style={{flex: 1, justifyContent: 'center'}}
        onPress={props.close}>
        <Text
          style={{
            color: '#2d88ff',
            fontSize: 16,
            marginRight: 15,
            textAlign: 'right',
          }}>
          Хаах
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

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
    initialRouteName: 'Card',
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
      // Intro: IntoScreen,
      App: AppStack,
    },
    {
      initialRouteName: 'App',
    },
  ),
);

AppRegistry.registerComponent('myApp', () => Screens);
