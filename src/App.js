import React, { Component } from 'react';
import MapPage from "./pages/MapPage";
import LoginPage from "./pages/LoginPage";
import UserProfilePage from "./pages/UserProfilePage";
import ProjectsListPage from "./pages/ProjectsListPage";
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import { reducer, initialState} from './App.store';
import './App.css';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import { createEpicMiddleware } from 'redux-observable';
import { rootEpic } from "./App.epics"
import { events$ } from "./App.events"

import { ConnectedRouter, routerMiddleware, push } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const history = createHistory()

let store = createStore(
    reducer,
    initialState,
    composeEnhancers(applyMiddleware(createEpicMiddleware(rootEpic), routerMiddleware(history)))
);

events$.subscribe((action) => {
    store.dispatch(action);
})

export default class App extends Component {
  render() {
      return (
        <Provider store={store}>
		  <ConnectedRouter history={history}>
            <div className="App">
              <Route exact path="/projects" component={ProjectsListPage}/>
              <Route exact path="/map/:slug" component={MapPage}/>
              <Route exact path="/login" component={LoginPage}/>
              <Route exact path="/profile" component={UserProfilePage}/>
              <Route exact path="/" render={() => <Redirect to="/login" />}></Route>
            </div>
		  </ConnectedRouter>
        </Provider>
      );
  }
}
