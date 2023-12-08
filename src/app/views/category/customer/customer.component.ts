import { Component, ViewChild } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatPaginator, MatPaginatorModule } from "@angular/material/paginator";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { SelectionModel } from "@angular/cdk/collections";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatSelectModule } from "@angular/material/select";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatButtonModule } from "@angular/material/button";
import { DropDownMenu } from "../../../models/ui-models/drop-down-menu";
import { CustomerModel } from "../../../models/customer-model";

@Component({
  selector: "app-customer",
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
  ],
  templateUrl: "./customer.component.html",
  styleUrl: "./customer.component.scss",
})
export class CustomerComponent {
  branchList: DropDownMenu[] = [
    { key: "cfr", value: "Cifor" },
    { key: "cld", value: "Cilendek" },
    { key: "ats", value: "Toko Atas" },
  ];

  selectedBranch: DropDownMenu = this.branchList[0];
  branchDestination: DropDownMenu = this.branchList[0];

  displayedColumns: string[] = [
    "code",
    "description",
    "groupType",
    // "emailAddress",
    "outstandingBills",
    // "paymentDays",
    "limitType",
    "nIK",
    // "displayMembership",
    "membershipBarCode",
    // "deliveryDays",
    "feesRokok",
    "feesNonRokok",
    "salesmanNIK",
  ];
  dataSource = new MatTableDataSource<CustomerModel>(DATA);
  selectedData = new SelectionModel<CustomerModel>(true, []);

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
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

const DATA: CustomerModel[] = [
  {
    code: "C001",
    description: "Regular Customer",
    groupType: "Retail",
    salt: "SALT123",
    pIN: "1234",
    emailAddress: "customer@example.com",
    outstandingBills: 200,
    paymentDays: "30",
    limitType: "Standard",
    nIK: "NIK123",
    displayMembership: "Gold",
    membershipBarCode: "MB123",
    deliveryDays: "Mon, Wed, Fri",
    feesRokok: 5,
    feesNonRokok: 10,
    salesmanNIK: "SALENIK001",
  },
];
