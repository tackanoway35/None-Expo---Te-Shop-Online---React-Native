import React, { Component } from 'react';
import { View, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import {
    Container,
    Icon,
    DeckSwiper,
    Card,
    CardItem,
    Thumbnail,
    Text,
    Left,
    Body,
    Button
} from 'native-base';

import Swiper from 'react-native-swiper';

export default class Categories extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visibleSwiper: false
        }
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({
                visibleSwiper: true
            });
        }, 100);
    }

    render() {
        //URL server
        const server = 'http://webbase.com.vn/ceramic';
        //Props variable
        const { categories } = this.props;
        //Set Swiper
        let swiper = null;

        if (categories.length > 0 && this.state.visibleSwiper) {
            swiper =
                <Swiper width={categorySlideWidth} height={categorySlideHeight} removeClippedSubviews={false}>
                    {categories.map((item) => (
                        <TouchableOpacity
                            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
                            key={item.id}
                            onPress={() => this.props.navigation.navigate('ListProduct', { category : item })}
                        >
                            <Image source={{ uri: server + item.image }} style={{ width: categorySlideWidth, height: categorySlideHeight, justifyContent: 'center', alignItems: 'center', }}>
                                <Text style={{ color: 'green' }}>
                                    {item.title}
                                </Text>
                            </Image>
                        </TouchableOpacity>
                    ))}
                </Swiper>;
        } else {
            swiper = <View></View>
        }


        const { categories_wrapper, categoriesSlide, categoriesTitle, categoriesImageSlide, categoriesTextSlide } = styles;
        return (
            <View style={categories_wrapper}>
                <View style={categoriesTitle}>
                    <Text style={{ fontSize: 16 }}>LIST OF CATEGORY</Text>
                </View>
                <View style={categoriesSlide}>
                    {swiper}
                </View>
            </View>
        )
    }
}

const { width, height } = Dimensions.get('window');
const categorySlideWidth = width - 40;
const categorySlideHeight = (categorySlideWidth / 2);
var styles = StyleSheet.create({
    categories_wrapper: {
        padding: 10,
        paddingTop: 0,
        height: height * 0.34,
        backgroundColor: '#FFF',
        margin: 10
    },
    categoriesTitle: {
        justifyContent: 'center',
        flex: 1
    },
    categoriesSlide: {

        flex: 4,
    },

})
