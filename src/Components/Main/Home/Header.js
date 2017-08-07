import React, { Component } from 'react';
import { View, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';

import { FormattedNumber } from 'react-native-globalize';

import {
    Header, Left, Button, Icon, Body, Title,
    Right, Item, Input, Text
} from 'native-base';

import products from '../../../Data/products.json';

//Redux
import { connect } from 'react-redux';
import * as actionCreator from '../../../Redux/actionCreators';
const server = "http://webbase.com.vn/ceramic/";

class HeaderComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            txtSearch: "",
            searchResult: []
        }
    }

    _keyExtractor = (item, index) => item.id;

    async showProductDetail(productId, productTitle) {
        await this.props.thunkGetTopProductDetail(productId);
        this.props.navigation.navigate("ProductDetail", { productTitle });
    }

    search(txtSearch) {
        this.setState({
            txtSearch
        }, () => {
            let result = products.filter((product) => {
                return product.title.toLowerCase().indexOf(this.state.txtSearch.toLowerCase()) > -1 && product.status == 1 && this.state.txtSearch != '';
            });
            this.setState({
                searchResult: result
            })
        });
    }
    render() {
        //Style
        const {
            wrapperSearchResult, wrapperDetail, txtTitle,
            txtPrice, imgProduct, wrapperTitlePrice, flatListSearchResult,
            titleSearchResult, headerSearchResult
        } = styles;

        var result = <View></View>
        if (this.state.searchResult.length > 0 && this.state.txtSearch != '') {
            result = <View>
                <View style={headerSearchResult}>
                    <View style={{ flex: 8 }}>
                        <Text style={titleSearchResult}>{`Tìm thấy ${this.state.searchResult.length} sản phẩm`}</Text>
                    </View>

                    <View style={{ flex: 3, backgroundColor: '#fff' }}>
                        <Button
                            danger
                            small
                            onPress={() => this.setState({
                                txtSearch: '',
                                searchResult: []
                            })}
                        >
                            <Text>Close</Text>
                        </Button>
                    </View>
                </View>


                <FlatList
                    style={flatListSearchResult}
                    data={this.state.searchResult}
                    keyExtractor={this._keyExtractor}
                    renderItem={({ item }) => (
                        <View style={wrapperSearchResult}>
                            <Image style={imgProduct} source={{ uri: server + item.image }} />
                            <View style={wrapperDetail}>
                                <View style={wrapperTitlePrice}>
                                    <Text style={StyleSheet.flatten(txtTitle)}>{`${item.title} - `}</Text>
                                    <FormattedNumber
                                        value={item.price}
                                        style={txtPrice}
                                    />
                                    <Text>&nbsp;VNĐ</Text>
                                </View>

                                <View>
                                    <Button
                                        success
                                        small
                                        onPress={() => this.showProductDetail(item.id, item.title)}
                                    >
                                        <Text>SHOW DETAIL</Text>
                                        <Icon name='arrow-forward' />
                                    </Button>
                                </View>
                            </View>
                        </View>
                    )}
                />
            </View>
        } else if (this.state.searchResult.length == 0 && this.state.txtSearch != '')
        {
            result = <View>
                <Text style = {{ color : 'red', fontSize : 20, textAlign : 'center', backgroundColor : '#fff' }}>Không tìm thấy sản phẩm nào</Text>
            </View>
        }
        return (
            <View>
                <Header searchBar rounded>
                    <Left style={{ flex: 1 }}>
                        <Button onPress={() => this.props.navigation.navigate('DrawerOpen')}>
                            <Icon name="menu" />
                        </Button>
                    </Left>

                    <Item style={{ flex: 6 }}>
                        <Icon name="ios-search" />
                        <Input
                            placeholder="What do you want to buy?"
                            onChangeText={(txtSearch) => this.search(txtSearch)}
                            value={this.state.txtSearch}
                        />
                    </Item>
                </Header>
                {
                    result
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    flatListSearchResult: {
        marginBottom: 10,
        padding: 5,
        backgroundColor: '#fff',
        height: 275,
        paddingVertical: 10
    },
    wrapperSearchResult: {
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'row',
        marginBottom: 5,
        paddingBottom: 5
    },
    imgProduct: {
        flex: 1,
        width: 40,
        height: 80
    },
    wrapperDetail: {
        flex: 3,
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    wrapperTitlePrice: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    txtPrice: {
        fontSize: 17,
        justifyContent: 'center',
        color: 'black'
    },
    headerSearchResult: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        height: 35,
        alignItems: 'center'
    },
    titleSearchResult: {
        fontSize: 20,
        textAlign: 'center',
        color: 'orange',
        backgroundColor: '#fff'
    }
})

export default connect(null, actionCreator)(HeaderComponent);