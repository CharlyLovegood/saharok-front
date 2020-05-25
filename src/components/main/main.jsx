import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Box } from 'grommet';

import { alertActions, userActions } from './../../../store/actions';

class Main extends Component {
    render() {
        const {children} = this.props;

        return(
            <Box>
                {children}
            </Box>
        )
    }
}

const mapStateToProps = state => ({
    alert: state.alert,
    authentication: state.authentication,
});

const actionCreators = {
    clearAlerts: alertActions.clear,
    logout: userActions.logout
};

const connectedMain = connect(mapStateToProps, actionCreators)(Main);

export default connectedMain;