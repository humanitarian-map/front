import React from 'react';
import { connect } from 'react-redux'
import {PropTypes} from "prop-types";
import './MarkerCreationDetail.css';

function MarkerIcon(props) {
    let typesToIcon = {
        "warning": "fire",
        "camp": "tent",
        "checkpoint": "marker-check",
        "hospital": "hospital",
        "idps": "walk",
        "mobile-clinic": "truck",
        "other": "map-marker",
    }
    return (
        <div className={"MarkerIcon " + (props.active? "active" : "")} onClick={props.onClick}>
          <div className={"marker-icon " + props.type + "-icon mdi mdi-" + typesToIcon[props.type || "other"] + " mdi-18px"}  />
          <span>{props.name}</span>
        </div>
    )
}

class MarkerCreationDetailImpl extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            "name": "",
            "description": ""
        }

        this.addPoint = this.addPoint.bind(this);
    }

    addPoint(event) {
       this.props.onSaveMarker(
           this.props.project.get('slug'),
           {
               "name": this.state.name,
               "description": this.state.description,
               "type": this.props.drawing.get('type'),
               "data": {
                   position: this.props.drawing.get('position').toJS(),
                   icon: this.props.drawing.get('icon'),
               }
           }
       );
    }

    render() {
        let props = this.props
        let activeMarker = props.drawing.get('icon');
        let type = this.props.drawing.get('type');

        return (
          <section className="MarkerCreationDetail panel">
            <h2 className="header-title">
              {type === "point" && "Marker"}
              {type === "arrow" && "Arrow"}
              {type === "polygon" && "Polygon"}
              {type === "cross" && "Cross"}
            </h2>
            <div className="content">
              <div className="block">
                <input placeholder="Write a title" onChange={(event) => this.setState({name: event.target.value})}/>
              </div>
              {type === "point" &&
                <div className="block">
                  <h3 className="title mdi mdi-bookmark mdi-16px">Category</h3>
                  <div className="markers">
                    <MarkerIcon active={activeMarker === "camp"} onClick={() => props.onSelectIcon("camp")} type="camp" name="Camp" />
                    <MarkerIcon active={activeMarker === "hospital"} onClick={() => props.onSelectIcon("hospital")} type="hospital" name="Hospital" />
                    <MarkerIcon active={activeMarker === "warning"} onClick={() => props.onSelectIcon("warning")} type="warning" name="Warning" />
                    <MarkerIcon active={activeMarker === "idps"} onClick={() => props.onSelectIcon("idps")} type="idps" name="IDPs" />
                    <MarkerIcon active={activeMarker === "checkpoint"} onClick={() => props.onSelectIcon("checkpoint")} type="checkpoint" name="Check point" />
                    <MarkerIcon active={activeMarker === "mobile-clinic"} onClick={() => props.onSelectIcon("mobile-clinic")} type="mobile-clinic" name="Mobile clinic"/>
                    <MarkerIcon active={activeMarker === "other" || !activeMarker} onClick={() => props.onSelectIcon("other")} type="other" name="Other" />
                  </div>
                </div>}
              <div className="block">
                <h3 className="title mdi mdi-comment mdi-16px">Comment</h3>
                <textarea placeholder="Write a comment" onChange={(event) => this.setState({description: event.target.value})}>
                </textarea>
              </div>
              <div className="block">
                <h3 className="title mdi mdi-map mdi-16px">Coordinates</h3>
                {(type === "point" || type === "cross") &&
                  <div className="coordinates-inputs point cross">
                    <div>
                      <span>Lat:</span>
                      <input placeholder="Lat"
                             value={props.drawing.getIn(['position', 0])}
                             onChange={(e) => props.onChangeLocation(e.target.value, props.drawing.getIn(['position', 1]))} />
                    </div>
                    <div>
                      <span>Lng:</span>
                      <input placeholder="Lng"
                             value={props.drawing.getIn(['position', 1])}
                             onChange={(e) => props.onChangeLocation(props.drawing.getIn(['position', 0]), e.target.value)} />
                    </div>
                  </div>}
                {(type === "arrow") &&
                  <div className="coordinates-inputs arrow">
                    <span>Origin:</span>
                    <div>
                      <input placeholder="Lat"
                             value={props.drawing.getIn(['points', 0, 0])}
                             onChange={(e) => props.onChangeLocation(e.target.value, props.drawing.getIn(['points', 0, 1]))} />
                      <input placeholder="Lng"
                             value={props.drawing.getIn(['points', 0, 1])}
                             onChange={(e) => props.onChangeLocation(props.drawing.getIn(['points', 0, 0]), e.target.value)} />
                    </div>
                    <span>Destination:</span>
                    <div>
                      <input placeholder="Lat"
                             value={props.drawing.getIn(['points', 1, 0])}
                             onChange={(e) => props.onChangeLocation(e.target.value, props.drawing.getIn(['points', 1, 1]))} />
                      <input placeholder="Lng"
                             value={props.drawing.getIn(['points', 1, 1])}
                             onChange={(e) => props.onChangeLocation(props.drawing.getIn(['points', 1, 0]), e.target.value)} />
                    </div>
                  </div>}
                {(type === "polygon") &&
                  <div className="coordinates-inputs polygon">
                    {props.drawing.get('points').map((point) => (
                      <div>
                        <input placeholder="Lat"
                               value={point.get(0)}
                               onChange={(e) => props.onChangeLocation(e.target.value, point.get(1))} />
                        <input placeholder="Lng"
                               value={point.get(1)}
                               onChange={(e) => props.onChangeLocation(point.get(0), e.target.value)} />
                      </div>))}
                  </div>}
              </div>
              {type === "point" &&
                <div className="block">
                  <h3 className="title mdi mdi-attachment mdi-16px">Documents</h3>
                  <a>+ add link to doc</a>
                </div>}
            </div>
            <div className="buttons-set">
              <button className="save" onClick={this.addPoint}>Save</button>
              <button className="cancel" onClick={props.onCancelDrawing}>Cancel</button>
            </div>
          </section>
        );
    }
}

MarkerCreationDetailImpl.propTypes = {
    drawing: PropTypes.object.isRequired
}

const MarkerCreationDetail = connect(
    (state) => ({
        drawing: state.getIn(['map', 'drawing']),
        project: state.get("current-project"),
    }),
    (dispatch) => ({
        onChangeLocation: (lat, lng) => {
            dispatch({type: "ADD_MARKER", "payload": [lat, lng]});
        },
        onCancelDrawing: () => {
            dispatch({type: "CANCEL_DRAWING", "payload": null});
        },
        onSelectIcon: (icon) => {
            dispatch({type: "SELECT_MARKER_ICON", "payload": icon});
        },
        onSaveMarker: (projectSlug, point) => {
            dispatch({type: "ADD_POINT", "payload": {projectSlug: projectSlug, point: point}});
        },
    })
)(MarkerCreationDetailImpl);

export default MarkerCreationDetail;
