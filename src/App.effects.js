import * as repo from "./utils/repository";

export default function ({dispatch, getState}) {
  return next => action => {
    switch (action.type) {
      case 'LIST_PROJECTS':
        return repo.listProjects().then((projects) => {
            dispatch({type: "SET_PROJECTS_LIST", payload: projects});
        })
      case 'GET_CURRENT_PROJECT':
        return repo.getProject(action.payload).then((project) => {
            dispatch({type: "SET_CURRENT_PROJECT", payload: project});
        })
      case 'ADD_PROJECT':
        return repo.createProject(action.payload.project).then(() => {
            dispatch({type: "LIST_PROJECTS", payload: action.payload.projectSlug});
        })
      case 'DELETE_PROJECT':
        return repo.deleteProject(action.payload.projectSlug).then(() => {
            dispatch({type: "LIST_PROJECTS", payload: action.payload.projectSlug});
        })
      case 'UPDATE_PROJECT':
        return repo.updateProject(action.payload.projectSlug, action.payload.project).then(() => {
            dispatch({type: "LIST_PROJECTS", payload: action.payload.projectSlug});
        })
      case 'ADD_POINT':
        return repo.createPoint(action.payload.projectSlug, action.payload.point).then(() => {
            dispatch({type: "GET_CURRENT_PROJECT", payload: action.payload.projectSlug});
            dispatch({type: "SELECT_TOOL", payload: null});
        })
      case 'DELETE_POINT':
        return repo.deletePoint(action.payload.projectSlug, action.payload.pointId).then(() => {
            dispatch({type: "GET_CURRENT_PROJECT", payload: action.payload.projectSlug});
            dispatch({type: "SELECT_TOOL", payload: null});
        })
      case 'UPDATE_POINT':
        return repo.updatePoint(action.payload.projectSlug, action.payload.pointId, action.payload.point).then((point) => {
            dispatch({type: "GET_CURRENT_PROJECT", payload: action.payload.projectSlug});
            dispatch({type: "UPDATE_VISUALIZED_MARKER", "payload": point});
        })
      default:
        return next(action);
    }
  }
}
