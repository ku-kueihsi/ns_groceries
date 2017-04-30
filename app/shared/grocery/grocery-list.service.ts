import { Injectable } from "@angular/core";
import { Headers, Http } from "@angular/http";
import "rxjs/add/operator/map";
import { Observable } from "rxjs/Rx";

import { Config } from "../config";
import { Grocery } from "./grocery";

@Injectable()
export class GroceryListService {
  constructor(private http: Http) { }

  load() {
    const headers = new Headers();
    headers.append("Authorization", "Bearer " + Config.token);

    return this.http.get(Config.apiUrl + "Groceries", {
      headers,
    })
      .map((res) => res.json())
      .map((data) => {
        const groceryList = [] as Grocery[];
        data.Result.forEach((grocery: any) => {
          groceryList.push(new Grocery(grocery.Id, grocery.Name));
        });
        return groceryList;
      })
      .catch(this.handleErrors);
  }

  handleErrors(error: Response) {
    console.log(JSON.stringify(error.json()));
    return Observable.throw(error);
  }

  add(name: string) {
    const headers = new Headers();
    headers.append("Authorization", "Bearer " + Config.token);
    headers.append("Content-Type", "application/json");

    return this.http.post(
      Config.apiUrl + "Groceries",
      JSON.stringify({ Name: name }),
      { headers },
    )
      .map((res) => res.json())
      .map((data) => {
        return new Grocery(data.Result.Id, name);
      })
      .catch(this.handleErrors);
  }
}
