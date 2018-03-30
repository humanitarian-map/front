import React, {Component} from 'react';
import {PropTypes} from 'prop-types';

import CursorBox from '../CursorBox.js';

import './ToolsMenu.css';

export default class ToolsMenu extends Component {
    static propTypes = {
        actions: PropTypes.object.isRequired,
        drawing: PropTypes.object.isRequired,
        moving: PropTypes.object.isRequired,
        cursor: PropTypes.object.isRequired,
    }

    render() {
        const {actions, drawing, moving, cursor} = this.props;
        const active = drawing.get('type');
        return (
            <div className='ToolsMenu'>
                <div
                    className={'marker mdi mdi-map-marker mdi-24px ' + (active === 'point' ? 'active' : '')}
                    onClick={() => actions.selectTool('point')}
                />
                <div
                    className={'marker mdi mdi-arrow-top-right mdi-24px ' + (active === 'arrow' ? 'active' : '')}
                    onClick={() => actions.selectTool('arrow')}
                />
                <div
                    className={'marker mdi mdi-vector-triangle mdi-24px ' + (active === 'polygon' ? 'active' : '')}
                    onClick={() => actions.selectTool('polygon')}
                />
                <div
                    className={'marker mdi mdi-close mdi-24px ' + (active === 'cross' ? 'active' : '')}
                    onClick={() => actions.selectTool('cross')}
                />
                <div
                    className={'marker mdi mdi-cursor-move mdi-24px ' + (moving ? 'active' : '')}
                    onClick={() => actions.toggleMove()}
                />
                <CursorBox
                    lat={cursor.get(0)}
                    lng={cursor.get(1)}
                />
            </div>
        );
    }
}

ToolsMenu.propTypes = {
    drawing: PropTypes.object.isRequired,
};

