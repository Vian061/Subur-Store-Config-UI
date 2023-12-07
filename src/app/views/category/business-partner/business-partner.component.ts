import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DropDownComponent } from "../../../global-component/drop-down/drop-down.component";
import { TableComponent } from "../../../global-component/table/table.component";
import { BusinessPartnerModel } from "../../../models/business-partner-model";
import { DropDownMenu } from "../../../models/ui-models/drop-down-menu";
import { TableColumnHeader } from "../../../models/ui-models/table-column-header";

@Component({
  selector: "app-business-partner",
  standalone: true,
  templateUrl: "./business-partner.component.html",
  styleUrl: "./business-partner.component.scss",
  imports: [CommonModule, DropDownComponent, TableComponent],
})
export class BusinessPartnerComponent {
  branchList: DropDownMenu[] = [
    { key: "cfr", value: "Cifor" },
    { key: "cld", value: "Cilendek" },
    { key: "ats", value: "Toko Atas" },
  ];

  selectedBranch: DropDownMenu = this.branchList[0];
  branchDestination: DropDownMenu = this.branchList[0];

  column: TableColumnHeader[] = [
    { title: "Code", property: "code", width: "70px" },
    { title: "Name", property: "name", width: "70px" },
    { title: "Balance", property: "balance", width: "70px" },
    { title: "Point Reward", property: "pointReward", width: "70px" },
    { title: "PIC", property: "pIC", width: "70px" },
    { title: "Area", property: "area", width: "70px" },
  ];

  data: BusinessPartnerModel[] = [
    {
      code: "BP001",
      name: "Sample Business Partner 1",
      balance: 5000,
      pointReward: 100,
      pIC: "1234567890",
      phone: "123-456-7890",
      fax: "987-654-3210",
      mobile: "999-999-9999",
      area: {
        code: "A001",
        description: "Sample Area",
      },
      adresses: [
        {
          addressName: "Home",
          addressLine1: "123 Main St",
          addressLine2: "Apt 101",
          addressLine3: "Building XYZ",
          postalCode: "12345",
          city: "Sample City",
          addressType: "Residential",
        },
        {
          addressName: "Work",
          addressLine1: "456 Business Ave",
          addressLine2: "Suite 201",
          addressLine3: "Office Tower ABC",
          postalCode: "67890",
          city: "Work City",
          addressType: "Commercial",
        },
      ],
      bPGroup: {
        code: "GRP001",
        description: "Sample Group",
        groupTyper: "Type A",
      },
      creditLimit: 10000,
      isTaxCount: true,
      overallPointReward: 500,
      latitude: 40.7128,
      longitude: -74.006,
      acuracy: 0.95,
      birthDate: new Date("1990-01-01"), // Sample birth date
      transportType: "Car",
    },
  ];
  selectedData: BusinessPartnerModel[] = [];

  onBranchChange(event: DropDownMenu) {
    this.selectedBranch = event;
  }

  onDestinationBranchChange(event: DropDownMenu) {
    this.branchDestination = event;
  }

  onCheckedChange(value: BusinessPartnerModel) {
    // console.log(value);
  }
}
