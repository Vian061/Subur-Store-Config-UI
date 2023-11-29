import { Component, EventEmitter, Input, Output } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AreaModel } from "../../models/area-model";
import { TableColumnHeader } from "../../models/ui-models/table-column-header";

@Component({
  selector: "app-table",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./table.component.html",
  styleUrl: "./table.component.scss",
})
export class TableComponent {
  pageSizeList: number[] = [5, 10, 15, 20];
  itemStart: number = 0;
  itemEnd: number = 0;
  pageSize: number = 5;
  isAllChecked: boolean = false;

  @Input() useCheckBox: boolean = false;
  @Input() columnHeaders: TableColumnHeader[] = [];
  @Input() data: any[] = [];
  @Output() onAllChecked: EventEmitter<any> = new EventEmitter<any>();
  @Output() onSingleChecked: EventEmitter<any> = new EventEmitter<any>();

  checkedData: any[] = [];
  displayedData: any[] = [];

  ngOnInit() {
    this.itemEnd = this.pageSize;
    this.displayedData = this.data.slice(this.itemStart, this.pageSize);
  }

  isAllCheckBoxChecked() {
    return this.isAllChecked;
  }

  checkAllCheckBox(event: any) {
    this.isAllChecked = !this.isAllChecked;
    this.onAllChecked.emit(event);
  }
  onSingleCheckedEvent(event: any) {
    this.onSingleChecked.emit(event);
  }

  onPageSizeChange(event: Event) {
    this.pageSize = parseInt((event.target as HTMLSelectElement).value);
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
