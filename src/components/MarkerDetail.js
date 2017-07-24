import React from 'react';
import { connect } from 'react-redux'
import {PropTypes} from "prop-types";
import './MarkerDetail.css';
import {POINT_TYPES_OBJ} from "../utils/point_types";
import {emit} from "../App.events";
import * as actions from "../App.actions";
import Lightbox from "./Lightbox";

function MarkerIcon(props) {
    let icon = POINT_TYPES_OBJ[props.type || "other"].icon;
    let name = POINT_TYPES_OBJ[props.type || "other"].name;
    return (
        <div className={"MarkerIcon " + (props.active? "active" : "")} onClick={props.onClick}>
          <div className={"marker-icon " + props.type + "-icon mdi mdi-" + icon + " mdi-24px"}  />
          <span>{name}</span>
        </div>
    )
}

class MarkerDetail extends React.Component {
    render() {
        let marker = this.props.marker;

        let projectDocuments = []
        if (this.props.documents) {
          projectDocuments = this.props.documents.filter((doc) => {
              let isFile = doc.get('type') === "file";
              let splittedPath = doc.get('path').split("/");
              let isInThePointFolder = splittedPath.length >= 4 && splittedPath[2] === marker.name;
              return isFile && isInThePointFolder;
          });
        }

        return (
          <section className="MarkerDetail panel">
            {this.props.openLightbox === "delete-marker" &&
              <Lightbox size="small">
                ¿Are you sure that you want to delete the "{marker.name}" marker?
                <button onClick={() => emit(actions.deleteMarker(this.props.project.get('slug'), marker.id))}>Yes</button>
                <button onClick={() => emit(actions.closeLightbox())}>No</button>
              </Lightbox>}
            <h2 className="header-title">
              {marker.type === "point" && "Marker"}
              {marker.type === "arrow" && "Arrow"}
              {marker.type === "polygon" && "Polygon"}
              {marker.type === "cross" && "Cross"}
            </h2>
            <div className="content">
              <div className="block">
                <h3 className="title panel-name">{marker.name}</h3>
              </div>
              {marker.type === "point" &&
                <div className="block">
                  <h3 className="title mdi mdi-bookmark mdi-16px">Category</h3>
                  <div className="markers">
                    <MarkerIcon type={marker.data.icon} />
                  </div>
                </div>}
              <div className="block">
                <h3 className="title mdi mdi-comment mdi-16px">Comment</h3>
                <p>{marker.description}</p>
              </div>
              <div className="block">
                <h3 className="title mdi mdi-map mdi-16px">Coordinates</h3>
                {(marker.type === "point" || marker.type === "cross") &&
                  <div className="coordinates-inputs">
                      <span>Latitude {marker.data.position[0].toFixed(4)}</span>
                      <span>Longitude {marker.data.position[1].toFixed(4)}</span>
                  </div>}
                {marker.type === "arrow" &&
                  <div className="coordinates-inputs">
                      <h4>Origin</h4>
                      <span>Latitude {marker.data.origin[0].toFixed(4)}</span>,
                      <span>Longitude {marker.data.origin[1].toFixed(4)}</span>
                      <h4>Destination</h4>
                      <span>Latitude {marker.data.dest[0].toFixed(4)}</span>,
                      <span>Longitude {marker.data.dest[1].toFixed(4)}</span>
                  </div>}
                {marker.type === "polygon" &&
                  <div className="coordinates-inputs">
                      {marker.data.positions.map((point, idx) => (
                        <p key={idx}>
                          <span>Latitude {point[0].toFixed(4)}</span>,
                          <span>Longitude {point[1].toFixed(4)}</span>
                        </p>))}
                  </div>}
              </div>
              {marker.type === "point" &&
                <div className="block block-documents">
                  <h3 className="title mdi mdi-attachment mdi-16px">Documents</h3>
                  <div className="docs">
                    {(projectDocuments || []).map((doc) => (
                      <a className="ellipsis"
                         key={doc.get('path')}
                         href={marker.documents_url}
                         target="_blank"
                         alt={doc.get('name')}>
                        {doc.get('name')}
                      </a>
                    ))}
                    <a target="_blank" href={marker.documents_url}>Open documents folder</a>
                  </div>
                </div>}
            </div>
            <div className="buttons-set">
              <button className="delete" onClick={() => emit(actions.openLightbox("delete-marker"))}>Delete</button>
            </div>
          </section>
        );
    }
}

MarkerDetail.propTypes = {
    marker: PropTypes.object.isRequired,
    project: PropTypes.object,
    documents: PropTypes.object
}

export default connect(
    (state) => ({
        marker: state.getIn(['map', 'viewing']).toJS(),
        project: state.get("current-project"),
        documents: state.get("documents"),
        openLightbox: state.get('open-lightbox'),
    })
)(MarkerDetail);
