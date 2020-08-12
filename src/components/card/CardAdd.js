import React, {Component} from 'react';
import {
  StyleSheet,
  Animated,
  Modal,
  TouchableOpacity,
  Text,
  View,
} from 'react-native';

const s = StyleSheet.create({
  switch: {
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  container: {
    backgroundColor: '#F5F5F5',
    marginTop: 60,
  },
  label: {
    color: 'black',
    fontSize: 12,
  },
  input: {
    fontSize: 16,
    color: 'black',
  },
});

export default class CardAdd extends Component {
  state = {modalOpacity: new Animated.Value(0)};

  // * Modal toggle animation function

  showModal = value => {
    Animated.timing(this.state.modalOpacity, {
      toValue: value ? 1 : 0,
      duration: 400,
      useNativeDriver: true,
    }).start();
  };

  render() {
    // * Modal toggle condition depends on Parent button effect
    if (this.props.visible == true) {
      this.showModal(true);
    } else {
      this.showModal(false);
    }
    return (
      <Modal visible={this.props.visible} transparent={true}>
        <Animated.View
          style={[
            s.container,
            {
              opacity: this.state.modalOpacity,
              width: '100%',
              height: '100%',
              translateY: -60,
              paddingTop: 20,
            },
          ]}>
          <View
            autoFocus
            requiresName
            requiresCVC
            labelStyle={s.label}
            inputStyle={s.input}
            validColor={'black'}
            invalidColor={'red'}
            placeholderColor={'darkgray'}
          />
          <View
            style={{
              width: '100%',
              height: '100%',
              alignItems: 'center',
              justifyContent: 'flex-end',
            }}>
            <TouchableOpacity
              style={{
                backgroundColor: '#2ecc71',
                marginBottom: 10,
                width: 200,
                borderRadius: 5,
              }}
              onPress={this.props.closeCardInfo}>
              <Text
                style={{
                  color: '#fff',
                  paddingVertical: 12,
                  textAlign: 'center',
                  textTransform: 'uppercase',
                  fontSize: 14,
                }}>
                Холбох
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: '#3498db',
                width: 200,
                borderRadius: 5,
              }}
              onPress={this.props.closeCardInfo}>
              <Text
                style={{
                  color: '#fff',
                  paddingVertical: 12,
                  textAlign: 'center',
                  textTransform: 'uppercase',
                  fontSize: 14,
                }}>
                Гарах
              </Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </Modal>
    );
  }
}
