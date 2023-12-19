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
import { ProgressBarModule } from "primeng/progressbar";
import { ProgressSpinnerModule } from "primeng/progressspinner";

import { NetworkService } from "../../../services/network.service";
import { ConfirmationService, MessageService } from "primeng/api";
import { UoMGroupModel } from "../../../models/uom-group-model";
import { InputTextModule } from "primeng/inputtext";

@Component({
  selector: "app-uom-group",
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
    ProgressBarModule,
    ProgressSpinnerModule,
    InputTextModule,
  ],
  providers: [ConfirmationService, MessageService],
  templateUrl: "./uom-group.component.html",
  styleUrl: "./uom-group.component.scss",
})
export class UomGroupComponent {
  useCheckbox: boolean = false;
  checkAll: boolean = false;
  buttonDisabled: boolean = false;
  loading: boolean = false;
  pageNumber: number = 1;
  pageSize: number = 50;
  totalRecords: number = 0;
  progressValue: number = 0;

  dataSource: UoMGroupModel[] = [];
  selectedData: UoMGroupModel[] = [];
  searchText: string = "";

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
    this.dataSource = [];

    this.loading = true;
    this.countData().then((result) => {
      if (result) {
        this.loadData();
      }
    });
  }

  onPageSizeChange(event: any) {
    this.pageNumber = Math.floor(event.first / event.rows) + 1;
    this.pageSize = event.rows;
  }

  loadData() {
    var progress = 0;
    const lastPageNumber = Math.ceil(this.totalRecords / this.pageSize);
    for (let i = this.pageNumber; i <= lastPageNumber; i++) {
      this.networkService
        .get(Constants.UrlEndpoint.uomGroupEndpoint + "/POSData/" + i + "/" + this.pageSize)
        .subscribe({
          next: (response) => {
            for (const data of response) {
              this.dataSource.push(data);
            }

            progress += 1;
            this.updateProgressValue(progress, lastPageNumber);

            if (this.dataSource.length === this.totalRecords) {
              this.loading = false;
              this.isButtonDisabled();
              this.progressValue = 0;
            }
          },
          error: (error) => {
            progress += 1;
            this.updateProgressValue(progress, lastPageNumber);
            if (this.dataSource.length === this.totalRecords) {
              this.loading = false;
              this.isButtonDisabled();
              this.progressValue = 0;
            }
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

  updateProgressValue(currentPage: number, lastPageNumber: number): void {
    const progress = (currentPage / lastPageNumber) * 100;
    this.progressValue = parseFloat(progress.toFixed(2));
  }

  private countData(): Promise<boolean> {
    return new Promise((resolve) => {
      this.networkService.get(Constants.UrlEndpoint.uomGroupEndpoint + "/POSData/Count").subscribe({
        next: (response) => {
          this.totalRecords = response;
          resolve(true);
        },
        error: (error) => {
          this.messageService.add({
            severity: "error",
            summary: "Error " + error.status,
            detail: error.statusText,
            life: 4000,
          });
          resolve(false);
        },
      });
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
        this.loading = true;
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

  async submit() {
    var progress = -1;
    const batchSize = 100;
    const data = this.useCheckbox ? this.selectedData : this.dataSource;
    const totalBatch = Math.ceil(data.length / batchSize);

    for (let i = 0; i < totalBatch; i++) {
      const batchData = data.slice(i * batchSize, (i + 1) * batchSize);

      this.networkService.post(Constants.UrlEndpoint.uomGroupEndpoint, batchData).subscribe({
        next: (response) => {
          setTimeout(async () => {
            progress += 1;
            this.updateProgressValue(progress, totalBatch);
            if (i === totalBatch - 1) {
              this.messageService.add({
                severity: "success",
                summary: "Success",
                detail: "Submit Success",
                life: 3000,
              });
              if (i === totalBatch - 1) this.loading = false;
            }
          }, 100);
        },
        error: (error) => {
          setTimeout(async () => {
            console.log(batchData);
            console.log(error);
            progress += 1;
            this.updateProgressValue(progress, totalBatch);
            this.messageService.add({
              severity: "error",
              summary: "Error " + error.status,
              detail: error.error.detail,
              life: 4000,
            });
            if (i === totalBatch - 1) this.loading = false;
          }, 100);
        },
      });
    }
  }
}

const DATA: UoMGroupModel[] = [
  {
    code: "ABC",
    description: "Example UoM Group",
    details: [
      {
        alternateUoMModel: {
          code: "UOM002",
          description: "Sample Unit of Measure 2",
          sortBy: 2,
          isPutExtraFlagInReport: true,
        },
        alternateQuantity: 5,
        baseUoMModel: {
          code: "UOM001",
          description: "Sample Unit of Measure 1",
          sortBy: 1,
          isPutExtraFlagInReport: true,
        },
        baseQuantity: 1,
        uoMPackage: "Example Package",
      },
    ],
  },
];
