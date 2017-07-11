import React, { Component } from 'react';
import { connect } from 'react-redux'
import MainMap from "../components/MainMap";
import Menu from "../components/Menu";
import ToolsMenu from "../components/ToolsMenu";
import ProjectDetail from "../components/ProjectDetail";
import MarkerCreationDetail from "../components/MarkerCreationDetail";
import './MapPage.css';

class MapPageImpl extends Component {
  render() {
      return (
        <div className="MapPage">
          <div className="menu-container">
            <Menu />
          </div>
          {this.props.displayProjectDetail &&
            <div className="project-detail-container">
              <ProjectDetail />
            </div>}
          {this.props.map.getIn(["drawing", "type"]) === "point" &&
           this.props.map.getIn(["drawing", "position"]) &&
             <div className="point-detail-container">
               <MarkerCreationDetail />
             </div>}
          <div className="map-and-tools-menu-container">
            <div className="tools-menu-container">
              <ToolsMenu />
            </div>
            <div className="map-container">
              <MainMap center={this.props.map.get('center')}
                       cursor={this.props.map.get('cursor')}
                       zoom={this.props.map.get('zoom')}
                       points={this.props.map.get('points')}
                       drawing={this.props.map.get('drawing')}
                       onCursorMove={this.props.onCursorMove}
                       onAddMarker={this.props.onAddMarker}
                       onAddCross={this.props.onAddCross}
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
        user: state.get('user'),
        displayProjectDetail: state.get('displayProjectDetail')
    }),
    (dispatch) => ({
        onAddMarker: (lat, lng) => {
            dispatch({type: "ADD_MARKER", "payload": {position: [lat, lng]}});
        },
        onAddCross: (lat, lng) => {
            dispatch({type: "ADD_CROSS", "payload": {position: [lat, lng]}});
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
        },
        onCursorMove: (lat, lng) => {
            dispatch({type: "CURSOR_MOVE", "payload": [lat, lng]});
        }
    })
)(MapPageImpl);

export default MapPage;
