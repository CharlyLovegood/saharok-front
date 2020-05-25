import { userConstants } from "../constants";
import { storage } from '../../helpers/storage';

let user = storage.get('user');
const initialState = user ? { loggedIn: true, ...user } : {};

export function authentication(state = initialState, action) {
    switch (action.type) {
        case userConstants.LOGIN_REQUEST:
            return {
                loggingIn: true
            };
        case userConstants.LOGIN_SUCCESS:
            return {
                loggedIn: true,
                ...action.user
            };
        case userConstants.LOGIN_FAILURE:
            return {
                error: action.error
            };
        case userConstants.LOGOUT_REQUEST:
            return {
                loggingOut: true
            };
        case userConstants.LOGOUT_SUCCESS:
            return {};
        case userConstants.LOGOUT_FAILURE:
            return {};
        case userConstants.TOKEN_REFRESH_REQUEST:
            return {
                ...state,
                refreshingToken: true,
                loggedIn: true,
                ...action.user
            };
        case userConstants.TOKEN_REFRESH_SUCCESS:
            return {
                loggedIn: true,
                ...action.user
            };
        case userConstants.TOKEN_REFRESH_FAILURE:
            return {
                loggedIn: true,
                refreshingTokenFailure: true,
                ...action.user
            };
        case userConstants.EMAIL_CONFIRM_REQUEST:
            return {
                confirmingEmail: true
            };
        case userConstants.EMAIL_CONFIRM_SUCCESS:
            return {
                loggedIn: true,
                ...action.user
            };
        case userConstants.EMAIL_CONFIRM_FAILURE:
            return {
                confirmingEmailFailure: true,
                loggedIn: false,
            };
        default:
            return state;
    }
}