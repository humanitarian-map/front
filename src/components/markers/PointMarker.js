import React from 'react';
import { Marker, Popup} from 'react-leaflet';
import * as L from "leaflet";
import {PropTypes} from "prop-types";
import infoSvg from "./InfoIcon.svg";
import peopleSvg from "./PeopleIcon.svg";
import crossSvg from "./CrossIcon.svg";
import house1Svg from "./House1Icon.svg";
import house2Svg from "./House2Icon.svg";

const icons = {
    "info": L.icon({
        iconUrl: infoSvg,
        iconSize: [48, 48],
        iconAnchor: [24, 24],
        popupAnchor: [0, -24],
    }),
    "people": L.icon({
        iconUrl: peopleSvg,
        iconSize: [48, 48],
        iconAnchor: [24, 24],
        popupAnchor: [0, -24],
    }),
    "cross": L.icon({
        iconUrl: crossSvg,
        iconSize: [48, 48],
        iconAnchor: [24, 24],
        popupAnchor: [0, -24],
    }),
    "house1": L.icon({
        iconUrl: house1Svg,
        iconSize: [48, 48],
        iconAnchor: [24, 24],
        popupAnchor: [0, -24],
    }),
    "house2": L.icon({
        iconUrl: house2Svg,
        iconSize: [48, 48],
        iconAnchor: [24, 24],
        popupAnchor: [0, -24],
    }),
}

export default function PointMarker(props) {
    return (
        <Marker position={props.point.position} icon={icons[props.point.icon]}>
          <Popup>
            <h1>{props.point.name}</h1>
            {props.point.description &&
              <p>{props.point.description}</p>}
          </Popup>
        </Marker>
    )
}

PointMarker.propTypes = {
    point: PropTypes.object.isRequired,
}
