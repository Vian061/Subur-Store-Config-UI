import { Routes } from "@angular/router";
import { DashboardComponent } from "./views/dashboard/dashboard.component";
import { CategoryComponent } from "./views/category/category.component";
import { AreaComponent } from "./views/category/area/area.component";
import { BankComponent } from "./views/category/bank/bank.component";
import { BranchComponent } from "./views/category/branch/branch.component";
import { BusinessPartnerComponent } from "./views/category/business-partner/business-partner.component";
import { CustomerComponent } from "./views/category/customer/customer.component";
import { ItemGroupComponent } from "./views/category/item-group/item-group.component";

export const routes: Routes = [
  { path: "", component: DashboardComponent },
  { path: "Category", component: CategoryComponent },
  { path: "Area", component: AreaComponent },
  { path: "Bank", component: BankComponent },
  { path: "Branch", component: BranchComponent },
  { path: "BusinessPartner", component: BusinessPartnerComponent },
  { path: "Customer", component: CustomerComponent },
  { path: "Item-Group", component: ItemGroupComponent },
];
