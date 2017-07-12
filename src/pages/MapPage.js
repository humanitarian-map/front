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
              <ProjectDetail project={this.props.project}/>
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
              <MainMap />
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
        displayProjectDetail: state.get('display-project-detail')
    }),
    (dispatch) => ({
        getProject: (slug) => {
            dispatch({type: "GET_CURRENT_PROJECT", "payload": slug});
        }
    })
)(MapPageImpl);

export default MapPage;
