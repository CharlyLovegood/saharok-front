import React, {Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Box, Heading } from 'grommet';
import { Edit } from 'grommet-icons';

import { deskActions } from './../../../store/actions';
import {CARD_TYPES, COLUMNS} from './../../../helpers/constants'
import Card from '../card/card';
import CardForm from '../card-form/card-form';
import DeskEdit from './../desk-edit/desk-edit';
import { subscribeToDesk, unsubscribeDesk } from './../../../helpers/socket';

class Desk extends Component {
    constructor({author, type, content, ...props}) {
        super({author, type, content, ...props});
        const {access_token, refresh_token} = this.props.authentication;
        this.state = {
            cardsReceived: false,
            showDeskEditModel: false,
            desk: {
                id: this.props.match.params.id
            },
            cards: []
        };
        this.props.getCards(this.state.desk.id, access_token, refresh_token);
    }

    componentDidMount() {
        const {access_token} = this.props.authentication;
        subscribeToDesk(access_token, this.state.desk.id,
                card => {
            this.setState({cards: [...this.state.cards, card]});
            this.props.receiveCardFromSocket(card);
        },
                card_id => {
            this.setState({cards: this.state.cards.filter(card => card.id !== card_id)});
            this.props.deleteCardFromSocket({id: card_id});
        });
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if ((prevProps.desk.cards !== this.props.desk.cards && this.props.desk.cards) || (prevProps.desk.name !== this.props.desk.name)) {
            this.setState({
                ...this.state,
                cards: this.props.desk.cards,
                cardsReceived: true,
                name: this.props.desk.name,
                state: this.props.desk.state,
                is_author: this.props.desk.is_author
            });
        }
    }

    componentWillUnmount() {
        unsubscribeDesk(this.state.desk.id);
    }

    pinCard(content, type) {
        const {access_token, refresh_token} = this.props.authentication;
        const card = {
            desk_id: this.state.desk.id,
            type,
            content
        };
        this.props.pinCard(card, access_token, refresh_token);
    }

    deleteCard(id) {
        const {access_token, refresh_token} = this.props.authentication;
        const card = {
            'id': id
        };
        this.props.deleteCard(card, this.state.desk.id, access_token, refresh_token);
    }

    render() {
        const {cards, cardsReceived, name, state, is_author, showDeskEditModel} = this.state;
        const {id} = this.state.desk;

        return(
            <Box direction="column" width='1000px'>
                {is_author ?
                    <Box gap='10px' direction='row' margin='15px'>
                        <Heading color='accent' level='3' margin={{vertical:'5px'}}>Desk name: {name} (status: {state})</Heading>
                        <Box margin='auto 0' onClick={() => this.setState({showDeskEditModel: true})} alignSelf='end'><Edit color='accent' /></Box>
                    </Box>
                    :
                    <Box>
                        <Heading color='accent' level='3' margin={{vertical:'5px'}}>Desk name: {name} (status: {state})</Heading>
                    </Box>
                }
                <Box width="100%" direction="row" >
                    {cardsReceived && Object.keys(CARD_TYPES).map(type => {
                        return(
                            <Box key={type} pad={{horizontal: '10px'}} flex='grow' width={{'max': '33%'}} direction="column">
                                <Heading margin='5px' level='4' textAlign='center'>{COLUMNS[type]}</Heading>
                                <CardForm pinCard={(content) => this.pinCard(content, CARD_TYPES[type])}/>
                                <Box direction="column">
                                    {cards.filter(card => card.type === CARD_TYPES[type]).map(card =>
                                        <Card status={state} key={card.id} {...card} deleteCard={() => this.deleteCard(card.id)} />
                                    )}
                                </Box>
                            </Box>
                        )
                    })}
                </Box>
                {showDeskEditModel &&
                    <Box align='center'>
                        <DeskEdit id={id} name={name} state={state} isVisible={showDeskEditModel} onClose={() => this.setState({showDeskEditModel: false})}/>
                        <Box className='desk-edit-modal--background'></Box>
                    </Box>
                }
            </Box>
        )
    }
}

Desk.propTypes = {
    author: PropTypes.string,
    type: PropTypes.string,
    content: PropTypes.string,
    authentication: PropTypes.object,
};

const mapStateToProps = state => ({
    authentication: state.authentication,
    desk: state.desk
});

const actionCreators = {
    getCards: deskActions.getCards,
    pinCard: deskActions.pinCard,
    receiveCardFromSocket: deskActions.receiveCardFromSocket,
    deleteCardFromSocket: deskActions.deleteCardFromSocket,
    deleteCard: deskActions.deleteCard
};

const connectedDesk = connect(mapStateToProps, actionCreators)(Desk);

export default connectedDesk;