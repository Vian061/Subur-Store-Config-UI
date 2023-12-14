import { Component, ElementRef, Renderer2 } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterOutlet } from "@angular/router";
import { DrawerComponent } from "./global-component/drawer/drawer.component";
import { AuthService } from "./services/auth.service";

@Component({
  selector: "app-root",
  standalone: true,
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  imports: [CommonModule, RouterOutlet, DrawerComponent],
})
export class AppComponent {
  title = "StoreConfiguration";
  authenticated: boolean = false;

  constructor(private authService: AuthService) {}

  ngAfterViewInit() {
    this.authService.isAuthenticated().subscribe({
      next: (authenticated) => {
        console.log(authenticated);
        this.authenticated = authenticated;
      },
    });
  }
}
