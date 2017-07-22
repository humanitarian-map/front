import config from "../config";
import { Observable } from "rxjs";
import 'rxjs/add/observable/dom/ajax';

function httpGet(url) {
    return Observable.ajax({
        url:url,
        method: "GET",
        responseType: "json",
        headers: {'Content-Type': "application/json"}
    }).map((response) => response.response);
}

function httpDelete(url) {
    return Observable.ajax({
        url:url,
        method: "DELETE",
        responseType: "json",
        headers: {'Content-Type': "application/json"}
    }).map((response) => response.response)
}

function httpPost(url, data) {
    return Observable.ajax({
        url:url,
        method: "POST",
        responseType: "json",
        headers: {'Content-Type': "application/json"},
        body: JSON.stringify(data)
    }).map((response) => response.response)
}

function httpPut(url, data) {
    return Observable.ajax({
        url:url,
        method: "PUT",
        responseType: "json",
        headers: {'Content-Type': "application/json"},
        body: JSON.stringify(data)
    }).map((response) => response.response)
}

export function listProjects() {
  let noCache = "?"+((new Date()).getTime());
  return httpGet(config.API_HOST + '/api/projects/'+noCache);
}

export function getProject(slug) {
  let noCache = "?"+((new Date()).getTime());
  return httpGet(config.API_HOST + '/api/projects/'+slug+"/"+noCache);
}

export function deleteProject(slug) {
  return httpDelete(config.API_HOST + '/api/projects/'+slug+"/");
}

export function updateProject(slug, project) {
  return httpPut(config.API_HOST + '/api/projects/'+slug+"/", project)
}

export function createProject(project) {
  return httpPost(config.API_HOST + '/api/projects/', project)
}

export function createPoint(projectSlug, point) {
  return httpPost(config.API_HOST + '/api/projects/' + projectSlug +'/map-items/', point)
}

export function deletePoint(projectSlug, pointId) {
  return httpDelete(config.API_HOST + '/api/projects/' + projectSlug +'/map-items/'+pointId+"/")
}

export function updatePoint(projectSlug, pointId, point) {
  return httpPut(config.API_HOST + '/api/projects/' + projectSlug +'/map-items/'+pointId+"/", point)
}

export function getProjectDocuments(slug) {
  let noCache = "?"+((new Date()).getTime());
  return httpGet(config.API_HOST + '/api/projects/'+slug+'/documents/'+noCache)
}
