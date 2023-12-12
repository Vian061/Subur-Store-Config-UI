import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatCardModule } from "@angular/material/card";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatButtonModule } from "@angular/material/button";
import { FormsModule } from "@angular/forms";
import { AuthService } from "../../services/auth.service";
import { NetworkService } from "../../services/network.service";

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
  ],
  templateUrl: "./login.component.html",
  styleUrl: "./login.component.scss",
})
export class LoginComponent {
  authService: AuthService;
  username: string = "";
  password: string = "";

  constructor(authService: AuthService) {
    this.authService = authService;
  }
}
