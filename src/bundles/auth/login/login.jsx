import React, {Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Box, TextInput, Button, Heading, Text, FormField, Form } from 'grommet';
import {Link} from "react-router-dom";

import { alertActions, userActions } from './../../../store/actions';
import Alert from "../../../components/alert/alert";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        const { email, password } = this.state;

        const user = {
            "email": email,
            "password": password
        };


        this.props.login(user);
    }

    render() {
        const {alert} = this.props;

        return(
            <Box width='400px' direction="column" pad="20px" gap="10px">
                <Heading level='2' textAlign='center'>
                    Log In
                </Heading>
                {alert.type &&
                    <Alert type={alert.type} message={alert.message} />
                }
                <Form
                    validate='blur'
                    value={this.state}
                    onChange={newValue => this.setState(newValue)}
                    onSubmit={event => this.handleSubmit(event)}
                >
                    <FormField name="email" validate={{
                        regexp: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    }}>
                        <TextInput type='email' placeholder="EMAIL" name="email" />
                    </FormField>
                    <FormField name="password">
                        <TextInput type='password' placeholder="PASSWORD" name="password" />
                    </FormField>
                    <Box pad={{vertical:'10px'}}>
                        <Button type="submit" label="Log In" primary />
                    </Box>
                </Form>
                <Text alignSelf='center'>Don't have account? <Link to='/register'>Register</Link></Text>
            </Box>
        )
    }
}

Login.propTypes = {
    login: PropTypes.func,
    clearAlerts: PropTypes.func,
};

const mapStateToProps = state => ({
    alert: state.alert,
    authentication: state.authentication
});

const actionCreators = {
    clearAlerts: alertActions.clear,
    login: userActions.login
};

const connectedApp = connect(mapStateToProps, actionCreators)(Login);

export default connectedApp;
