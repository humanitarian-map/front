import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {BrowserRouter, Route, Redirect} from 'react-router-dom';

import MapPage from './pages/MapPage';
import LoginPage from './pages/LoginPage';
import UserProfilePage from './pages/UserProfilePage';
import ProjectsListPage from './pages/ProjectsListPage';
import {store} from './App.store';
import * as actions from './App.actions';
import './App.css';

export default class App extends Component {
    componentWillMount() {
        store.dispatch(actions.listOrganizations());
    }

    render() {
        return (
            <Provider store={store}>
                <BrowserRouter>
                    <div className='App'>
                        <Route
                            exact={true}
                            path='/projects'
                            component={ProjectsListPage}
                        />
                        <Route
                            exact={true}
                            path='/map/:slug'
                            component={MapPage}
                        />
                        <Route
                            exact={true}
                            path='/login'
                            component={LoginPage}
                        />
                        <Route
                            exact={true}
                            path='/profile'
                            component={UserProfilePage}
                        />
                        <Route
                            exact={true}
                            path='/'
                            render={() => <Redirect to='/login'/>}
                        />
                    </div>
                </BrowserRouter>
            </Provider>
        );
    }
}
