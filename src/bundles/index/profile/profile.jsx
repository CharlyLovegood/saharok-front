import React, {Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Box, Button, Heading, Text } from 'grommet';
import {Link} from "react-router-dom";

import { userActions } from './../../../store/actions';
import DeskItem from "../desk-item/desk-item";


class Profile extends Component {
    constructor(props) {
        super(props);
        const {access_token, refresh_token} = this.props.authentication;
        this.state = {
            id: props.match.params.id,
            user: props.currentUser
        };
        if (this.state.id) {
            props.getUser(refresh_token, access_token, this.state.id);
        }
        else {
            this.state = {
                user: this.props.currentUser
            };
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.id && prevProps.user !== this.props.user) {
            this.setState({user: this.props.user});
        } else if (!this.state.id && prevProps.currentUser !== this.props.currentUser) {
            this.setState({user: this.props.currentUser});
        }
    }

    render() {
        const {user} = this.state;
        return(
            <Box align='center'>
                {user.info &&
                    <Box margin='20px' direction='column' align='center' width='fit-content'>
                        <Box justify='center' width="100%" direction="row">
                            <Heading level='2'>{user.info.username}</Heading>
                        </Box>
                        {user.info.desks &&
                            <Box width='100%' pad='10px' border={{color: 'accent'}}>
                                <Box direction="column" pad='10px'>
                                    <Box align='center' width="100%">
                                        <Heading margin={{vertical: "10px"}} level='3'>Desk List</Heading>
                                    </Box>
                                    <Box  direction="column">
                                        {user.info.desks.map(desk => (
                                            <DeskItem key={desk.name} desk={desk} />
                                        ))}
                                        {user.info.desks.length === 0 &&
                                        <Box pad='30px' align='center'>
                                            <Text>There is no desk in your profile</Text>
                                            <Text>You know how to fix it</Text>
                                            <Text>↓</Text>
                                        </Box>
                                        }
                                    </Box>
                                </Box>
                                <Link to='/create-desk'>
                                    <Box>
                                        <Button color='brand' primary={true} label='Create New Desk' />
                                    </Box>
                                </Link>
                            </Box>
                        }
                    </Box>
                }
            </Box>
        )
    }
}

Profile.propTypes = {
    author: PropTypes.string,
    type: PropTypes.string,
    content: PropTypes.string,
    authentication: PropTypes.object,
};

const mapStateToProps = state => ({
    authentication: state.authentication,
    user: state.user,
    currentUser: state.currentUser
});

const actionCreators = {
    getUser: userActions.getUser,
};

const connectedProfile = connect(mapStateToProps, actionCreators)(Profile);

export default connectedProfile;