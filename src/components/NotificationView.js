import React from 'react';
import {Text, Animated, View, Image, TouchableOpacity} from 'react-native';

// * Notification Overlay start
// TODO -- Make another component

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
// * Notification Overlay End

export default NotificationView;
