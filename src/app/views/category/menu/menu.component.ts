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
import { DropdownModule } from "primeng/dropdown";
import { Constants } from "../../../constants";

import { NetworkService } from "../../../services/network.service";
import { ConfirmationService, MessageService } from "primeng/api";
import { MenuModel } from "../../../models/menu-model";
import { BranchModel } from "../../../models/branch-model";
import { InputTextModule } from "primeng/inputtext";

@Component({
  selector: "app-menu",
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
  templateUrl: "./menu.component.html",
  styleUrl: "./menu.component.scss",
})
export class MenuComponent {
  useCheckbox: boolean = false;
  checkAll: boolean = false;
  buttonDisabled: boolean = true;
  loading: boolean = false;
  pageNumber: number = 1;
  pageSize: number = 50;

  dataSource: MenuModel[] = [];
  selectedData: MenuModel[] = [];
  branchData: BranchModel[] = [];
  selectedBranch: any;
  searchText: string = "";

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

  onPageChange(event: any) {}

  loadData() {
    this.loading = true;
    this.checkAll = false;
    this.selectedData = [];
    this.networkService.get(Constants.UrlEndpoint.menuEndpoint + "/POSData").subscribe({
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

  branchChange() {
    this.isButtonDisabled();
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

    this.networkService.post(Constants.UrlEndpoint.menuEndpoint, data).subscribe({
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
