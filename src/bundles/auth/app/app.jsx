import React, {Component} from 'react';
import { Route } from 'react-router-dom'
import { Box } from 'grommet';

import Register from '../register/register';
import ConfirmEmail from '../confirm-email/confirm-email';
import Login from '../login/login';

class App extends Component {
    render() {
        return(
            <Box align='center'>
                <Route exact path='/login' component={Login} />
                <Route exact path='/register' component={Register} />
                <Route exact path='/email-confirm/:token' component={ConfirmEmail} />
            </Box>
        )
    }
}

export {App as AuthBundle};
