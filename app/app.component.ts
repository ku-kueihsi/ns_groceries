import { Component } from "@angular/core";

@Component({
  selector: "my-app",
  styleUrls: ["pages/login/login-common.css", "pages/login/login.css"],
  templateUrl: "templates/app.html",
})
export class AppComponent {
  private submit() {
    console.log("hello");
  }
}
