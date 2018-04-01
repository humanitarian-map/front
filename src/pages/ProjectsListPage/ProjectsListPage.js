import React from 'react';
import {Link} from 'react-router-dom';
import ImmutablePropTypes from 'react-immutable-proptypes';
import {PropTypes} from 'prop-types';

import './ProjectsListPage.css';
import logoSvg from '../img/logo-navbar.svg';

export default class ProjectsListPage extends React.Component {
    static propTypes = {
        projects: ImmutablePropTypes.list.isRequired,
        organizations: ImmutablePropTypes.map.isRequired,
        actions: PropTypes.shape({
            listProjects: PropTypes.func.isRequired,
            listOrganizations: PropTypes.func.isRequired,
            resetProject: PropTypes.func.isRequired,
        }).isRequired,
    }

    componentWillMount() {
        this.props.actions.listProjects();
        this.props.actions.listOrganizations();
        this.props.actions.resetProject();
    }

    render() {
        return (
            <div className='ProjectsListPage'>
                <header className='header-menu'>
                    <img
                        className='header-logo'
                        src={logoSvg}
                        alt='logo'
                    />
                    <h1>{'The Humanitarian Map'}</h1>
                </header>
                <div className='projects-content'>
                    <h2>{'Projects'}</h2>
                    <ul className='grid'>
                        {this.props.projects && this.props.projects.map((project) => {
                            const organization = this.props.organizations.get(project.get('organization_id'));
                            return (
                                <li
                                    className='grid-cell'
                                    key={project.get('id')}
                                >
                                    <Link
                                        className='project'
                                        to={'/map/' + project.get('slug')}
                                    >
                                        <div>
                                            <div className='project-name'>{project.get('name')}</div>
                                            <p>{project.get('description')}</p>
                                        </div>
                                        {organization &&
                                        <div className='organization'>
                                            <img
                                                src={organization.get('image')}
                                                alt='organization logo'
                                            />
                                            {organization.get('name')}
                                        </div>
                                        }
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        );
    }
}
