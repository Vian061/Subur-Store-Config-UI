import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { AuthService } from "../../services/auth.service";
import { MessageService } from "primeng/api";
import { ToastModule } from "primeng/toast";
import { CardModule } from "primeng/card";
import { ButtonModule } from "primeng/button";
import { InputTextModule } from "primeng/inputtext";
import { PasswordModule } from "primeng/password";

@Component({
  selector: "app-login",
  standalone: true,
  imports: [
    CommonModule,
    ToastModule,
    CardModule,
    ButtonModule,
    FormsModule,
    InputTextModule,
    PasswordModule,
  ],
  providers: [MessageService],
  templateUrl: "./login.component.html",
  styleUrl: "./login.component.scss",
})
export class LoginComponent {
  authService: AuthService;
  username: string = "";
  password: string = "";

  constructor(authService: AuthService, private messageService: MessageService) {
    this.authService = authService;
  }

  showError(error: string) {
    var detail = "";
    if (error) {
      detail = error.replaceAll("_", " ");
    }
    this.messageService.add({
      severity: "error",
      summary: "Login Failed",
      detail: detail,
    });
  }

  showSuccess(username: string) {
    this.messageService.add({
      severity: "success",
      summary: "Login Success",
      detail: "Welcome " + username,
    });
  }

  login(username: string, password: string) {
    this.authService.login(username, password).subscribe({
      error: (error) => {
        this.showError(error);
      },
    });
  }
}
