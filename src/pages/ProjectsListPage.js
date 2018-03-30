import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import './ProjectsListPage.css';
import logoSvg from './img/logo-navbar.svg';
import {store} from '../App.store';

class ProjectsListPage extends React.Component {
    componentWillMount() {
        store.dispatch({type: 'LIST_PROJECTS', payload: null});
        store.dispatch({type: 'LIST_ORGANIZATIONS', payload: null});
        store.dispatch({type: 'RESET_PROJECT', payload: null});
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
                    <h1>The Humanitarian Map</h1>
                </header>
                <div className='projects-content'>
                    <h2>Projects</h2>
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

export default connect(
    (state) => ({
        projects: state.get('projects-list'),
        organizations: state.get('organizations'),
    }),
)(ProjectsListPage);
