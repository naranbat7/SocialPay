import React, { Component } from "react";
import { Dimensions, View, Text, SafeAreaView, ScrollView } from "react-native";
import { Container } from "native-base";

import GlobalStyle from "../../constants/GlobalStyle";

import { Card } from "../../components/Card";

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
            <SafeAreaView >
                <ScrollView
                    bounces={false}
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                >
                    <View style={{ width: width, paddingLeft: 20, paddingRight: 20 }}>
                        <Card />
                    </View>
                    <View style={{ width: width, paddingLeft: 20, paddingRight: 20 }}>
                        <Card />
                    </View>
                </ScrollView>
            </SafeAreaView>
        )
    }

}

export default InitScreen;