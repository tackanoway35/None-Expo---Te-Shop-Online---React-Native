import React, { Component } from 'react';
import { Image, View, ScrollView, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import {
    Container,
    Header,
    Left,
    Button,
    Icon,
    Body,
    Title,
    Right,
    Content,
    Text
} from 'native-base';
import { FormattedNumber } from 'react-native-globalize';

import { connect } from 'react-redux';
import * as actionCreators from '../../../Redux/actionCreators';

class TopProduct extends Component {
    async getTopProductDetail(productId, productTitle) {
        await this.props.thunkGetTopProductDetail(productId);
        this.props.navigation.navigate("ProductDetail", { productTitle });
    }

    render() {
        //URL server
        const url = 'http://webbase.com.vn/ceramic';
        //Props Variable
        const { topProducts } = this.props;
        //Style Variable
        const { tp, tpTitle, tpContent, tpProduct, tpImage } = styles;
        return (
            <View style={tp}>
                <View style={tpTitle}>
                    <Text style={{ fontSize: 18 }}>TOP PRODUCT</Text>
                </View>

                <View style={tpContent}>
                    {
                        topProducts.map((item) => (
                            <TouchableOpacity
                                key={item.id}
                                style={tpProduct}

                                onPress={() => this.getTopProductDetail(item.id, item.title)}
                            >
                                <Image source={{ uri: url + item.image }} style={tpImage} />
                                <Text style={{ fontWeight: '500', fontSize: 16 }}>{item.title}</Text>
                                <View style = {{ alignItems : 'center'}}>
                                    <FormattedNumber
                                        style={{ fontSize: 14 }}
                                        value={item.price}
                                    />
                                    <Text style={{ fontSize: 14 }}>&nbsp;VNĐ</Text>
                                </View>
                            </TouchableOpacity>
                        ))}
                </View>
            </View>
        );
    }
}

const { width, height } = Dimensions.get('window');
const productWidth = (width - 50) / 2;
const imageProductHeight = (productWidth * 452) / 361;
var styles = StyleSheet.create({
    tp: {
        padding: 10,
        paddingTop: 0,
        backgroundColor: '#FFF',
        margin: 10,
        marginBottom: 0
    },
    tpTitle: {
        justifyContent: 'center',
        height: 50,
        paddingLeft: 10
    },
    tpContent: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        flexWrap: 'wrap'
    },
    tpProduct: {
        width: productWidth,
        alignItems: 'center',
        marginBottom: 10
    },
    tpImage: {
        width: productWidth,
        height: imageProductHeight
    }
})

export default connect(null, actionCreators)(TopProduct)