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
import { CustomerModel } from "../../../models/customer-model";

@Component({
  selector: "app-customer",
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
  templateUrl: "./customer.component.html",
  styleUrl: "./customer.component.scss",
})
export class CustomerComponent {
  useCheckbox: boolean = false;
  checkAll: boolean = false;
  buttonDisabled: boolean = false;
  loading: boolean = false;
  pageNumber: number = 1;
  pageSize: number = 50;
  totalRecords: number = 0;

  dataSource: CustomerModel[] = [];
  selectedData: CustomerModel[] = [];

  constructor(
    private networkService: NetworkService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {
    this.isButtonDisabled();
  }

  loadButtonEvent() {
    this.selectedData = [];
    this.checkAll = false;
    this.loadData();
  }

  onPageSizeChange(event: any) {
    this.pageNumber = Math.floor(event.first / event.rows) + 1;
    this.pageSize = event.rows;
  }

  onLazyLoad(event: any) {
    console.log(event);
    this.pageNumber = Math.floor(event.first / event.rows) + 1;

    this.loadData();
  }

  loadData() {
    setTimeout(() => {
      this.loading = true;
      this.networkService
        .get(
          Constants.UrlEndpoint.customerEndpoint +
            "/POSData/" +
            this.pageNumber +
            "/" +
            this.pageSize
        )
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
      this.networkService.get(Constants.UrlEndpoint.customerEndpoint + "/POSData/Count").subscribe({
        next: (response) => {
          this.totalRecords = response;
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
    }, 0.1);
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

  selectAllChange(event: any) {
    const checked = event.checked;

    if (checked) {
      this.selectedData = this.dataSource;
      this.checkAll = true;
    } else {
      this.selectedData = [];
      this.checkAll = false;
    }
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
        .post(Constants.UrlEndpoint.customerEndpoint, this.selectedData)
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
      this.networkService.post(Constants.UrlEndpoint.customerEndpoint, this.dataSource).subscribe({
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
