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

export default class MainMap extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            drawing: null,
            cursor: [0, 0]
        };
        this.getPosition = this.getPosition.bind(this);
    }

    getPosition(event) {
        this.setState({cursor: [event.latlng.lat, event.latlng.lng]});
    }

    render() {
      return (
        <Map center={this.props.center} zoom={this.props.zoom} className="MainMap" onMouseMove={this.getPosition}>
          <TileLayer
            url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          {this.props.points.map(drawPoint)}
          <div className="cursor-box">
            <span className="lat">lat: {Math.round(this.state.cursor[0]*100)/100}</span>
            <span className="lng">lng: {Math.round(this.state.cursor[1]*100)/100}</span>
          </div>
        </Map>
      );
    }
}

MainMap.propTypes = {
    center: PropTypes.array.isRequired,
    zoom: PropTypes.number.isRequired,
    points: PropTypes.array.isRequired,
}
