import {combineReducers} from "redux";

import {alert} from "./alert.reducer";
import {authentication} from "./authentication.reducer";
import {token} from "./token.reducer";
import {desk} from "./desk.reducer";
import {currentUser} from "./current-user.reducer";
import {user} from "./user.reducer";

const rootReducer = combineReducers({
    alert,
    authentication,
    currentUser,
    user,
    token,
    desk
});

export default rootReducer;
