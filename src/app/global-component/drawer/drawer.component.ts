import { Component, ElementRef, Renderer2 } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: "app-drawer",
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: "./drawer.component.html",
  styleUrl: "./drawer.component.scss",
})
export class DrawerComponent {
  authService: AuthService;
  constructor(private el: ElementRef, private renderer: Renderer2, authService: AuthService) {
    this.authService = authService;
  }
  menuVisiblity: boolean = false;

  drawerVisibility() {
    const parentElement = this.el.nativeElement.parentElement;

    const element = parentElement.closest(".grid-view");
    if (this.menuVisiblity == false) {
      this.showMenu(element);
    } else {
      this.hideMenu(element);
    }
    this.menuVisiblity = !this.menuVisiblity;
  }

  hideMenu(drawerElement: HTMLElement) {
    this.renderer.setStyle(drawerElement, "grid-template-columns", "60px 1fr");
  }

  showMenu(drawerElement: HTMLElement) {
    this.renderer.setStyle(drawerElement, "grid-template-columns", "200px 1fr");
  }
}
