import config from "../config";
import { Http } from "./http";

let http = new Http(config.API_HOST);

export function listProjects() {
  return http.get('/api/projects');
}

export function listOrganizations() {
  return http.get('/api/organizations');
}

export function getProject(slug) {
  return http.get('/api/projects/'+slug);
}

export function deleteProject(slug) {
  return http.delete('/api/projects/'+slug);
}

export function updateProject(slug, project) {
  return http.put('/api/projects/'+slug, project)
}

export function patchProject(slug, data) {
  return http.patch('/api/projects/'+slug, data)
}

export function createProject(project) {
  return http.post('/api/projects', project)
}

export function createPoint(projectSlug, point) {
  return http.post('/api/projects' + projectSlug +'/map-items', point)
}

export function deletePoint(projectSlug, pointId) {
  return http.delete('/api/projects/' + projectSlug +'/map-items/'+pointId)
}

export function updatePoint(projectSlug, pointId, point) {
  return http.put('/api/projects/' + projectSlug +'/map-items/'+pointId, point)
}

export function getProjectDocuments(slug) {
  let noCache = "?"+((new Date()).getTime());
  return http.get('/api/projects/'+slug+'/documents')
}
