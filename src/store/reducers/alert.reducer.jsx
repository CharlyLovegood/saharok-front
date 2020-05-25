import { alertConstants } from '../constants';
import {ALERT_TYPES, ERROR_MESSAGES} from "../../helpers/constants";

export function alert(state = {}, action) {
    switch (action.type) {
        case alertConstants.SUCCESS:
            return {
                type: ALERT_TYPES.SUCCESS,
                message: ERROR_MESSAGES[action.message]
            };
        case alertConstants.ERROR:
            return {
                type: ALERT_TYPES.ERROR,
                message: ERROR_MESSAGES[action.message]
            };
        case alertConstants.CLEAR:
            return {};
        default:
            return state
    }
}