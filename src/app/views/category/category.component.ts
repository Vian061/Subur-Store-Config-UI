import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CardMenuComponent } from "../../global-component/card-menu/card-menu.component";
import { UICategoryMenu } from "../../models/ui-models/ui-category-menu";
import { Constants } from "../../constants";

@Component({
  selector: "app-category",
  standalone: true,
  templateUrl: "./category.component.html",
  styleUrl: "./category.component.scss",
  imports: [CommonModule, CardMenuComponent],
})
export class CategoryComponent {
  menus: UICategoryMenu[] = Constants.menus;
}
