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
            <MainMap center={this.props.map.get('center')}
                     zoom={this.props.map.get('zoom')}
                     points={this.props.map.get('points')}
                     drawing={this.props.map.get('drawing')}
                     onAddMarker={this.props.onAddMarker}
                     onAddArrowPoint={this.props.onAddArrowPoint} />
          </div>
          <div className="menu-container">
            <Menu />
          </div>
        </div>
      );
  }
}

const MapPage = connect(
    (state) => ({
        map: state.get('map'),
        user: state.get('user')
    }),
    (dispatch) => ({
        onAddMarker: (lat, lng) => {
            dispatch({type: "ADD_MARKER", "payload": {position: [lat, lng]}});
        },
        onAddArrowPoint: (lat, lng) => {
            dispatch({type: "ADD_ARROW_POINT", "payload": [lat, lng]});
        }
    })
)(MapPageImpl);

export default MapPage;
