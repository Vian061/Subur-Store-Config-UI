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
import { MessagesModule } from "primeng/messages";

import { NetworkService } from "../../../services/network.service";
import { ConfirmationService, MessageService } from "primeng/api";
import { PriceModel } from "../../../models/price-model";

@Component({
  selector: "app-price",
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
  ],
  providers: [ConfirmationService, MessageService],
  templateUrl: "./price.component.html",
  styleUrl: "./price.component.scss",
})
export class PriceComponent {
  useCheckbox: boolean = false;
  checkAll: boolean = false;
  buttonDisabled: boolean = false;
  loading: boolean = false;
  pageNumber: number = 1;
  pageSize: number = 50;
  totalRecords: number = 0;
  progressValue: number = 0;

  dataSource: PriceModel[] = [];
  selectedData: PriceModel[] = [];

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
        .get(Constants.UrlEndpoint.priceEndpoint + "/POSData/" + i + "/" + this.pageSize)
        .subscribe({
          next: (response) => {
            for (const data of response) {
              this.dataSource.push(data);
            }

            progress += 1;
            this.updateProgressValue(progress, lastPageNumber);

            console.log("last page :", lastPageNumber);
            console.log("data Source :", this.dataSource.length);
            console.log("total Records :", this.totalRecords);
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
      this.networkService.get(Constants.UrlEndpoint.priceEndpoint + "/POSData/Count").subscribe({
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

      this.networkService.post(Constants.UrlEndpoint.priceEndpoint, batchData).subscribe({
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
            progress += 1;
            this.updateProgressValue(progress, totalBatch);
            this.messageService.add({
              severity: "error",
              summary: "Error " + error.status,
              detail: error.error.detail,
              life: 4000,
            });
            if (i === totalBatch - 1) this.loading = false;
          }, 400);
        },
      });
    }
  }
}

const DATA: PriceModel[] = [
  {
    name: "Sample Price",
    averagePrice: 50.0,
    customPrice: 60.0,
    validFrom: new Date("2023-01-01"),
    validTo: new Date("2023-12-31"),
    proudct: {
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
    isActive: true,
    details: [
      {
        lineNo: 1,
        colNo: 1,
        uoMGroup: {
          code: "UOMGroup001",
          description: "UoM Group 1",
          details: [],
        },
        uoM: {
          code: "UOM001",
          description: "Unit of Measurement 1",
          sortBy: 1,
          isPutExtraFlagInReport: true,
        },
        customerGroup: {
          code: "CustomerGroup001",
          description: "Customer Group 1",
          groupType: 1,
        },
        baseHorizontalPercentageIncrement: 5,
        baseVerticalPercentageIncrement: 10,
        baseVerticalPercentage: 15,
        baseHorizontalPercentage: 20,
        baseQuantity: 100,
        basePrice: 50,
        basePercentage: 25,
      },
    ],
  },
];
