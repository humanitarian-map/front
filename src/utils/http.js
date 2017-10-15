import { Observable } from "rxjs";
import 'rxjs/add/observable/dom/ajax';
import {fromJS} from "immutable";

export class Http {
    responseType = "json";

    constructor(apiHost) {
        this.apiHost = apiHost;
    }

    headers() {
        let token = localStorage.getItem('auth-token', '');
        return {
            "Content-Type": "application/json",
            "Authorization": `JWT ${token}`
        };
    }

    request(url, method, body) {
        return Observable.ajax({
            url: this.apiHost + url,
            method: method,
            responseType: this.responseType,
            headers: this.headers(),
            body: body && JSON.stringify(body)
        }).map((response) => fromJS(response.response));
    }

    get(url) {
        return this.request(url, "GET");
    }

    delete(url) {
        return this.request(url, "DELETE");
    }

    post(url, data) {
        return this.request(url, "POST", data);
    }

    put(url, data) {
        return this.request(url, "PUT", data);
    }

    patch(url, data) {
        return this.request(url, "PATCH", data);
    }
}
