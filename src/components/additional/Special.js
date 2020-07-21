import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  Alert,
} from 'react-native';

let width = Dimensions.get('window').width;
let height = Dimensions.get('window').height;

const Special = props => {
  return (
    <TouchableOpacity
      style={props.style}
      activeOpacity={1}
      onPress={() => Alert.alert(props.title)}>
      <View style={css.img}>
        <Image
          source={props.img}
          style={{
            position: 'absolute',
            height: '100%',
            width: '100%',
            borderRadius: 5,
          }}
        />
      </View>
      <Text style={css.txt}>
        {props.title.length > 22
          ? props.title.slice(0, 18) + '...'
          : props.title}
      </Text>
    </TouchableOpacity>
  );
};

export default Special;

const css = StyleSheet.create({
  txt: {
    fontSize: 12.5,
    marginLeft: 10,
    color: '#383838',
    marginVertical: 7,
  },
  img: {
    width: width * 0.43,
    height: '70%',
    marginTop: 10,
    marginHorizontal: 5,
  },
});
