import React, { Component } from 'react';
import { connect } from 'react-redux'
import {PropTypes} from "prop-types";
import {Link} from "react-router-dom";
import './MarkerCreationDetail.css';

import warningSvg from "./markers/WarningIcon.svg";
import campSvg from "./markers/CampIcon.svg";
import checkpointSvg from "./markers/CheckpointIcon.svg";
import hospitalSvg from "./markers/HospitalIcon.svg";
import idpsSvg from "./markers/IDPsIcon.svg";
import mobileClinicSvg from "./markers/MobileClinicIcon.svg";
import otherSvg from "./markers/OtherIcon.svg";

function MarkerIcon(props) {
    return (
        <div className={"marker-icon " + (props.active? "active" : "")} onClick={props.onClick}>
          <img src={props.icon} />
          <span>{props.name}</span>
        </div>
    )
}

function MarkerCreationDetailImpl(props) {
    let activeMarker = props.drawing.get('icon');
    return (
      <div className="MarkerCreationDetail">
        <div className="title">
          <h1>Marker</h1>
        </div>
        <div className="content">
          <input placeholder="Write a tittle" />
          <h2 className="mdi mdi-bookmark mdi-16px">Category</h2>
          <div className="markers">
            <MarkerIcon active={activeMarker === "camp"} onClick={() => props.onSelectIcon("camp")} icon={campSvg} name="Camp" />
            <MarkerIcon active={activeMarker === "hospital"} onClick={() => props.onSelectIcon("hospital")} icon={hospitalSvg} name="Hospital" />
            <MarkerIcon active={activeMarker === "warning"} onClick={() => props.onSelectIcon("warning")} icon={warningSvg} name="Warning" />
            <MarkerIcon active={activeMarker === "idps"} onClick={() => props.onSelectIcon("idps")} icon={idpsSvg} name="IDPs" />
            <MarkerIcon active={activeMarker === "checkpoint"} onClick={() => props.onSelectIcon("checkpoint")} icon={checkpointSvg} name="Check point" />
            <MarkerIcon active={activeMarker === "mobile-clinic"} onClick={() => props.onSelectIcon("mobile-clinic")} icon={mobileClinicSvg} name="Mobile clinic"/>
            <MarkerIcon active={activeMarker === "other" || !activeMarker} onClick={() => props.onSelectIcon("other")} icon={otherSvg} name="Other" />
          </div>
          <h2 className="mdi mdi-comment mdi-16px">Comment</h2>
          <textarea placeholder="Write a comment">
          </textarea>
          <h2 className="mdi mdi-map-marker mdi-16px">Coordinates</h2>
          <div className="coordinates-inputs">
              <div>
                <span>Lat:</span><input placeholder="Lat" value={props.drawing.getIn(['position', 0])}/>
              </div>
              <div>
                <span>Lng:</span><input placeholder="Lng" value={props.drawing.getIn(['position', 1])} />
              </div>
          </div>
          <h2 className="mdi mdi-attachment mdi-16px">Docs</h2>
          <a>+ add link to doc</a>
        </div>
        <div className="buttons">
          <button className="save">Save</button>
          <button className="cancel" onClick={props.onCancelDrawing}>Cancel</button>
        </div>
      </div>
    );
}

MarkerCreationDetailImpl.propTypes = {
    drawing: PropTypes.object.isRequired
}

const MarkerCreationDetail = connect(
    (state) => ({
        drawing: state.getIn(['map', 'drawing']),
    }),
    (dispatch) => ({
        onCancelDrawing: () => {
            dispatch({type: "CANCEL_DRAWING", "payload": null});
        },
        onSelectIcon: (icon) => {
            dispatch({type: "SELECT_MARKER_ICON", "payload": icon});
        },
    })
)(MarkerCreationDetailImpl);

export default MarkerCreationDetail;
