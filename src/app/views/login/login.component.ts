import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatCardModule } from "@angular/material/card";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatButtonModule } from "@angular/material/button";
import { FormsModule } from "@angular/forms";
import { AuthService } from "../../services/auth.service";
import { MessageService } from "primeng/api";
import { Toast, ToastModule } from "primeng/toast";
import { error } from "console";

@Component({
  selector: "app-login",
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ToastModule,
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
