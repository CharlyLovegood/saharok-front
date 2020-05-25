import React, {Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Close } from 'grommet-icons';
import { Box, TextInput, Button, Heading, FormField, Form, Select } from 'grommet';

import { deskActions } from './../../../store/actions';
import {DESK_STATES} from "../../../helpers/constants";
import Alert from "../../../components/alert/alert";

class DeskEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: props.name,
            state: props.state,
            id: props.id
        };
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.name !== prevProps.name || this.props.state !== this.state.state) {
            this.setState({name: this.props.name, state: this.props.state, id: this.props.id})
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        const {access_token, refresh_token} = this.props.authentication;
        this.props.editDesk(this.state, access_token, refresh_token);
    }

    render() {
        const {alert} = this.props;

        return(
            <Box background='white' width='400px' className='desk-edit-modal' direction="column" pad="30px" gap="10px">
                <Box onClick={this.props.onClose} alignSelf='end'><Close /></Box>
                    <Heading margin={{vertical: '10px'}} level='2' textAlign='center'>
                        Edit Desk
                    </Heading>
                    {alert.message &&
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
                    </Form>
                    <Select value={this.state.state} onChange={({option}) => this.setState({state: option})} placeholder='STATE' name='state' options={DESK_STATES} />
                    <Box pad={{vertical:'10px'}}>
                        <Button onClick={event => this.handleSubmit(event)} type="submit" label="Submit" primary />
                    </Box>

            </Box>
        )
    }
}

DeskEdit.propTypes = {
    clearAlerts: PropTypes.func,
    createDesk: PropTypes.func,
};

const mapStateToProps = state => ({
    alert: state.alert,
    authentication: state.authentication,
});

const actionCreators = {
    editDesk: deskActions.editDesk,
};

const connectedEditDesk = connect(mapStateToProps, actionCreators)(DeskEdit);

export default connectedEditDesk;
