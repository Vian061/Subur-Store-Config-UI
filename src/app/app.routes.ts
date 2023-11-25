import { Routes } from "@angular/router";
import { DashboardComponent } from "./views/dashboard/dashboard.component";
import { CategoryComponent } from "./views/category/category.component";
import { AreaComponent } from "./views/category/area/area.component";
import { BankComponent } from "./views/category/bank/bank.component";

export const routes: Routes = [
  { path: "", component: DashboardComponent },
  { path: "Category", component: CategoryComponent },
  { path: "Area", component: AreaComponent },
  { path: "Bank", component: BankComponent },
];
