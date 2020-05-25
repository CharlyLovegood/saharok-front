import {userService} from "../../services";
import {storage} from "../../helpers/storage";
import {alertActions} from "./alert.actions";
import {userConstants} from "../constants";

export {
    tokenRefresh
}

function tokenRefresh(dispatch, refresh_token) {
    dispatch(request());

    return userService.tokenRefresh({refresh_token})
        .then(
            token => {
                let user = storage.get('user');
                user = {...user, ...token};
                storage.set('user', user);
                dispatch(success(user));
                return token.access_token;
            },
            error => {
                dispatch(failure(error));
                dispatch(alertActions.error(error));
            });

    function request() { return { type: userConstants.TOKEN_REFRESH_REQUEST } }
    function success(user) { return { type: userConstants.TOKEN_REFRESH_SUCCESS, user } }
    function failure(error) { return { type: userConstants.TOKEN_REFRESH_FAILURE, error } }
}