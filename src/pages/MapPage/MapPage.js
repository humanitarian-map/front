import React from 'react';
import {PropTypes} from 'prop-types';

import MainMap from '../../components/MainMap';
import Menu from '../../components/Menu';
import ToolsMenu from '../../components/ToolsMenu';
import ProjectDetail from '../../components/ProjectDetail';
import MarkerCreationDetail from '../../components/MarkerCreationDetail';
import MarkerDetail from '../../components/MarkerDetail';
import './MapPage.css';

export default class MapPage extends React.Component {
    static propTypes = {
        match: PropTypes.object.isRequired,
        map: PropTypes.object,
        user: PropTypes.object,
        project: PropTypes.object,
        documents: PropTypes.array,
        displayProjectDetail: PropTypes.bool,
        actions: PropTypes.shape({
            getCurrentProject: PropTypes.func.isRequired,
            getCurrentProjectPoints: PropTypes.func.isRequired,
            getProjectDocuments: PropTypes.func.isRequired,
        }).isRequired,
    }
    componentWillMount() {
        this.props.actions.getCurrentProject(this.props.match.params.slug);
        this.props.actions.getCurrentProjectPoints(this.props.match.params.slug);

        // this.props.actions.getProjectDocuments(this.props.match.params.slug);
    }

    render() {
        return (
            <div className='MapPage'>
                <div className='menu-container'>
                    <Menu/>
                </div>
                {this.props.displayProjectDetail && this.props.project &&
                <div className='project-detail-container'>
                    <ProjectDetail
                        project={this.props.project}
                        documents={this.props.documents}
                    />
                </div>}
                {this.props.map.getIn(['drawing', 'ready-to-edit']) &&
                <div className='point-detail-container'>
                    <MarkerCreationDetail/>
                </div>}
                {this.props.map.get('viewing') &&
                <div className='point-detail-container'>
                    <MarkerDetail/>
                </div>}
                <div className='map-and-tools-menu-container'>
                    <div className='tools-menu-container'>
                        <ToolsMenu/>
                    </div>
                    <div className='map-container'>
                        <MainMap/>
                    </div>
                </div>
            </div>
        );
    }
}
