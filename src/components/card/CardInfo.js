import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Modal,
  Dimensions,
  Animated,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {CONSTANTS} from '../../constants/Constants';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

class CardInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpacity: new Animated.Value(0),
      selectedItem: 0,
      iconInfo: [
        {
          title: 'Интернэт',
          image: require('../../../assets/images/cardinfo/internet.png'),
          desc:
            'Виртуал картын дугаар дуусах огноо CVV кодыг ашиглан олон улсын интернэт худалдан авалт хийх боломжтой. /Amazon Appstore eBay PayPal гэх мэт/ Тохиргоо товчлуур дээр дарж картын бүрэн мэдээллээ хараарай.',
        },
        {
          title: 'Дэлгүүр',
          image: require('../../../assets/images/cardinfo/shop.png'),
          desc:
            'SocialPay төлбөр төлөх боломжтой гэсэн наалт бүхий дэлгүүр салбаруудад гар утаснаасаа энэ картаа ашиглан төлбөр төлөх боломжтой.',
        },
        {
          title: 'Онлайн',
          image: require('../../../assets/images/cardinfo/online.png'),
          desc:
            'Монголын интернэт вэб сайтууд болон апп-уудаас худалдан авалт хийхдээ SocialPay эсвэл Голомт банкыг сонгон гар утаснаасаа энэ картаа сонгон төлбөр төлөх боломжтой. Та дараах баталгаажуулах товчийг дарж баталгаажуулснаар таны картын интернэтээр гүйлгээ хийх эрх нээгдэх болно.',
        },
        {
          title: 'NFC',
          image: require('../../../assets/images/cardinfo/nfc.png'),
          desc:
            'Олон улсад болон Монголд бүх банкны ПОС дээр ашиглах NFC контактлесс Мобайл төлбөр тооцоо судалгаа хөгжүүлэлт хийгдэж байна.',
        },
      ],
    };
  }
  // * Item description handler
  changeItem = index => {
    this.refs.cardScrollView.scrollTo({x: width * index, y: 0});
    let {selectedItem} = this.state;
    selectedItem = index;
    this.setState({...this.state, selectedItem: selectedItem});
  };
  // * Modal toggle handler
  showModal = value => {
    Animated.timing(this.state.modalOpacity, {
      toValue: value ? 1 : 0,
      duration: 400,
      useNativeDriver: true,
    }).start();
  };

  render() {
    if (this.props.visible == true) {
      this.showModal(true);
    } else {
      this.showModal(false);
    }
    return (
      <Modal visible={this.props.visible} transparent={true}>
        <Animated.View
          style={{
            flex: 1,
            justifyContent: 'flex-end',
            alignItems: 'center',
            opacity: this.state.modalOpacity,
          }}>
          <TouchableOpacity
            style={{position: 'absolute', left: 5, top: 5, padding: 10}}
            onPress={this.props.closeCardInfo}>
            <Icon name="times" size={20} color="#adadad" />
          </TouchableOpacity>
          <View style={styles.modalView}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                marginTop: 30,
              }}>
              {this.state.iconInfo.map((item, idx) => {
                return (
                  <TouchableOpacity
                    key={idx}
                    onPress={() => this.changeItem(idx)}>
                    <View
                      style={{
                        backgroundColor:
                          this.state.selectedItem == idx
                            ? 'rgba(' + CONSTANTS.color.darkrgb + ',0.1)'
                            : null,
                        borderColor:
                          this.state.selectedItem == idx
                            ? 'rgba(' + CONSTANTS.color.darkrgb + ',1)'
                            : '#4a4a4a',
                        borderRadius: 50,
                        borderWidth: 1,
                        width: 60,
                        height: 60,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Image
                        source={item.image}
                        style={{height: 30, width: 30}}
                      />
                    </View>
                    <Text
                      style={{
                        fontWeight: 'bold',
                        fontSize: 14,
                        marginTop: 5,
                        textAlign: 'center',
                        color:
                          this.state.selectedItem == idx
                            ? CONSTANTS.color.dark
                            : '#4a4a4a',
                      }}>
                      {item.title}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
            <ScrollView
              ref="cardScrollView"
              style={{marginTop: 40}}
              horizontal
              showsHorizontalScrollIndicator={false}>
              {this.state.iconInfo.map((item, idx) => {
                return (
                  <View style={{width: width}} key={idx}>
                    <Text
                      style={{
                        color: '#4a4a4a',
                        fontSize: 14,
                        marginHorizontal: 25,
                        textAlign: 'justify',
                      }}>
                      {item.desc}
                    </Text>
                  </View>
                );
              })}
            </ScrollView>
          </View>
        </Animated.View>
      </Modal>
    );
  }
}

export default CardInfo;

const styles = StyleSheet.create({
  modalView: {
    backgroundColor: '#fff',
    width: width,
    height: height - (width * 180) / 300 - 20,
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.5,
    shadowRadius: 30,
    elevation: 5,
  },
});
