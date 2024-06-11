import { BranchModel } from "./branch-model";

export interface MenuModel {
  code: string;
  description: string;
  menuOrder: number;
  isActive: boolean;
  formName: string;
  formCaption: string;
  parentMenu: MenuModel;
  branch: BranchModel;
}
