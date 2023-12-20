import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Constants } from "../../../constants";
import { ButtonModule } from "primeng/button";
import { InputSwitchModule } from "primeng/inputswitch";
import { TableModule } from "primeng/table";
import { CardModule } from "primeng/card";
import { DialogModule } from "primeng/dialog";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { ToastModule } from "primeng/toast";
import { InputTextModule } from "primeng/inputtext";

import { NetworkService } from "../../../services/network.service";
import { ConfirmationService, MessageService } from "primeng/api";
import { POSConfigurationModel } from "../../../models/pos-configuration-model";
import { BranchModel } from "../../../models/branch-model";
import { DropdownModule } from "primeng/dropdown";

@Component({
  selector: "app-pos-configuration",
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
    DropdownModule,
    InputTextModule,
  ],
  providers: [ConfirmationService, MessageService],
  templateUrl: "./pos-configuration.component.html",
  styleUrl: "./pos-configuration.component.scss",
})
export class PosConfigurationComponent {
  useCheckbox: boolean = false;
  checkAll: boolean = false;
  buttonDisabled: boolean = false;
  loading: boolean = false;

  dataSource: POSConfigurationModel[] = [];
  selectedData: POSConfigurationModel[] = [];
  searchText: string = "";

  branchData: BranchModel[] = [];
  selectedBranch: any;

  constructor(
    private networkService: NetworkService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {
    this.isButtonDisabled();
    this.networkService.get(Constants.UrlEndpoint.branchesEndpoint).subscribe({
      next: (response) => {
        this.branchData = response;
      },
    });
  }

  branchChange() {
    this.isButtonDisabled();
  }

  loadData() {
    this.loading = true;
    this.checkAll = false;
    this.selectedData = [];
    this.networkService.get(Constants.UrlEndpoint.posConfigEndpoint + "/POSData").subscribe({
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
    if (this.dataSource.length <= 0 || this.selectedBranch == null) {
      this.buttonDisabled = true;
    } else {
      if (this.useCheckbox) {
        if (this.selectedData.length <= 0 || this.selectedBranch == null) {
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
    data.forEach((_) => (_.branch = this.selectedBranch));

    this.networkService.post(Constants.UrlEndpoint.posConfigEndpoint, data).subscribe({
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
