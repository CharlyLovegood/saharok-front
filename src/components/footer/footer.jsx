import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Box, Text } from 'grommet';

import { alertActions, userActions } from './../../store/actions';

class Footer extends Component {
    render() {
        return(
            <Box justify='end' align='center' pad={'15px'} background='brand' height="140px" width="100vw">
                <Box width='1000px' >
                    <Box alignSelf='end' >
                        <Text size='small'>© 2020 Saharok</Text>
                        <Text size='small'>MIPT License</Text>
                    </Box>
                </Box>
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

const connectedFooter = connect(mapStateToProps, actionCreators)(Footer);

export default connectedFooter;