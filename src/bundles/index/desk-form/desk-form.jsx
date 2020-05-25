import React, {Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Box, TextInput, Button, Heading, FormField, Form, Select } from 'grommet';

import { alertActions, deskActions } from './../../../store/actions';
import {DESK_STATES} from "../../../helpers/constants";
import Alert from "../../../components/alert/alert";

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            state: '',
        }
    }


    handleSubmit(event) {
        event.preventDefault();
        const {access_token, refresh_token} = this.props.authentication;
        this.props.createDesk(this.state, access_token, refresh_token);
    }

    render() {
        const {alert} = this.props;

        return(
            <Box width='400px' direction="column" pad="20px" gap="10px">
                <Heading level='2' textAlign='center'>
                    Create desk
                </Heading>
                {alert.type &&
                <Alert type={alert.type} message={alert.message} />
                }
                <Form
                    value={this.state}
                    onChange={newValue => this.setState(newValue)}
                    onSubmit={event => this.handleSubmit(event)}
                    validate='blur'
                >
                    <FormField name='name' validate={{
                        regexp:  /^(?!\s*$).+/,
                        message: 'Shouldn\'t be empty'
                    }}>
                        <TextInput placeholder="NAME" name="name"/>
                    </FormField>
                    <FormField name='state' validate={{
                        regexp:  /^(?!\s*$).+/,
                        message: 'Shouldn\'t be empty'
                    }}>
                        <Select placeholder='STATE' name='state' options={DESK_STATES} />
                    </FormField>
                    <Box pad={{vertical:'10px'}}>
                        <Button type="submit"  label="Create Desk" primary />
                    </Box>
                </Form>
            </Box>
        )
    }
}

Register.propTypes = {
    clearAlerts: PropTypes.func,
    createDesk: PropTypes.func,
};

const mapStateToProps = state => ({
    alert: state.alert,
    authentication: state.authentication,
});

const actionCreators = {
    clearAlerts: alertActions.clear,
    createDesk: deskActions.createDesk
};

const connectedApp = connect(mapStateToProps, actionCreators)(Register);

export default connectedApp;
