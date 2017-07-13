import React from 'react';
import {Link} from "react-router-dom";
import { connect } from 'react-redux'
import './ProjectsListPage.css';

class ProjectsListPageImpl extends React.Component {
  componentWillMount() {
      this.props.listProjects();
  }

  render() {
      return (
        <div className="ProjectsListPage">
          <header className="header-menu">
            <h1>The Humanitarian Map</h1>
          </header>
          <div className="content">
          <h2>Projects</h2>
          {this.props.projects && this.props.projects.map((project) => (
            <div key={project.get('id')}>
              <Link to={"/map/"+ project.get('slug')} >{project.get('name')}</Link>
              <p>{project.get('description')}</p>
            </div>
          ))}
          </div>
        </div>
      );
  }
}

const ProjectsListPage = connect(
    (state) => ({
        projects: state.get('projects-list'),
    }),
    (dispatch) => ({
        listProjects: () => dispatch({type: "LIST_PROJECTS", payload: null})
    })
)(ProjectsListPageImpl);

export default ProjectsListPage;
