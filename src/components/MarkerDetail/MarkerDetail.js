import React from 'react';
import {PropTypes} from 'prop-types';

import MarkerIcon from '../MarkerIcon.js';
import './MarkerDetail.css';

export default class MarkerDetail extends React.Component {
    static propTypes = {
        marker: PropTypes.object.isRequired,
        project: PropTypes.object,
        documents: PropTypes.object,
        actions: PropTypes.shape({
            deleteMarker: PropTypes.func.isRequired,
        }).isRequired,
    };

    render() {
        const {project, marker, documents, actions} = this.props;
        var data;
        if (typeof marker.data === 'string') {
            data = JSON.parse(marker.data);
        } else {
            data = marker.data;
        }

        let projectDocuments = [];
        if (documents) {
            projectDocuments = documents.filter((doc) => {
                const isFile = doc.get('type') === 'file';
                const splittedPath = doc.get('path').split('/');
                const isInThePointFolder = splittedPath.length >= 4 && splittedPath[2] === marker.name;
                return isFile && isInThePointFolder;
            });
        }

        return (
            <section className='MarkerDetail panel'>
                <h2 className='header-title'>
                    {marker.type === 'point' && 'Marker'}
                    {marker.type === 'arrow' && 'Arrow'}
                    {marker.type === 'polygon' && 'Polygon'}
                    {marker.type === 'cross' && 'Cross'}
                </h2>
                <div className='content'>
                    <div className='block'>
                        <h3 className='title panel-name'>{marker.name}</h3>
                    </div>
                    {marker.type === 'point' &&
                    <div className='block'>
                        <h3 className='title mdi mdi-bookmark mdi-16px'>{'Category'}</h3>
                        <div className='markers'>
                            <MarkerIcon type={data.icon}/>
                        </div>
                    </div>}
                    <div className='block'>
                        <h3 className='title mdi mdi-comment mdi-16px'>{'Comment'}</h3>
                        <p>{marker.description}</p>
                    </div>
                    <div className='block'>
                        <h3 className='title mdi mdi-map mdi-16px'>{'Coordinates'}</h3>
                        {(marker.type === 'point' || marker.type === 'cross') &&
                        <div className='coordinates-inputs'>
                            <span>{'Latitude '}{data.position[0].toFixed(4)}</span>
                            <span>{'Longitude '}{data.position[1].toFixed(4)}</span>
                        </div>}
                        {marker.type === 'arrow' &&
                        <div className='coordinates-inputs'>
                            <h4>{'Origin'}</h4>
                            <span>{'Latitude ' + data.origin[0].toFixed(4)}</span>
                            {','}
                            <span>{'Longitude ' + data.origin[1].toFixed(4)}</span>
                            <h4>{'Destination'}</h4>
                            <span>{'Latitude ' + data.dest[0].toFixed(4)}</span>
                            {','}
                            <span>{'Longitude ' + data.dest[1].toFixed(4)}</span>
                        </div>}
                        {marker.type === 'polygon' &&
                        <div className='coordinates-inputs'>
                            {data.positions.map((point, idx) => (
                                <p key={idx}>
                                    <span>{'Latitude' + point[0].toFixed(4)}</span>
                                    {','}
                                    <span>{'Longitude ' + point[1].toFixed(4)}</span>
                                </p>))}
                        </div>}
                    </div>
                    {marker.type === 'point' &&
                    <div className='block block-documents'>
                        <h3 className='title mdi mdi-attachment mdi-16px'>{'Documents'}</h3>
                        <div className='docs'>
                            {(projectDocuments || []).map((doc) => (
                                <a
                                    className='ellipsis'
                                    key={doc.get('path')}
                                    href={marker.documents_url}
                                    target='_blank'
                                    alt={doc.get('name')}
                                >
                                    {doc.get('name')}
                                </a>
                            ))}
                            <a
                                target='_blank'
                                href={marker.documents_url}
                            >{'Open documents folder'}</a>
                        </div>
                    </div>}
                </div>
                <div className='buttons-set'>
                    <button
                        className='delete'
                        onClick={() => actions.deleteMarker(project.get('slug'), marker.id)}
                    >{'Delete'}</button>
                </div>
            </section>
        );
    }
}