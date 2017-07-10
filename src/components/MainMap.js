import React from 'react';
import { Map, TileLayer} from 'react-leaflet';
import {PropTypes} from "prop-types";
import "./MainMap.css";
import ArrowMarker from "./markers/ArrowMarker";
import PointMarker from "./markers/PointMarker";
import PolygonMarker from "./markers/PolygonMarker";

function drawPoint(point) {
  if (point.type === "point") {
    return (
      <PointMarker point={point} key={point.id}></PointMarker>
    )
  } else if (point.type === "arrow") {
    return (
      <ArrowMarker point={point} key={point.id}></ArrowMarker>
    );
  } else if (point.type === "polygon") {
    return (
      <PolygonMarker point={point} key={point.id}></PolygonMarker>
    );
  }
}

export default function MainMap(props) {
    return (
      <Map center={props.center} zoom={props.zoom} className="MainMap">
        <TileLayer
          url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {props.points.map(drawPoint)}
      </Map>
    );
}

MainMap.propTypes = {
    center: PropTypes.array.isRequired,
    zoom: PropTypes.number.isRequired,
    points: PropTypes.array.isRequired,
}
