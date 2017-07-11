import React, { Component } from 'react';
import { connect } from 'react-redux'
import MainMap from "../components/MainMap";
import Menu from "../components/Menu";
import ToolsMenu from "../components/ToolsMenu";
import ProjectDetail from "../components/ProjectDetail";
import './MapPage.css';

class MapPageImpl extends Component {
  render() {
      return (
        <div className="MapPage">
          <div className="menu-container">
            <Menu />
          </div>
          <div className="project-detail-container">
            <ProjectDetail />
          </div>
          <div className="map-and-tools-menu-container">
            <div className="tools-menu-container">
              <ToolsMenu />
            </div>
            <div className="map-container">
              <MainMap center={this.props.map.get('center')}
                       zoom={this.props.map.get('zoom')}
                       points={this.props.map.get('points')}
                       drawing={this.props.map.get('drawing')}
                       onAddMarker={this.props.onAddMarker}
                       onAddArrowPoint={this.props.onAddArrowPoint}
                       onAddPolygonPoint={this.props.onAddPolygonPoint}
                       onCancelDrawing={this.props.onCancelDrawing}
                       onConfirmPolygonDrawing={this.props.onConfirmPolygonDrawing} />
            </div>
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
        },
        onAddPolygonPoint: (lat, lng) => {
            dispatch({type: "ADD_POLYGON_POINT", "payload": [lat, lng]});
        },
        onCancelDrawing: () => {
            dispatch({type: "CANCEL_DRAWING", "payload": null});
        },
        onConfirmPolygonDrawing: () => {
            dispatch({type: "CONFIRM_POLYGON_DRAWING", "payload": null});
        }
    })
)(MapPageImpl);

export default MapPage;
