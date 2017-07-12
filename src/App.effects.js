import * as repo from "./utils/repository";

export default function ({dispatch, getState}) {
  return next => action => {
    switch (action.type) {
      case 'LIST_PROJECTS':
        return repo.listProjects().then((projects) => {
            return dispatch({type: "SET_PROJECTS_LIST", payload: projects});
        })
      case 'GET_CURRENT_PROJECT':
        return repo.getProject(action.payload).then((project) => {
            return dispatch({type: "SET_CURRENT_PROJECT", payload: project});
        })
      default:
        return next(action)
    }
  }
}
