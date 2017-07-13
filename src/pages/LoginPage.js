import React, { Component } from 'react';
import {Link} from "react-router-dom";
import './LoginPage.css';
import logoSvg from './img/logo-navbar.svg';

export default class LoginPage extends Component {
  render() {
      return (
        <div className="LoginPage">
          <img className="logo" src={logoSvg} />
          <h1>The Humanitarian Map</h1>
          <h2>Visualize your humanitarian project in a map</h2>
          <form>
            <fieldset>
              <input type="text" placeholder="Username" />
              <input type="password" placeholder="Password" />
            </fieldset>
            <Link to="/projects">
              <button>Login</button>
            </Link>
          </form>
        </div>
      );
  }
}
