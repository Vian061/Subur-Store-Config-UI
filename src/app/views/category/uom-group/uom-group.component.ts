import { Component, ViewChild } from "@angular/core";
import { CommonModule } from "@angular/common";
import { UoMGroupModel } from "../../../models/uom-group-model";
import { DropDownMenu } from "../../../models/ui-models/drop-down-menu";
import { MatPaginator, MatPaginatorModule } from "@angular/material/paginator";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { SelectionModel } from "@angular/cdk/collections";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatSelectModule } from "@angular/material/select";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatButtonModule } from "@angular/material/button";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "app-uom-group",
  standalone: true,
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
  templateUrl: "./uom-group.component.html",
  styleUrl: "./uom-group.component.scss",
})
export class UomGroupComponent {
  useCheckbox: boolean = false;
  branchList: DropDownMenu[] = [
    { key: "cfr", value: "Cifor" },
    { key: "cld", value: "Cilendek" },
    { key: "ats", value: "Toko Atas" },
  ];

  selectedBranch?: DropDownMenu;
  branchDestination?: DropDownMenu;

  displayedColumns: string[] = ["code", "description", "details"];
  dataSource = new MatTableDataSource<UoMGroupModel>(DATA);
  selectedData = new SelectionModel<UoMGroupModel>(true, []);

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

const DATA: UoMGroupModel[] = [
  {
    code: "ABC",
    description: "Example UoM Group",
    details: [
      {
        alternateUoMModel: {
          code: "UOM002",
          description: "Sample Unit of Measure 2",
          sortBy: 2,
          isPutExtraFlagInReport: true,
        },
        alternateQuantity: 5,
        baseUoMModel: {
          code: "UOM001",
          description: "Sample Unit of Measure 1",
          sortBy: 1,
          isPutExtraFlagInReport: true,
        },
        baseQuantity: 1,
        uoMPackage: "Example Package",
      },
    ],
  },
];
