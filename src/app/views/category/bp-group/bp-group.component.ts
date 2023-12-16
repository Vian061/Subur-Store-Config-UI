import { Component } from "@angular/core";
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
import { BusinessPartnerGroupModel } from "../../../models/business-partner-group-model";

@Component({
  selector: "app-bp-group",
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
  ],
  providers: [ConfirmationService, MessageService],
  templateUrl: "./bp-group.component.html",
  styleUrl: "./bp-group.component.scss",
})
export class BpGroupComponent {
  useCheckbox: boolean = false;
  checkAll: boolean = false;
  buttonDisabled: boolean = false;
  loading: boolean = false;

  dataSource: BusinessPartnerGroupModel[] = [];
  selectedData: BusinessPartnerGroupModel[] = [];

  constructor(
    private networkService: NetworkService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {
    this.isButtonDisabled();
  }

  loadData() {
    this.loading = true;
    this.checkAll = false;
    this.selectedData = [];
    this.networkService
      .get(Constants.UrlEndpoint.businessPartnerGroupEndpoint + "/POSData")
      .subscribe({
        next: (response) => {
          this.dataSource = response;
          this.isButtonDisabled();
          this.loading = false;
        },
        error: (error) => {
          this.messageService.add({
            severity: "error",
            summary: "Error " + error.status,
            detail: error.statusText,
            life: 4000,
          });
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
    /// if useCheckBox post selectedData otherwise post dataSource
    if (this.useCheckbox) {
      this.networkService
        .post(Constants.UrlEndpoint.businessPartnerGroupEndpoint, this.selectedData)
        .subscribe({
          next: (response) => {
            this.messageService.add({
              severity: "success",
              summary: "Success",
              detail: "Submit Success",
              life: 3000,
            });
          },
          error: (error) => {
            this.messageService.add({
              severity: "error",
              summary: "Error " + error.status,
              detail: error.statusText,
              life: 4000,
            });
          },
        });
    }
    {
      this.networkService
        .post(Constants.UrlEndpoint.businessPartnerGroupEndpoint, this.dataSource)
        .subscribe({
          next: (response) => {
            this.messageService.add({
              severity: "success",
              summary: "Success",
              detail: "Submit Success",
              life: 3000,
            });
          },
          error: (error) => {
            this.messageService.add({
              severity: "error",
              summary: "Error " + error.status,
              detail: error.statusText,
              life: 4000,
            });
          },
        });
    }
  }
}
