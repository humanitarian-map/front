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
        <div className={"marker-icon " + (props.active? "active" : "")}>
          <img src={props.icon} />
          <span>{props.name}</span>
        </div>
    )
}

export default function MarkerCreationDetail(pros) {
    return (
      <div className="MarkerCreationDetail">
        <div className="title">
          <h1>Marker</h1>
        </div>
        <div className="content">
          <input placeholder="Write a tittle" />
          <h2 className="mdi mdi-bookmark mdi-16px">Category</h2>
          <div className="markers">
            <MarkerIcon icon={warningSvg} name="Warning" />
            <MarkerIcon icon={idpsSvg} name="IDPs" />
            <MarkerIcon icon={campSvg} name="Camp" />
            <MarkerIcon icon={checkpointSvg} name="Check point" />
            <MarkerIcon icon={hospitalSvg} name="Hospital" />
            <MarkerIcon icon={mobileClinicSvg} name="Mobile clinic"/>
            <MarkerIcon icon={otherSvg} name="Other" />
          </div>
          <h2 className="mdi mdi-comment mdi-16px">Comment</h2>
          <textarea placeholder="Write a comment">
          </textarea>
          <h2 className="mdi mdi-map-marker mdi-16px">Coordinates</h2>
          <div className="coordinates-inputs">
              Lat: <input placeholder="Lat" />
              Lng: <input placeholder="Lng" />
          </div>
          <h2 className="mdi mdi-attachment mdi-16px">Docs</h2>
          <a>+ add link to doc</a>
        </div>
        <div className="buttons">
          <button className="save">Save</button>
          <button className="cancel">Cancel</button>
        </div>
      </div>
    );
}

MarkerCreationDetail.propTypes = {
    project: PropTypes.object.isRequired
}
