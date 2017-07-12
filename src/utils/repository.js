import axios from "axios";

const API_HOST="http://localhost:8000";

export function listProjects() {
  return axios.get(API_HOST + '/api/projects')
       .then(function (response) {
         console.log(response);
       })
       .catch(function (error) {
         console.log(error);
       });
}

export function getProject(slug) {
  return axios.get(API_HOST + '/api/projects/'+slug)
       .then(function (response) {
         console.log(response);
       })
       .catch(function (error) {
         console.log(error);
       });
}
