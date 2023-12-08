import { Component, ViewChild } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BranchModel } from "../../../models/branch-model";
import { DropDownComponent } from "../../../global-component/drop-down/drop-down.component";
import { DropDownMenu } from "../../../models/ui-models/drop-down-menu";
import { TableComponent } from "../../../global-component/table/table.component";
import { TableColumnHeader } from "../../../models/ui-models/table-column-header";
import { SelectionModel } from "@angular/cdk/collections";
import { MatPaginator, MatPaginatorModule } from "@angular/material/paginator";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatSelectModule } from "@angular/material/select";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatButtonModule } from "@angular/material/button";

@Component({
  selector: "app-branch",
  standalone: true,
  templateUrl: "./branch.component.html",
  styleUrl: "./branch.component.scss",
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
  ],
})
export class BranchComponent {
  branchList: DropDownMenu[] = [
    { key: "cfr", value: "Cifor" },
    { key: "cld", value: "Cilendek" },
    { key: "ats", value: "Toko Atas" },
  ];

  selectedBranch: DropDownMenu = this.branchList[0];
  branchDestination: DropDownMenu = this.branchList[0];

  displayedColumns: string[] = [
    "select",
    "code",
    "description",
    "latitude",
    "longitude",
    "accuracy",
    "nominalPerPointRokok",
    "nominalPerPointRokokCredit",
    "multiplyPointFullPaymentRokok",
    "nominalPerPointNonRokok",
    "nominalPerPointNonRokokCredit",
    "multiplyPointFullPaymentNonRokok",
    "minimalAmountNonRokokForNotification",
  ];
  dataSource = new MatTableDataSource<BranchModel>(DATA);
  selectedData = new SelectionModel<BranchModel>(true, []);

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

const DATA: BranchModel[] = [
  {
    code: "001",
    description: "Branch 1",
    latitude: 123.456,
    longitude: 789.012,
    accuracy: 0.95,
    imageUrl:
      "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    nominalPerPointRokok: 10,
    nominalPerPointRokokCredit: 8,
    multiplyPointFullPaymentRokok: 2,
    nominalPerPointNonRokok: 5,
    nominalPerPointNonRokokCredit: 4,
    multiplyPointFullPaymentNonRokok: 3,
    minimalAmountNonRokokForNotification: 20,
  },
  {
    code: "002",
    description: "Branch 2",
    latitude: 234.567,
    longitude: 890.123,
    accuracy: 0.92,
    imageUrl:
      "https://images.unsplash.com/photo-1701890739231-6c00f071a706?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    nominalPerPointRokok: 12,
    nominalPerPointRokokCredit: 9,
    multiplyPointFullPaymentRokok: 3,
    nominalPerPointNonRokok: 6,
    nominalPerPointNonRokokCredit: 5,
    multiplyPointFullPaymentNonRokok: 4,
    minimalAmountNonRokokForNotification: 25,
  },
];
