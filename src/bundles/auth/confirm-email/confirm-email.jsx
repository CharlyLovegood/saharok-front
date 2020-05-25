import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Box } from 'grommet';

import { alertActions, userActions } from './../../../store/actions';

class ConfirmEmail extends Component {
    componentDidMount() {
        const {token} = this.props.match.params || undefined;
        this.props.confirmEmail(token);
    }

    render() {
        return(
            <Box height="100vh" width="100vw" direction="column" pad="20px" gap="10px">
                <Box width="80%" background="green">

                </Box>
            </Box>
        )
    }
}

const mapStateToProps = state => ({
    alert: state.alert,
    authentication: state.authentication,
    token: state.token
});

const actionCreators = {
    clearAlerts: alertActions.clear,
    confirmEmail: userActions.confirmEmail
};

const connectedConfirmEmail = connect(mapStateToProps, actionCreators)(ConfirmEmail);

export default connectedConfirmEmail;
