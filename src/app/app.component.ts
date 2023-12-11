import { Component, ElementRef, Renderer2 } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterOutlet } from "@angular/router";
import { DrawerComponent } from "./global-component/drawer/drawer.component";
import { AuthService } from "./services/auth.service";
import { map } from "lodash";
import { of, switchMap } from "rxjs";

@Component({
  selector: "app-root",
  standalone: true,
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  imports: [CommonModule, RouterOutlet, DrawerComponent],
})
export class AppComponent {
  title = "StoreConfiguration";
  authService: AuthService;

  constructor(private el: ElementRef, private renderer: Renderer2, authService: AuthService) {
    this.authService = authService;
  }

  ngAfterViewInit(): void {
    // if (this.authService.isAuthenticated()) {
    //   const element = this.el.nativeElement.querySelector(".grid-view");
    //   this.renderer.setStyle(element, "grid-template-columns", "60px 1fr");
    // }
  }
}
