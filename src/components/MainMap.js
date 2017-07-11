import React from 'react';
import { Map, TileLayer, Marker} from 'react-leaflet';
import {PropTypes} from "prop-types";
import ImmutablePropTypes from 'react-immutable-proptypes';
import "./MainMap.css";
import ArrowMarker from "./markers/ArrowMarker";
import PointMarker from "./markers/PointMarker";
import PolygonMarker from "./markers/PolygonMarker";

function drawPoint(point) {
  if (point.get('type') === "point") {
    return (
      <PointMarker point={point.toJS()} key={point.get('id')}></PointMarker>
    )
  } else if (point.get('type') === "arrow") {
    return (
      <ArrowMarker point={point.toJS()} key={point.get('id')}></ArrowMarker>
    );
  } else if (point.get('type') === "polygon") {
    return (
      <PolygonMarker point={point.toJS()} key={point.get('id')}></PolygonMarker>
    );
  }
}

export default class MainMap extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cursor: [0, 0]
        };
        this.getPosition = this.getPosition.bind(this);
        this.click = this.click.bind(this);
        this.keyup = this.keyup.bind(this);
    }

    getPosition(event) {
        this.setState({cursor: [event.latlng.lat, event.latlng.lng]});
    }

    click(event) {
        if (this.props.drawing.get('type') === "point") {
            this.props.onAddMarker(event.latlng.lat, event.latlng.lng);
        } else if (this.props.drawing.get('type') === "arrow") {
            this.props.onAddArrowPoint(event.latlng.lat, event.latlng.lng);
        }
    }

    keyup(event) {
        console.log(event);
    }

    render() {
      return (
        <Map center={this.props.center.toJS()} zoom={this.props.zoom} className="MainMap" onMouseMove={this.getPosition} onClick={this.click} onKeyup={this.keyup}>
          <TileLayer
            url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          {this.props.points.map(drawPoint)}
          <div className="cursor-box">
            <span className="lat">lat: {this.state.cursor[0].toFixed(2)}</span>
            <span className="lng">lng: {this.state.cursor[1].toFixed(2)}</span>
          </div>
          {this.props.drawing.get('type') === "point" &&
              <Marker position={this.state.cursor}></Marker>}
          {this.props.drawing.get('type') === "arrow" && this.props.drawing.get('points') && this.props.drawing.get('points').size > 0 &&
              <ArrowMarker point={{origin: this.props.drawing.getIn(['points', 0]).toJS(), dest: this.state.cursor}}></ArrowMarker>}
        </Map>
      );
    }
}

MainMap.propTypes = {
    center: ImmutablePropTypes.contains(
                0: PropTypes.number.isRequired,
                1: PropTypes.number.isRequired,
            ),
    zoom: PropTypes.number.isRequired,
    points: ImmutablePropTypes.listOf(
                ImmutablePropTypes.mapContains({
                })
            ),
    drawing: ImmutablePropTypes.mapContains({
                type: PropTypes.string,
                data: PropTypes.object,
            }),
    onAddMarker: PropTypes.func.isRequired,
    onAddArrowPoint: PropTypes.func.isRequired,
}
