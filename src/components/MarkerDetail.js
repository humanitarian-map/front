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
            <h2 className="header-title">Marker</h2>
            <div className="content">
              <p className="title">{props.marker.name}</p>
              <h2 className="mdi mdi-bookmark mdi-16px">Category</h2>
              <div className="markers">
                <MarkerIcon type={props.marker.icon} />
              </div>
              <h2 className="mdi mdi-comment mdi-16px">Comment</h2>
              <p>{props.marker.description}</p>
              <h2 className="mdi mdi-map mdi-16px">Coordinates</h2>
              <div className="coordinates-inputs">
                  <span>{props.marker.position[0].toFixed(4)}</span>,
                  <span>{props.marker.position[1].toFixed(4)}</span>
              </div>
              <h2 className="mdi mdi-attachment mdi-16px">Docs</h2>
              <div className="docs">
                <div><a href="https://drive.google.com/drive/u/0/...">https://drive.google.com/drive/u/0/...</a></div>
                <div><a className="plus">+</a></div>
              </div>
            </div>
            <div className="buttons">
              <button className="delete" onClick={() => props.onDeleteMarker(props.marker.id)}>Delete</button>
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
    }),
    (dispatch) => ({
        onDeleteMarker: (id) => {
            dispatch({type: "DELETE_MARKER", payload: id});
        }
    })
)(MarkerDetailImpl);

export default MarkerDetail;
