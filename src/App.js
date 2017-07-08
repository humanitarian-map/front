import React, { Component } from 'react';
import MapPage from "./pages/MapPage";
import LoginPage from "./pages/LoginPage";
import UserProfilePage from "./pages/UserProfilePage";
import './App.css';
import { BrowserRouter, Route, Redirect } from 'react-router-dom'

export default class App extends Component {
  render() {
      return (
		<BrowserRouter>
          <div className="App">
            <Route exact path="/"><Redirect to="/login" /></Route>
            <Route exact path="/map" component={MapPage}/>
            <Route exact path="/login" component={LoginPage}/>
            <Route exact path="/profile" component={UserProfilePage}/>
          </div>
		</BrowserRouter>
      );
  }
}
