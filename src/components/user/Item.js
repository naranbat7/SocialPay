import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  CheckBox,
  Modal,
} from 'react-native';
import SocialPinChecker from '../../screen/SocialPinChecker';
import SocialPinConnect from '../../screen/SocialPinConnect';
import Icon from 'react-native-vector-icons/dist/FontAwesome5';
import {CONSTANTS} from '../../constants/Constants';

const Item = props => {
  const [isSelected, setSelected] = useState(false);
  const [isPinChecker, setPinChecker] = useState(false);
  const [isPinConnect, setPinConnect] = useState(false);

  const showPinConnect = () => {
    setPinConnect(true);
    setPinChecker(false);
  };

  return (
    <View style={styles.container}>
      <Icon name="circle" size={25} style={styles.circle} />
      <Icon
        name={props.icon}
        size={props.size}
        style={[styles.ico, props.style]}
      />
      <Text style={styles.txt}>{props.text}</Text>
      {props.id == 'fingerprint' ? (
        <TouchableOpacity
          style={[styles.right, {width: 20, backgroundColor: '#fff'}]}
          onPress={() => {
            Alert.alert(props.text);
          }}>
          <CheckBox
            value={isSelected}
            onValueChange={setSelected}
            style={{right: 10}}
          />
        </TouchableOpacity>
      ) : null}
      {props.id == 'socialPin' ? (
        <TouchableOpacity
          style={[styles.right, {width: 20, backgroundColor: '#fff'}]}
          onPress={() => {
            setPinChecker(true);
          }}>
          <Icon name="chevron-right" solid size={15} style={styles.chevron} />
        </TouchableOpacity>
      ) : null}
      {props.number == null && props.id == undefined ? (
        <TouchableOpacity style={styles.right} onPress={props.func}>
          <Text style={[styles.number, {marginLeft: 40, color: '#1068FF'}]}>
            Холбох
          </Text>
          <Icon name="chevron-right" solid size={15} style={styles.chevron} />
        </TouchableOpacity>
      ) : null}
      {props.number != null && props.id == undefined ? (
        <TouchableOpacity
          style={[styles.right, props.style]}
          onPress={props.func}>
          <Icon name="check-circle" solid size={15} style={styles.check} />
          <Text style={styles.number}>{props.number}</Text>
          <Icon name="chevron-right" solid size={15} style={styles.chevron} />
        </TouchableOpacity>
      ) : null}
      <Modal visible={isPinChecker} animationType="slide">
        <SocialPinChecker ifCorrect={() => showPinConnect()} />
      </Modal>
      <Modal visible={isPinConnect} animationType="slide">
        <SocialPinConnect then={() => setPinConnect(false)} />
      </Modal>
    </View>
  );
};

export default Item;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    borderBottomWidth: 0.7,
  },
  right: {
    position: 'absolute',
    right: 5,
    width: 127,
    height: '60%',
    justifyContent: 'center',
    backgroundColor: '#E5E5E5',
    borderRadius: 5,
  },
  txt: {
    position: 'absolute',
    fontSize: 14,
    marginLeft: 50,
    color: '#363636',
  },
  ico: {
    position: 'absolute',
    color: CONSTANTS.color.dark,
    marginLeft: 16,
  },
  circle: {
    color: CONSTANTS.color.dark,
    marginLeft: 10,
    paddingVertical: 7,
  },
  check: {
    position: 'absolute',
    color: '#00C23A',
    marginLeft: 5,
  },
  chevron: {
    position: 'absolute',
    color: '#AEAEAE',
    right: 5,
  },
  number: {
    position: 'absolute',
    fontSize: 12,
    marginLeft: 25,
    color: '#363636',
  },
});
