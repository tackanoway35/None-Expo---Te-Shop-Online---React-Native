import React, { Component } from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';
import {
    Container,
    Header,
    Left,
    Button,
    Icon,
    Title,
    Text,
    Body,
    Right,
} from 'native-base';
import imageCollection from '../../../Upload/images/banner.jpg';
export default class Collection extends Component {
    render() {
        const { collection, collectionImage, collectionTitle } = styles;
        return (
            <View style={collection}>
                <View style={collectionTitle}>
                    <Text style={{ fontSize: 14 }}>SPRING COLLECTION</Text>
                </View>

                <View style={collectionImage}>
                    <Image source={imageCollection} style={{ width: imageContentWidth, height: imageContentHeight }} />
                </View>
            </View>
        )
    }
}

const { width, height } = Dimensions.get('window');
const imageContentWidth = width - 40;
const imageContentHeight = (imageContentWidth / 933) * 465;

var styles = StyleSheet.create({
  collection: {
    padding: 10,
    paddingTop: 0,
    height: height * 0.34,
    backgroundColor: '#FFF',
    margin: 10,
    marginBottom : 0
  },
  collectionTitle: {
    justifyContent: 'center',
    flex: 1
  },
  collectionImage: {
    flex: 4,
  }
})