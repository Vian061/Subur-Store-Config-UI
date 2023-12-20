import { Component, ViewChild } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ButtonModule } from "primeng/button";
import { InputSwitchModule } from "primeng/inputswitch";
import { TableModule } from "primeng/table";
import { CardModule } from "primeng/card";
import { DialogModule } from "primeng/dialog";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { ToastModule } from "primeng/toast";
import { FormsModule } from "@angular/forms";
import { Constants } from "../../../constants";

import { NetworkService } from "../../../services/network.service";
import { ConfirmationService, MessageService } from "primeng/api";
import { WarehouseModel } from "../../../models/warehouse-model";
import { WarehouseBinModel } from "../../../models/warehouse-bin-model";
import { InputTextModule } from "primeng/inputtext";

@Component({
  selector: "app-warehouse-bin",
  standalone: true,
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
    InputTextModule,
  ],
  providers: [ConfirmationService, MessageService],
  templateUrl: "./warehouse-bin.component.html",
  styleUrl: "./warehouse-bin.component.scss",
})
export class WarehouseBinComponent {
  useCheckbox: boolean = false;
  checkAll: boolean = false;
  buttonDisabled: boolean = false;
  loading: boolean = false;
  pageNumber: number = 1;
  pageSize: number = 50;

  dataSource: WarehouseBinModel[] = [];
  selectedData: WarehouseBinModel[] = [];
  searchText: string = "";

  constructor(
    private networkService: NetworkService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {
    this.isButtonDisabled();
  }

  onPageChange(event: any) {}

  loadData() {
    this.loading = true;
    this.checkAll = false;
    this.selectedData = [];
    this.networkService.get(Constants.UrlEndpoint.warehouseBinEndpoint + "/POSData").subscribe({
      next: (response) => {
        this.dataSource = response;
        this.isButtonDisabled();
        this.loading = false;
      },
      error: (error) => {
        this.errorHandling(error);
        this.loading = false;
      },
    });
  }

  isButtonDisabled() {
    if (this.dataSource.length <= 0) {
      this.buttonDisabled = true;
    } else {
      if (this.useCheckbox) {
        if (this.selectedData.length <= 0) {
          this.buttonDisabled = true;
        } else {
          this.buttonDisabled = false;
        }
      } else {
        this.buttonDisabled = false;
      }
    }
  }

  selectAllChange() {
    this.isButtonDisabled();
  }

  selectChange() {
    this.isButtonDisabled();
  }

  checkBoxChange() {
    this.isButtonDisabled();
  }

  confirmDialog() {
    var message = "Are you sure want to process All Data?";
    if (this.useCheckbox)
      message = "Are you sure want to process " + this.selectedData.length + " Data?";

    this.confirmationService.confirm({
      dismissableMask: true,
      closeOnEscape: true,
      message: message,
      accept: () => {
        this.submit();
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
    const data = this.useCheckbox ? this.selectedData : this.dataSource;

    this.networkService.post(Constants.UrlEndpoint.warehouseBinEndpoint, data).subscribe({
      next: (response) => {
        this.messageService.add({
          severity: "success",
          summary: "Success",
          detail: response,
          life: 3000,
        });
      },
      error: (error) => {
        this.errorHandling(error);
      },
    });
  }

  private errorHandling(error: any) {
    if (error.error.errors) {
      const errors: string[] = Object.values(error.error.errors);

      errors.forEach((_) => {
        this.messageService.add({
          severity: "error",
          summary: "Error " + error.status,
          detail: _,
          life: 4000,
        });
      });
    } else if (error.error.detail) {
      this.messageService.add({
        severity: "error",
        summary: "Error " + error.status,
        detail: error.error.detail,
        life: 4000,
      });
    } else {
      this.messageService.add({
        severity: "error",
        summary: "Error " + error.status,
        detail: error.error.message,
        life: 4000,
      });
    }
  }
}
