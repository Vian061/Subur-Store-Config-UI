import { Component, ViewChild } from "@angular/core";
import { CommonModule } from "@angular/common";
import { JournalAccountModel } from "../../../models/journal-account-model";
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

@Component({
  selector: "app-journal-account",
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
  templateUrl: "./journal-account.component.html",
  styleUrl: "./journal-account.component.scss",
})
export class JournalAccountComponent {
  useCheckbox: boolean = false;
  checkAll: boolean = false;
  buttonDisabled: boolean = false;
  loading: boolean = false;
  pageNumber: number = 1;
  pageSize: number = 50;

  dataSource: JournalAccountModel[] = [];
  selectedData: JournalAccountModel[] = [];

  constructor(
    private networkService: NetworkService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {
    this.isButtonDisabled();
  }

  onPageChange(event: any) {
    console.log(event);
  }

  loadData() {
    this.loading = true;
    this.checkAll = false;
    this.selectedData = [];
    this.networkService.get(Constants.UrlEndpoint.journalAccountEndpoint + "/POSData").subscribe({
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
        .post(Constants.UrlEndpoint.journalAccountEndpoint, this.selectedData)
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
        .post(Constants.UrlEndpoint.journalAccountEndpoint, this.dataSource)
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

const DATA: JournalAccountModel[] = [
  {
    accountCode: "AC001",
    accountName: "Savings Account",
    branch: {
      code: "001",
      description: "Branch 1",
      latitude: 123.456,
      longitude: 789.012,
      accuracy: 0.95,
      imageUrl:
        "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      nominalPerPointRokok: 10,
      nominalPerPointRokokCredit: 8,
      multiplyPointFullPaymentRokok: 2,
      nominalPerPointNonRokok: 5,
      nominalPerPointNonRokokCredit: 4,
      multiplyPointFullPaymentNonRokok: 3,
      minimalAmountNonRokokForNotification: 20,
    },
  },
];
