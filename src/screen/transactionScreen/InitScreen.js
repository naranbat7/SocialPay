require('../../../lib/swisscalc.lib.format.js');
require('../../../lib/swisscalc.lib.operator.js');
require('../../../lib/swisscalc.lib.operatorCache.js');
require('../../../lib/swisscalc.lib.shuntingYard.js');
require('../../../lib/swisscalc.display.numericDisplay.js');
require('../../../lib/swisscalc.display.memoryDisplay.js');
require('../../../lib/swisscalc.calc.calculator.js');

import React, {Component} from 'react';
import {Dimensions, View, Text, SafeAreaView, StyleSheet, PanResponder,TouchableOpacity,} from 'react-native';
import {Button, Display} from '../../components/TransButton';
import { BorderlessButton,  } from 'react-native-gesture-handler';

let width = Dimensions.get('window').width;
let height = Dimensions.get('window').height;

class InitScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      display: '0',
      value: 'T'

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
        if (Math.abs(gestureState.dx) >= 8) {
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
  handlePress = () => {
    this.handlePress();
}
  componentDidMount() {}
  

  render() {
    return (
      <SafeAreaView style={Styles.container}>
        
        <TouchableOpacity onPress={this.handlPress}>
          <Text style={Styles.button}>Гүйлгээ</Text>

        </TouchableOpacity>
        
        <View style={Styles.DisplayContainer} {...this.panResponder.panHandlers}>
          <Display display={this.state.display}  />
          
        </View>

        <View style={Styles.buttonContainer}>
          <View style={Styles.buttonRow}>
            <Button onPress={() => {this.onDigitPress('1');}} title="1" color="#0984E3" backgroundColor=''/>
            <Button onPress={() => {this.onDigitPress('2');}} title="2" color="#0984E3"  backgroundColor=''/>
            <Button onPress={() => {this.onDigitPress('3');}} title="3" color="#0984E3"  backgroundColor=''/>
          </View>
          <View style={Styles.buttonRow}>
            <Button onPress={() => {this.onDigitPress('4');}} title1="4" color="#0984E3"  backgroundColor=''/>
            <Button onPress={() => {this.onDigitPress('5');}} title1="5" color="#0984E3"  backgroundColor=''/>
            <Button onPress={() => {this.onDigitPress('6');}} title1="6" color="#0984E3"  backgroundColor=''/>
          </View>
          <View style={Styles.buttonRow}>
            <Button onPress={() => {this.onDigitPress('7');}} title2="7" color="#0984E3"  backgroundColor=''/>
            <Button onPress={() => {this.onDigitPress('8');}} title2="8" color="#0984E3"  backgroundColor=''/>
            <Button onPress={() => {this.onDigitPress('9');}} title2="9" color="#0984E3"  backgroundColor=''/>
          </View>
          <View  style={Styles.buttonRow}>
            
            <Button onPress={() => {this.onDigitPress('0');}} title3="000" color="#0984E3"  backgroundColor=''/>
            <Button onPress={() => {this.onDigitPress('0');}} title3="0" color="#0984E3"  backgroundColor='' />
            <Button onPress={this.onCleanPress} title3="<" color="#0984E3"  backgroundColor=''/>
          </View>
        </View>
        <View style={Styles.BottomBar}>
          <TouchableOpacity 
          style={{ borderWidth: 0, height: 45, width: '42%',  backgroundColor: '#0984E3', alignItems: 'center' }}>
          <Text style={{color: 'white' , fontSize: 20,paddingTop: 5,  textAlign: 'center',}}>Hello</Text>
          </TouchableOpacity>


          <TouchableOpacity   
          style={{borderWidth: 0, height: 45, width: '42%', backgroundColor: '#0984E3', alignItems: 'center' , }}>
          <Text style={{color: 'white' ,fontSize: 20,  paddingTop: 5,textAlign: 'center' }}>World</Text>
          </TouchableOpacity>
        </View>
        
      </SafeAreaView>    
    );
   
  }
  
}

export default InitScreen;

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20
  },
  button:{ 
    justifyContent:'center',
    alignItems:'center',
    fontSize: 21,
    fontWeight: 'bold',
    textAlign:'center',  
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
    flex: 2,
    alignItems:'center',
    justifyContent: 'center',
    paddingBottom: 50,
    
  },
  buttonContainer: {
    paddingBottom: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  
  },  
  BottomBar:{
  flexDirection: 'row',
  justifyContent: 'space-between',
  padding: 7,
  },
  
  
});

