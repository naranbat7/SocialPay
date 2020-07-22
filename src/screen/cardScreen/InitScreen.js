import React, {Component} from 'react';
import {Dimensions, View, Text, SafeAreaView} from 'react-native';

class InitScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {}

  render() {
    let width = Dimensions.get('window').width;
    let height = Dimensions.get('window').height;
    return (
      <SafeAreaView>
        <Text>Card</Text>
      </SafeAreaView>
    );
  }
}

export default InitScreen;
