import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import {storage} from '../../helpers/storage';

const AuthRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        storage.get('user')
            ? <Redirect to={{ pathname: '/', state: { from: props.location } }} />
            : <Component {...props} />
    )} />
);

export default AuthRoute;