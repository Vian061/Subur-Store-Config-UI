import { Routes } from "@angular/router";
import { DashboardComponent } from "./views/dashboard/dashboard.component";
import { CategoryComponent } from "./views/category/category.component";
import { AreaComponent } from "./views/category/area/area.component";
import { BankComponent } from "./views/category/bank/bank.component";
import { BranchComponent } from "./views/category/branch/branch.component";
import { BusinessPartnerComponent } from "./views/category/business-partner/business-partner.component";
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

export const routes: Routes = [
  { path: "", canActivate: [AuthGuard], component: DashboardComponent },
  { path: "Login", component: LoginComponent },
  { path: "Category", canActivate: [AuthGuard], component: CategoryComponent },
  { path: "Area", component: AreaComponent },
  { path: "Bank", component: BankComponent },
  { path: "Branch", component: BranchComponent },
  { path: "BusinessPartner", component: BusinessPartnerComponent },
  { path: "Customer", component: CustomerComponent },
  { path: "Item-Group", component: ItemGroupComponent },
  { path: "Journal-Account", component: JournalAccountComponent },
  { path: "Manufacturer", component: ManufacturerComponent },
  { path: "Menu", component: MenuComponent },
  { path: "Price", component: PriceComponent },
  { path: "Product", component: ProductComponent },
  { path: "Role", component: RoleComponent },
  { path: "UoM", component: UomComponent },
  { path: "UoM-Group", component: UomGroupComponent },
  { path: "Warehouse", component: WarehouseComponent },
  { path: "Warehouse-Bin", component: WarehouseBinComponent },
];
