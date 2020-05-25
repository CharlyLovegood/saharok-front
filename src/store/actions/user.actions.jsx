import { userConstants } from "../constants";
import {userService} from "../../services";
import { storage } from "../../helpers/storage";
import {history} from "../../helpers";
import {alertActions} from "./";
import {ERROR_TYPES} from "../../helpers/constants";
import {tokenRefresh as tokenRefreshHelper} from "./helpers";


export const userActions = {
    getCurrentUser,
    getUser,
    login,
    logout,
    register,
    tokenRefresh,
    confirmEmail
};


function login(user) {
    return dispatch => {
        dispatch(request());

        userService.login(user)
            .then(
                user => {
                    storage.set('user', user);
                    history.push('/profile');
                    dispatch(success(user));
                    dispatch(alertActions.success("Login successful"));
                },
                error => {
                    if (error === ERROR_TYPES.NEED_CONFIRM) {
                        dispatch(alertActions.success(error));
                        return;
                    }
                    dispatch(alertActions.error(error));
                    dispatch(failure(error));
                });
    };

    function request() { return { type: userConstants.LOGIN_REQUEST} }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}


function register(user) {
    return dispatch => {
        dispatch(request());

        userService.register(user)
            .then(
                user => {
                    dispatch(alertActions.success(ERROR_TYPES.NEED_CONFIRM));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                });
    };

    function request() { return { type: userConstants.REGISTER_REQUEST } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}


function tokenRefresh(refresh_token) {
    return dispatch => {
        dispatch(request());

        userService.tokenRefresh({refresh_token})
            .then(
                token => {
                    let user = storage.get('user');
                    user = {...user, ...token};
                    storage.set('user', user);
                    dispatch(success(user));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                });
    };

    function request() { return { type: userConstants.TOKEN_REFRESH_REQUEST } }
    function success(user) { return { type: userConstants.TOKEN_REFRESH_SUCCESS, user } }
    function failure(error) { return { type: userConstants.TOKEN_REFRESH_FAILURE, error } }
}


function confirmEmail(token) {
    return dispatch => {
        dispatch(request());

        userService.confirmEmail({token})
            .then(
                user => {
                    storage.set('user', user);
                    history.push('/');
                    dispatch(success(user));
                },
                error => {
                    dispatch(failure(error));
                });
    };

    function request() { return { type: userConstants.EMAIL_CONFIRM_REQUEST } }
    function success(user) { return { type: userConstants.EMAIL_CONFIRM_SUCCESS, user } }
    function failure(error) { return { type: userConstants.EMAIL_CONFIRM_FAILURE, error } }
}


function logout(refresh_token, access_token) {
    return dispatch => {
        dispatch(request());

        userService.logout(refresh_token, access_token)
            .then(
                () => {
                    storage.clear();
                    history.push('/');
                    dispatch(success());
                },
                error => {
                    storage.clear();
                    history.push('/');
                    dispatch(failure(error));
                });
    };

    function request() { return { type: userConstants.LOGOUT_REQUEST } }
    function success() { return { type: userConstants.LOGOUT_SUCCESS } }
    function failure(error) { return { type: userConstants.LOGOUT_FAILURE, error } }
}


function getCurrentUser(refresh_token, access_token) {
    return dispatch => {
        dispatch(request());

        userService.getCurrentUser(access_token)
            .then(
                info => {
                    dispatch(success(info));
                },
                error => {
                    if (error === ERROR_TYPES.UNAUTHORIZED) {
                        tokenRefreshHelper(dispatch, refresh_token)
                            .then(new_access_token => userService.getCurrentUser(new_access_token))
                            .then(
                                info => {
                                    dispatch(success(info));
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

    function request() { return { type: userConstants.GET_CURRENT_USER_REQUEST } }
    function success(info) { return { type: userConstants.GET_CURRENT_USER_SUCCESS, info } }
    function failure(error) { return { type: userConstants.GET_CURRENT_USER_FAILURE, error } }
}


function getUser(refresh_token, access_token, id) {
    return dispatch => {
        dispatch(request());

        userService.getUser(access_token, id)
            .then(
                info => {
                    dispatch(success(info));
                    dispatch(alertActions.success("info received"));
                },
                error => {
                    if (error === ERROR_TYPES.UNAUTHORIZED) {
                        tokenRefreshHelper(dispatch, refresh_token)
                            .then(new_access_token => userService.getUser(new_access_token, id))
                            .then(
                                info => {
                                    dispatch(success(info));
                                    dispatch(alertActions.success("info received"));
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

    function request() { return { type: userConstants.GET_USER_REQUEST } }
    function success(info) { return { type: userConstants.GET_USER_SUCCESS, info } }
    function failure(error) { return { type: userConstants.GET_USER_FAILURE, error } }
}