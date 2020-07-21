import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  Alert,
  TouchableOpacity,
} from 'react-native';

let width = Dimensions.get('window').width;
let height = Dimensions.get('window').height;

const Loyalty = props => {
  return (
    <TouchableOpacity
      style={[
        {
          height: '100%',
          width: width - 40,
          justifyContent: 'space-around',
          marginHorizontal: 5,
        },
        props.style,
      ]}
      onPress={() => Alert.alert(props.title)}
      activeOpacity={1}>
      <Text style={css.txt}>{props.title}</Text>
      <View style={css.img}>
        <Image
          source={props.img}
          style={{
            position: 'absolute',
            height: '100%',
            width: '100%',
            borderRadius: 10,
          }}
        />
      </View>
    </TouchableOpacity>
  );
};

export default Loyalty;

const css = StyleSheet.create({
  txt: {
    fontSize: 18,
    marginLeft: 15,
  },
  img: {
    height: '80%',
  },
});
