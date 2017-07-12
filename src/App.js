import React, { Component } from 'react';
import MapPage from "./pages/MapPage";
import LoginPage from "./pages/LoginPage";
import UserProfilePage from "./pages/UserProfilePage";
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import effects from "redux-effects";
import appEffects from "./App.effects";
import { reducer, initialState} from './App.store';
import './App.css';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';

let store = createStore(reducer, initialState, applyMiddleware(effects, appEffects));

export default class App extends Component {
  render() {
      return (
        <Provider store={store}>
		  <BrowserRouter>
            <div className="App">
              <Route exact path="/"><Redirect to="/map/example-project-1" /></Route>
              <Route exact path="/map/:slug" component={MapPage}/>
              <Route exact path="/login" component={LoginPage}/>
              <Route exact path="/profile" component={UserProfilePage}/>
            </div>
		  </BrowserRouter>
        </Provider>
      );
  }
}
