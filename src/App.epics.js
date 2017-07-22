import * as repo from "./utils/repository";
import {fromJS} from "immutable";
import { combineEpics } from 'redux-observable';
import { Observable } from "rxjs";

const listProjectsEpic = action$ =>
  action$.ofType("LIST_PROJECTS")
    .switchMap(() => {
        return repo.listProjects().map((projects) => {
            console.log(projects);
            return {type: "SET_PROJECTS_LIST", payload: projects}
        })
    });

const getProjectDocumentsEpic = action$ =>
  action$.ofType("GET_PROJECT_DOCUMENTS")
    .map((action) => action.payload)
    .switchMap((payload) =>
        repo.getProjectDocuments(payload).map((documents) => (
            {type: "SET_PROJECT_DOCUMENTS", payload: documents}
        )));

const getCurrentProjectEpic = action$ =>
  action$.ofType("GET_CURRENT_PROJECT")
    .map((action) => action.payload)
    .switchMap((payload) =>
        repo.getProject(payload).map((project) => (
            {type: "SET_CURRENT_PROJECT", payload: project}
        )));

const addProjectEpic = action$ =>
  action$.ofType("ADD_PROJECT")
    .map((action) => action.payload)
    .switchMap((payload) =>
      repo.createProject(payload.project).map(() => (
          {type: "LIST_PROJECTS", payload: payload.projectSlug}
      )));

const deleteProjectEpic = action$ =>
  action$.ofType("DELETE_PROJECT")
    .map((action) => action.payload)
    .switchMap((payload) =>
      repo.deleteProject(payload.projectSlug).map(() => (
          {type: "LIST_PROJECTS", payload: payload.projectSlug}
      )));

const updateProjectEpic = action$ =>
  action$.ofType("UPDATE_PROJECT_POSITION")
    .map((action) => action.payload)
    .switchMap((payload) =>
      repo.patchProject(payload.projectSlug, payload.data).map(() => (
          {type: "LIST_PROJECTS", payload: payload.projectSlug}
      )));

const addPointEpic = action$ =>
  action$.ofType("ADD_POINT")
    .map((action) => action.payload)
    .switchMap((payload) =>
      repo.createPoint(payload.projectSlug, payload.point).flatMap(() =>
        Observable.from([
          {type: "GET_CURRENT_PROJECT", payload: payload.projectSlug},
          {type: "SELECT_TOOL", payload: null}
        ])
      ));

const deletePointEpic = action$ =>
  action$.ofType("DELETE_POINT")
    .map((action) => action.payload)
    .switchMap((payload) =>
      repo.deletePoint(payload.projectSlug, payload.pointId).flatMap(() =>
        Observable.from([
          {type: "GET_CURRENT_PROJECT", payload: payload.projectSlug},
          {type: "SELECT_TOOL", payload: null}
        ])
      ));

const updatePointEpic = action$ =>
  action$.ofType("UPDATE_POINT")
    .map((action) => action.payload)
    .switchMap((payload) =>
      repo.updatePoint(payload.projectSlug, payload.pointId, payload.point).flatMap((point) =>
        Observable.from([
          {type: "GET_CURRENT_PROJECT", payload: payload.projectSlug},
          {type: "UPDATE_VISUALIZED_MARKER", "payload": point}
        ])
      ));

const centerMapEpic = action$ =>
  action$.ofType("CENTER_MAP")
    .map((action) => action.payload)
    .switchMap((payload) => {
        let event = new CustomEvent("centerMap", {"detail": payload});
        document.dispatchEvent(event);
        return Observable.empty();
    })


export const rootEpic = combineEpics(
  listProjectsEpic,
  getProjectDocumentsEpic,
  getCurrentProjectEpic,
  addProjectEpic,
  deleteProjectEpic,
  updateProjectEpic,
  addPointEpic,
  deletePointEpic,
  updatePointEpic,
  centerMapEpic,
)
