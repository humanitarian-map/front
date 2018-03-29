import React, { Component } from 'react';
import MapPage from "./pages/MapPage";
import LoginPage from "./pages/LoginPage";
import UserProfilePage from "./pages/UserProfilePage";
import ProjectsListPage from "./pages/ProjectsListPage";
import { Provider } from 'react-redux'
import { store } from './App.store';
import './App.css';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';


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
