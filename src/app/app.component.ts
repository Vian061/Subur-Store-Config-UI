import { Component, ElementRef, OnInit, Renderer2 } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterOutlet } from "@angular/router";
import { DrawerComponent } from "./global-component/drawer/drawer.component";
import { AuthService } from "./services/auth.service";
import { map } from "rxjs";

@Component({
  selector: "app-root",
  standalone: true,
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  imports: [CommonModule, RouterOutlet, DrawerComponent],
})
export class AppComponent implements OnInit {
  title = "StoreConfiguration";
  authenticated: boolean = false;

  constructor(private authService: AuthService) {
    // this.authenticated = this.authService.isAuthenticated();
  }

  ngOnInit() {
    this.authService.isAuthenticated().subscribe({
      next: (authenticated) => {
        console.log("app.component:", authenticated);
        this.authenticated = authenticated;
      },
    });
  }

  ngOnChanges() {
    console.log("ngOnChange");
    // this.authService.isAuthenticated().subscribe({
    //   next: (authenticated) => {
    //     console.log(authenticated);
    //     this.authenticated = authenticated;
    //   },
    // });
  }
}
