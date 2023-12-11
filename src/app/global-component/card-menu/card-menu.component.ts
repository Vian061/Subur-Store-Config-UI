import { Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ActivatedRoute, Router, RouterModule } from "@angular/router";

@Component({
  selector: "app-card-menu",
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: "./card-menu.component.html",
  styleUrl: "./card-menu.component.scss",
})
export class CardMenuComponent {
  constructor(private route: ActivatedRoute, private router: Router) {}

  @Input() icon: string = "block";
  @Input() title: string = "Title";
  @Input() desc: string = "Description";
  @Input() redirectUri: string = "/";

  redirectToPage() {
    this.router.navigate([this.redirectUri], { relativeTo: this.route });
  }
}
