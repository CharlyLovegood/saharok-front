import {deskConstants} from "../constants";
import {deskService} from "../../services";
import {history} from "../../helpers";
import {alertActions} from "./";
import {ERROR_TYPES} from './../../helpers/constants'
import {tokenRefresh} from "./helpers";
import { pinToDesk, deleteFromDesk } from './../../helpers/socket';


export const deskActions = {
    createDesk,
    getCards,
    pinCard,
    deleteCard,
    receiveCardFromSocket,
    deleteCardFromSocket,
    editDesk
};


function createDesk(desk, access_token, refresh_token) {
    return dispatch => {
        dispatch(request());

        deskService.createDesk(desk, access_token)
            .then(
                desk => {
                    dispatch(success(desk));
                    history.push(`/desk/${desk.public_id}`);
                    dispatch(alertActions.success("Desk created"));
                },
                error => {
                    if (error === ERROR_TYPES.UNAUTHORIZED) {
                        tokenRefresh(dispatch, refresh_token)
                            .then(new_access_token => deskService.createDesk(desk, new_access_token))
                            .then(
                                desk => {
                                    dispatch(success(desk));
                                    history.push(`/desk/${desk.public_id}`);
                                    dispatch(alertActions.success("Desk created"));
                                },
                                error => {
                                    dispatch(failure(error));
                                    dispatch(alertActions.error(error));
                                }
                            );
                        return;
                    }
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                });
    };

    function request() { return { type: deskConstants.CREATE_DESK_REQUEST} }
    function success(desk) { return { type: deskConstants.CREATE_DESK_SUCCESS, desk } }
    function failure(error) { return { type: deskConstants.CREATE_DESK_FAILURE, error } }
}


function editDesk(desk, access_token, refresh_token) {
    return dispatch => {
        dispatch(request());

        deskService.editDesk(desk, access_token)
            .then(
                () => {
                    dispatch(success(desk));
                    dispatch(alertActions.success(200));
                },
                error => {
                    if (error === ERROR_TYPES.UNAUTHORIZED) {
                        tokenRefresh(dispatch, refresh_token)
                            .then(new_access_token => deskService.editDesk(desk, new_access_token))
                            .then(
                                () => {
                                    dispatch(success(desk));
                                    dispatch(alertActions.success(200));
                                },
                                error => {
                                    dispatch(failure(error));
                                    dispatch(alertActions.error(error));
                                }
                            );
                        return;
                    }
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                });
    };

    function request() { return { type: deskConstants.EDIT_DESK_REQUEST} }
    function success(desk) { return { type: deskConstants.EDIT_DESK_SUCCESS, desk } }
    function failure(error) { return { type: deskConstants.EDIT_DESK_FAILURE, error } }
}


function getCards(desk, access_token, refresh_token) {
    return dispatch => {
        dispatch(request());

        deskService.getCards(desk, access_token)
            .then(
                desk => {
                    dispatch(success(desk));
                    dispatch(alertActions.success("Cards received"));
                },
                error => {
                    if (error === ERROR_TYPES.UNAUTHORIZED) {
                        tokenRefresh(dispatch, refresh_token)
                            .then(new_access_token => deskService.getCards(desk, new_access_token))
                            .then(
                                desk => {
                                    dispatch(success(desk));
                                    dispatch(alertActions.success("Cards received"));
                                },
                                error => {
                                    dispatch(failure(error));
                                    dispatch(alertActions.error(error));
                                }
                            );
                        return;
                    }
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                });
    };

    function request() { return { type: deskConstants.GET_CARDS_REQUEST} }
    function success(desk) { return { type: deskConstants.GET_CARDS_SUCCESS, desk } }
    function failure(error) { return { type: deskConstants.GET_CARDS_FAILURE, error } }
}


function pinCard(card, access_token, refresh_token) {
    return dispatch => {
        dispatch(request());

        deskService.pinCard(card, access_token)
            .then(
                resp => {
                    card.is_author = true;
                    dispatch(success({...card, ...resp}));
                    dispatch(alertActions.success("Card pinned"));
                    card.is_author = false;
                    pinToDesk(access_token, card.desk_id, {...card, ...resp});
                },
                error => {
                    if (error === ERROR_TYPES.UNAUTHORIZED) {
                        tokenRefresh(dispatch, refresh_token)
                            .then(new_access_token => deskService.pinCard(card, new_access_token))
                            .then(
                                resp => {
                                    card.is_author = true;
                                    dispatch(success({...card, ...resp}));
                                    dispatch(alertActions.success("Card pinned"));
                                    card.is_author = false;
                                    pinToDesk(access_token, card.desk_id, {...card, ...resp});
                                },
                                error => {
                                    dispatch(failure(error));
                                    dispatch(alertActions.error(error));
                                }
                            );
                        return;
                    }
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                });
    };

    function request() { return { type: deskConstants.PIN_CARD_REQUEST } }
    function success(card) { return { type: deskConstants.PIN_CARD_SUCCESS, card } }
    function failure(error) { return { type: deskConstants.PIN_CARD_FAILURE, error } }
}

function receiveCardFromSocket(card) {
    return dispatch => {
        dispatch({ type: deskConstants.RECEIVE_CARD_FROM_SOCKET, card });
    }
}

function deleteCardFromSocket(card) {
    return dispatch => {
        dispatch({ type: deskConstants.DELETE_CARD_FROM_SOCKET, card });
    }
}

function deleteCard(card, desk, access_token, refresh_token) {
    return dispatch => {
        dispatch(request());

        deskService.deleteCard(card, access_token)
            .then(
                () => {
                    dispatch(success(card));
                    dispatch(alertActions.success("Card deleted"));
                    deleteFromDesk(access_token, desk, card.id);
                },
                error => {
                    if (error === ERROR_TYPES.UNAUTHORIZED) {
                        tokenRefresh(dispatch, refresh_token)
                            .then(new_access_token => deskService.deleteCard(card, new_access_token))
                            .then(
                                () => {
                                    dispatch(success(card));
                                    dispatch(alertActions.success("Card deleted"));
                                    deleteFromDesk(access_token, desk, card.id);
                                },
                                error => {
                                    dispatch(failure(error));
                                    dispatch(alertActions.error(error));
                                }
                            );
                        return;
                    }
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                });
    };

    function request() { return { type: deskConstants.DELETE_CARD_REQUEST} }
    function success(card) { return { type: deskConstants.DELETE_CARD_SUCCESS, card } }
    function failure(error) { return { type: deskConstants.DELETE_CARD_FAILURE, error } }
}
