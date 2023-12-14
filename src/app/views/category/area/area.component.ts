import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AreaModel } from "../../../models/area-model";
import { FormsModule } from "@angular/forms";
import { Constants } from "../../../constants";
import { ButtonModule } from "primeng/button";
import { InputSwitchModule } from "primeng/inputswitch";
import { TableModule } from "primeng/table";
import { CardModule } from "primeng/card";
import { DialogModule } from "primeng/dialog";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { ToastModule } from "primeng/toast";

import { NetworkService } from "../../../services/network.service";
import { ConfirmationService, MessageService } from "primeng/api";

@Component({
  selector: "app-area",
  standalone: true,
  templateUrl: "./area.component.html",
  styleUrl: "./area.component.scss",
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    InputSwitchModule,
    TableModule,
    CardModule,
    ConfirmDialogModule,
    DialogModule,
    ToastModule,
  ],
  providers: [ConfirmationService, MessageService],
})
export class AreaComponent {
  useCheckbox: boolean = false;
  checkAll: boolean = false;
  buttonDisabled: boolean = false;

  displayedColumns: string[] = ["code", "description"];
  dataSource: AreaModel[] = [];
  selectedData: AreaModel[] = [];

  constructor(
    // public dialog: MatDialog,
    private networkService: NetworkService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  loadData() {
    this.checkAll = false;
    this.selectedData = [];
    this.networkService.get(Constants.UrlEndpoint.areaEndpoint + "/POSData").subscribe({
      next: (response) => {
        this.dataSource = response;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  selectAllChange() {
    console.log(this.selectedData);
  }

  selectChange() {}

  confirmDialog() {
    var message = "Are you sure want to proceed All Data?";
    if (this.useCheckbox)
      message = "Are you sure want to proceed " + this.selectedData.length + " Data?";

    this.confirmationService.confirm({
      dismissableMask: true,
      closeOnEscape: true,
      message: message,
      accept: () => {
        this.messageService.add({
          severity: "info",
          summary: "Confirmed",
          detail: "You have accepted",
          life: 3000,
        });
      },
      reject: () => {
        this.messageService.add({
          severity: "error",
          summary: "Rejected",
          detail: "You have rejected",
          life: 3000,
        });
      },
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
