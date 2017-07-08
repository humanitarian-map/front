import React, { Component } from 'react';
import {Link} from "react-router-dom";
import './LoginPage.css';

export default class LoginPage extends Component {
  render() {
      return (
        <div className="LoginPage">
          <img className="logo" alt="logo" src="http://www.makeachildcry.com/mobile/assets/img/logos/logo-mdm-ar.svg" />
          <form>
            <fieldset>
              <input type="text" placeholder="Username" />
              <input type="password" placeholder="Password" />
            </fieldset>
            <Link to="/map">
              <button>Login</button>
            </Link>
          </form>
        </div>
      );
  }
}
