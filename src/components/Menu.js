import React, { Component } from 'react';
import {Link} from "react-router-dom";
import './Menu.css';

export default class Menu extends Component {
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
              <img className="avatar" alt="avatar" src="https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAArVAAAAJDU1ZDYxYTc2LWFjMzUtNGQ0Zi1iZjUxLTNlMzZlMTQ2MWY3Nw.jpg" />
              <div className="name">Ali Ahmed</div>
            </Link>
            <div className="actions">
                <a className="members mdi mdi-account-multiple mdi-36px"></a>
                <a className="chat mdi mdi-wechat mdi-36px"></a>
                <a className="document mdi mdi-file-document mdi-36px"></a>
                <a className="folder mdi mdi-folder-open mdi-36px"></a>
                <a className="marker mdi mdi-map-marker mdi-36px"></a>
                <div className="add-marker mdi mdi-map-marker-plus mdi-36px"
                   onMouseEnter={() => this.setState({displayMarkers: true})}
                   onMouseLeave={() => this.setState({displayMarkers: false})}>
                    {this.state.displayMarkers &&
                      <div className="markers-box">
                        <div className="marker-icon mdi mdi-close mdi-36px"></div>
                        <div className="marker-icon mdi mdi-account-multiple mdi-36px"></div>
                        <div className="marker-icon mdi mdi-information-outline mdi-36px"></div>
                        <div className="marker-icon mdi mdi-account mdi-36px"></div>
                        <div className="marker-icon mdi mdi-arrow-down mdi-36px"></div>
                        <div className="marker-icon mdi mdi-arrow-up mdi-36px"></div>
                        <div className="marker-icon mdi mdi-home mdi-36px"></div>
                        <div className="marker-icon mdi mdi-home-outline mdi-36px"></div>
                      </div>}
                </div>
            </div>
            <div className="end">
                <a className="map mdi mdi-map mdi-36px"></a>
            </div>
          </div>
        );
    }
}
