import { Component, EventEmitter, Input, Output } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TableColumnHeader } from "../../models/ui-models/table-column-header";
import _isEqual from "lodash/isEqual";
import { DropDownComponent } from "../drop-down/drop-down.component";
import { DropDownMenu } from "../../models/ui-models/drop-down-menu";

@Component({
  selector: "app-table",
  standalone: true,
  templateUrl: "./table.component.html",
  styleUrl: "./table.component.scss",
  imports: [CommonModule, DropDownComponent],
})
export class TableComponent {
  pageSizeList: DropDownMenu[] = [
    { key: "5", value: "5" },
    { key: "10", value: "10" },
    { key: "15", value: "15" },
  ];
  itemStart: number = 0;
  itemEnd: number = 0;
  pageSize: number = 5;
  isAllChecked: boolean = false;

  @Input() useCheckBox: boolean = false;
  @Input() columnHeaders: TableColumnHeader[] = [];
  @Input() data: any[] = [];
  @Output() onAllChecked: EventEmitter<any> = new EventEmitter<any>();
  @Output() onSingleChecked: EventEmitter<any> = new EventEmitter<any>();

  displayedData: any[] = [];

  private _selectedData: any[] = [];
  @Output() selectedDataChange: EventEmitter<any[]> = new EventEmitter<any>();
  @Input()
  get selectedData(): any[] {
    return this._selectedData;
  }
  set selectedData(value: any[]) {
    this._selectedData = value;
    this.selectedDataChange.emit(this._selectedData);
  }

  ngOnInit() {
    this.itemEnd = this.pageSize;
    this.displayedData = this.data.slice(this.itemStart, this.pageSize);
  }

  isAllCheckBoxChecked() {
    return this.isAllChecked;
  }

  checkAllCheckBox(event: any) {
    this.isAllChecked = !this.isAllChecked;

    if (this.isAllChecked) {
      this.data.forEach((item) => {
        var response = this._selectedData.some((_) => _isEqual(_, item));
        if (!response) this._selectedData.push(item);
      });
    } else {
      this._selectedData = [];
    }

    this.onAllChecked.emit(event);
  }

  isSingleChecked(event: any) {
    return this._selectedData.some((_) => _isEqual(_, event));
  }

  onSingleCheckedEvent(event: any) {
    var response = this._selectedData.some((_) => _isEqual(_, event));
    if (response) {
      this._selectedData.splice(event, 1);
    } else {
      this._selectedData.push(event);
    }

    this.onSingleChecked.emit(event);
  }

  onPageSizeChange(event: DropDownMenu) {
    this.pageSize = parseInt(event.value);
    this.itemStart = 0;
    this.itemEnd = this.pageSize;
    this.displayedData = this.data.slice(0, this.pageSize);
  }
  nextPage() {
    this.itemStart = this.itemStart + this.pageSize;
    this.itemEnd = this.itemEnd + this.pageSize;
    this.displayedData = this.data.slice(this.itemStart, this.itemEnd);
  }
  perviousPage() {
    this.itemStart = this.itemStart - this.pageSize;
    this.itemEnd = this.itemEnd - this.pageSize;
    this.displayedData = this.data.slice(this.itemStart, this.itemEnd);
  }
}
