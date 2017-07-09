import React, { Component } from 'react';
import { connect } from 'react-redux'
import MainMap from "../components/MainMap";
import Menu from "../components/Menu";
import './MapPage.css';

class MapPageImpl extends Component {
  render() {
      return (
        <div className="MapPage">
          <div className="map-container">
            <MainMap center={this.props.map.center} zoom={this.props.map.zoom} points={this.props.map.points} />
          </div>
          <div className="menu-container">
            <Menu user={this.props.user} />
          </div>
        </div>
      );
  }
}

const MapPage = connect(
    (state) => ({map: state.map, user: state.user}),
    (dispatch) => ({
    })
)(MapPageImpl);

export default MapPage;
