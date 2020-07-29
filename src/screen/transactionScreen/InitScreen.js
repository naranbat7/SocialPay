require('../../../lib/swisscalc.lib.format.js');
require('../../../lib/swisscalc.lib.operator.js');
require('../../../lib/swisscalc.lib.operatorCache.js');
require('../../../lib/swisscalc.lib.shuntingYard.js');
require('../../../lib/swisscalc.display.numericDisplay.js');
require('../../../lib/swisscalc.display.memoryDisplay.js');
require('../../../lib/swisscalc.calc.calculator.js');

import React, {Component} from 'react';
import {Dimensions, View, Text, SafeAreaView, StyleSheet, PanResponder,} from 'react-native';
import {Button, Display} from '../../components/TransButton';
import { BorderlessButton } from 'react-native-gesture-handler';

let width = Dimensions.get('window').width;
let height = Dimensions.get('window').height;

class InitScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      display: '0',

    };
    this.oc = global.swisscalc.lib.operatorCache;
    this.calc = new global.swisscalc.calc.calculator();
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
      onPanResponderMove: (evt, gestureState) => { },
      onPanResponderRelease: (evt, gestureState) => {
        if (Math.abs(gestureState.dx) >= 50) {
          this.onBackspacePress();
        }
      },
    })
  }

  
  onDigitPress = digit => {
    this.calc.addDigit(digit);
    this.setState({display: this.calc.getMainDisplay()});
  };

  onCleanPress = () =>{
    this.calc.backspace();
    this.setState({display: this.calc.getMainDisplay()});
  }
  onBackspacePress = () =>{
    this.calc.backspace();
    this.setState({display: this.calc.getMainDisplay()});
  }
  componentDidMount() {}

  render() {
    return (
      <SafeAreaView style={Styles.container}>
        <Text style={Styles.UpText}>Гүйлгээ</Text>
        <View style={Styles.DisplayContainer} {...this.panResponder.panHandlers}>
          <Display display={this.state.display} />
        </View>
        <View style={Styles.buttonContainer}>
          <View style={Styles.buttonRow}>
            <Button onPress={() => {this.onDigitPress('1');}} title="1" color="#fff" backgroundColor='' />
            <Button onPress={() => {this.onDigitPress('2');}} title="2" color="#fff"  backgroundColor='' />
            <Button onPress={() => {this.onDigitPress('3');}} title="3" color="#fff"  backgroundColor='' />
          </View>
          <View style={Styles.buttonRow}>
            <Button onPress={() => {this.onDigitPress('4');}} title="4" color="#fff"  backgroundColor='' />
            <Button onPress={() => {this.onDigitPress('5');}} title="5" color="#fff"  backgroundColor='' />
            <Button onPress={() => {this.onDigitPress('6');}} title="6" color="#fff"  backgroundColor='' />
          </View>
          <View style={Styles.buttonRow}>
            <Button onPress={() => {this.onDigitPress('7');}} title="7" color="#fff"  backgroundColor=''/>
            <Button onPress={() => {this.onDigitPress('8');}} title="8" color="#fff"  backgroundColor='' />
            <Button onPress={() => {this.onDigitPress('9');}} title="9" color="#fff"  backgroundColor='' />
          </View>
          <View style={Styles.buttonRow}>
            <Button onPress={() => {this.onDigitPress('000');}} title="0" color="#fff"  backgroundColor=''  />
            <Button onPress={() => {this.onDigitPress('0');}} title="0" color="#fff"  backgroundColor='' />
            <Button onPress={this.onCleanPress} title="<" color="#fff"  backgroundColor='' />
          </View>
        </View>
        <View style={Styles.buttonRow}>
            
            <Button  title="Нэхэмжлэл"color="#ffffff"backgroundColor="#0984E3" style={{flex: 2}}
            />
            <Button  title="0" color="#ffffff" backgroundColor="blue" />
            <Button  title="Гүйлгээ" color="#ffffff" backgroundColor="#0984E3" style={{flex: 2}}
            />
            </View>
          
      </SafeAreaView>
    );
  }
}

export default InitScreen;

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    
  },
  UpText: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    fontSize: 25,
    fontWeight: 'bold',
    paddingBottom: 30,
  },
  DisplayContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  buttonContainer: {
    backgroundColor: '#E6E6E6',
    paddingBottom: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    
  },
  
});

