import React from 'react';
import {Link} from "react-router-dom";
import { connect } from 'react-redux'
import './ProjectsListPage.css';
import logoSvg from './img/logo-navbar.svg';
import {emit} from "../App.events";

class ProjectsListPage extends React.Component {
  componentWillMount() {
      emit({type: "LIST_PROJECTS", payload: null});
      emit({type: "LIST_ORGANIZATIONS", payload: null});
      emit({type: "RESET_PROJECT", payload: null});
  }

  render() {
      return (
        <div className="ProjectsListPage">
          <header className="header-menu">
            <img className="header-logo" src={logoSvg} alt="logo" />
            <h1>The Humanitarian Map</h1>
          </header>
          <div className="projects-content">
            <h2>Projects</h2>
            <ul className="grid">
            {this.props.projects && this.props.projects.map((project) => {
              const organization = this.props.organizations.get(project.get('OrganizationId'))
              return (
              <li className="grid-cell" key={project.get('ID')}>
                  <Link className="project" to={"/map/"+ project.get('Slug')} >
                    <div>
                      <div className="project-name">{project.get('Name')}</div>
                      <p>{project.get('description')}</p>
                    </div>
                    {organization &&
                        <div className="organization">
                          <img src={organization.get('Image')} alt="organization logo"/>
                          {organization.get('Name')}
                        </div>
                    }
                  </Link>
              </li>
            )})}
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
