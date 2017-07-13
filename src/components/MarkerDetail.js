import React from 'react';
import { connect } from 'react-redux'
import {PropTypes} from "prop-types";
import './MarkerDetail.css';

function MarkerIcon(props) {
    let types = {
        "warning": {name: "Warning", icon: "fire"},
        "camp": {name: "Camp", icon: "tent"},
        "checkpoint": {name: "Check point", icon: "marker-check"},
        "hospital": {name: "Hospital", icon: "hospital"},
        "idps": {name: "IDPs", icon: "walk"},
        "mobile-clinic": {name: "Mobile clinic", icon: "truck"},
        "other": {name: "Other", icon: "map-marker"},
    }
    let icon = types[props.type || "other"].icon;
    let name = types[props.type || "other"].name;
    return (
        <div className={"MarkerIcon " + (props.active? "active" : "")} onClick={props.onClick}>
          <div className={"marker-icon " + props.type + "-icon mdi mdi-" + icon + " mdi-24px"}  />
          <span>{name}</span>
        </div>
    )
}

class MarkerDetailImpl extends React.Component {
    render() {
        let props = this.props
        let projectDocuments = props.documents.filter((doc) => {
            let isFile = doc.get('type') === "file";
            let splittedPath = doc.get('path').split("/");
            let isInThePointFolder = splittedPath.length >= 4 && splittedPath[2] === props.marker.name;
            return isFile && isInThePointFolder;
        });

        return (
          <section className="MarkerDetail panel">
            <h2 className="header-title">
              {props.marker.type === "point" && "Marker"}
              {props.marker.type === "arrow" && "Arrow"}
              {props.marker.type === "polygon" && "Polygon"}
              {props.marker.type === "cross" && "Cross"}
            </h2>
            <div className="content">
              <div className="block">
                <h3 className="title panel-name">{props.marker.name}</h3>
              </div>
              {props.marker.type === "point" &&
                <div className="block">
                  <h3 className="title mdi mdi-bookmark mdi-16px">Category</h3>
                  <div className="markers">
                    <MarkerIcon type={props.marker.data.icon} />
                  </div>
                </div>}
              <div className="block">
                <h3 className="title mdi mdi-comment mdi-16px">Comment</h3>
                <p>{props.marker.description}</p>
              </div>
              <div className="block">
                <h3 className="title mdi mdi-map mdi-16px">Coordinates</h3>
                {(props.marker.type === "point" || props.marker.type === "cross") &&
                  <div className="coordinates-inputs">
                      <span>Latitude {props.marker.data.position[0].toFixed(4)}</span>
                      <span>Longitude {props.marker.data.position[1].toFixed(4)}</span>
                  </div>}
                {props.marker.type === "arrow" &&
                  <div className="coordinates-inputs">
                      <h4>Origin</h4>
                      <span>Latitude {props.marker.data.origin[0].toFixed(4)}</span>,
                      <span>Longitude {props.marker.data.origin[1].toFixed(4)}</span>
                      <h4>Destination</h4>
                      <span>Latitude {props.marker.data.dest[0].toFixed(4)}</span>,
                      <span>Longitude {props.marker.data.dest[1].toFixed(4)}</span>
                  </div>}
                {props.marker.type === "polygon" &&
                  <div className="coordinates-inputs">
                      {props.marker.data.positions.map((point, idx) => (
                        <p key={idx}>
                          <span>Latitude {point[0].toFixed(4)}</span>,
                          <span>Longitude {point[1].toFixed(4)}</span>
                        </p>))}
                  </div>}
              </div>
              {props.marker.type === "point" &&
                <div className="block block-documents">
                  <h3 className="title mdi mdi-attachment mdi-16px">Documents</h3>
                  <div className="docs">
                    {(projectDocuments || []).map((doc) => (
                      <a className="ellipsis"
                         key={doc.get('path')}
                         href={props.marker.documents_url}
                         target="_blank"
                         alt={doc.get('name')}>
                        {doc.get('name')}
                      </a>
                    ))}
                    <a target="_blank" href={props.marker.documents_url}>Open documents folder</a>
                  </div>
                </div>}
            </div>
            <div className="buttons-set">
              <button className="delete" onClick={() => props.onDeleteMarker(props.project.get('slug'), props.marker.id)}>Delete</button>
            </div>
          </section>
        );
    }
}

MarkerDetailImpl.propTypes = {
    marker: PropTypes.object.isRequired,
    project: PropTypes.object,
    documents: PropTypes.object
}

const MarkerDetail = connect(
    (state) => ({
        marker: state.getIn(['map', 'viewing']).toJS(),
        project: state.get("current-project"),
        documents: state.get("documents"),
    }),
    (dispatch) => ({
        onDeleteMarker: (projectSlug, pointId) => {
            dispatch({type: "DELETE_POINT", payload: {projectSlug, pointId}});
        }
    })
)(MarkerDetailImpl);

export default MarkerDetail;
