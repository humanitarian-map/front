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
            <div className="logo-container">
                <img className="logo" alt="logo" src="http://www.makeachildcry.com/mobile/assets/img/logos/logo-mdm-ar.svg" />
            </div>
            <Link className="user" to="/profile">
              <img className="avatar" alt="avatar" src={this.props.user.get('avatar')} />
              <div className="name">{this.props.user.get('fullname')}</div>
            </Link>
            <div className="actions">
                <a className="marker mdi mdi-map-marker mdi-36px"
                   onClick={() => this.props.selectTool('point')}></a>
                <div className="marker-icon mdi mdi-arrow-up mdi-36px"
                     onClick={() => this.props.selectTool('arrow')}></div>
            </div>
            <div className="end">
                <a className="map mdi mdi-map mdi-36px"></a>
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
