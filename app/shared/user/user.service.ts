import { Injectable } from "@angular/core";
import { Headers, Http, Response } from "@angular/http";
import "rxjs/add/operator/do";
import "rxjs/add/operator/map";
import { Observable } from "rxjs/Rx";

import { Config } from "../config";
import { User } from "./user";

@Injectable()
export class UserService {
  constructor(private http: Http) { }

  register(user: User) {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    return this.http.post(
      Config.apiUrl + "Users",
      JSON.stringify({
        Email: user.email,
        Password: user.password,
        Username: user.email,
      }),
      { headers },
    )
      .catch(this.handleErrors);
  }

  login(user: User) {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    return this.http.post(
      Config.apiUrl + "oauth/token",
      JSON.stringify({
        username: user.email,
        password: user.password,
        grant_type: "password",
      }),
      { headers },
    )
      .map((response) => response.json())
      .do((data) => {
        Config.token = data.Result.access_token;
      })
      .catch(this.handleErrors);
  }
  handleErrors(error: Response) {
    console.log(JSON.stringify(error.json()));
    return Observable.throw(error);
  }
}
