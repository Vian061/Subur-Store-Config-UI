import { BaseModel } from "./base/base-model";
import { WarehouseModel } from "./warehouse-model";

export interface WarehouseBinModel extends BaseModel {
  l1: string;
  l2: string;
  l3: string;
  isDefault: boolean;
  warehouseModel: WarehouseModel;
}
