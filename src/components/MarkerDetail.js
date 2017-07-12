import React from 'react';
import { connect } from 'react-redux'
import {PropTypes} from "prop-types";
import './MarkerDetail.css';

function MarkerIcon(props) {
    let types = {
        "warning": {name: "Warning", icon: "fire"},
        "camp": {name: "Camp", icon: "tent"},
        "checkpoint": {name: "Checkpoint", icon: "marker-check"},
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
              {props.marker.type === "point" &&
                <div className="block">
                  <h3 className="title mdi mdi-map mdi-16px">Coordinates</h3>
                  <div className="coordinates-inputs">
                      <span>{props.marker.data.position[0].toFixed(4)}</span>,
                      <span>{props.marker.data.position[1].toFixed(4)}</span>
                  </div>
                </div>}
              {props.marker.type === "point" &&
                <div className="block block-documents">
                  <h3 className="title mdi mdi-attachment mdi-16px">Documents</h3>
                  <div className="docs">
                    <a className="ellipsis" href="#" alt="">https://drive.google.com/drive/u/0/folders/0BwVWP_fda2O1fnRDWGNVcFd2N0RfUnBNVENrVnZRTGdTNGNwSExabHFnQmdtVzVPR3VKRU0</a>
                    <a className="ellipsis" href="#" alt="">https://drive.google.com/drive/u/0/folders/0BwVWP_fda2O1fnRDWGNVcFd2N0RfUnBNVENrVnZRTGdTNGNwSExabHFnQmdtVzVPR3VKRU0</a>
                    <a href="#"><span className="plus">+</span> add document</a>
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
    marker: PropTypes.object.isRequired
}

const MarkerDetail = connect(
    (state) => ({
        marker: state.getIn(['map', 'viewing']).toJS(),
        project: state.get("current-project"),
    }),
    (dispatch) => ({
        onDeleteMarker: (projectSlug, pointId) => {
            dispatch({type: "DELETE_POINT", payload: {projectSlug, pointId}});
        }
    })
)(MarkerDetailImpl);

export default MarkerDetail;
