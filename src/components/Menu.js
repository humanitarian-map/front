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
            <div className="project-info-icon mdi mdi-information-outline mdi-48px"
               onClick={() => this.props.selectTool('point')}></div>
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
        user: state.get('user')
    }),
    (dispatch) => ({
        selectTool: (tool) => {
            dispatch({type: "SELECT_TOOL", "payload": tool});
        }
    })
)(MenuImpl);

export default Menu;
