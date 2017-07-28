import React, { Component } from 'react';
import {
    View, Text, StyleSheet,
    Image, Dimensions, ScrollView,
    TouchableOpacity, Animated, Easing
} from 'react-native';
import { FormattedNumber } from 'react-native-globalize';

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
    Card,
    CardItem,
    Thumbnail,
} from 'native-base';

import { connect } from 'react-redux';
import * as actionCreators from '../../../Redux/actionCreators';
const server = 'http://webbase.com.vn/ceramic';

class ProductDetail extends Component {
    static navigationOptions = ({ navigation }) => ({
        header: (
            <Header>
                <Left style={{ flex: 1 }}>
                    <Button onPress={() => navigation.goBack()}>
                        <Icon name="arrow-back" />
                    </Button>
                </Left>
                <Body style={{ flex: 3 }}>
                    <Title>{navigation.state.params.productTitle}</Title>
                </Body>
                <Right style={{ flex: 1 }}>
                </Right>
            </Header>
        )
    })

    constructor(props) {
        super(props);
        this.state = {
            productPrice: new Animated.Value(-700),
            productQuantity: new Animated.Value(0)
        }
    }

    componentDidMount() {
        const aniPrice = Animated.timing(
            this.state.productPrice,
            {
                toValue: 0,
                duration: 1500,
                easing: Easing.bounce
            }
        )
        const aniQuantity = Animated.timing(
            this.state.productQuantity,
            {
                toValue: 1,
                duration: 2000,
                easing: Easing.bounce
            }
        )
        Animated.stagger(1000, [aniPrice, aniQuantity]).start();
    }

    addThisProductToCart() {
        let productToArray = [];
        productToArray[0] = {
            product: this.props.topProductDetail,
            quantity: 1
        };
        this.props.thunkAddToCart(productToArray);
    }


    render() {
        //Style Variable
        const {
            wrapper, content, productImage, textCart, image,
            productName, productPrice
        } = styles;

        //Animated variable
        const marginLeft = this.state.productPrice;
        const opacity = this.state.productQuantity;

        const { topProductDetail } = this.props;
        return (
            <Container style={StyleSheet.flatten(wrapper)}>
                <Content style={StyleSheet.flatten(content)}>
                    <Card>
                        <Animated.View style = {{ opacity }}>
                            <CardItem>
                                {
                                    topProductDetail.stock.quantity == 0
                                        ?
                                        <Left>
                                            <Body style = {{ alignItems : 'center'}}>
                                                <Text style = {{ color: 'red', fontSize : 18, fontWeight : "500" }}>Hết hàng</Text>
                                            </Body>
                                            <Button
                                                iconLeft
                                                success
                                                disabled
                                                onPress={() => this.addThisProductToCart()}
                                            >
                                                <Icon name='cart' />
                                                <Text style={textCart}>Add To Cart</Text>
                                            </Button>
                                        </Left>
                                        :
                                        <Left>
                                            <Body style = {{ alignItems : 'center'}}>
                                                <Text style = {{ fontSize : 18, fontWeight : "500", color: 'green'}}>{`Còn ${topProductDetail.stock.quantity} sản phẩm`}</Text>
                                            </Body>

                                            <Button
                                                iconLeft
                                                success
                                                onPress={() => this.addThisProductToCart()}
                                            >
                                                <Icon name='cart' />
                                                <Text style={textCart}>Add To Cart</Text>
                                            </Button>
                                        </Left>
                                }
                            </CardItem>
                        </Animated.View>

                        <CardItem cardBody>
                            <ScrollView style={productImage} horizontal>
                                {this.props.topProductDetail.photos.map((item) => (
                                    <Image
                                        key={item.photo_id}
                                        source={{ uri: server + item.image }}
                                        style={image}
                                    />
                                ))}
                            </ScrollView>
                        </CardItem>
                        <Animated.View style={{ marginLeft }}>
                            <CardItem style={{ backgroundColor: 'orange', justifyContent: 'center' }}>
                                <Text style={productName}>{topProductDetail.title} / </Text>
                                <FormattedNumber
                                    value={topProductDetail.price}
                                />
                                <Text>&nbsp;VNĐ</Text>
                            </CardItem>
                        </Animated.View>


                        <CardItem>
                            <Text>{topProductDetail.description}</Text>
                        </CardItem>
                    </Card>
                </Content>
            </Container>
        );
    }
}

const { width } = Dimensions.get('window');
const swiperWidth = (width / 1.8) - 30;
const swiperHeight = (swiperWidth * 452) / 361;

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: '#D6D6D6',
    },
    content: {
        backgroundColor: '#fff',
        flex: 1,
        margin: 10
    },
    productImage: {
        padding: 10,
        flexDirection: 'row',
        height: swiperHeight
    },
    textCart: {
        color: '#fff'
    },
    image: {
        marginHorizontal: 5,
        height: swiperHeight,
        width: swiperWidth
    },
    productName: {
        fontSize: 18,
        fontWeight: "500"
    }
});

function mapStateToProps(state) {
    return {
        topProductDetail: state.topProductDetail.topProductDetail
    }
}

export default connect(mapStateToProps, actionCreators)(ProductDetail)