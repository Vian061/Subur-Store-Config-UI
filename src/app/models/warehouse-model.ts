import { BaseModel } from "./base/base-model";
import { BranchModel } from "./branch-model";
import { WarehouseBinModel } from "./warehouse-bin-model";

export interface WarehouseModel extends BaseModel {
  description: string;
  branch: BranchModel;
  defaultBin: WarehouseBinModel;
  isVendorLocation: boolean;
}
