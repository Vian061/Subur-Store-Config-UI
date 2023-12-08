import { Component, ViewChild } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AreaModel } from "../../../models/area-model";
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
  selector: "app-area",
  standalone: true,
  templateUrl: "./area.component.html",
  styleUrl: "./area.component.scss",
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
export class AreaComponent {
  useCheckbox: boolean = false;
  branchList: DropDownMenu[] = [
    { key: "cfr", value: "Cifor" },
    { key: "cld", value: "Cilendek" },
    { key: "ats", value: "Toko Atas" },
  ];

  selectedBranch?: DropDownMenu;
  branchDestination?: DropDownMenu;

  displayedColumns: string[] = ["code", "description"];
  dataSource = new MatTableDataSource<AreaModel>(DATA);
  selectedData = new SelectionModel<AreaModel>(true, []);

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

const DATA: AreaModel[] = [
  { code: "bgr", description: "Bogor" },
  { code: "dpk", description: "Depok" },
  { code: "jkt", description: "Jakarta" },
  { code: "bdg", description: "Bandung" },
  { code: "smg", description: "Semarang" },
  { code: "ptk", description: "Pontianak" },
  { code: "mlg", description: "Malang" },
  { code: "bwi", description: "Bali" },
  { code: "jmb", description: "Jambi" },
];
