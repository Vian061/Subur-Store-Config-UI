import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DropDownMenu } from "../../../models/ui-models/drop-down-menu";
import { DropDownComponent } from "../../../global-component/drop-down/drop-down.component";

@Component({
  selector: "app-bank",
  standalone: true,
  templateUrl: "./bank.component.html",
  styleUrl: "./bank.component.scss",
  imports: [CommonModule, DropDownComponent],
})
export class BankComponent {
  branchList: DropDownMenu[] = [
    { key: "cfr", value: "Cifor" },
    { key: "cld", value: "Cilendek" },
    { key: "ats", value: "Toko Atas" },
  ];

  selectedBranch: DropDownMenu = this.branchList[0];
  branchDestination: DropDownMenu = this.branchList[0];

  onBranchChange(event: DropDownMenu) {
    this.selectedBranch = event;
  }

  onDestinationBranchChange(event: DropDownMenu) {
    this.branchDestination = event;
  }
}
