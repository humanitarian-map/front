import React from 'react';
import { Map, TileLayer, Polyline} from 'react-leaflet';
import {PropTypes} from "prop-types";
import ImmutablePropTypes from 'react-immutable-proptypes';
import "./MainMap.css";
import ArrowMarker from "../markers/ArrowMarker";
import PointMarker from "../markers/PointMarker";
import CrossMarker from "../markers/CrossMarker";
import PolygonMarker from "../markers/PolygonMarker";
import {DEFAULT_COLOR} from "../../utils/colors";
import {DEFAULT_CROSS_SIZE, DEFAULT_ARROWHEAD_SIZE} from "../../utils/sizes";

class Point extends React.Component {
    static propTypes = {
        point: ImmutablePropTypes.mapContains({}).isRequired,
        selected: PropTypes.bool,
        draggable: PropTypes.bool
    }

    render() {
        const {point, selected, draggable, onMoveMarker} = this.props;

        switch (point.get('Type')) {
            case "point":
                return (
                  <PointMarker selected={selected}
                               point={point.toJS()}
                               draggable={draggable}
                               onMoveMarker={onMoveMarker}></PointMarker>
                )
            case "arrow":
                return (<ArrowMarker selected={selected} point={point.toJS()}></ArrowMarker>);
            case "cross":
                return (<CrossMarker selected={selected} point={point.toJS()}></CrossMarker>);
            case "polygon":
                return (<PolygonMarker selected={selected} point={point.toJS()}></PolygonMarker>);
        }
        return null;
    }
}

export default class MainMap extends React.Component {
    static propTypes = {
        cursor: ImmutablePropTypes.contains(
            0: PropTypes.number.isRequired,
            1: PropTypes.number.isRequired,
        ),
        selectedId: PropTypes.string,
        project: PropTypes.object,
        moving: PropTypes.bool,
        drawing: ImmutablePropTypes.mapContains({
            type: PropTypes.string,
            data: PropTypes.object,
        }),
    }

    constructor(props) {
        super(props);
        this.state = {pointer: [0, 0]}
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

    centerMap = (event) => {
        this.map.invalidateSize();
        setTimeout(() => this.map.flyTo(event.detail.center, event.detail.zoom, 100));
    }

    getPosition = (event) => {
        this.props.actions.cursorMove(event.latlng.lat, event.latlng.lng);
    }

    click = (event) => {
        const {drawing, actions, cursor} = this.props;
        if (drawing.get('ready-to-edit')) {
            return false;
        }

        if (drawing.get('type') === "point") {
            actions.addMarker(cursor.get(0), cursor.get(1));
        } else if (drawing.get('type') === "cross") {
            actions.addCross(cursor.get(0), cursor.get(1));
        } else if (drawing.get('type') === "arrow") {
            actions.addArrowPoint(cursor.get(0), cursor.get(1));
        } else if (drawing.get('type') === "polygon") {
            actions.addPolygonPoint(cursor.get(0), cursor.get(1));
        }
    }

    keyup = (event) => {
        const {actions, drawing, project, selectedId} = this.props;

        if (event.keyCode === 27) {
            actions.cancelDrawing();
            actions.cancelViewing();
        } else if (event.keyCode === 13 && drawing.get('type') === "polygon") {
            actions.confirmPolygonDrawing();
        } else if (event.keyCode === 46 && selectedId) {
            actions.deleteItem(project.get('Slug'), selectedId);
        }
    }

    mouseMove = (event) => {
        this.setState({pointer: [event.clientX - 60, event.clientY - 60]})
    }

    whenReady = (event) => {
        this.map = event.target;
        this.props.actions.setCurrentMapPosition(this.map.getCenter(), this.map.getZoom())
    }


    render() {
      const {drawing, project, points, selectedId, moving, cursor, actions} = this.props;
      let drawingType = drawing.get('type');
      let drawingPosition = drawing.get('position');
      let drawingIcon = drawing.get('icon');

      if (!project) {
          return <div></div>;
      }

      return (
        <Map center={[project.get('CenterPointX'), project.get('CenterPointY')]}
             zoom={project.get('Zoom')}
             className="MainMap"
             whenReady={this.whenReady}
             onMouseMove={this.getPosition}
             onViewportChange={({center, zoom}) => actions.setCurrentMapPosition({lat: center[0], lng: center[1]}, zoom)}>
          {drawingType && !drawing.get('ready-to-edit') &&
            <div className={"cover " + (drawingType? "drawing-"+drawingType : "")}
                 onClick={this.click}></div>}
          <TileLayer
            url='http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png'
            attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
            subdomains='abcd'
            maxZoom='19'
            minZoom='3'
          />

          {points.map((point) => (
              <Point selected={point.get('ID') === selectedId}
                     onMoveMarker={(point, latlng) => actions.moveMarker(project.get('Slug'), point, latlng)}
                     draggable={moving}
                     point={point}
                     key={point.get('ID')}>
              </Point>
          ))}
          {drawingType === "point" && drawingPosition &&
              <PointMarker point={{data: {position: drawingPosition.toJS(), icon: drawingIcon || "other"}}}></PointMarker>}
          {drawingType === "point" && !drawingPosition &&
              <PointMarker point={{data: {position: cursor.toJS(), icon: drawingIcon || "other"}}}></PointMarker>}
          {drawingType === "cross" && drawingPosition &&
              <CrossMarker point={{data: {size: drawing.get('size') || DEFAULT_CROSS_SIZE, color: drawing.get('color') || DEFAULT_COLOR, position: drawingPosition.toJS()}}}></CrossMarker>}
          {drawingType === "cross" && !drawingPosition &&
              <CrossMarker point={{data: {size: drawing.get('size') || DEFAULT_CROSS_SIZE, position: cursor.toJS()}}}></CrossMarker>}
          {drawingType === "arrow" && drawing.get('points') && drawing.get('points').size === 1 &&
              <ArrowMarker point={{data: {size: drawing.get('size') || DEFAULT_ARROWHEAD_SIZE, color: drawing.get('color') || DEFAULT_COLOR, origin: drawing.getIn(['points', 0]).toJS(), dest: cursor.toJS()}}}></ArrowMarker>}
          {drawingType === "arrow" && drawing.get('points') && drawing.get('points').size === 2 &&
              <ArrowMarker point={{data: {size: drawing.get('size') || DEFAULT_ARROWHEAD_SIZE, color: drawing.get('color') || DEFAULT_COLOR, origin: drawing.getIn(['points', 0]).toJS(), dest: drawing.getIn(['points', 1]).toJS()}}}></ArrowMarker>}
          {drawingType === "polygon" && !drawing.get('ready-to-edit') && drawing.get('points') && drawing.get('points').size > 0 &&
              <Polyline color={DEFAULT_COLOR} colorFill={DEFAULT_COLOR} positions={drawing.get('points').toJS().concat([cursor.toJS()])}></Polyline>}
          {drawingType === "polygon" && !drawing.get('ready-to-edit') && drawing.get('points') && drawing.get('points').size > 1 &&
              <div className="close-polygon-tooltip" style={{left: this.state.pointer[0] + 20, top: this.state.pointer[1] - 60}}>Press Enter to complete</div>}
          {drawingType === "polygon" && drawing.get('ready-to-edit') &&
              <PolygonMarker point={{data: {color: drawing.get('color') || DEFAULT_COLOR, positions: drawing.get('points').toJS()}}}></PolygonMarker>}
        </Map>
      );
    }
}
