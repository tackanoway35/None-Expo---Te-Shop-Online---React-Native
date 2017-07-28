import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import {
    Container,
    Header,
    Left,
    Body,
    Button,
    Text,
    Icon,
    Right,
    Content,
    Title
} from 'native-base';

export default class ScrathchCard extends Component
{
    static navigationOptions = ( { navigation } ) => ({
        header : (
            <Header>
                <Left>
                    <Button
                        onPress = {() => navigation.goBack()}
                    >
                        <Icon name="arrow_back"/>
                    </Button>
                </Left>
                <Body>
                    <Title>Scratch Card</Title>
                </Body>
            </Header>
        )
    })
    render(){
        return(
            <View>

            </View>
        )
    }
}