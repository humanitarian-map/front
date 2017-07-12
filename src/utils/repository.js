import axios from "axios";

const API_HOST="http://localhost:8000";

export function listProjects() {
  return axios.get(API_HOST + '/api/projects')
       .then(function (response) {
         return response.data;
       })
       .catch(function (error) {
         console.log(error);
         return null;
       });
}

export function getProject(slug) {
  return axios.get(API_HOST + '/api/projects/'+slug)
       .then(function (response) {
         return response.data;
       })
       .catch(function (error) {
         console.log(error);
         return null;
       });
}

export function addPoint(projectId, point) {
  return axios.post(API_HOST + '/api/projects/'+projectId+"/points", {data: point})
              .then(function (response) {
                return response.data;
              })
              .catch(function (error) {
                console.log(error);
                return null;
              });
}
