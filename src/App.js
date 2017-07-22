import React, { Component } from 'react';
import MapPage from "./pages/MapPage";
import LoginPage from "./pages/LoginPage";
import UserProfilePage from "./pages/UserProfilePage";
import ProjectsListPage from "./pages/ProjectsListPage";
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { reducer, initialState} from './App.store';
import './App.css';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import { createEpicMiddleware } from 'redux-observable';
import { rootEpic } from "./App.epics"
import { events$ } from "./App.events"

let store = createStore(reducer, initialState, applyMiddleware(createEpicMiddleware(rootEpic)));

events$.subscribe((action) => {
    store.dispatch(action);
})

export default class App extends Component {
  render() {
      return (
        <Provider store={store}>
		  <BrowserRouter>
            <div className="App">
              <Route exact path="/projects" component={ProjectsListPage}/>
              <Route exact path="/map/:slug" component={MapPage}/>
              <Route exact path="/login" component={LoginPage}/>
              <Route exact path="/profile" component={UserProfilePage}/>
              <Route exact path="/" render={() => <Redirect to="/login" />}></Route>
            </div>
		  </BrowserRouter>
        </Provider>
      );
  }
}
