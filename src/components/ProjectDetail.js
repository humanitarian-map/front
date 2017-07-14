import React from 'react';
import {PropTypes} from "prop-types";
import './ProjectDetail.css';
import moment from "moment";

export default class ProjectDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openMarker: ""
        }
        this.centerMap = this.centerMap.bind(this);
        this.toggleMarkerList = this.toggleMarkerList.bind(this);
    }

    centerMap(point) {
        this.props.onMarkerClick(point);
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

      let camps = this.props.project.get('mapitems').filter((i) => i.getIn(['data', 'icon']) === "camp");
      let hospitals = this.props.project.get('mapitems').filter((i) => i.getIn(['data', 'icon']) === "hospital");
      let mobileClinics = this.props.project.get('mapitems').filter((i) => i.getIn(['data', 'icon']) === "mobile-clinic");
      let warnings = this.props.project.get('mapitems').filter((i) => i.getIn(['data', 'icon']) === "warning");
      let checkpoints = this.props.project.get('mapitems').filter((i) => i.getIn(['data', 'icon']) === "checkpoint");
      let idps = this.props.project.get('mapitems').filter((i) => i.getIn(['data', 'icon']) === "idps");
      let others = this.props.project.get('mapitems').filter((i) => i.getIn(['data', 'icon']) === "other");

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
                {camps.size > 0 &&
                  <li>
                    <div className="header" onClick={() => this.toggleMarkerList("camps")}>
                      <span className="marker-icon camp-icon mdi mdi-tent mdi-18px"></span>
                      <span className="name">Camps</span>
                      <span className="arrow mdi mdi-chevron-right mdi-18px"></span>
                      <span className="tag">{camps.size}</span>
                    </div>
                    {this.state.openMarker === "camps" &&
                      <ul>
                        {camps.map((camp) => (
                            <li onClick={() => this.centerMap(camp.toJS())}
                                key={camp.get('id')}>{camp.get('name')}</li>
                        ))}
                      </ul>}
                  </li>}
                {hospitals.size > 0 &&
                  <li>
                    <div className="header" onClick={() => this.toggleMarkerList("hospitals")}>
                      <span className="marker-icon hospital-icon mdi mdi-hospital mdi-18px"></span>
                      <span className="name">Hospitals</span>
                      <span className="arrow mdi mdi-chevron-right mdi-18px"></span>
                      <span className="tag">{hospitals.size}</span>
                    </div>
                    {this.state.openMarker === "hospitals" &&
                      <ul>
                        {hospitals.map((hospital) => (
                            <li onClick={() => this.centerMap(hospital.toJS())}
                                key={hospital.get('id')}>{hospital.get('name')}</li>
                        ))}
                      </ul>}
                  </li>}
                {warnings.size > 0 &&
                  <li>
                    <div className="header" onClick={() => this.toggleMarkerList("warnings")}>
                      <span className="marker-icon warning-icon mdi mdi-fire mdi-18px"></span>
                      <span className="name">Warnings</span>
                      <span className="arrow mdi mdi-chevron-right mdi-18px"></span>
                      <span className="tag">{warnings.size}</span>
                    </div>
                    {this.state.openMarker === "warnings" &&
                      <ul>
                        {warnings.map((warning) => (
                            <li onClick={() => this.centerMap(warning.toJS())}
                                key={warning.get('id')}>{warning.get('name')}</li>
                        ))}
                      </ul>}
                  </li>}
                {idps.size > 0 &&
                  <li>
                    <div className="header" onClick={() => this.toggleMarkerList("idps")}>
                      <span className="marker-icon idps-icon mdi mdi-walk mdi-18px"></span>
                      <span className="name">IDPs</span>
                      <span className="arrow mdi mdi-chevron-right mdi-18px"></span>
                      <span className="tag">{idps.size}</span>
                    </div>
                    {this.state.openMarker === "idps" &&
                      <ul>
                        {idps.map((idp) => (
                            <li onClick={() => this.centerMap(idp.toJS())}
                                key={idp.get('id')}>{idp.get('name')}</li>
                        ))}
                      </ul>}
                  </li>}
                {checkpoints.size > 0 &&
                  <li>
                    <div className="header" onClick={() => this.toggleMarkerList("checkpoints")}>
                      <span className="marker-icon checkpoint-icon mdi mdi-marker-check mdi-18px"></span>
                      <span className="name">Check points</span>
                      <span className="arrow mdi mdi-chevron-right mdi-18px"></span>
                      <span className="tag">{checkpoints.size}</span>
                    </div>
                    {this.state.openMarker === "checkpoints" &&
                      <ul>
                        {checkpoints.map((checkpoint) => (
                            <li onClick={() => this.centerMap(checkpoint.toJS())}
                                key={checkpoint.get('id')}>{checkpoint.get('name')}</li>
                        ))}
                      </ul>}
                  </li>}
                {mobileClinics.size > 0 &&
                  <li>
                    <div className="header" onClick={() => this.toggleMarkerList("mobile-clinics")}>
                      <span className="marker-icon mobile-clinic-icon mdi mdi-truck mdi-18px"></span>
                      <span className="name">Mobile clinics</span>
                      <span className="arrow mdi mdi-chevron-right mdi-18px"></span>
                      <span className="tag">{mobileClinics.size}</span>
                    </div>
                    {this.state.openMarker === "mobile-clinics" &&
                      <ul>
                        {mobileClinics.map((mobileClinic) => (
                            <li onClick={() => this.centerMap(mobileClinic.toJS())}
                                key={mobileClinic.get('id')}>{mobileClinic.get('name')}</li>
                        ))}
                      </ul>}
                  </li>}
                {others.size > 0 &&
                  <li>
                    <div className="header" onClick={() => this.toggleMarkerList("other")}>
                      <span className="marker-icon other-icon mdi mdi-map-marker mdi-18px"></span>
                      <span className="name">Other</span>
                      <span className="arrow mdi mdi-chevron-right mdi-18px"></span>
                      <span className="tag">{others.size}</span>
                    </div>
                    {this.state.openMarker === "other" &&
                      <ul>
                        {others.map((other) => (
                            <li onClick={() => this.centerMap(other.toJS())}
                                key={other.get('id')}>{other.get('name')}</li>
                        ))}
                      </ul>}
                  </li>}
              </ul>
            </div>
            <div className="block">
              <h3 className="title mdi mdi-calendar mdi-16px">Timeframe</h3>
              <div  className="timeframe">
                <span className="label">Start:</span> <span className="value">{moment(this.props.project.get('start_date')).calendar()}</span>
                <span className="label">End:</span> <span className="value">{moment(this.props.project.get('end_date')).calendar()}</span>
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
    onMarkerClick: PropTypes.func
}
