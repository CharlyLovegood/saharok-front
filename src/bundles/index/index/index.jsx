import React, {Component} from 'react';
import {Box, Button, Paragraph, Heading, Image} from 'grommet';
import {Link} from "react-router-dom";
import {connect} from "react-redux";

class Index extends Component {
    render() {
        const {loggedIn} = this.props.authentication;

        return(
            <Box width={{max: '1000px'}} height='fit-content' direction='row' margin={{vertical:'30px'}} pad='10px'>
                <Box fill direction='column' margin='5px' pad='10px' >
                    <Heading margin={{vertical: '15px'}} size='xlarge' level='2'>Welcome to Saharok!</Heading>
                    <Heading margin={{vertical: '10px'}} level='3'>Simple desks for working-process improvement</Heading>
                    {!loggedIn &&
                        <Box width='300px' direction='row' margin={{vertical: '15px'}} gap='10px'>
                            <Box fill>
                                <Link to='/register'>
                                    <Button fill label='Register' primary />
                                </Link>
                            </Box>
                            <Box fill>
                                <Link to='/login'>
                                    <Button fill label='Log In' />
                                </Link>
                            </Box>
                        </Box>
                    }
                </Box>
                <Box fill>
                    <Image fill alignSelf='start' src='/1.jpg' fit='contain' />
                </Box>
            </Box>
        )
    }
}


const mapStateToProps = state => ({
    authentication: state.authentication,
});

const connectedIndex = connect(mapStateToProps, {})(Index);

export default connectedIndex;
