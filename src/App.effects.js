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
      case 'ADD_POINT':
        return repo.addPoint(action.payload.projectId, action.payload.point).then(() => {
            dispatch({type: "GET_CURRENT_PROJECT", payload: action.payload.projectId});
        })
      default:
        return next(action);
    }
  }
}
