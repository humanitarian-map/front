import React from 'react';
import { connect } from 'react-redux'
import {PropTypes} from "prop-types";
import './MarkerCreationDetail.css';

function MarkerIcon(props) {
    let typesToIcon = {
        "warning": "fire",
        "camp": "tent",
        "checkpoint": "marker-check",
        "hospital": "hospital",
        "idps": "walk",
        "mobile-clinic": "truck",
        "other": "map-marker",
    }
    return (
        <div className={"MarkerIcon " + (props.active? "active" : "")} onClick={props.onClick}>
          <div className={"marker-icon " + props.type + "-icon mdi mdi-" + typesToIcon[props.type || "other"] + " mdi-24px"}  />
          <span>{props.name}</span>
        </div>
    )
}

class MarkerCreationDetailImpl extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            "name": "",
            "description": ""
        }
    }

    render() {
        let props = this.props
        let activeMarker = props.drawing.get('icon');

        return (
          <div className="MarkerCreationDetail">
            <div className="title">
              <h1>Marker</h1>
            </div>
            <div className="content">
              <input placeholder="Write a tittle" onChange={(event) => this.setState({name: event.target.value})}/>
              <h2 className="mdi mdi-bookmark mdi-16px">Category</h2>
              <div className="markers">
                <MarkerIcon active={activeMarker === "camp"} onClick={() => props.onSelectIcon("camp")} type="camp" name="Camp" />
                <MarkerIcon active={activeMarker === "hospital"} onClick={() => props.onSelectIcon("hospital")} type="hospital" name="Hospital" />
                <MarkerIcon active={activeMarker === "warning"} onClick={() => props.onSelectIcon("warning")} type="warning" name="Warning" />
                <MarkerIcon active={activeMarker === "idps"} onClick={() => props.onSelectIcon("idps")} type="idps" name="IDPs" />
                <MarkerIcon active={activeMarker === "checkpoint"} onClick={() => props.onSelectIcon("checkpoint")} type="checkpoint" name="Check point" />
                <MarkerIcon active={activeMarker === "mobile-clinic"} onClick={() => props.onSelectIcon("mobile-clinic")} type="mobile-clinic" name="Mobile clinic"/>
                <MarkerIcon active={activeMarker === "other" || !activeMarker} onClick={() => props.onSelectIcon("other")} type="other" name="Other" />
              </div>
              <h2 className="mdi mdi-comment mdi-16px">Comment</h2>
              <textarea placeholder="Write a comment" onChange={(event) => this.setState({description: event.target.value})}>
              </textarea>
              <h2 className="mdi mdi-map mdi-16px">Coordinates</h2>
              <div className="coordinates-inputs">
                  <div>
                    <span>Lat:</span>
                    <input placeholder="Lat"
                           value={props.drawing.getIn(['position', 0])}
                           onChange={(e) => props.onChangeLocation(e.target.value, props.drawing.getIn(['position', 1]))} />
                  </div>
                  <div>
                    <span>Lng:</span>
                    <input placeholder="Lng"
                           value={props.drawing.getIn(['position', 1])}
                           onChange={(e) => props.onChangeLocation(props.drawing.getIn(['position', 0]), e.target.value)} />
                  </div>
              </div>
              <h2 className="mdi mdi-attachment mdi-16px">Docs</h2>
              <a>+ add link to doc</a>
            </div>
            <div className="buttons">
              <button className="save" onClick={() => props.onSaveMarker(activeMarker, this.state.name, this.state.description, props.drawing.get('position').toJS())}>Save</button>
              <button className="cancel" onClick={props.onCancelDrawing}>Cancel</button>
            </div>
          </div>
        );
    }
}

MarkerCreationDetailImpl.propTypes = {
    drawing: PropTypes.object.isRequired
}

const MarkerCreationDetail = connect(
    (state) => ({
        drawing: state.getIn(['map', 'drawing']),
    }),
    (dispatch) => ({
        onChangeLocation: (lat, lng) => {
            dispatch({type: "ADD_MARKER", "payload": [lat, lng]});
        },
        onCancelDrawing: () => {
            dispatch({type: "CANCEL_DRAWING", "payload": null});
        },
        onSelectIcon: (icon) => {
            dispatch({type: "SELECT_MARKER_ICON", "payload": icon});
        },
        onSaveMarker: (icon, name, description, position) => {
            dispatch({type: "SAVE_MARKER", "payload": {icon: icon, name: name, position: position, description: description}});
        },
    })
)(MarkerCreationDetailImpl);

export default MarkerCreationDetail;
