import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DropDownMenu } from "../../../models/ui-models/drop-down-menu";
import { DropDownComponent } from "../../../global-component/drop-down/drop-down.component";
import { TableColumnHeader } from "../../../models/ui-models/table-column-header";
import { BankModel } from "../../../models/bank-model";
import { TableComponent } from "../../../global-component/table/table.component";

@Component({
  selector: "app-bank",
  standalone: true,
  templateUrl: "./bank.component.html",
  styleUrl: "./bank.component.scss",
  imports: [CommonModule, DropDownComponent, TableComponent],
})
export class BankComponent {
  branchList: DropDownMenu[] = [
    { key: "cfr", value: "Cifor" },
    { key: "cld", value: "Cilendek" },
    { key: "ats", value: "Toko Atas" },
  ];

  selectedBranch: DropDownMenu = this.branchList[0];
  branchDestination: DropDownMenu = this.branchList[0];

  column: TableColumnHeader[] = [
    { title: "Account Name", property: "accountName", width: "max-content" },
    { title: "Account No", property: "accountNo", width: "max-content" },
    { title: "Journal Account Code", property: "journalAccountCode", width: "max-content" },
    { title: "Journal Account Name", property: "accountNo", width: "max-content" },
    { title: "Bank Name", property: "bankName", width: "max-content" },
    { title: "Bank Image", property: "imageUrl", type: "img", width: "max-content" },
  ];

  data: BankModel[] = [
    {
      accountName: "A-0001",
      accountNo: "0001",
      bankName: "BCA",
      imageData: "",
      imageName: "",
      imageUrl:
        "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      journalAccountCode: "J-0001",
      journalAccountName: "Someone",
    },
    {
      accountName: "A-0001",
      accountNo: "0001",
      bankName: "BCA",
      imageData: "",
      imageName: "",
      imageUrl:
        "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      journalAccountCode: "J-0001",
      journalAccountName: "Someone",
    },
  ];
  selectedData: BankModel[] = [];

  onBranchChange(event: DropDownMenu) {
    this.selectedBranch = event;
  }

  onDestinationBranchChange(event: DropDownMenu) {
    this.branchDestination = event;
  }

  onCheckedChange(value: BankModel) {
    // console.log(value);
  }
}
