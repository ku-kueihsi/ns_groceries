import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { Color } from "color";
import { View } from "ui/core/view";
import { Page } from "ui/page";
import { User } from "../../shared/user/user";
import { UserService } from "../../shared/user/user.service";

@Component({
  providers: [UserService],
  selector: "my-app",
  styleUrls: ["pages/login/login-common.css", "pages/login/login.css"],
  templateUrl: "pages/login/login.html",
})
export class LoginComponent implements OnInit {
  // Data.
  user: User;
  isLoggingIn = true;
  @ViewChild("container") container: ElementRef;

  // Functions.
  constructor(private router: Router, private userService: UserService, private page: Page) {
    this.user = new User();
    this.user.email = "abc@bcd.com";
    this.user.password = "123";
  }
  ngOnInit() {
    this.page.actionBarHidden = true;
    this.page.backgroundImage = "res://bg_login";
  }
  submit() {
    if (!this.user.isValidEmail()) {
      alert("Enter a valid email address.");
      return;
    }
    if (this.isLoggingIn) {
      this.login();
    } else {
      this.signUp();
    }
  }
  login() {
    this.userService.login(this.user)
      .subscribe(
      () => this.router.navigate(["/list"]),
      (error: any) => alert("Unfortunately we could not find your account."),
    );
  }
  signUp() {
    this.userService.register(this.user)
      .subscribe(
      () => {
        alert("Your account was successfully created.");
        this.toggleDisplay();
      },
      () => alert("Unfortunately we were unable to create your account."),
    );
  }
  toggleDisplay() {
    this.isLoggingIn = !this.isLoggingIn;
    const container = this.container.nativeElement as View;
    container.animate({
      backgroundColor: this.isLoggingIn ? new Color("white") : new Color("#301217"),
      duration: 200,
    });
  }
}
