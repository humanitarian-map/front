import React, { Component } from 'react';
import { connect } from 'react-redux'
import './LoginPage.css';
import logoSvg from './img/logo-navbar.svg';
import * as actions from "../App.actions";
import {emit} from "../App.events";

class LoginPage extends Component {
    password = "";
    username = "";

    constructor(props) {
        super(props);
        this.state = {
            "username": "",
            "password": ""
        }
        this.submit = this.submit.bind(this);
    }

    submit(event) {
        event.preventDefault();
        emit(actions.SetLoginErrors(null))
        emit(actions.Login(this.state.username, this.state.password))
    }

    render() {
        return (
          <div className="LoginPage">
            <img className="logo" alt="logo" src={logoSvg} />
            <h1>The Humanitarian Map</h1>
            <h2>Visualize your humanitarian project in a map</h2>
            <form onSubmit={this.submit}>
              {this.props.loginErrors && this.props.loginErrors.get('non_field_errors', false) &&
                  <p className="error">{this.props.loginErrors.get('non_field_errors')}</p>}
              <fieldset>
                <input type="text" placeholder="Username" onChange={(e) => this.setState({username: e.target.value})}/>
                {this.props.loginErrors && this.props.loginErrors.get('username', false) &&
                    <p className="error">{this.props.loginErrors.get('username')}</p>}
                <input type="password" placeholder="Password"  onChange={(e) => this.setState({password: e.target.value})} />
                {this.props.loginErrors && this.props.loginErrors.get('password', false) &&
                    <p className="error">{this.props.loginErrors.get('password')}</p>}
              </fieldset>
               <button>Login</button>
            </form>
          </div>
        );
    }
}

export default connect(
    (state) => ({
        loginErrors: state.get('login-errors')
    })
)(LoginPage);
