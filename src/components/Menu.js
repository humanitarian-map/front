import React, { Component } from 'react';
import { connect } from 'react-redux'
import {PropTypes} from "prop-types";
import {Link} from "react-router-dom";
import logoSvg from './img/logo-navbar.svg';
import './Menu.css';
import {emit} from "../App.events";
import * as actions from "../App.actions";

class MenuImpl extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displayMarkers: false
        }
    }

    render() {
        return (
          <div className="Menu">
            <div className={"project-info-icon mdi mdi-information-outline mdi-36px " + (this.props.openDetail ? "active" : "")}
               onClick={() => emit(actions.toggleDisplayDetail())}></div>
            <div className="empty"></div>
            <div className="end">
                <Link className="user" to="/profile">
                  <img className="avatar" alt="avatar" src={this.props.user.get('avatar')} />
                </Link>
                <Link className="logo" to="/projects">
                  <img src={logoSvg} alt="logo" />
                </Link>
            </div>
          </div>
        );
    }
}

MenuImpl.propTypes = {
    user: PropTypes.object.isRequired
}

const Menu = connect(
    (state) => ({
        user: state.get('user'),
        openDetail: state.get('display-project-detail')
    }),
)(MenuImpl);

export default Menu;
