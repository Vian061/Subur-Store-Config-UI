import { Component, ViewChild } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DropDownMenu } from "../../../models/ui-models/drop-down-menu";
import { ProudctModel } from "../../../models/product-model";
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
  selector: "app-product",
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
  templateUrl: "./product.component.html",
  styleUrl: "./product.component.scss",
})
export class ProductComponent {
  useCheckbox: boolean = false;
  branchList: DropDownMenu[] = [
    { key: "cfr", value: "Cifor" },
    { key: "cld", value: "Cilendek" },
    { key: "ats", value: "Toko Atas" },
  ];

  selectedBranch?: DropDownMenu;
  branchDestination?: DropDownMenu;

  displayedColumns: string[] = [
    "code",
    "name",
    "basePrice",
    "brand",
    "manufacturer",
    "nominalPoint",
    "isCalculatePrice",
    "isForSalesmanWeb",
    "isForB2C",
    "isPurchaseItem",
    "isInactive",
    "isInOpname",
    "itemGroupModel",
    "uoMGroupModel",
  ];
  dataSource = new MatTableDataSource<ProudctModel>(DATA);
  selectedData = new SelectionModel<ProudctModel>(true, []);

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

const DATA: ProudctModel[] = [
  {
    manufacturer: { description: "Subur" },
    isTaxCount: true,
    brand: "Sample Brand",
    itemGroup1: "Group A",
    itemGroup2: "Group B",
    isInactive: false,
    isInOpname: true,
    barcode2: "123456789",
    barcode3: "987654321",
    barcode4: "555555555",
    nominalPoint: 10,
    isCalculatePrice: true,
    isForSalesmanWeb: true,
    isForB2C: false,
    code: "ITEM001",
    name: "Sample Item",
    barcode: "1234567890",
    isInventoryItem: true,
    isSalesItem: true,
    isPurchaseItem: false,
    basePrice: 50.99,
    itemGroupModel: {
      code: "IG001",
      description: "Electronics",
      nominalPerpoint: 10,
    },
    uoMGroupModel: {
      code: "UOMGroup001",
      description: "UoM Group 1",
      details: [],
    },
    productImageUrl: "https://example.com/image-url.jpg",
  },
];
