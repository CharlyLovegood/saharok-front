import { deskConstants } from "../constants";

const initialState = {};

export function desk(state = initialState, action) {
    switch (action.type) {
        case deskConstants.CREATE_DESK_REQUEST:
            return {
                creatingDesk: true
            };
        case deskConstants.CREATE_DESK_SUCCESS:
            return {
                cardsReceived: true,
                ...action.desk
            };
        case deskConstants.CREATE_DESK_FAILURE:
            return {
                error: action.error
            };
        case deskConstants.EDIT_DESK_REQUEST:
            return state;
        case deskConstants.EDIT_DESK_SUCCESS:
            return {
                ...state,
                ...action.desk
            };
        case deskConstants.EDIT_DESK_FAILURE:
            return state;
        case deskConstants.GET_CARDS_REQUEST:
            return {
                requestingCards: true
            };
        case deskConstants.GET_CARDS_SUCCESS:
            return {
                cardsReceived: true,
                ...action.desk
            };
        case deskConstants.GET_CARDS_FAILURE:
            return state;
        case deskConstants.PIN_CARD_REQUEST:
            return {
                tryingToPinCard: true,
                ...state
            };
        case deskConstants.RECEIVE_CARD_FROM_SOCKET:
        case deskConstants.PIN_CARD_SUCCESS:
            return {
                ...state,
                cardsReceived: true,
                cards: [...state.cards, action.card]
            };
        case deskConstants.PIN_CARD_FAILURE:
            return state;
        case deskConstants.DELETE_CARD_REQUEST:
            return {
                tryingToDeleteCard: true,
                ...state
            };
        case deskConstants.DELETE_CARD_FROM_SOCKET:
        case deskConstants.DELETE_CARD_SUCCESS:
            return {
                ...state,
                cardsReceived: true,
                cards: state.cards.filter(card => (card.id !== action.card.id))
            };
        case deskConstants.DELETE_CARD_FAILURE:
            return {
                cardsReceived: true,
                cards: state.cards
            };
        default:
            return state;
    }
}
