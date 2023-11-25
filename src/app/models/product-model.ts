import { ItemModel } from "./base/item-model";
import { ManufacturerModel } from "./manufacturer-model";

export interface ProudctModel extends ItemModel {
  manufacturer: ManufacturerModel;
  isTaxCount: boolean;
  brand: string;
  itemGroup1: string;
  itemGroup2: string;
  isInactive: boolean;
  isInOpname: boolean;
  barcode2: string;
  barcode3: string;
  barcode4: string;
  nominalPoint: number;
  isCalculatePrice: boolean;
  isForSalesmanWeb: boolean;
  isForB2C: boolean;
}
