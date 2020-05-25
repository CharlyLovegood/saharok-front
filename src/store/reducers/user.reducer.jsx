import { userConstants } from "../constants";

export function user(state = {}, action) {
    switch (action.type) {
        case userConstants.GET_USER_REQUEST:
            return {
                requestingUser: true
            };
        case userConstants.GET_USER_SUCCESS:
            return {
                receivedUser: true,
                info: action.info
            };
        case userConstants.GET_USER_FAILURE:
            return {
                error: action.error
            };
        default:
            return state;
    }
}