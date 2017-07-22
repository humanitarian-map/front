import React from 'react';
import {Link} from "react-router-dom";
import { connect } from 'react-redux'
import './ProjectsListPage.css';
import logoSvg from './img/logo-navbar.svg';
import {emit} from "../App.events";

class ProjectsListPageImpl extends React.Component {
  componentWillMount() {
      emit({type: "LIST_PROJECTS", payload: null});
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
            {this.props.projects && this.props.projects.map((project) => (
              <li className="grid-cell" key={project.get('id')}>
                  <Link className="project" to={"/map/"+ project.get('slug')} >
                    <div>
                      <div className="project-name">{project.get('name')}</div>
                      <p>{project.get('description')}</p>
                    </div>
                    <div className="organization">
                      <img src={project.get('organization').get('image')} alt="organization logo"/>
                      {project.get('organization').get('name')}
                    </div>
                  </Link>
              </li>
            ))}
            </ul>
          </div>
        </div>
      );
  }
}

const ProjectsListPage = connect(
    (state) => ({
        projects: state.get('projects-list'),
    }),
)(ProjectsListPageImpl);

export default ProjectsListPage;
