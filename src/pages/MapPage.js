import React, { Component } from 'react';
import { connect } from 'react-redux'
import MainMap from "../components/MainMap";
import Menu from "../components/Menu";
import ToolsMenu from "../components/ToolsMenu";
import ProjectDetail from "../components/ProjectDetail";
import MarkerCreationDetail from "../components/MarkerCreationDetail";
import MarkerDetail from "../components/MarkerDetail";
import './MapPage.css';

class MapPageImpl extends Component {
  componentWillMount() {
      this.props.getProject(this.props.match.params.slug);
  }

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
          {this.props.map.get("viewing") &&
             <div className="point-detail-container">
               <MarkerDetail />
             </div>}
          <div className="map-and-tools-menu-container">
            <div className="tools-menu-container">
              <ToolsMenu />
            </div>
            <div className="map-container">
              {this.props.project &&
                <MainMap center={this.props.project.get('center_point')}
                         zoom={this.props.project.get('zoom')}
                         points={this.props.project.get('mapitems')}
                         drawing={this.props.map.get('drawing')}
                         cursor={this.props.map.get('cursor')}
                         onCursorMove={this.props.onCursorMove}
                         onClickMarker={this.props.onClickMarker}
                         onAddMarker={this.props.onAddMarker}
                         onAddCross={this.props.onAddCross}
                         onAddArrowPoint={this.props.onAddArrowPoint}
                         onAddPolygonPoint={this.props.onAddPolygonPoint}
                         onCancelDrawing={this.props.onCancelDrawing}
                         onConfirmPolygonDrawing={this.props.onConfirmPolygonDrawing} />}
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
        project: state.get('current-project'),
        displayProjectDetail: state.get('displayProjectDetail')
    }),
    (dispatch) => ({
        onAddMarker: (lat, lng) => {
            dispatch({type: "ADD_MARKER", "payload": [lat, lng]});
        },
        onAddCross: (lat, lng) => {
            dispatch({type: "ADD_CROSS", "payload": [lat, lng]});
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
        },
        onClickMarker: (point) => {
            dispatch({type: "VISUALIZE_MARKER", "payload": point});
        },
        getProject: (slug) => {
            dispatch({type: "GET_CURRENT_PROJECT", "payload": slug});
        }
    })
)(MapPageImpl);

export default MapPage;
