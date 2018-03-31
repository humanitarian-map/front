import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import ProjectsListPage from './ProjectsListPage.js';

import * as actions from '../../App.actions';

export default connect(
    (state) => ({
        projects: state.get('projects-list'),
        organizations: state.get('organizations'),
    }),
    (dispatch) => ({
        actions: bindActionCreators({
            listProjects: actions.listProjects,
            listOrganizations: actions.listOrganizations,
            resetProject: actions.resetProject,
        }, dispatch),
    })
)(ProjectsListPage);
