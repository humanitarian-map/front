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
  return axios.put(API_HOST + '/api/projects/'+slug, {data: project})
              .then(function (response) {
                return response.data;
              })
              .catch(function (error) {
                console.log(error);
              });
}

export function createProject(project) {
  return axios.post(API_HOST + '/api/projects/', {data: project})
              .then(function (response) {
                return response.data;
              })
              .catch(function (error) {
                console.log(error);
              });
}

export function createPoint(projectId, point) {
  return axios.post(API_HOST + '/api/projects/'+projectId+"/items", {data: point})
              .then(function (response) {
                return response.data;
              })
              .catch(function (error) {
                console.log(error);
              });
}

export function deletePoint(projectId, pointId) {
  return axios.delete(API_HOST + '/api/projects/'+projectId+"/items/"+pointId)
              .then(function (response) {})
              .catch(function (error) {
                console.log(error);
              });
}

export function updatePoint(projectId, pointId, point) {
  return axios.put(API_HOST + '/api/projects/'+projectId+"/items/"+pointId, {data: point})
              .then(function (response) {})
              .catch(function (error) {
                console.log(error);
              });
}
