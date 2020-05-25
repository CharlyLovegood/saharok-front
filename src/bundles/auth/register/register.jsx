import React, {Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {Box, TextInput, Button, Text, Heading, FormField, Form} from 'grommet';
import {Link} from "react-router-dom";

import { alertActions, userActions } from './../../../store/actions';
import Alert from "../../../components/alert/alert";


class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            username: '',
            password: '',
            repeat_password: ''
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        const { email, password, username } = this.state;

        const user = {
            "email": email,
            "username": username,
            "password": password
        };

        this.props.register(user);
    }

    render() {
        const {alert} = this.props;

        return(
            <Box width='400px' direction="column" pad="20px" gap="10px">
                <Heading level='2' textAlign='center'>
                    Register
                </Heading>
                {alert.type &&
                <Alert type={alert.type} message={alert.message} />
                }
                <Form
                    validate='blur'
                    value={this.state}
                    onChange={newValue => this.setState(newValue)}
                    onSubmit={event => this.handleSubmit(event)}
                    onReset={() => this.setState({})}
                >
                    <FormField name="email" validate={{
                        regexp: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    }}>
                        <TextInput type='email' placeholder="EMAIL" name="email" />
                    </FormField>
                    <FormField name="username">
                        <TextInput type='username' placeholder="USERNAME" name="username" />
                    </FormField>
                    <FormField name="password" validate={{
                        regexp: new RegExp("^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$"),
                        message: 'Minimum 8 characters, at least one letter and one number'
                    }}>
                        <TextInput type='password' placeholder="PASSWORD" name="password" />
                    </FormField>
                    <FormField name="repeat_password" validate={{
                        regexp: new RegExp(this.state.password),
                        message: 'Passwords don\'t match'
                    }}>
                        <TextInput type='password' placeholder="REPEAT PASSWORD" name="repeat_password" />
                    </FormField>
                    <Box pad={{vertical:'10px'}} direction='row' gap='10px'>
                        <Box fill>
                            <Button type="submit" label="Register" primary />
                        </Box>
                        <Box fill>
                            <Button type='reset' label='Reset' />
                        </Box>
                    </Box>
                </Form>
                <Text alignSelf='center'>Already have account? <Link to='/login'>Log In</Link></Text>
            </Box>
        )
    }
}

Register.propTypes = {
    clearAlerts: PropTypes.func,
    register: PropTypes.func,
};

const mapStateToProps = state => ({
    alert: state.alert,
    register: state.register
});

const actionCreators = {
    clearAlerts: alertActions.clear,
    register: userActions.register
};

const connectedApp = connect(mapStateToProps, actionCreators)(Register);

export default connectedApp;
