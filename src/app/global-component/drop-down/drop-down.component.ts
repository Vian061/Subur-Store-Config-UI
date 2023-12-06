import { Component, EventEmitter, Input, Output } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DropDownMenu } from "../../models/ui-models/drop-down-menu";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "app-drop-down",
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: "./drop-down.component.html",
  styleUrl: "./drop-down.component.scss",
})
export class DropDownComponent {
  @Input() dropDownList: DropDownMenu[] = [{ key: "key", value: "value" }];
  private _selectedValue: any;
  @Output() selectedValueChange: EventEmitter<DropDownMenu> = new EventEmitter<DropDownMenu>();
  @Input()
  get selectedValue(): any {
    return this._selectedValue;
  }
  set selectedValue(event: DropDownMenu) {
    this._selectedValue = event;
    this.selectedValueChange.emit(this._selectedValue);
  }

  ngOnInit() {
    this.selectedValue = this.dropDownList[0];
  }
}
