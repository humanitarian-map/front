import axios from "axios";

const API_HOST="http://localhost:8000";

export function listProjects() {
  return axios.get(API_HOST + '/api/projects')
              .then(function (response) {
                return response.data;
              })
              .catch(function (error) {
                console.log(error);
              });
}

export function getProject(slug) {
  return axios.get(API_HOST + '/api/projects/'+slug)
              .then(function (response) {
                return response.data;
              })
              .catch(function (error) {
                console.log(error);
              });
}

export function deleteProject(slug) {
  return axios.delete(API_HOST + '/api/projects/'+slug)
              .then(function (response) {
                return response.data;
              })
              .catch(function (error) {
                console.log(error);
              });
}

export function updateProject(slug, project) {
  return axios.put(API_HOST + '/api/projects/'+slug, project)
              .then(function (response) {
                return response.data;
              })
              .catch(function (error) {
                console.log(error);
              });
}

export function createProject(project) {
  return axios.post(API_HOST + '/api/projects/', project)
              .then(function (response) {
                return response.data;
              })
              .catch(function (error) {
                console.log(error);
              });
}

export function createPoint(projectSlug, point) {
  return axios.post(API_HOST + '/api/projects/' + projectSlug +'/mapitems', point)
              .then(function (response) {
                return response.data;
              })
              .catch(function (error) {
                console.log(error);
              });
}

export function deletePoint(projectSlug, pointId) {
  return axios.delete(API_HOST + '/api/projects/' + projectSlug +'/mapitems/'+pointId)
              .then(function (response) {})
              .catch(function (error) {
                console.log(error);
              });
}

export function updatePoint(projectSlug, pointId, point) {
  return axios.put(API_HOST + '/api/projects/' + projectSlug +'/mapitems/'+pointId, point)
              .then(function (response) {})
              .catch(function (error) {
                console.log(error);
              });
}
