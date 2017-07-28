import React, { Component } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Footer, FooterTab, Button, Icon, Badge, Text, } from 'native-base';
import { connect } from 'react-redux';
import { AsyncStorage } from 'react-native';
import * as actionCreators from '../../Redux/actionCreators';

class MyTab extends Component {
    constructor(props) {
        super(props);
        //Get cart from local
        this.props.thunkGetLocalCart();
        this.props.thunkGetProfile();
    }
    componentWillMount() {
        
    }

    render() {
        return (
            <Footer style = {{ height : 50 }}>
                <FooterTab>
                    <Button
                        vertical
                        active={this.props.navigationState.index === 0}
                        onPress={() => this.props.navigation.navigate("Home")}>
                        <Icon name="home" />
                        <Text>Home</Text>
                    </Button>

                    {
                        this.props.cart.length > 0 ?
                            <Button
                                badge
                                vertical
                                active={this.props.navigationState.index === 1}
                                onPress={() => {
                                    this.props.navigation.navigate("Cart")
                                }}
                            >
                                <Badge><Text>{this.props.cart.length}</Text></Badge>
                                <Icon name="cart" />
                                <Text>Cart</Text>
                            </Button> :

                            <Button
                                vertical
                                active={this.props.navigationState.index === 1}
                                onPress={() => {
                                    this.props.navigation.navigate("Cart")
                                }}
                            >
                                <Icon name="cart" />
                                <Text>Cart</Text>
                            </Button>
                    }

                    <Button
                        vertical
                        active={this.props.navigationState.index === 2}
                        onPress={() => this.props.navigation.navigate("Search")}>
                        <Icon name="search" />
                        <Text>Search</Text>
                    </Button>
                    <Button
                        vertical
                        active={this.props.navigationState.index === 3}
                        onPress={() => this.props.navigation.navigate("Contact")}>
                        <Icon name="person" />
                        <Text>Contact</Text>
                    </Button>
                </FooterTab>
            </Footer>
        )
    }
}

function mapStateToProps(state) {
    return {
        cart: state.cart
    }
}

export default connect(mapStateToProps, actionCreators)(MyTab);