import { BranchModel } from "./branch-model";

export interface POSTConfiguration {
  key: string;
  value: string;
  group: string;
  branch: BranchModel;
}
