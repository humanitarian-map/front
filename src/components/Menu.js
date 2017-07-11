import React, { Component } from 'react';
import { connect } from 'react-redux'
import {PropTypes} from "prop-types";
import {Link} from "react-router-dom";
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
            <div className={"project-info-icon mdi mdi-information-outline mdi-48px " + (this.props.openDetail ? "active" : "")}
               onClick={() => this.props.toggleDisplayDetail()}></div>
            <div className="empty"></div>
            <div className="end">
                <Link className="user" to="/profile">
                  <img className="avatar" alt="avatar" src={this.props.user.get('avatar')} />
                </Link>
                <div className="map mdi mdi-map mdi-36px"></div>
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
        openDetail: state.get('displayProjectDetail')
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
