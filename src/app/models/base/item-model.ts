import { ItemGroupModel } from "../ItemGroupModel";
import { UoMGroupModel } from "../uom-group-model";

export interface ItemModel {
  code: string;
  name: string;
  barcode: string;
  isInventoryItem: boolean;
  isSalesItem: boolean;
  isPurchaseItem: boolean;
  basePrice: number;
  itemGroupModel: ItemGroupModel;
  uoMGroupModel: UoMGroupModel;
  productImageUrl: string;
}
