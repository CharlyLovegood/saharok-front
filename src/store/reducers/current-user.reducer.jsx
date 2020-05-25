import { userConstants } from "../constants";

export function currentUser(state = {}, action) {
    switch (action.type) {
        case userConstants.GET_CURRENT_USER_REQUEST:
            return {
                requestingUser: true
            };
        case userConstants.GET_CURRENT_USER_SUCCESS:
            return {
                receivedUser: true,
                info: action.info
            };
        case userConstants.GET_CURRENT_USER_FAILURE:
            return {
                error: action.error
            };
        default:
            return state;
    }
}