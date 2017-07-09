import React from 'react';
import { Map, TileLayer} from 'react-leaflet';
import {PropTypes} from "prop-types";
import "./MainMap.css";
import ArrowMarker from "./markers/ArrowMarker";
import InfoMarker from "./markers/InfoMarker";
import CrossMarker from "./markers/CrossMarker";
import PeopleMarker from "./markers/PeopleMarker";
import House1Marker from "./markers/House1Marker";
import House2Marker from "./markers/House2Marker";

function drawPoint(point) {
  if (point.type === "cross") {
    return (
      <CrossMarker position={point.position} key={point.id}>
      </CrossMarker>
    )
  } else if (point.type === "house1") {
    return (
      <House1Marker position={point.position} key={point.id}>
        <span>A pretty CSS3 popup.<br/>Easily customizable.</span>
      </House1Marker>
    );
  } else if (point.type === "house2") {
    return (
      <House2Marker position={point.position} key={point.id}>
        <span>A pretty CSS3 popup.<br/>Easily customizable.</span>
      </House2Marker>
    );
  } else if (point.type === "info") {
    return (
      <InfoMarker position={point.position} key={point.id}>
        <span>A pretty CSS3 popup.<br/>Easily customizable.</span>
      </InfoMarker>
    );
  } else if (point.type === "people") {
    return (
      <PeopleMarker position={point.position} key={point.id}>
        <span>A pretty CSS3 popup.<br/>Easily customizable.</span>
      </PeopleMarker>
    )
  } else if (point.type === "arrow") {
    return (
      <ArrowMarker origin={point.origin} dest={point.dest} key={point.id}>
        <span>A pretty CSS3 popup.<br/>Easily customizable.</span>
      </ArrowMarker>
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
