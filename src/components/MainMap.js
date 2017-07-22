import React from 'react';
import { connect } from 'react-redux'
import { Map, TileLayer, Polyline} from 'react-leaflet';
import {PropTypes} from "prop-types";
import ImmutablePropTypes from 'react-immutable-proptypes';
import "./MainMap.css";
import ArrowMarker from "./markers/ArrowMarker";
import PointMarker from "./markers/PointMarker";
import CrossMarker from "./markers/CrossMarker";
import PolygonMarker from "./markers/PolygonMarker";
import {DEFAULT_COLOR} from "../utils/colors";
import {DEFAULT_CROSS_SIZE, DEFAULT_ARROWHEAD_SIZE} from "../utils/sizes";
import {emit} from "../App.events";
import * as actions from "../App.actions";

function Point(props) {
  if (props.point.get('type') === "point") {
    return (
      <PointMarker selected={props.selected}
                   point={props.point.toJS()}
                   draggable={props.draggable}
                   onMoveMarker={props.onMoveMarker}></PointMarker>
    )
  } else if (props.point.get('type') === "arrow") {
    return (
      <ArrowMarker selected={props.selected} point={props.point.toJS()}></ArrowMarker>
    );
  } else if (props.point.get('type') === "cross") {
    return (
      <CrossMarker selected={props.selected} point={props.point.toJS()}></CrossMarker>
    );
  } else if (props.point.get('type') === "polygon") {
    return (
      <PolygonMarker selected={props.selected} point={props.point.toJS()}></PolygonMarker>
    );
  }
  return null;
}
Point.propTypes = {
    point: ImmutablePropTypes.mapContains({}).isRequired,
    selected: PropTypes.bool
}

class MainMap extends React.Component {
    constructor(props) {
        super(props);
        this.state = {pointer: [0, 0]}
        this.getPosition = this.getPosition.bind(this);
        this.click = this.click.bind(this);
        this.keyup = this.keyup.bind(this);
        this.mouseMove = this.mouseMove.bind(this);
        this.centerMap = this.centerMap.bind(this);
    }

    componentWillMount() {
        document.addEventListener("keyup", this.keyup);
        document.addEventListener("mousemove", this.mouseMove);
        document.addEventListener("centerMap", this.centerMap);
    }

    componentWillUnmount() {
        document.removeEventListener("keyup", this.keyup);
        document.removeEventListener("mousemove", this.mouseMove);
        document.addEventListener("centerMap", this.centerMap);
    }

    centerMap(event) {
        this.map.invalidateSize();
        setTimeout(() => this.map.flyTo(event.detail, this.map.getZoom()), 100);
    }

    getPosition(event) {
        emit(actions.cursorMove(event.latlng.lat, event.latlng.lng));
    }

    click(event) {
        if (this.props.drawing.get('ready-to-edit')) {
            return false;
        }

        if (this.props.drawing.get('type') === "point") {
            emit(actions.addMarker(this.props.cursor.get(0), this.props.cursor.get(1)));
        } else if (this.props.drawing.get('type') === "cross") {
            emit(actions.addCross(this.props.cursor.get(0), this.props.cursor.get(1)));
        } else if (this.props.drawing.get('type') === "arrow") {
            emit(actions.addArrowPoint(this.props.cursor.get(0), this.props.cursor.get(1)));
        } else if (this.props.drawing.get('type') === "polygon") {
            emit(actions.addPolygonPoint(this.props.cursor.get(0), this.props.cursor.get(1)));
        }
    }

    keyup(event) {
        if (event.keyCode === 27) {
            emit(actions.cancelDrawing());
            emit(actions.cancelViewing());
        } else if (event.keyCode === 13 && this.props.drawing.get('type') === "polygon") {
            emit(actions.confirmPolygonDrawing());
        } else if (event.keyCode === 46 && this.props.selectedId) {
            emit(actions.deleteItem(this.props.project.get('slug'), this.props.selectedId));
        }
    }

    mouseMove(event) {
        this.setState({pointer: [event.clientX - 60, event.clientY - 60]})
    }


