import React from 'react';
import {PropTypes} from 'prop-types';

import {COLORS, DEFAULT_COLOR} from '../../utils/colors';
import {DEFAULT_CROSS_SIZE, DEFAULT_ARROWHEAD_SIZE} from '../../utils/sizes';
import {POINT_TYPES} from '../../utils/point_types';

import './MarkerCreationDetail.css';
import MarkerIcon from '../MarkerIcon.js';

export default class MarkerCreationDetail extends React.Component {
    static propTypes = {
        drawing: PropTypes.object.isRequired,
        project: PropTypes.object.isRequired,
        actions: PropTypes.shape({
            saveMarker: PropTypes.func.isRequired,
            selectIcon: PropTypes.func.isRequired,
            setDrawingColor: PropTypes.func.isRequired,
            changeCrossSize: PropTypes.func.isRequired,
            changeLocation: PropTypes.func.isRequired,
            changeArrowOrigin: PropTypes.func.isRequired,
            changeArrowDest: PropTypes.func.isRequired,
            changePolygonPoint: PropTypes.func.isRequired,
            cancelDrawing: PropTypes.func.isRequired,
        }),
    }

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            description: '',
        };
    }

    addPoint = (event) => {
        event.preventDefault();
        const {drawing, project} = this.props;
        let data = {};
        if (drawing.get('type') === 'point') {
            data = {
                position: drawing.get('position').toJS(),
                icon: drawing.get('icon'),
            };
        } else if (drawing.get('type') === 'cross') {
            data = {
                position: drawing.get('position').toJS(),
                color: drawing.get('color'),
                size: drawing.get('size'),
            };
        } else if (drawing.get('type') === 'polygon') {
            data = {
                positions: drawing.get('points').toJS(),
                color: drawing.get('color'),
            };
        } else if (drawing.get('type') === 'arrow') {
            data = {
                origin: drawing.getIn(['points', 0]).toJS(),
                dest: drawing.getIn(['points', 1]).toJS(),
                color: drawing.get('color'),
                size: drawing.get('size'),
            };
        }
        this.props.actions.saveMarker(
            project.get('slug'),
            {
                project: project.get('id'),
                name: this.state.name,
                description: this.state.description,
                type: drawing.get('type'),
                data: data,
            }
        );
    }

    render() {
        const {drawing, actions} = this.props;
        const activeMarker = drawing.get('icon');
        const type = drawing.get('type');

        return (
            <section className='MarkerCreationDetail panel'>
                <h2 className='header-title'>
                    {type === 'point' && 'Marker'}
                    {type === 'arrow' && 'Arrow'}
                    {type === 'polygon' && 'Polygon'}
                    {type === 'cross' && 'Cross'}
                </h2>
                <div className='content'>
                    <div className='block'>
                        <input
                            placeholder='Write a title'
                            type='text'
                            onChange={(event) => this.setState({name: event.target.value})}
                        />
                    </div>
                    {type === 'point' &&
                    <div className='block'>
                        <h3 className='title mdi mdi-bookmark mdi-16px'>{'Category'}</h3>
                        <div className='markers'>
                            {POINT_TYPES.map((pointType) => (
                                <MarkerIcon
                                    active={activeMarker === pointType.id || (!activeMarker && pointType.id === 'other')}
                                    onClick={() => actions.selectIcon(pointType.id)}
                                    type={pointType.id}
                                    key={pointType.id}
                                />
                            ))}
                        </div>
                    </div>}
                    {(type === 'polygon' || type === 'arrow' || type === 'cross') &&
                    <div className='block'>
                        <h3 className='title mdi mdi-comment mdi-16px'>{'Color'}</h3>
                        <div className='color-block'>
                            {COLORS.map((color) => (
                                <div
                                    key={color}
                                    style={{background: color}}
                                    className={(drawing.get('color') || DEFAULT_COLOR) === color ? 'selected' : ''}
                                    onClick={() => actions.setDrawingColor(color)}
                                />
                            ))}
                        </div>
                    </div>}

                    {(type === 'cross') &&
                    <div className='block'>
                        <h3 className='title mdi mdi-comment mdi-16px'>{'Size'}</h3>
                        <input
                            type='number'
                            placeholder='Size'
                            value={drawing.getIn(['size']) || DEFAULT_CROSS_SIZE}
                            onChange={(e) => actions.changeCrossSize(parseFloat(parseFloat(e.target.value)))}
                        />
                    </div>}

                    {(type === 'arrow') &&
                    <div className='block'>
                        <h3 className='title mdi mdi-comment mdi-16px'>{'Arrowhead Size (%)'}</h3>
                        <input
                            type='number'
                            placeholder='Size'
                            value={drawing.getIn(['size']) || DEFAULT_ARROWHEAD_SIZE}
                            onChange={(e) => actions.changeCrossSize(parseFloat(parseFloat(e.target.value)))}
                        />
                    </div>}

                    <div className='block'>
                        <h3 className='title mdi mdi-comment mdi-16px'>{'Comment'}</h3>
                        <textarea
                            placeholder='Write a comment'
                            onChange={(event) => this.setState({description: event.target.value})}
                        />
                    </div>
                    <div className='block'>
                        <h3 className='title mdi mdi-map mdi-16px'>{'Coordinates'}</h3>
                        {(type === 'point' || type === 'cross') &&
                        <div className='coordinates-inputs point cross'>
                            <div>
                                <span>{'Latitude'}</span>
                                <input
                                    placeholder='Lat'
                                    type='number'
                                    value={drawing.getIn(['position', 0])}
                                    onChange={(e) => actions.changeLocation(parseFloat(parseFloat(e.target.value)), drawing.getIn(['position', 1]))}
                                />
                            </div>
                            <div>
                                <span>{'Longitude'}</span>
                                <input
                                    placeholder='Lng'
                                    type='number'
                                    value={drawing.getIn(['position', 1])}
                                    onChange={(e) => actions.changeLocation(drawing.getIn(['position', 0]), parseFloat(parseFloat(e.target.value)))}
                                />
                            </div>
                        </div>}
                        {(type === 'arrow') &&
                        <div className='coordinates-inputs arrow'>
                            <span>{'Origin:'}</span>
                            <div>
                                <input
                                    placeholder='Lat'
                                    type='number'
                                    value={drawing.getIn(['points', 0, 0])}
                                    onChange={(e) => actions.changeArrowOrigin(parseFloat(parseFloat(e.target.value)), drawing.getIn(['points', 0, 1]))}
                                />
                                <input
                                    placeholder='Lng'
                                    type='number'
                                    value={drawing.getIn(['points', 0, 1])}
                                    onChange={(e) => actions.changeArrowOrigin(drawing.getIn(['points', 0, 0]), parseFloat(parseFloat(e.target.value)))}
                                />
                            </div>
                            <span>{'Destination:'}</span>
                            <div>
                                <input
                                    placeholder='Lat'
                                    type='number'
                                    value={drawing.getIn(['points', 1, 0])}
                                    onChange={(e) => actions.changeArrowDest(parseFloat(parseFloat(e.target.value)), drawing.getIn(['points', 1, 1]))}
                                />
                                <input
                                    placeholder='Lng'
                                    type='number'
                                    value={drawing.getIn(['points', 1, 1])}
                                    onChange={(e) => actions.changeArrowDest(drawing.getIn(['points', 1, 0]), parseFloat(parseFloat(e.target.value)))}
                                />
                            </div>
                        </div>}
                        {(type === 'polygon') &&
                        <div className='coordinates-inputs polygon'>
                            {drawing.get('points').map((point, idx) => (
                                <div
                                    className='point'
                                    key={idx}
                                >
                                    <span>{'Latitude'}</span>
                                    <input
                                        placeholder='Lat'
                                        type='number'
                                        value={point.get(0)}
                                        onChange={(e) => actions.changePolygonPoint(idx, parseFloat(parseFloat(e.target.value)), point.get(1))}
                                    />
                                    <span>{'Longitude'}</span>
                                    <input
                                        placeholder='Lng'
                                        type='number'
                                        value={point.get(1)}
                                        onChange={(e) => actions.changePolygonPoint(idx, point.get(0), parseFloat(parseFloat(e.target.value)))}
                                    />
                                </div>))}
                        </div>}
                    </div>
                </div>
                <div className='buttons-set'>
                    <button
                        className='save'
                        onClick={this.addPoint}
                    >{'Save'}</button>
                    <button
                        className='cancel'
                        onClick={() => actions.cancelDrawing()}
                    >{'Cancel'}</button>
                </div>
            </section>
        );
    }
}
