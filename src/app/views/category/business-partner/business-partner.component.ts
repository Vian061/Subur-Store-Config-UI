import { AfterViewInit, Component, ViewChild } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BusinessPartnerModel } from "../../../models/business-partner-model";
import { MatPaginator, MatPaginatorModule } from "@angular/material/paginator";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { SelectionModel } from "@angular/cdk/collections";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatSelectModule } from "@angular/material/select";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatButtonModule } from "@angular/material/button";
import { DropDownMenu } from "../../../models/ui-models/drop-down-menu";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "app-business-partner",
  standalone: true,
  templateUrl: "./business-partner.component.html",
  styleUrl: "./business-partner.component.scss",
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatSlideToggleModule,
    FormsModule,
  ],
})
export class BusinessPartnerComponent implements AfterViewInit {
  useCheckbox: boolean = false;
  branchList: DropDownMenu[] = [
    { key: "cfr", value: "Cifor" },
    { key: "cld", value: "Cilendek" },
    { key: "ats", value: "Toko Atas" },
  ];

  selectedBranch?: DropDownMenu;
  branchDestination?: DropDownMenu;

  displayedColumns: string[] = ["code", "name", "balance", "pointReward"];
  dataSource = new MatTableDataSource<BusinessPartnerModel>(ELEMENT_DATA);

  selectedData = new SelectionModel<BusinessPartnerModel>(true, []);

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    if (this.useCheckbox) this.displayedColumns.unshift("select");
  }

  onSlideChange() {
    if (this.useCheckbox) {
      this.displayedColumns.unshift("select");
    } else {
      this.displayedColumns.splice(0, 1);
    }
  }

  isAllSelected() {
    const numSelected = this.selectedData.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected == numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    this.isAllSelected()
      ? this.selectedData.clear()
      : this.dataSource.data.forEach((row) => this.selectedData.select(row));
  }

  toggleRow(event: any, row: any) {
    event ? this.selectedData.toggle(row) : null;
  }
}

const ELEMENT_DATA: BusinessPartnerModel[] = [
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
      groupType: "Type A",
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
  {
    code: "BP002",
    name: "Another Business Partner",
    balance: 7000,
    pointReward: 50,
    pIC: "0987654321",
    phone: "111-222-3333",
    fax: "444-555-6666",
    mobile: "777-777-7777",
    area: {
      code: "A002",
      description: "Another Area",
    },
    adresses: [
      {
        addressName: "Home",
        addressLine1: "789 Elm St",
        addressLine2: "Unit 202",
        addressLine3: "Tower PQR",
        postalCode: "54321",
        city: "New City",
        addressType: "Residential",
      },
      {
        addressName: "Work",
        addressLine1: "321 Office Blvd",
        addressLine2: "Floor 15",
        addressLine3: "Business Center MNO",
        postalCode: "98765",
        city: "Office Town",
        addressType: "Commercial",
      },
    ],
    bPGroup: {
      code: "GRP002",
      description: "Another Group",
      groupType: "Type B",
    },
    creditLimit: 12000,
    isTaxCount: false,
    overallPointReward: 300,
    latitude: 34.0522,
    longitude: -118.2437,
    acuracy: 0.92,
    birthDate: new Date("1985-05-15"), // Sample birth date
    transportType: "Train",
  },
];
