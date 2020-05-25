import React, {Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Box, Heading } from 'grommet';
import {Link} from "react-router-dom";

import { userActions } from './../../store/actions';

class Bar extends Component {
    onLogOut() {
        const {refresh_token, access_token} = this.props.authentication;
        this.props.logout(refresh_token, access_token);
    }

    render() {
        const {loggedIn} = this.props.authentication;
        const {currentUser} = this.props;

        return(
            <Box className='bar' height="70px" width="100vw" align='center'>
                {loggedIn && currentUser.info ?
                    <Box width='1000px' fill='vertical' direction='row' align='center' pad={{vertical:'10px', horizontal:'20px'}}>
                        <Box direction='row'>
                            Hi,<Link to='/profile'>{currentUser.info.username}</Link>!
                        </Box>
                        <Box flex='grow'>
                            <Link to='/'>
                                <Heading className='bar-logo' level='1'>Saharok</Heading>
                            </Link>
                        </Box>
                        <Box>
                            <Link to='/' onClick={() => this.onLogOut()}>Log Out</Link>
                        </Box>
                    </Box>
                :
                    <Box width='1000px' fill='vertical' direction='row' align='center' pad={{vertical:'10px', horizontal:'20px'}}>
                        <Box flex='grow'>
                            <Link to='/'>
                                <Heading className='bar-logo' level='1'>Saharok</Heading>
                            </Link>
                        </Box>
                        <Box>
                            <Link to='/login'>Log In</Link>
                        </Box>
                    </Box>
                }
            </Box>
        )
    }
}

Bar.propTypes = {
    authentication: PropTypes.object,
};

const mapStateToProps = state => ({
    authentication: state.authentication,
    currentUser: state.currentUser,
});

const actionCreators = {
    logout: userActions.logout,
    tokenRefresh: userActions.tokenRefresh,
    getUser: userActions.getUser,
};

const connectedBar = connect(mapStateToProps, actionCreators)(Bar);

export default connectedBar;