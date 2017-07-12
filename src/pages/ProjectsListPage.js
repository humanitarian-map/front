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
          <h1>Projects</h1>
          {this.props.projects && this.props.projects.map((project) => (
            <div>
              <Link to={"/map/"+ project.get('slug')} >{project.get('name')}</Link>
              <p>{project.get('description')}</p>
            </div>
          ))}
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
