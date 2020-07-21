<<<<<<< HEAD
import React, {Component} from 'react';
import {Dimensions, ScrollView, Text, SafeAreaView} from 'react-native';
import {View} from 'native-base';

import Loyalty from '../../components/additional/Loyalty';
import Special from '../../components/additional/Special';
import OtherView from '../../components/additional/OtherView';
import Other from '../../components/additional/Other';

class InitScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      headerData: [
        {
          img: require('../../../assets/images/additional/loyalty.jpg'),
          title: 'Loyalty хөтөлбөр',
        },
        {
          img: require('../../../assets/images/additional/virtualCard.jpg'),
          title: 'Виртуал карт',
        },
        {
          img: require('../../../assets/images/additional/wanting.jpg'),
          title: 'Хүслийн жагсаалт',
        },
      ],
      specialData: [
        {
          img: require('../../../assets/images/additional/avlaa.mn.jpg'),
          title: 'Avlaa.mn | Summer sale',
        },
        {
          img: require('../../../assets/images/additional/shoppy.mn.jpg'),
          title: 'Shoppy.mn | Summer sale',
        },
        {
          img: require('../../../assets/images/additional/music.jpg'),
          title: 'Music',
        },
        {
          img: require('../../../assets/images/additional/mandal.jpg'),
          title: 'Мандал даатгал',
        },
        {
          img: require('../../../assets/images/additional/skygo.jpg'),
          title: 'SkyGo, Ori цэнэглэх',
        },
        {
          img: require('../../../assets/images/additional/train.jpg'),
          title: 'Төмөр замын тасалбар',
        },
      ],
      otherData: [
        {
          img: require('../../../assets/images/additional/others/credit-card.png'),
          title: 'Виртуал карт',
        },
        {
          img: require('../../../assets/images/additional/others/water.png'),
          title: 'Хэрэглээний төлбөр',
        },
        {
          img: require('../../../assets/images/additional/others/checklist.png'),
          title: 'Хүслийн жагсаалт',
        },
        {
          img: require('../../../assets/images/additional/others/umbrella.png'),
          title: 'Даатгал',
        },
        {
          img: require('../../../assets/images/additional/others/smartphone.png'),
          title: 'Дата, Нэгж авах',
        },
        {
          img: require('../../../assets/images/additional/others/shopping-bag.png'),
          title: 'Loyalty хөтөлбөр',
        },
        {
          img: require('../../../assets/images/additional/others/cinema.png'),
          title: 'Кино тасалбар',
        },
        {
          img: require('../../../assets/images/additional/others/train.png'),
          title: 'Зорчигч тээвэр',
        },
        {
          img: require('../../../assets/images/additional/others/movie-ticket.png'),
          title: 'Үзвэр үйлчилгээ',
        },
        {
          img: require('../../../assets/images/additional/others/add-shopping-cart.png'),
          title: 'Онлайн дэлгүүр',
        },
        {
          img: require('../../../assets/images/additional/others/nature.png'),
          title: 'Амралт, Зугаалга',
        },
        {
          img: require('../../../assets/images/additional/others/bank.png'),
          title: 'Банкы үйлчилгээ',
        },
        {
          img: require('../../../assets/images/additional/others/profit.png'),
          title: 'Хувьцаа арилжаа',
        },
        {
          img: require('../../../assets/images/additional/others/receive-cash.png'),
          title: 'Хандив',
        },
        {
          img: require('../../../assets/images/additional/others/management.png'),
          title: 'Хамт олон',
        },
      ],
    };
  }

  componentDidMount() {}

  render() {
    let width = Dimensions.get('window').width;
    let height = Dimensions.get('window').height;
    return (
      <SafeAreaView style={{flex: 1}}>
        <ScrollView
          style={{height: (height / 20) * 9}}
          horizontal={true}
          decelerationRate={0.5}
          snapToInterval={width - 35}
          snapToAlignment={'center'}
          showsHorizontalScrollIndicator={false}>
          {this.state.headerData.map((item, idx) => {
            let margin;
            if (idx == 0) margin = {marginLeft: 15};
            else if (idx == this.state.headerData.length - 1)
              margin = {marginRight: 15};
            else margin = null;
            return (
              <Loyalty
                key={idx}
                style={margin}
                img={item.img}
                title={item.title}
              />
            );
          })}
        </ScrollView>
        <View style={{height: (height / 20) * 4.8}}>
          <Text
            style={{
              fontSize: 18,
              marginLeft: 30,
              marginTop: 10,
            }}>
            Онцлох үйлчилгээ
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {this.state.specialData.map((item, idx) => {
              let margin;
              if (idx == 0) margin = {marginLeft: 15};
              else if (idx == this.state.specialData.length - 1)
                margin = {marginRight: 15};
              else margin = null;
              return (
                <Special
                  key={idx}
                  style={margin}
                  img={item.img}
                  title={item.title}
                />
              );
            })}
          </ScrollView>
        </View>
        <View style={{height: (height / 20) * 6.2}}>
          <Text
            style={{
              fontSize: 18,
              marginLeft: 30,
              marginTop: 10,
              marginBottom: 15,
            }}>
            Бусад үйлчилгээ
          </Text>
          <ScrollView
            bounces={false}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            snapToInterval={width}
            snapToAlignment={'center'}>
            <OtherView>
              <Other
                img={this.state.otherData[0].img}
                title={this.state.otherData[0].title}
              />
              <Other
                img={this.state.otherData[1].img}
                title={this.state.otherData[1].title}
              />
              <Other
                img={this.state.otherData[2].img}
                title={this.state.otherData[2].title}
              />
              <Other
                img={this.state.otherData[3].img}
                title={this.state.otherData[3].title}
              />
              <Other
                img={this.state.otherData[4].img}
                title={this.state.otherData[4].title}
              />
              <Other
                img={this.state.otherData[5].img}
                title={this.state.otherData[5].title}
              />
              <Other
                img={this.state.otherData[6].img}
                title={this.state.otherData[6].title}
              />
              <Other
                img={this.state.otherData[7].img}
                title={this.state.otherData[7].title}
              />
            </OtherView>
            <OtherView>
              <Other
                img={this.state.otherData[8].img}
                title={this.state.otherData[8].title}
              />
              <Other
                img={this.state.otherData[9].img}
                title={this.state.otherData[9].title}
              />
              <Other
                img={this.state.otherData[10].img}
                title={this.state.otherData[10].title}
              />
              <Other
                img={this.state.otherData[11].img}
                title={this.state.otherData[11].title}
              />
              <Other
                img={this.state.otherData[12].img}
                title={this.state.otherData[12].title}
              />
              <Other
                img={this.state.otherData[13].img}
                title={this.state.otherData[13].title}
              />
              <Other
                img={this.state.otherData[14].img}
                title={this.state.otherData[14].title}
              />
            </OtherView>
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}

export default InitScreen;
=======
import React, { Component } from "react";
import { Dimensions, View, Text, SafeAreaView } from "react-native";

class InitScreen extends Component {

    constructor(props) {
        super(props);

        this.state = {
        };
    }

    componentDidMount() {
    }

    render() {
        let width = Dimensions.get('window').width
        let height = Dimensions.get('window').height
        return (
            <SafeAreaView>
                <Text>Additional Screen</Text>
            </SafeAreaView>
        )
    }

}

export default InitScreen;
>>>>>>> 236c4a4eb6ad2d3a71190f4fe99cf8452f30b867
