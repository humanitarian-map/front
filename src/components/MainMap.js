import React from 'react';
import { Map, TileLayer, Marker, Polyline} from 'react-leaflet';
import {PropTypes} from "prop-types";
import ImmutablePropTypes from 'react-immutable-proptypes';
import "./MainMap.css";
import ArrowMarker from "./markers/ArrowMarker";
import PointMarker from "./markers/PointMarker";
import CrossMarker from "./markers/CrossMarker";
import PolygonMarker from "./markers/PolygonMarker";

function Point(props) {
  if (props.point.get('type') === "point") {
    return (
      <PointMarker point={props.point.toJS()}></PointMarker>
    )
  } else if (props.point.get('type') === "arrow") {
    return (
      <ArrowMarker point={props.point.toJS()}></ArrowMarker>
    );
  } else if (props.point.get('type') === "cross") {
    return (
      <CrossMarker point={props.point.toJS()}></CrossMarker>
    );
  } else if (props.point.get('type') === "polygon") {
    return (
      <PolygonMarker point={props.point.toJS()}></PolygonMarker>
    );
  }
}
Point.propTypes = {
    point: ImmutablePropTypes.mapContains({}).isRequired
}

export default class MainMap extends React.Component {
    constructor(props) {
        super(props);
        this.getPosition = this.getPosition.bind(this);
        this.click = this.click.bind(this);
        this.keyup = this.keyup.bind(this);
    }

    componentWillMount() {
        document.addEventListener("keyup", this.keyup);
    }

    componentWillUnmount() {
        document.removeEventListener("keyup", this.keyup);
    }

    getPosition(event) {
        this.props.onCursorMove(event.latlng.lat, event.latlng.lng);
    }

    click(event) {
        if (this.props.drawing.get('type') === "point") {
            this.props.onAddMarker(this.props.cursor.get(0), this.props.cursor.get(1));
        } else if (this.props.drawing.get('type') === "arrow") {
            this.props.onAddArrowPoint(this.props.cursor.get(0), this.props.cursor.get(1));
        } else if (this.props.drawing.get('type') === "polygon") {
            this.props.onAddPolygonPoint(this.props.cursor.get(0), this.props.cursor.get(1));
        }
    }

    keyup(event) {
        if (event.keyCode === 27) {
            this.props.onCancelDrawing();
        } else if (event.keyCode === 13 && this.props.drawing.get('type') === "polygon") {
            this.props.onConfirmPolygonDrawing();
        }
    }

    render() {
      let drawingType = this.props.drawing.get('type');
      let drawingPosition = this.props.drawing.get('position');

      return (
        <Map center={this.props.center.toJS()}
             zoom={this.props.zoom}
             className="MainMap"
             onMouseMove={this.getPosition}>
          {this.props.drawing &&
            <div className={"cover " + (drawingType? "drawing-"+drawingType : "")}
                 onClick={this.click}></div>}
          <TileLayer
            url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          {this.props.points.map((point) => <Point point={point} key={point.get('id')}></Point>)}
          {drawingType === "point" && drawingPosition &&
              <Marker position={drawingPosition.toJS()}></Marker>}
          {drawingType === "point" && !drawingPosition &&
              <Marker position={this.props.cursor.toJS()}></Marker>}
          {drawingType === "arrow" && this.props.drawing.get('points') && this.props.drawing.get('points').size > 0 &&
              <ArrowMarker point={{origin: this.props.drawing.getIn(['points', 0]).toJS(), dest: this.props.cursor.toJS()}}></ArrowMarker>}
          {drawingType === "polygon" && this.props.drawing.get('points') && this.props.drawing.get('points').size > 0 &&
              <Polyline positions={this.props.drawing.get('points').toJS().concat([this.props.cursor.toJS()])}></Polyline>}
        </Map>
      );
    }
}

MainMap.propTypes = {
    center: ImmutablePropTypes.contains(
                0: PropTypes.number.isRequired,
                1: PropTypes.number.isRequired,
            ),
    cursor: ImmutablePropTypes.contains(
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
    onAddPolygonPoint: PropTypes.func.isRequired,
    onCancelDrawing: PropTypes.func.isRequired,
    onConfirmPolygonDrawing: PropTypes.func.isRequired,
    onCursorMove: PropTypes.func.isRequired,
}
