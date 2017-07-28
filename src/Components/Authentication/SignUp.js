import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import {
    Content, Input, Button, Text, Item, Spinner
} from 'native-base';

//Redux and Redux form
import { connect } from 'react-redux';
import * as actionCreators from '../../Redux/actionCreators';
import { Field, reduxForm } from 'redux-form';

//Validate
import validate from '../../Validate/SignUpValidate';

//Style
const styles = StyleSheet.create({
    content: {
        margin: 15,
        marginTop: 40,
    },
    contentInvalid: {
        margin: 15,
        marginTop: 10
    },
    viewUsernameInput: {
        marginBottom: 10,
    },
    viewAddressInput: {
        marginBottom: 10,
    },
    viewPasswordInput: {
        marginBottom: 10,
    },
    viewNameInput: {
        marginBottom: 10,
    },
    viewEmailInput: {
        marginBottom: 15,
    },
    input: {
        paddingLeft: 20
    }
})

const {
    content, contentInvalid, input,
    viewEmailInput, viewPasswordInput, viewNameInput,
    viewUsernameInput, viewAddressInput
} = styles;

//Declare input
const renderUsernameField = field => (
    <View style={viewUsernameInput}>
        <Item rounded>
            <Input
                {...field.input}
                style={StyleSheet.flatten(input)}
                placeholder="Enter your username"
            />
        </Item>
        <View style={{ alignItems: 'center' }}>
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
        <View style={{ alignItems: 'center' }}>
            {field.meta.touched && field.meta.error && <Text style={{ color: 'red' }}>{field.meta.error}</Text>}
        </View>
    </View>
)

const renderNameField = field => (
    <View style={viewNameInput}>
        <Item rounded>
            <Input
                {...field.input}
                style={StyleSheet.flatten(input)}
                placeholder="Enter your name"
            />
        </Item>
        <View style={{ alignItems: 'center' }}>
            {field.meta.touched && field.meta.error && <Text style={{ color: 'red' }}>{field.meta.error}</Text>}
        </View>
    </View>
)

const renderAddressField = field => (
    <View style={viewAddressInput}>
        <Item rounded>
            <Input
                {...field.input}
                style={StyleSheet.flatten(input)}
                placeholder="Enter your address"
            />
        </Item>
        <View style={{ alignItems: 'center' }}>
            {field.meta.touched && field.meta.error && <Text style={{ color: 'red' }}>{field.meta.error}</Text>}
        </View>
    </View>
)

const renderEmailField = field => (
    <View style={viewEmailInput}>
        <Item rounded>
            <Input
                {...field.input}
                style={StyleSheet.flatten(input)}
                placeholder="Enter your email"
            />
        </Item>
        <View style={{ alignItems: 'center' }}>
            {field.meta.touched && field.meta.error && <Text style={{ color: 'red' }}>{field.meta.error}</Text>}
        </View>
    </View>
)

class SignUp extends Component {
    signUp(data) {
        let url = "http://webbase.com.vn/ceramic/customer-api/sign-up";
        this.props.thunkSignUp(url, data);
    }
    render() {
        //Redux
        const { isLoading, error } = this.props.signUp
        //Redux Form
        const { handleSubmit, invalid, reset, pristine, anyTouched } = this.props;
        if (!invalid && pristine) {
            styleMarginTop = content;
        }
        if (invalid && !pristine) {
            styleMarginTop = contentInvalid;
        }

        if (!invalid && !pristine) {
            styleMarginTop = content;
        }

        if(!anyTouched && invalid && pristine)
        {
            styleMarginTop = content
        }
        if(anyTouched && invalid && pristine)
        {
            styleMarginTop = contentInvalid
        }
        return (
            <Content style={StyleSheet.flatten(styleMarginTop)}>
                <Field name="username" component={renderUsernameField} />
                <Field name="password" component={renderPasswordField} />
                <Field name="name" component={renderNameField} />
                <Field name="address" component={renderAddressField} />
                <Field name="email" component={renderEmailField} />
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
                            disabled={invalid || pristine}
                            onPress={handleSubmit(this.signUp.bind(this))}
                        >
                            <Text>Sign Up Now</Text>
                        </Button>
                }

            </Content>
        )
    }
}

function mapStateToProps(state) {
    return {
        signUp: state.signUp
    }
}

export default reduxForm({
    form: 'signUp',
    validate
})(connect(mapStateToProps, actionCreators)(SignUp))