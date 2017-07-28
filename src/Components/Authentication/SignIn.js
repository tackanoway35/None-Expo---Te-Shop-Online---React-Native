import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';

import { Content, Input, Button, Text, Item, Spinner } from 'native-base';

//Redux
import { connect } from 'react-redux';
import * as actionCreators from '../../Redux/actionCreators';
//End redux

//Redux Form
import { Field, reduxForm } from 'redux-form';
import validate from '../../Validate/SignInValidate';
//End Redux Form
const styles = StyleSheet.create({
    content: {
        margin: 15,
        marginTop: 130,
    },
    viewUsernameInput: {
        marginBottom: 10,
    },
    viewPasswordInput: {
        marginBottom: 30,
    },
    input: {
        paddingLeft: 20
    }
})

//Style
const {
    content, input,
    viewUsernameInput, viewPasswordInput
} = styles;

const renderUsernameField = field => (
    <View style = {viewUsernameInput}>
        <Item rounded>
            <Input
                {...field.input}
                style={StyleSheet.flatten(input)}
                placeholder="Enter your username"
            />

        </Item>
        <View style = {{alignItems : 'center'}}>
            {field.meta.touched && field.meta.error && <Text style={{ color: 'red' }}>{field.meta.error}</Text>}
        </View>
    </View>
)

const renderPasswordField = field => (
    <View style={viewPasswordInput}>
        <Item rounded>
            <Input
                {...field.input}
                style={StyleSheet.flatten(input)}
                placeholder="Enter your password"
                secureTextEntry={true}
            />
        </Item>
        <View style = {{alignItems : 'center'}}>
            {field.meta.touched && field.meta.error && <Text style={{ color: 'red' }}>{field.meta.error}</Text>}
        </View>
    </View>
)

class SignIn extends Component {
    constructor(props) {
        super(props);
    }

    signIn(data) {
        let url = "http://webbase.com.vn/ceramic/customer-api/sign-in";
        
        //Get Params
        if(this.props.navigation.state.params === undefined)
        {
            this.props.thunkSignIn(url, data, this.props.navigation);
        }else
        {
            let { tabNavigator } = this.props.navigation.state.params;
            this.props.thunkSignIn(url, data, this.props.navigation, tabNavigator);
        }
        
    }
    render() {
        //Redux
        const { isLoading, error } = this.props.signIn;

        //Redux Form
        const { handleSubmit, reset, pristine, invalid, values } = this.props;
        return (
            <Content style={StyleSheet.flatten(content)}>
                <Field name="username" component={renderUsernameField} />
                <Field name="password" component={renderPasswordField} />
                {
                    isLoading ?
                        <Button
                            block
                            rounded
                            outline
                            primary
                            bordered
                            disabled
                        >
                            <Text>Loading&nbsp;&nbsp;</Text>
                            <Spinner color='blue' />
                        </Button>
                        :
                        <Button
                            block
                            rounded
                            outline
                            primary
                            bordered
                            onPress = { handleSubmit(this.signIn.bind(this)) }
                            disabled = {pristine || invalid}
                        >
                            <Text>Sign In Now</Text>
                        </Button>
                }
            </Content>
        )
    }
}
function mapStateToProps(state) {
    return {
        signIn: state.signIn
    }
}

//Have form and validate. Other is failed
export default reduxForm({
    form: 'signIn',
    validate
})( connect(mapStateToProps, actionCreators)(SignIn) )