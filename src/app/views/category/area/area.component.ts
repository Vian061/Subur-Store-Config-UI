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
import { ConfirmDialogComponent } from "../../../global-component/confirm-dialog/confirm-dialog.component";
import { MatInputModule } from "@angular/material/input";
import { MatDialog } from "@angular/material/dialog";
import { NetworkService } from "../../../services/network.service";
import { Constants } from "../../../constants";

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
    MatInputModule,
  ],
})
export class AreaComponent {
  useCheckbox: boolean = false;
  checkAll: boolean = false;
  buttonDisabled: boolean = false;

  displayedColumns: string[] = ["code", "description"];
  dataSource = new MatTableDataSource<AreaModel>([]);
  selectedData = new SelectionModel<AreaModel>(true, []);

  constructor(public dialog: MatDialog, private networkService: NetworkService) {}
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  loadData() {
    this.checkAll = false;
    this.selectedData.clear();
    this.networkService.get(Constants.UrlEndpoint.areaEndpoint + "/POSData").subscribe({
      next: (response) => {
        console.log(response);
        this.dataSource = new MatTableDataSource<AreaModel>(response);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    if (this.useCheckbox) this.displayedColumns.unshift("select");
  }

  onSlideChange() {
    if (this.useCheckbox) {
      if (!this.selectedData.hasValue()) {
        this.buttonDisabled = true;
      }
      this.displayedColumns.unshift("select");
    } else {
      this.buttonDisabled = false;
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
    if (this.isAllSelected()) {
      this.buttonDisabled = true;
      this.selectedData.clear();
    } else {
      this.buttonDisabled = false;
      this.dataSource.data.forEach((row) => this.selectedData.select(row));
    }
  }

  toggleRow(event: any, row: any) {
    event ? this.selectedData.toggle(row) : null;
    this.selectedData.selected.length > 0
      ? (this.buttonDisabled = false)
      : (this.buttonDisabled = true);
  }

  confirmDialog() {
    var confirmText = "Are you sure want to save all data?";
    if (this.useCheckbox) {
      confirmText = "Are you sure want to save selected data?";
    }

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: confirmText,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log("The dialog was closed with result:", result);
      if (result) this.submit();
    });
  }

  submit() {
    /// if useCheckBox post selectedData otherwise post dataSource
    if (this.useCheckbox) {
      this.networkService.post(Constants.UrlEndpoint.areaEndpoint, this.selectedData);
    }
    {
      this.networkService.post(Constants.UrlEndpoint.areaEndpoint, this.dataSource);
    }
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
