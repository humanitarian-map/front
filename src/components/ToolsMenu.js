import React, { Component } from 'react';
import { connect } from 'react-redux'
import {PropTypes} from "prop-types";
import {Link} from "react-router-dom";
import './ToolsMenu.css';

class ToolsMenuImpl extends Component {
    render() {
        let active = this.props.drawing.get('type');
        console.log(active);
        return (
          <div className="ToolsMenu">
            <div className={"marker mdi mdi-map-marker mdi-36px " + (active === 'point' ? 'active' : '')}
               onClick={() => this.props.selectTool('point')}></div>
            <div className={"marker mdi mdi-arrow-top-right mdi-36px " + (active === 'arrow' ? 'active' : '')}
                 onClick={() => this.props.selectTool('arrow')}></div>
            <div className={"marker mdi mdi-square-outline mdi-36px " + (active === 'polygon' ? 'active' : '')}
                 onClick={() => this.props.selectTool('polygon')}></div>
          </div>
        );
    }
}

ToolsMenuImpl.propTypes = {
    drawing: PropTypes.object.isRequired
}

const ToolsMenu = connect(
    (state) => ({
        drawing: state.getIn(['map', 'drawing'])
    }),
    (dispatch) => ({
        selectTool: (tool) => {
            dispatch({type: "SELECT_TOOL", "payload": tool});
        }
    })
)(ToolsMenuImpl);

export default ToolsMenu;
