import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as actions from '../../App.actions';

import ProjectsListPage from './ProjectsListPage.js';

export default connect(
    (state) => ({
        projects: state.get('projects'),
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
