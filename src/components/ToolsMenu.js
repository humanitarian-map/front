import React, { Component } from 'react';
import { connect } from 'react-redux'
import {PropTypes} from "prop-types";
import './ToolsMenu.css';

function CursorBox(props) {
    return (
      <div className="cursor-box">
        <span className="lat">{props.lat.toFixed(4)}</span>,
        <span className="lng">{props.lng.toFixed(4)}</span>
      </div>);
}

CursorBox.propTypes = {
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired,
}

class ToolsMenuImpl extends Component {
    render() {
        let active = this.props.drawing.get('type');
        return (
          <div className="ToolsMenu">
            <div className={"marker mdi mdi-map-marker mdi-24px " + (active === 'point' ? 'active' : '')}
               onClick={() => this.props.selectTool('point')}></div>
            <div className={"marker mdi mdi-arrow-top-right mdi-24px " + (active === 'arrow' ? 'active' : '')}
                 onClick={() => this.props.selectTool('arrow')}></div>
            <div className={"marker mdi mdi-square-outline mdi-24px " + (active === 'polygon' ? 'active' : '')}
                 onClick={() => this.props.selectTool('polygon')}></div>
            <div className={"marker mdi mdi-close mdi-24px " + (active === 'cross' ? 'active' : '')}
                 onClick={() => this.props.selectTool('cross')}></div>
            <div className={"marker mdi mdi-cursor-move mdi-24px " + (active === 'move' ? 'active' : '')}
                 onClick={() => this.props.selectTool('move')}></div>
            <CursorBox lat={this.props.cursor.get(0)} lng={this.props.cursor.get(1)}></CursorBox>
          </div>
        );
    }
}

ToolsMenuImpl.propTypes = {
    drawing: PropTypes.object.isRequired
}

const ToolsMenu = connect(
    (state) => ({
        drawing: state.getIn(['map', 'drawing']),
        cursor: state.getIn(['map', 'cursor'])
    }),
    (dispatch) => ({
        selectTool: (tool) => {
            dispatch({type: "SELECT_TOOL", "payload": tool});
        }
    })
)(ToolsMenuImpl);

export default ToolsMenu;
