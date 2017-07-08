import React, { Component } from 'react';
import MainMap from "../components/MainMap";
import Menu from "../components/Menu";
import './MapPage.css';

export default class MapPage extends Component {
  render() {
      return (
        <div className="MapPage">
          <div className="map-container">
            <MainMap />
          </div>
          <div className="menu-container">
            <Menu />
          </div>
        </div>
      );
  }
}
