import React, {Component} from 'react';
import { Route } from 'react-router-dom'
import { Box } from 'grommet';

import Desk from './../desk/desk';
import DeskForm from './../desk-form/desk-form';
import Profile from './../profile/profile';
import Index from "../index";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return(
            <Box align='center'>
                <Route path='/desk/:id' component={Desk} />
                <Route exact path='/create-desk' component={DeskForm} />
                <Route exact path='/profile' component={Profile} />
                <Route exact path='/profile/:id' component={Profile} />
                <Route exact path='/' component={Index} />
            </Box>
        )
    }
}

export {App as IndexBundle};
