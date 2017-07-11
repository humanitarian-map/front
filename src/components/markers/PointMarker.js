import React from 'react';
import { Marker, Popup} from 'react-leaflet';
import * as L from "leaflet";
import {PropTypes} from "prop-types";
import warningSvg from "./WarningIcon.svg";
import campSvg from "./CampIcon.svg";
import checkpointSvg from "./CheckpointIcon.svg";
import hospitalSvg from "./HospitalIcon.svg";
import idpsSvg from "./IDPsIcon.svg";
import mobileClinicSvg from "./MobileClinicIcon.svg";
import otherSvg from "./OtherIcon.svg";

const icons = {
    "warning": L.icon({
        iconUrl: warningSvg,
        iconSize: [48, 48],
        iconAnchor: [24, 24],
        popupAnchor: [0, -24],
    }),
    "camp": L.icon({
        iconUrl: campSvg,
        iconSize: [48, 48],
        iconAnchor: [24, 24],
        popupAnchor: [0, -24],
    }),
    "checkpoint": L.icon({
        iconUrl: checkpointSvg,
        iconSize: [48, 48],
        iconAnchor: [24, 24],
        popupAnchor: [0, -24],
    }),
    "hospital": L.icon({
        iconUrl: hospitalSvg,
        iconSize: [48, 48],
        iconAnchor: [24, 24],
        popupAnchor: [0, -24],
    }),
    "idps": L.icon({
        iconUrl: idpsSvg,
        iconSize: [48, 48],
        iconAnchor: [24, 24],
        popupAnchor: [0, -24],
    }),
    "mobile-clinic": L.icon({
        iconUrl: mobileClinicSvg,
        iconSize: [48, 48],
        iconAnchor: [24, 24],
        popupAnchor: [0, -24],
    }),
    "other": L.icon({
        iconUrl: otherSvg,
        iconSize: [48, 48],
        iconAnchor: [24, 24],
        popupAnchor: [0, -24],
    }),
}

export default function PointMarker(props) {
    return (
        <Marker position={props.point.position} icon={icons[props.point.icon || "other"]}>
          <Popup>
            <div>
              <h1>{props.point.name}</h1>
              {props.point.description &&
                <p>{props.point.description}</p>}
            </div>
          </Popup>
        </Marker>
    )
}

PointMarker.propTypes = {
    point: PropTypes.object.isRequired,
}
