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
import { BlockUIModule } from "primeng/blockui";

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
    BlockUIModule,
  ],
  providers: [MessageService],
  templateUrl: "./login.component.html",
  styleUrl: "./login.component.scss",
})
export class LoginComponent {
  authService: AuthService;
  username: string = "";
  password: string = "";
  loading: boolean = false;

  constructor(authService: AuthService, private messageService: MessageService) {
    this.authService = authService;
  }

  showError(error: any) {
    var detail = "";
    if (error.error.error_description) {
      detail = error.error.error_description.replaceAll("_", " ");
    } else if (error.error.message) {
      detail = error.error.message;
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

  login() {
    this.loading = true;
    this.authService.login(this.username, this.password).subscribe({
      next: (res) => {
        this.loading = false;
      },
      error: (error) => {
        this.loading = false;
        this.showError(error);
      },
    });
  }
}
