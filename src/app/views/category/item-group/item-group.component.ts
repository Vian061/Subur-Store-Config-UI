import { Component, ViewChild } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DropDownMenu } from "../../../models/ui-models/drop-down-menu";
import { ItemGroupModel } from "../../../models/ItemGroupModel";
import { MatPaginator, MatPaginatorModule } from "@angular/material/paginator";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { SelectionModel } from "@angular/cdk/collections";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatSelectModule } from "@angular/material/select";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatButtonModule } from "@angular/material/button";
@Component({
  selector: "app-item-group",
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
  templateUrl: "./item-group.component.html",
  styleUrl: "./item-group.component.scss",
})
export class ItemGroupComponent {
  branchList: DropDownMenu[] = [
    { key: "cfr", value: "Cifor" },
    { key: "cld", value: "Cilendek" },
    { key: "ats", value: "Toko Atas" },
  ];

  selectedBranch: DropDownMenu = this.branchList[0];
  branchDestination: DropDownMenu = this.branchList[0];

  displayedColumns: string[] = ["code", "description", "nominalPerpoint"];
  dataSource = new MatTableDataSource<ItemGroupModel>(DATA);
  selectedData = new SelectionModel<ItemGroupModel>(true, []);

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

const DATA: ItemGroupModel[] = [
  {
    code: "IG001",
    description: "Electronics",
    nominalPerpoint: 10,
  },
  {
    code: "IG002",
    description: "Clothing",
    nominalPerpoint: 8,
  },
  {
    code: "IG003",
    description: "Books",
    nominalPerpoint: 5,
  },
];
