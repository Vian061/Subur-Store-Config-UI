import { Routes } from "@angular/router";
import { DashboardComponent } from "./views/dashboard/dashboard.component";
import { CategoryComponent } from "./views/category/category.component";
import { AreaComponent } from "./views/category/area/area.component";
import { BankComponent } from "./views/category/bank/bank.component";
import { BranchComponent } from "./views/category/branch/branch.component";
import { CustomerComponent } from "./views/category/customer/customer.component";
import { ItemGroupComponent } from "./views/category/item-group/item-group.component";
import { JournalAccountComponent } from "./views/category/journal-account/journal-account.component";
import { ManufacturerComponent } from "./views/category/manufacturer/manufacturer.component";
import { MenuComponent } from "./views/category/menu/menu.component";
import { PriceComponent } from "./views/category/price/price.component";
import { ProductComponent } from "./views/category/product/product.component";
import { RoleComponent } from "./views/category/role/role.component";
import { UomComponent } from "./views/category/uom/uom.component";
import { UomGroupComponent } from "./views/category/uom-group/uom-group.component";
import { WarehouseComponent } from "./views/category/warehouse/warehouse.component";
import { WarehouseBinComponent } from "./views/category/warehouse-bin/warehouse-bin.component";
import { LoginComponent } from "./views/login/login.component";
import { AuthGuard } from "./services/auth-guard";
import { BpGroupComponent } from "./views/category/bp-group/bp-group.component";
import { RoleMenuComponent } from "./views/category/role-menu/role-menu.component";

export const routes: Routes = [
  { path: "", canActivate: [AuthGuard], component: DashboardComponent },
  { path: "Login", component: LoginComponent },
  { path: "Category", canActivate: [AuthGuard], component: CategoryComponent },
  { path: "Area", canActivate: [AuthGuard], component: AreaComponent },
  { path: "Bank", canActivate: [AuthGuard], component: BankComponent },
  { path: "Branch", canActivate: [AuthGuard], component: BranchComponent },
  { path: "BP-Group", canActivate: [AuthGuard], component: BpGroupComponent },
  { path: "Customer", canActivate: [AuthGuard], component: CustomerComponent },
  { path: "Item-Group", canActivate: [AuthGuard], component: ItemGroupComponent },
  { path: "Journal-Account", canActivate: [AuthGuard], component: JournalAccountComponent },
  { path: "Manufacturer", canActivate: [AuthGuard], component: ManufacturerComponent },
  { path: "Menu", canActivate: [AuthGuard], component: MenuComponent },
  { path: "Price", canActivate: [AuthGuard], component: PriceComponent },
  { path: "Product", canActivate: [AuthGuard], component: ProductComponent },
  { path: "Role", canActivate: [AuthGuard], component: RoleComponent },
  { path: "Role-Menu", canActivate: [AuthGuard], component: RoleMenuComponent },
  { path: "UoM", canActivate: [AuthGuard], component: UomComponent },
  { path: "UoM-Group", canActivate: [AuthGuard], component: UomGroupComponent },
  { path: "Warehouse", canActivate: [AuthGuard], component: WarehouseComponent },
  { path: "Warehouse-Bin", canActivate: [AuthGuard], component: WarehouseBinComponent },
];
