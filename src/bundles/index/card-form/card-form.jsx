import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Box, TextArea, Button} from 'grommet';

class CardForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            content: ''
        }
    }

    handleChange(event) {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.setState({content: ''})
        this.props.pinCard(this.state.content);
    }

    render() {
        const {content} = this.state;
        return(
            <Box margin='5px'>
                <Box height='140px' width='fill'>
                    <TextArea fill resize={false} placeholder="Content" value={content} name="content" onChange={event => this.handleChange(event)} />
                </Box>
                <Box margin={{vertical: '10px'}}>
                    <Button  primary label="Pin Card" onClick={event => this.handleSubmit(event)} />
                </Box>
            </Box>
        )
    }
}

CardForm.propTypes = {
    author: PropTypes.string,
    type: PropTypes.string,
    content: PropTypes.string,
    authentication: PropTypes.object,
};

export default CardForm;