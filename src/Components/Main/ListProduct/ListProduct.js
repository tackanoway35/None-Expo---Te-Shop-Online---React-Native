import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, Image, TouchableOpacity, FlatList } from 'react-native';
import {
    Container,
    Content,
    Header,
    Left,
    Button,
    Icon,
    Body,
    Title,
    Right,
    Text,
    List,
    ListItem
} from 'native-base';

import { FormattedNumber } from 'react-native-globalize';

import { getApi } from '../../../Services/Api/getApi';

//Redux
import { connect } from 'react-redux';
import * as actionCreators from '../../../Redux/actionCreators';

const server = "http://webbase.com.vn/ceramic";

class ListProduct extends Component {
    static navigationOptions = ({ navigation }) => ({
        header: (
            <Header style = {{ height : 50 }}>
                <Left>
                    <Button
                        transparent
                        onPress={() => navigation.goBack()}
                    >
                        <Icon name="arrow-back" />
                    </Button>
                </Left>
                <Body>
                    <Title>
                        {navigation.state.params.category.title}
                    </Title>
                </Body>
                <Right />
            </Header>
        )
    });

    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            refreshing: false,
            productsByCategory: []
        }
    }

    componentDidMount() {
        //State param navigation
        const { category } = this.props.navigation.state.params;
        let url = 'http://webbase.com.vn/ceramic/product-api/get-product-by-category/' + category.id + '?page=1';
        getApi(url)
            .then(res => {
                this.setState({
                    productsByCategory: res
                })
            })
            .catch(e => console.log(e))
    }

    loadMoreProduct() {
        if (this.state.productsByCategory.length > 0) {
            const { category } = this.props.navigation.state.params;
            let newPage = this.state.page + 1;
            let url = 'http://webbase.com.vn/ceramic/product-api/get-product-by-category/' + category.id + '?page=' + newPage;
            getApi(url)
                .then(res => {
                    this.setState({
                        productsByCategory: this.state.productsByCategory.concat(res),
                        page: newPage
                    })
                })
                .catch(e => console.log(e))
        }
    }

    async goToProductDetail(productId, productTitle) {
        await this.props.thunkGetTopProductDetail(productId);
        this.props.navigation.navigate("ProductDetail", { productTitle });
    }

    _keyExtractor = (item, index) => item.id;

    render() {
        //Style
        const {
            container, wrapper, title, productPrice, wrapperFlatList,
            textTitle, content, imageProduct,
            information, lastInformation, image,
            txtName, txtPrice, txtMaterial, txtColor, txtShowDetail
        } = styles;
        //Props
        const { category } = this.props.navigation.state.params;
        return (
            <Container>
                <Content style={StyleSheet.flatten(container)}>
                    <View style={wrapper}>

                        {/*Title*/}
                        <View style={title}>
                            <Text style={StyleSheet.flatten(textTitle)}>{category.title}</Text>
                        </View>
                        {/*End title*/}

                        <View style = {wrapperFlatList}>
                            <FlatList
                                onEndReachedThreshold={0.3}
                                onEndReached={() => this.loadMoreProduct()}
                                data={this.state.productsByCategory}
                                renderItem={({ item }) => (
                                    <View style={content}>
                                        <View style={imageProduct}>
                                            <Image style={image} source={{ uri: `${server}${item.image}` }} />
                                        </View>
                                        <View style={information}>
                                            <Text style={StyleSheet.flatten(txtName)}>{item.title}</Text>
                                            <View style={productPrice}>
                                                <FormattedNumber
                                                    style={txtPrice}
                                                    value={item.price}
                                                />
                                                <Text style={StyleSheet.flatten(txtPrice)}>&nbsp;VNĐ</Text>
                                            </View>

                                            <View style={lastInformation}>
                                                <Text style={StyleSheet.flatten(txtMaterial)}>{item.brand}</Text>
                                                <TouchableOpacity
                                                    onPress={() => this.goToProductDetail(item.id, item.title)}
                                                >
                                                    <Text style={StyleSheet.flatten(txtShowDetail)}>SHOW DETAILS</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </View>
                                )}
                                keyExtractor={this._keyExtractor}
                            />
                        </View>
                    </View>
                </Content>
            </Container>
        );
    }
}

const { height } = Dimensions.get('window');
const contentHeight = height - 100;
const flatListHeight = contentHeight - 46 - 35;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f4f1e6',
    },
    wrapper: {
        flex: 1,
        margin: 8,
        backgroundColor: '#fff'
    },
    wrapperFlatList : {
        flex : 1,
        height : flatListHeight
    },

    title: {
        justifyContent: 'center',
        alignItems : 'center',
        height : 30
    },
    textTitle: {
        textAlign: 'center',
        color: 'red',
        fontSize: 20
    },
    content: {
        paddingVertical: 10,
        flexDirection: 'row',
        borderColor: 'blue',
        borderWidth: 1,
        marginBottom: 5
    },
    imageProduct: {
        paddingLeft: 5
    },
    image: {
        width: 90,
        height: (90 * 452) / 361
    },
    lastInformation: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    information: {
        flex: 1,
        justifyContent: 'space-between',
        paddingLeft: 10
    },
    txtName: {
        color: '#BCBCBC',
        fontSize: 18,
        fontWeight: '500',

    },
    productPrice: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    txtPrice: {
        color: 'red'
    },
    txtMaterial: {
        fontWeight: '600'
    },
    txtColor: {
    },
    txtShowDetail: {
        paddingRight: 5,
        color: 'red'
    }
})

export default connect(null, actionCreators)(ListProduct)