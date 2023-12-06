import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ProudctModel } from "../../../models/product-model";
import { TableComponent } from "../../../global-component/table/table.component";
import { AreaModel } from "../../../models/area-model";
import { TableColumnHeader } from "../../../models/ui-models/table-column-header";
import { DropDownComponent } from "../../../global-component/drop-down/drop-down.component";
import { DropDownMenu } from "../../../models/ui-models/drop-down-menu";

@Component({
  selector: "app-area",
  standalone: true,
  templateUrl: "./area.component.html",
  styleUrl: "./area.component.scss",
  imports: [CommonModule, TableComponent, DropDownComponent],
})
export class AreaComponent {
  columnHeaders: string[] = ["code", "description"];
  column: TableColumnHeader[] = [
    { title: "code", width: "100px" },
    { title: "description", width: "max-content" },
  ];
  data: AreaModel[] = [
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
  selectedData: AreaModel[] = [];

  branchList: DropDownMenu[] = [
    { key: "cfr", value: "Cifor" },
    { key: "cld", value: "Cilendek" },
    { key: "ats", value: "Toko Atas" },
  ];

  selectedBranch: DropDownMenu = this.branchList[0];
  branchDestination: DropDownMenu = this.branchList[0];

  onCheckedChange(value: AreaModel) {
    // console.log(value);
  }
  onBranchChange(event: DropDownMenu) {
    this.selectedBranch = event;
  }

  onDestinationBranchChange(event: DropDownMenu) {
    this.branchDestination = event;
  }
}
