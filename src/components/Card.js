import React from "react";
import { Dimensions, View, Text, ImageBackground } from 'react-native';

import Icon from 'react-native-vector-icons/dist/MaterialIcons';

import { CONSTANTS } from "../constants/Constants";
import GlobalStyle from "../constants/GlobalStyle";

var { height, width } = Dimensions.get('window');

const Card = props => {
    return (
        <View style={{
            height: 180,
        }}>
            <ImageBackground style={{
                flex: 1,
                resizeMode: 'cover',
                padding: 25
            }}
                blurRadius={1}
                borderRadius={25}
                source={require('../../assets/images/card-bg.png')}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    {/* <Text style={[GlobalStyle.fontRegular, { fontSize: 24, color: '#fff' }]}>Карт</Text> */}
                    <View style={{
                        paddingLeft: 5,
                        paddingRight: 5,
                        borderRadius: 10,
                        borderWidth: 1,
                        borderColor: '#fff'
                    }}>
                        <Icon name="blur-on" size={30}
                            style={[{
                                fontWeight: 'bold',
                                color: '#fff',
                            }]} />
                    </View>
                    <Text style={[GlobalStyle.fontRegular, { fontSize: 30, color: '#fff' }]}>ePass</Text>
                </View>
                <View style={{
                    position: 'absolute',
                    bottom: 0,
                    padding: 25
                }}>
                    <Text style={[GlobalStyle.fontRegular, { fontSize: 14, color: '#fff' }]}>
                        {props.cardNumber}
                    </Text>
                    {
                        props.amount ?
                            <Text style={[GlobalStyle.fontRegular, { fontSize: 22, color: '#fff' }]}>
                                {props.amount} ₮
                            </Text> : null
                    }
                </View>
            </ImageBackground>
        </View>
    );
};

export { Card };