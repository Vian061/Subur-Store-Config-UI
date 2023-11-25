import { BranchModel } from "../branch-model";

export interface BaseAccountModel {
  accountCode: string;
  accountName: string;
  branch: BranchModel;
}
