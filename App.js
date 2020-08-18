import React, {Component} from 'react';
import {AppRegistry, View, Animated, AsyncStorage} from 'react-native';

import PushNotification from 'react-native-push-notification';

import LoginScreen from './src/screen/loginScreen/InitScreen';
import NotificationView from './src/components/NotificationView';
import AppNavigator from './src/components/AppNavigator';
import SplashScreen from './src/screen/SplashScreen';
import SocialPinConnect from './src/screen/SocialPinConnect';

const axios = require('axios');

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      login: false,
      notif: false,
      positionValue: new Animated.Value(-110),
      notificationDetails: {
        title: null,
        message: null,
        image: null,
      },
      information: null,
      token: null,
      loading: true,
      check: true,
      showSocialPin: true,
    };
  }

  // * Login handler function depends on login state
  logIn = async data => {
    let value = true;
    this.setState({information: data});
    try {
      await AsyncStorage.setItem('information', JSON.stringify(data));
    } catch (error) {
      console.log(error);
      value = false;
    }
    this.setState({login: value, showSocialPin: false, loading: false});
  };

  setLoadingTrue = () => {
    this.setState({loading: true});
  };

  tokenSender = token => {
    axios
      .put(
        'http://192.168.205.168:8050/api/info/user/token',
        {token: token.os},
        {
          headers: {
            Authorization: 'Bearer ' + this.state.token,
            'Content-Type': 'application/json',
          },
        },
      )
      .then(response => {
        console.log('Амжилттай token илгээлээ');
        console.log(response.data);
      })
      .catch(error => {
        console.log('Token илгээхэд алдаа гарлаа');
        console.log(error);
      });
  };

  // * Firebase notification handler function can effect state
  isNotif = value => {
    this.setState({notif: value});
    Animated.timing(this.state.positionValue, {
      toValue: value ? 0 : -110,
      duration: 400,
      useNativeDriver: true,
    }).start();
  };

  // * Check firebase notification handler depends on firebase server
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
    AsyncStorage.getItem('isPin', (errs, result) => {
      if (!errs) {
        if (result !== null) {
          let data = JSON.parse(result);
          if (data) {
            this.setState({showSocialPin: false});
          }
        }
      }
    });

    AsyncStorage.getItem('information', (errs, result) => {
      if (!errs) {
        if (result !== null) {
          let data = JSON.parse(result);
          this.setState({token: data.token});
          if (data.user.socialPin) {
            this.setState({showSocialPin: false});
          }
          this.setState({
            login: true,
          });
        }
      }
      this.setState({loading: false});
    });

    // * Firebase notification main function start
    PushNotification.configure({
      onRegister: token => {
        this.tokenSender(token);
      },

      onNotification: notification => {
        this.notificationChecker(notification);
      },

      onAction: function(notification) {
        console.log('ACTION:', notification.action);
        console.log('NOTIFICATION:', notification);

        // process the action
      },
    });
    // * Firebase notification main function end
  }

  /* Notification End */

  render() {
    return this.state.loading ? (
      <SplashScreen />
    ) : this.state.login ? (
      <View style={{flex: 1}}>
        {this.state.showSocialPin ? (
          <SocialPinConnect />
        ) : (
          <View style={{flex: 1}}>
            <AppNavigator />

            <NotificationView
              close={() => this.isNotif(false)}
              data={this.state.notificationDetails}
              value={this.state}
            />
          </View>
        )}
      </View>
    ) : (
      <View style={{flex: 1}}>
        <LoginScreen
          setlogIn={this.logIn}
          setLoadingTrue={this.setLoadingTrue}
        />
      </View>
    );
  }
}

AppRegistry.registerComponent('myApp', () => Screens);
