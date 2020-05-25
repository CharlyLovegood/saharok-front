import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Box} from 'grommet';
import {Link} from "react-router-dom";

class DeskItem extends Component {
    render() {
        const {desk} = this.props;

        return(
            <Box margin={{vertical: '10px'}}>
                <Link to={`desk/${desk.public_id}`}>
                    {desk.name}
                </Link>
            </Box>
        )
    }
}

DeskItem.propTypes = {
    author: PropTypes.string,
    type: PropTypes.string,
    content: PropTypes.string,
    authentication: PropTypes.object,
};

export default DeskItem;