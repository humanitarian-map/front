import axios from "axios";
import config from "../config";

export function listProjects() {
  let noCache = "?"+((new Date()).getTime());
  return axios.get(config.API_HOST + '/api/projects/'+noCache)
              .then(function (response) {
                return response.data;
              })
              .catch(function (error) {
                console.log(error);
              });
}

export function getProject(slug) {
  let noCache = "?"+((new Date()).getTime());
  return axios.get(config.API_HOST + '/api/projects/'+slug+"/"+noCache)
              .then(function (response) {
                return response.data;
              })
              .catch(function (error) {
                console.log(error);
              });
}

export function deleteProject(slug) {
  return axios.delete(config.API_HOST + '/api/projects/'+slug+"/")
              .then(function (response) {
                return response.data;
              })
              .catch(function (error) {
                console.log(error);
              });
}

export function updateProject(slug, project) {
  return axios.put(config.API_HOST + '/api/projects/'+slug+"/", project)
              .then(function (response) {
                return response.data;
              })
              .catch(function (error) {
                console.log(error);
              });
}

export function createProject(project) {
  return axios.post(config.API_HOST + '/api/projects/', project)
              .then(function (response) {
                return response.data;
              })
              .catch(function (error) {
                console.log(error);
              });
}

export function createPoint(projectSlug, point) {
  return axios.post(config.API_HOST + '/api/map-items/', point)
              .then(function (response) {
                return response.data;
              })
              .catch(function (error) {
                console.log(error);
              });
}

export function deletePoint(pointId) {
  return axios.delete(config.API_HOST + '/api/map-items/'+pointId+"/")
              .then(function (response) {})
              .catch(function (error) {
                console.log(error);
              });
}

export function updatePoint(projectSlug, pointId, point) {
  return axios.put(config.API_HOST + '/api/map-items/'+pointId+"/", point)
              .then(function (response) {
                  return response.data;
              })
              .catch(function (error) {
                console.log(error);
              });
}

export function getProjectDocuments(slug) {
  let noCache = "?"+((new Date()).getTime());
  return axios.get(config.API_HOST + '/api/projects/'+slug+'/documents/'+noCache)
              .then(function (response) {
                return response.data;
              })
              .catch(function (error) {
                console.log(error);
              });
}
