import React, { Component } from 'react';
import { Router, Switch, Route, Redirect } from 'react-router-dom'
import { Grommet, Box } from 'grommet';
import { connect } from "react-redux";

import { history, theme } from './helpers';
import {IndexBundle, AuthBundle} from './bundles';
import Bar from './components/bar/bar';
import Footer from './components/footer/footer';
import PrivateRoute from './components/private-route/private-route';
import AuthRoute from './components/auth-route/auth-route';
import {alertActions, userActions} from "./store/actions";

import './App.scss';

class App extends Component {
    constructor(props) {
        super(props);
        const {access_token, refresh_token, loggedIn} = this.props.authentication;

        history.listen((location, action) => {
            this.props.clearAlerts();
        });

        if (loggedIn) {
            this.props.getCurrentUser(refresh_token, access_token);
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.authentication.loggedIn !== prevProps.authentication.loggedIn) {
            const {access_token, refresh_token} = this.props.authentication;
            this.props.getCurrentUser(refresh_token, access_token);
        }
    }

    render()
    {
        const {currentUser} = this.props;

        return (
            <Grommet theme={theme}>
                <Router history={history}>
                    <Bar user={currentUser.info} />
                    <Box width="100vw" height={{'min': "100vh"}}>
                        <Switch>
                            <Route exact path='/' component={IndexBundle} />
                            <AuthRoute exact path='/login' component={AuthBundle} />
                            <AuthRoute exact path='/register' component={AuthBundle} />
                            <AuthRoute path='/email-confirm' component={AuthBundle} />
                            <PrivateRoute exact path='/desk/:id' component={IndexBundle} />
                            <PrivateRoute exact path='/create-desk' component={IndexBundle} />
                            <PrivateRoute exact path='/profile' component={IndexBundle} />
                            <PrivateRoute exact path='/profile/:id' component={IndexBundle} />
                            <Redirect from='*' to='/' />
                        </Switch>
                    </Box>
                    <Footer/>
                </Router>
            </Grommet>
        );
    }
}

const mapStateToProps = state => ({
    authentication: state.authentication,
    alert: state.alert,
    currentUser: state.currentUser,
});

const actionCreators = {
    clearAlerts: alertActions.clear,
    getCurrentUser: userActions.getCurrentUser,
};

const connectedApp = connect(mapStateToProps, actionCreators)(App);

export default connectedApp;
