import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Box, Paragraph} from 'grommet';
import {ALERT_TYPES_TO_COLORS} from "../../helpers/constants";

class Alert extends Component {
    render() {
        const {message, type} = this.props;

        return(
            <Box direction='column' align='center' border={{color: ALERT_TYPES_TO_COLORS[type]}} margin='5px' pad='10px' >
                <Paragraph margin='0px' color={ALERT_TYPES_TO_COLORS[type]}>{message}</Paragraph>
            </Box>
        )
    }
}

Alert.propTypes = {
    author: PropTypes.string,
    type: PropTypes.string,
    content: PropTypes.string,
    authentication: PropTypes.object,
};

export default Alert;