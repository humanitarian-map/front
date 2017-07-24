import React from 'react';
import {Link} from "react-router-dom";
import { connect } from 'react-redux'
import './ProjectsListPage.css';
import logoSvg from './img/logo-navbar.svg';
import {emit} from "../App.events";
import Lightbox from "../components/Lightbox";
import * as actions from "../App.actions";

class ProjectsListPage extends React.Component {
  componentWillMount() {
      emit(actions.listProjects());
      emit(actions.resetProject());
  }

  render() {
      return (
        <div className="ProjectsListPage">
          {this.props.openLightbox === "new-project" &&
            <Lightbox size="big">
              <h3>Project name</h3>
              <input placeholder="Write a name" type="text" />
              <h3>Description</h3>
              <textarea placeholder="Write a description"></textarea>
              <button className="create">Create</button>
            </Lightbox>}
          <header className="header-menu">
            <img className="header-logo" src={logoSvg} alt="logo" />
            <h1>The Humanitarian Map</h1>
          </header>
          <div className="projects-content">
            <h2>Projects</h2>
            <a className="create-new-project" onClick={() => emit(actions.openLightbox("new-project"))}>Create new project</a>
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

export default connect(
    (state) => ({
        projects: state.get('projects-list'),
        openLightbox: state.get('open-lightbox'),
    }),
)(ProjectsListPage);
