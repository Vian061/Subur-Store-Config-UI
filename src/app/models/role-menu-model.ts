import { BaseIdModel } from "./base/base-id-model";
import { MenuModel } from "./menu-model";
import { RoleModel } from "./role-model";

export interface RoleMenuModel extends BaseIdModel {
  role: RoleModel;
  menu: MenuModel;
}
