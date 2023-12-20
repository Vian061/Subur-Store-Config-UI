import { BranchModel } from "./branch-model";

export interface POSConfigurationModel {
  key: string;
  value: string;
  group: string;
  branch: BranchModel;
}
