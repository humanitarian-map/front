import React from 'react';
import { connect } from 'react-redux'
import {PropTypes} from "prop-types";
import './ProjectDetail.css';
import moment from "moment";
import {POINT_TYPES} from "../utils/point_types";
import {emit} from "../App.events";
import * as actions from "../App.actions";

class ProjectDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openMarker: ""
        }
        this.centerMap = this.centerMap.bind(this);
        this.toggleMarkerList = this.toggleMarkerList.bind(this);
    }

    centerMap(point) {
        emit(actions.visualizeMarker(point));
        setTimeout(() => emit(actions.centerMap(point.data.position), this.props.currentPosition.get('zoom'), 100));
    }

    toggleMarkerList(marker) {
        if (marker === this.state.openMarker) {
            this.setState({openMarker: ""});
        } else {
            this.setState({openMarker: marker});
        }
    }

    render() {
      let organization = this.props.project.get("organization")


      let points = []
      let mapitems = this.props.project.get('mapitems');
      for (let pointType of POINT_TYPES) {
          points.push(
              {
                  points: mapitems.filter((i) => i.getIn(['data', 'icon']) === pointType.id),
                  pointType: pointType
              }
          );
      }

      let projectDocuments = [];
      if (this.props.documents) {
        projectDocuments = this.props.documents.filter((doc) => {
          let isFile = doc.get('type') === "file";
          let splittedPath = doc.get('path').split("/");
          let isInTheProjectFolder = splittedPath.length === 3 && splittedPath[1] === this.props.project.get('slug');
          return isFile && isInTheProjectFolder;
        });
      }

      return (
        <section className="ProjectDetail panel">
          <h2 className="header-title">Project</h2>
          <div className="content">
            <div className="block">
              <h3 className="title panel-name">{this.props.project.get('name')}</h3>
              <p className="description">{this.props.project.get('description')}</p>
            </div>
            <div className="block">
              <h3 className="title mdi mdi-lan mdi-16px">Organization</h3>
              <div className="organization">
                <span className="logo"><img src={organization.get('image')} alt={organization.get('name')} /></span>
                <span className="title">{organization.get('name')}</span>
              </div>
            </div>
            <div className="block block-documents">
              <h3 className="title mdi mdi-attachment mdi-16px">Documents</h3>
              {projectDocuments && projectDocuments.map((doc) => (
                  <a className="ellipsis"
                     href={this.props.project.get('documents_url')}
                     target="_blank"
                     key={doc.get('path')}
                     alt={doc.get('name')}>
                    {doc.get('name')}
                  </a>
              ))}
              <a target="_blank" href={this.props.project.get('documents_url')}>Open documents folder</a>
            </div>
            <div className="block">
              <h3 className="title mdi mdi-map-marker mdi-16px">Markers</h3>
              <ul className="markers-list">
                {points.map((pointsGroup) => (
                  pointsGroup.points.size > 0 &&
                    <li key={pointsGroup.pointType.id}>
                      <div className="header" onClick={() => this.toggleMarkerList(pointsGroup.pointType.id)}>
                        <span className={"marker-icon mdi mdi-" + pointsGroup.pointType.icon + " mdi-18px"}
                              style={{backgroundColor: pointsGroup.pointType.color}}></span>
                        <span className="name">{pointsGroup.pointType.name}</span>
                        <span className="arrow mdi mdi-chevron-right mdi-18px"></span>
                        <span className="tag">{pointsGroup.points.size}</span>
                      </div>
                      {this.state.openMarker === pointsGroup.pointType.id &&
                        <ul>
                          {pointsGroup.points.map((point) => (
                              <li onClick={() => this.centerMap(point.toJS())}
                                  key={point.get('id')}>{point.get('name')}</li>
                          ))}
                        </ul>}
                    </li>))}
              </ul>
            </div>
            <div className="block">
              <h3 className="title mdi mdi-calendar mdi-16px">Timeframe</h3>
              <div  className="timeframe">
                <div className="date">
                  <span className="label">Start:</span> <span className="value">{moment(this.props.project.get('start_date')).calendar()}</span>
                </div>
                <div className="date">
                  <span className="label">End:</span> <span className="value">{moment(this.props.project.get('end_date')).calendar()}</span>
                </div>
              </div>
            </div>
            <div className="block">
              <h3 className="title mdi mdi-map mdi-16px">Map options</h3>
              <p>
                <button className=""
                        onClick={() => emit(actions.setProjectCenter(
                            this.props.project.toJS(),
                            this.props.currentPosition.get('center').toJS(),
                            this.props.currentPosition.get('zoom')
                        ))}>
                  Set current view as map center
                </button>
              </p>
              <div>
                <button className=""
                        onClick={() => emit(actions.centerMap(
                            {lat: this.props.project.getIn(['center_point', 0]),
                             lng: this.props.project.getIn(['center_point', 1])},
                            this.props.project.get('zoom')
                        ))}>
                  Zoom to map center
                </button>
              </div>
            </div>
          </div>
        </section>
      );
    }
}

ProjectDetail.propTypes = {
    project: PropTypes.object,
    documents: PropTypes.object,
    currentPosition: PropTypes.object,
}

export default connect(
    (state) => ({
        currentPosition: state.getIn(['map', 'current-position']),
    })
)(ProjectDetail);
