import React from 'react';
import {PropTypes} from "prop-types";
import './ProjectDetail.css';
import moment from "moment";

export default function ProjectDetail(props) {
    let organization = props.project.get("organization")

    let camps = props.project.get('mapitems').filter((i) => i.getIn(['data', 'icon']) === "camp");
    let hospitals = props.project.get('mapitems').filter((i) => i.getIn(['data', 'icon']) === "hospital");
    let mobileClinics = props.project.get('mapitems').filter((i) => i.getIn(['data', 'icon']) === "mobile-clinic");
    let warnings = props.project.get('mapitems').filter((i) => i.getIn(['data', 'icon']) === "warning");
    let checkpoints = props.project.get('mapitems').filter((i) => i.getIn(['data', 'icon']) === "checkpoint");
    let idps = props.project.get('mapitems').filter((i) => i.getIn(['data', 'icon']) === "idps");
    let others = props.project.get('mapitems').filter((i) => i.getIn(['data', 'icon']) === "other");

    return (
      <section className="ProjectDetail panel">
        <h2 className="header-title">Project</h2>
        <div className="content">
          <div className="block">
            <h3 className="title panel-name">{props.project.get('name')}</h3>
            <p className="description">{props.project.get('description')}</p>
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
            <a className="ellipsis" href="" alt="">https://drive.google.com/drive/u/0/folders/0BwVWP_fda2O1fnRDWGNVcFd2N0RfUnBNVENrVnZRTGdTNGNwSExabHFnQmdtVzVPR3VKRU0</a>
            <a className="ellipsis" href="" alt="">https://drive.google.com/drive/u/0/folders/0BwVWP_fda2O1fnRDWGNVcFd2N0RfUnBNVENrVnZRTGdTNGNwSExabHFnQmdtVzVPR3VKRU0</a>
          </div>
          <div className="block">
            <h3 className="title mdi mdi-map-marker mdi-16px">Markers</h3>
            <ul>
              <li>
                <span className="name">Camps</span>
                <span className="tag">{camps.size}</span>
                <ul>
                  {camps.map((camp) => <li>{camp.get('name')}</li>)}
                </ul>
              </li>
              <li>
                <span className="name">Hospitals</span>
                <span className="tag">{hospitals.size}</span>
                <ul>
                  {hospitals.map((hospital) => <li>{hospital.get('name')}</li>)}
                </ul>
              </li>
              <li>
                <span className="name">Warnings</span>
                <span className="tag">{warnings.size}</span>
                <ul>
                  {warnings.map((warning) => <li>{warning.get('name')}</li>)}
                </ul>
              </li>
              <li>
                <span className="name">IDPs</span>
                <span className="tag">{idps.size}</span>
                <ul>
                  {idps.map((idp) => <li>{idp.get('name')}</li>)}
                </ul>
              </li>
              <li>
                <span className="name">Check points</span>
                <span className="tag">{checkpoints.size}</span>
                <ul>
                  {checkpoints.map((checkpoint) => <li>{checkpoint.get('name')}</li>)}
                </ul>
              </li>
              <li>
                <span className="name">Mobile clinics</span>
                <span className="tag">{mobileClinics.size}</span>
                <ul>
                  {mobileClinics.map((mobileClinic) => <li>{mobileClinic.get('name')}</li>)}
                </ul>
              </li>
              <li>
                <span className="name">Other</span>
                <span className="tag">{others.size}</span>
                <ul>
                  {others.map((other) => <li>{other.get('name')}</li>)}
                </ul>
              </li>
            </ul>
          </div>
          <div className="block">
            <h3 className="title mdi mdi-calendar mdi-16px">Timeframe</h3>
            <div  className="timeframe">
              <span className="label">Start:</span> <span className="value">{moment(props.project.get('start_datetime')).calendar()}</span>
              <span className="label">End:</span> <span className="value">{moment(props.project.get('end_datetime')).calendar()}</span>
            </div>
          </div>
        </div>
      </section>
    );
}

ProjectDetail.propTypes = {
    project: PropTypes.object
}
