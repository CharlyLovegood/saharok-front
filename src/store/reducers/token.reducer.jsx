import { userConstants } from "../constants";
import { storage } from '../../helpers/storage';

let user = storage.get('user');
const initialState = user ? { user } : {};

export function token(state = initialState, action) {
    switch (action.type) {
        case userConstants.TOKEN_REFRESH_REQUEST:
            return {
                refreshingToken: true
            };
        case userConstants.TOKEN_REFRESH_SUCCESS:
            return {
                user: action.user
            };
        case userConstants.TOKEN_REFRESH_FAILURE:
            return {};
        case userConstants.EMAIL_CONFIRM_REQUEST:
            return {
                confirmingEmail: true
            };
        case userConstants.EMAIL_CONFIRM_SUCCESS:
            return {
                user: action.user
            };
        case userConstants.EMAIL_CONFIRM_FAILURE:
            return {};
        default:
            return {};
    }
}