import config from '../config';

import {Http} from './http';

const http = new Http(config.API_HOST);

export function listProjects() {
    return http.get('/api/projects');
}

export function listOrganizations() {
    return http.get('/api/organizations');
}

export function getProject(slug) {
    return http.get('/api/projects/' + slug);
}

export function getProjectPoints(projectId) {
    return http.get('/api/map-items?project=' + projectId);
}

export function deleteProject(slug) {
    return http.delete('/api/projects/' + slug);
}

export function updateProject(slug, project) {
    return http.put('/api/projects/' + slug, project);
}

export function patchProject(slug, data) {
    return http.patch('/api/projects/' + slug, data);
}

export function createProject(project) {
    return http.post('/api/projects', project);
}

export function createPoint(point) {
    return http.post('/api/map-items', point);
}

export function deletePoint(pointId) {
    return http.delete('/api/map-items/' + pointId);
}

export function updatePoint(pointId, point) {
    return http.put('/api/map-items/' + pointId, point);
}

export function getProjectDocuments(slug) {
    return http.get('/api/projects/' + slug + '/documents');
}