    render() {
      let drawingType = this.props.drawing.get('type');
      let drawingPosition = this.props.drawing.get('position');
      let drawingIcon = this.props.drawing.get('icon');

      if (!this.props.project) {
          return <div></div>;
      }

      return (
        <Map center={this.props.project.get('center_point').toJS()}
             zoom={this.props.project.get('zoom')}
             className="MainMap"
             whenReady={(e) => this.map = e.target}
             onMouseMove={this.getPosition}>
          {drawingType && !this.props.drawing.get('ready-to-edit') &&
            <div className={"cover " + (drawingType? "drawing-"+drawingType : "")}
                 onClick={this.click}></div>}
          <TileLayer
            url='http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png'
            attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
            subdomains='abcd'
            maxZoom='19'
            minZoom='3'
          />

          {this.props.project.get('mapitems').map((point) => (
              <Point selected={point.get('id') === this.props.selectedId}
                     onMoveMarker={(point, latlng) => emit(actions.moveMarker(this.props.project.get('slug'), point, latlng))}
                     draggable={this.props.moving}
                     point={point}
                     key={point.get('id')}>
              </Point>
          ))}
          {drawingType === "point" && drawingPosition &&
              <PointMarker point={{data: {position: drawingPosition.toJS(), icon: drawingIcon || "other"}}}></PointMarker>}
          {drawingType === "point" && !drawingPosition &&
              <PointMarker point={{data: {position: this.props.cursor.toJS(), icon: drawingIcon || "other"}}}></PointMarker>}
          {drawingType === "cross" && drawingPosition &&
              <CrossMarker point={{data: {size: this.props.drawing.get('size') || DEFAULT_CROSS_SIZE, color: this.props.drawing.get('color') || DEFAULT_COLOR, position: drawingPosition.toJS()}}}></CrossMarker>}
          {drawingType === "cross" && !drawingPosition &&
              <CrossMarker point={{data: {size: this.props.drawing.get('size') || DEFAULT_CROSS_SIZE, position: this.props.cursor.toJS()}}}></CrossMarker>}
          {drawingType === "arrow" && this.props.drawing.get('points') && this.props.drawing.get('points').size === 1 &&
              <ArrowMarker point={{data: {size: this.props.drawing.get('size') || DEFAULT_ARROWHEAD_SIZE, color: this.props.drawing.get('color') || DEFAULT_COLOR, origin: this.props.drawing.getIn(['points', 0]).toJS(), dest: this.props.cursor.toJS()}}}></ArrowMarker>}
          {drawingType === "arrow" && this.props.drawing.get('points') && this.props.drawing.get('points').size === 2 &&
              <ArrowMarker point={{data: {size: this.props.drawing.get('size') || DEFAULT_ARROWHEAD_SIZE, color: this.props.drawing.get('color') || DEFAULT_COLOR, origin: this.props.drawing.getIn(['points', 0]).toJS(), dest: this.props.drawing.getIn(['points', 1]).toJS()}}}></ArrowMarker>}
          {drawingType === "polygon" && !this.props.drawing.get('ready-to-edit') && this.props.drawing.get('points') && this.props.drawing.get('points').size > 0 &&
              <Polyline color={DEFAULT_COLOR} colorFill={DEFAULT_COLOR} positions={this.props.drawing.get('points').toJS().concat([this.props.cursor.toJS()])}></Polyline>}
          {drawingType === "polygon" && !this.props.drawing.get('ready-to-edit') && this.props.drawing.get('points') && this.props.drawing.get('points').size > 1 &&
              <div className="close-polygon-tooltip" style={{left: this.state.pointer[0] + 20, top: this.state.pointer[1] - 60}}>Press Enter to complete</div>}
          {drawingType === "polygon" && this.props.drawing.get('ready-to-edit') &&
              <PolygonMarker point={{data: {color: this.props.drawing.get('color') || DEFAULT_COLOR, positions: this.props.drawing.get('points').toJS()}}}></PolygonMarker>}
          <button className="button-map"
                  onClick={() => emit(actions.setCenterClick(this.props.project.toJS(), this.map.getCenter(), this.map.getZoom()))}>
            Set as map center
          </button>
        </Map>
      );
    }
}

MainMap.propTypes = {
    cursor: ImmutablePropTypes.contains(
                0: PropTypes.number.isRequired,
                1: PropTypes.number.isRequired,
            ),
    selectedId: PropTypes.string,
    project: PropTypes.object,
    drawing: ImmutablePropTypes.mapContains({
                type: PropTypes.string,
                data: PropTypes.object,
            }),
}

export default connect(
    (state) => ({
        selectedId: state.getIn(['map', 'viewing', 'id']),
        drawing: state.getIn(['map', 'drawing']),
        moving: state.getIn(['map', 'moving']),
        cursor: state.getIn(['map', 'cursor']),
        project: state.get('current-project'),
    })
)(MainMap);
