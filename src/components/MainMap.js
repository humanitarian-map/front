import React from 'react';
import { Map, TileLayer} from 'react-leaflet';
import "./MainMap.css";
import ArrowMarker from "./markers/ArrowMarker";
import InfoMarker from "./markers/InfoMarker";
import CrossMarker from "./markers/CrossMarker";
import PeopleMarker from "./markers/PeopleMarker";
import House1Marker from "./markers/House1Marker";
import House2Marker from "./markers/House2Marker";

export default function MainMap(props) {
    return (
      <Map center={[28.505, 37.09]} zoom={7} className="MainMap">
        <TileLayer
          url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <CrossMarker position={[28.505, 37.09]}></CrossMarker>

        <House1Marker position={[29.605, 37.59]}>
          <span>A pretty CSS3 popup.<br/>Easily customizable.</span>
        </House1Marker>

        <House2Marker position={[29.505, 39.09]}>
          <span>A pretty CSS3 popup.<br/>Easily customizable.</span>
        </House2Marker>

        <InfoMarker position={[27.005, 38.09]}>
          <span>A pretty CSS3 popup.<br/>Easily customizable.</span>
        </InfoMarker>

        <PeopleMarker position={[27.505, 37.89]}>
          <span>A pretty CSS3 popup.<br/>Easily customizable.</span>
        </PeopleMarker>

        <ArrowMarker origin={[27.705, 37.80]} dest={[28.305, 37.29]}>
          <span>A pretty CSS3 popup.<br/>Easily customizable.</span>
        </ArrowMarker>
      </Map>
    );
}
