import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Box, Button, Paragraph} from 'grommet';
import { Trash } from 'grommet-icons';
import {CARD_TYPES_TO_COLORS, DESK_STATUSES} from './../../../helpers/constants';

class Card extends Component {
    render() {
        const {type, content, deleteCard, is_author, status} = this.props;

        return(
            <Box height={{min: '70px'}} direction='column' background={CARD_TYPES_TO_COLORS[type]} margin='5px' pad='10px' >
                {(DESK_STATUSES[status] || is_author) &&
                    <Paragraph>{content}</Paragraph>
                }
                {is_author &&
                    <Box alignSelf='end' width='20px'>
                        <Button icon={<Trash size='20px'/>} plain onClick={deleteCard}/>
                    </Box>
                }
            </Box>
        )
    }
}

Card.propTypes = {
    author: PropTypes.string,
    type: PropTypes.string,
    content: PropTypes.string,
    authentication: PropTypes.object,
};

export default Card;