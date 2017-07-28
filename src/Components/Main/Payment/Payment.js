import React, { Component } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import {
    Header,
    Container,
    Content,
    Left,
    Body,
    Title,
    Button,
    Icon,
    Text,
    Card,
    CardItem,
    Right
} from 'native-base';

import WebViewBridge from 'react-native-webview-bridge';

import { connect } from 'react-redux';

import scratchCardIcon from '../../../Upload/images/icons8-Barcode-64.png';
import localCardIcon from '../../../Upload/images/icons8-DebitCard-64.png';
import creditCardIcon from '../../../Upload/images/icons8-CreditCard-64.png';

class Payment extends Component {
    static navigationOptions = ({ navigation }) => ({
        header: (
            <Header>
                <Left>
                    <Button
                        onPress={() => navigation.goBack()}
                    >
                        <Icon name='arrow-back' />
                    </Button>
                </Left>
                <Body>
                    <Title>
                        Payment
                    </Title>
                </Body>
                <Right />
            </Header>
        )
    })

    componentDidMount() {
        //Get information
        const { totalPrice } = this.props.navigation.state.params;
        const { name, admin_id, address, email } = this.props.profile;
        const { webviewbridge } = this.refs;
        //Send data to Web View Server
        setTimeout(() => {
            if (admin_id !== undefined) {
                let data = {
                    fullName: name,
                    email: email,
                    address: address,
                    total_amount: totalPrice,
                    tel: '01652880097'
                }

                webviewbridge.sendToBridge(JSON.stringify(data));
            }
        }, 1000)
    }

    //Function when Web server send message to react native
    onBridgeMessage(message) {
        const { webviewbridge } = this.refs;

        switch (message) {
            case "hello from webview":
                console.log("Received message from Web Server");
                break;
            case "change success":
                console.log("Change value input successfull");
                break;
        }
    }

    render() {
        //Style
        const { content } = styles;

        return (
            <WebViewBridge
                ref="webviewbridge"
                onBridgeMessage={this.onBridgeMessage.bind(this)}
                source={{ uri: "http://webbase.com.vn/ceramic/order" }} />
        )
    }
}

const styles = StyleSheet.create({
    content: {
        margin: 5
    }
})

function mapStateToProps(state) {
    return {
        profile: state.signIn.profile
    }
}

export default connect(mapStateToProps)(Payment);