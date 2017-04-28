import { Component } from "@angular/core";

@Component({
  selector: "my-app",
  styleUrls: ["pages/login/login-common.css", "pages/login/login.css"],
  templateUrl: "templates/app.html",
})
export class AppComponent {
  email = "nativescriptrocks@telerik.com";
  isLoggingIn = true;

  submit() {
    alert("You’re using: " + this.email);
  }

  toggleDisplay() {
    this.isLoggingIn = !this.isLoggingIn;
  }
}
