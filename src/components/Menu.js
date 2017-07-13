import React, { Component } from 'react';
import { connect } from 'react-redux'
import {PropTypes} from "prop-types";
import {Link} from "react-router-dom";
import logoSvg from './img/logo-navbar.svg';
import './Menu.css';

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
               onClick={() => this.props.toggleDisplayDetail()}></div>
            <div className="empty"></div>
            <div className="end">
                <Link className="user" to="/profile">
                  <img className="avatar" alt="avatar" src={this.props.user.get('avatar')} />
                </Link>
                <Link className="logo" to="/projects">
                  <div className="logo-icon map mdi mdi-map mdi-36px"></div>
                </Link>
            </div>
          </div>
          <img src={logoSvg} />
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
    (dispatch) => ({
        selectTool: (tool) => {
            dispatch({type: "SELECT_TOOL", "payload": tool});
        },
        toggleDisplayDetail: () => {
            dispatch({type: "TOGGLE_DISPLAY_DETAIL", "payload": null});
        },
    })
)(MenuImpl);

export default Menu;
