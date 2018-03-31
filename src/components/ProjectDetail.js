import React from 'react';
import {connect} from 'react-redux';
import {PropTypes} from 'prop-types';
import moment from 'moment';

import {POINT_TYPES} from '../utils/point_types';
import {store} from '../App.store';
import * as actions from '../App.actions';

import './ProjectDetail.css';

class ProjectDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openMarker: '',
        };
        this.centerMap = this.centerMap.bind(this);
        this.toggleMarkerList = this.toggleMarkerList.bind(this);
    }

    centerMap(point) {
        store.dispatch(actions.visualizeMarker(point));
        setTimeout(() => store.dispatch(actions.centerMap(point.data.position), this.props.currentPosition.get('zoom'), 500));
    }

    toggleMarkerList(marker) {
        if (marker === this.state.openMarker) {
            this.setState({openMarker: ''});
        } else {
            this.setState({openMarker: marker});
        }
    }

    renderPoint = (point) => {
        return (
            <li
                onClick={() => this.centerMap(point.toJS())}
                key={point.get('id')}
            >
                {point.get('name')}
            </li>
        );
    }

    renderPointsGroup = (pointsGroup) => {
        if (pointsGroup.points.size === 0) {
            return null;
        }
        var pointsList = null;
        if (this.state.openMarker === pointsGroup.pointType.id) {
            pointsList = (
                <ul>
                    {pointsGroup.points.map(this.renderPoint)}
                </ul>
            );
        }
        return (
            <li key={pointsGroup.pointType.id}>
                <div
                    className='header'
                    onClick={() => this.toggleMarkerList(pointsGroup.pointType.id)}
                >
                    <span
                        className={'marker-icon mdi mdi-' + pointsGroup.pointType.icon + ' mdi-18px'}
                        style={{backgroundColor: pointsGroup.pointType.color}}
                    />
                    <span className='name'>{pointsGroup.pointType.name}</span>
                    <span className='arrow mdi mdi-chevron-right mdi-18px'/>
                    <span className='tag'>{pointsGroup.points.size}</span>
                </div>
                {pointsList}
            </li>
        );
    }

    renderDocuments(documents) {
        if (!documents) {
            return null;
        }
        return documents.map((doc) => (
            <a
                className='ellipsis'
                href={this.props.project.get('documents_url')}
                target='_blank'
                key={doc.get('path')}
                alt={doc.get('name')}
            >
                {doc.get('name')}
            </a>
        ));
    }

    render() {
        const organization = this.props.organization;

        const points = [];
        const mapitems = this.props.points;
        for (const pointType of POINT_TYPES) {
            points.push(
                {
                    points: mapitems.filter((i) => i.getIn(['data', 'icon']) === pointType.id),
                    pointType,
                }
            );
        }

        let projectDocuments = [];
        if (this.props.documents) {
            projectDocuments = this.props.documents.filter((doc) => {
                const isFile = doc.get('type') === 'file';
                const splittedPath = doc.get('path').split('/');
                const isInTheProjectFolder = splittedPath.length === 3 && splittedPath[1] === this.props.project.get('slug');
                return isFile && isInTheProjectFolder;
            });
        }

        return (
            <section className='ProjectDetail panel'>
                <h2 className='header-title'>{'Project'}</h2>
                <div className='content'>
                    <div className='block'>
                        <h3 className='title panel-name'>{this.props.project.get('name')}</h3>
                        <p className='description'>{this.props.project.get('description')}</p>
                    </div>
                    <div className='block'>
                        <h3 className='title mdi mdi-lan mdi-16px'>{'Organization'}</h3>
                        <div className='organization'>
                            <span className='logo'>
                                <img
                                    src={organization.get('image')}
                                    alt={organization.get('name')}
                                />
                            </span>
                            <span className='title'>{organization.get('name')}</span>
                        </div>
                    </div>
                    <div className='block block-documents'>
                        <h3 className='title mdi mdi-attachment mdi-16px'>{'Documents'}</h3>
                        {this.renderDocuments(projectDocuments)}
                        <a
                            target='_blank'
                            href={this.props.project.get('documents_url')}
                        >{'Open documents folder'}</a>
                    </div>
                    <div className='block'>
                        <h3 className='title mdi mdi-map-marker mdi-16px'>{'Markers'}</h3>
                        <ul className='markers-list'>
                            {points.map(this.renderPointsGroup)}
                        </ul>
                    </div>
                    <div className='block'>
                        <h3 className='title mdi mdi-calendar mdi-16px'>{'Timeframe'}</h3>
                        <div className='timeframe'>
                            <div className='date'>
                                <span className='label'>{'Start:'}</span> <span className='value'>{moment(this.props.project.get('start_date')).calendar()}</span>
                            </div>
                            <div className='date'>
                                <span className='label'>{'End:'}</span> <span className='value'>{moment(this.props.project.get('end_date')).calendar()}</span>
                            </div>
                        </div>
                    </div>
                    <div className='block'>
                        <h3 className='title mdi mdi-map mdi-16px'>{'Map options'}</h3>
                        <p>
                            <button
                                className=''
                                onClick={() => store.dispatch(actions.setProjectCenter(
                                    this.props.project.toJS(),
                                    this.props.currentPosition.get('center').toJS(),
                                    this.props.currentPosition.get('zoom')
                                ))}
                            >
                                {'Set current view as map center'}
                            </button>
                        </p>
                        <div>
                            <button
                                className=''
                                onClick={() => store.dispatch(actions.centerMap(
                                    {lat: this.props.project.getIn(['center_point', 0]),
                                        lng: this.props.project.getIn(['center_point', 1])},
                                    this.props.project.get('zoom')
                                ))}
                            >
                                {'Zoom to map center'}
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

ProjectDetail.propTypes = {
    project: PropTypes.object,
    organization: PropTypes.object,
    points: PropTypes.array,
    documents: PropTypes.object,
    currentPosition: PropTypes.object,
};

export default connect(
    (state) => {
        const project = state.get('current-project');
        const organization = state.get('organizations').get(project.get('organization_id'));
        return {
            currentPosition: state.getIn(['map', 'current-position']),
            project,
            points: state.get('current-project-points'),
            organization,
        };
    }
)(ProjectDetail);
