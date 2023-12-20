import { UICategoryMenu } from "./models/ui-models/ui-category-menu";

export class Constants {
  static menus: UICategoryMenu[] = [
    {
      icon: "map",
      title: "Area",
      description: "Sync Area Configuration to a branch",
      redirectUri: "/Area",
    },
    {
      icon: "account_balance",
      title: "Bank",
      description: "Sync Bank Configuration to a branch",
      redirectUri: "/Bank",
    },
    {
      icon: "call_split",
      title: "Branch",
      description: "Sync Branch Configuration to a branch",
      redirectUri: "/Branch",
    },
    {
      icon: "handshake",
      title: "Business Partner Group",
      description: "Sync Business Partner Group Configuration to a branch",
      redirectUri: "/BP-Group",
    },
    {
      icon: "person",
      title: "Customer",
      description: "Sync Customer Configuration to a branch",
      redirectUri: "/Customer",
    },
    {
      icon: "ballot",
      title: "Item Group",
      description: "Sync Item Group Configuration to a branch",
      redirectUri: "/Item-Group",
    },
    {
      icon: "book_5",
      title: "Journal Account",
      description: "Sync Journal Account Configuration to a branch",
      redirectUri: "/Journal-Account",
    },
    {
      icon: "factory",
      title: "Manufacturer",
      description: "Sync Manufacturer Configuration to a branch",
      redirectUri: "/Manufacturer",
    },
    {
      icon: "widgets",
      title: "Menu",
      description: "Sync Menu Configuration to a branch",
      redirectUri: "/Menu",
    },
    {
      icon: "monetization_on",
      title: "Price",
      description: "Sync Price Configuration to a branch",
      redirectUri: "/Price",
    },
    {
      icon: "archive",
      title: "Product",
      description: "Sync Product Configuration to a branch",
      redirectUri: "/Product",
    },
    {
      icon: "widgets",
      title: "Role Menu",
      description: "Sync Role Menu Configuration to a branch",
      redirectUri: "/Role-Menu",
    },
    {
      icon: "manage_accounts",
      title: "Role",
      description: "Sync Role Configuration to a branch",
      redirectUri: "/Role",
    },
    {
      icon: "weight",
      title: "UoM",
      description: "Sync Unit of Measure Configuration to a branch",
      redirectUri: "/UoM",
    },
    {
      icon: "schema",
      title: "UoM Group",
      description: "Sync Unit of Measure Group Configuration to a branch",
      redirectUri: "/UoM-Group",
    },
    {
      icon: "warehouse",
      title: "Warehouse",
      description: "Sync Warehouse Configuration to a branch",
      redirectUri: "/Warehouse",
    },
    {
      icon: "stacks",
      title: "Warehouse Bin",
      description: "Sync Warehouse Bin Configuration to a branch",
      redirectUri: "/Warehouse-Bin",
    },
  ];
  static UrlEndpoint: any = class {
    static identityServerEndpoint: string = "http://192.168.1.15:44310/";
    static passwordTokenRequestEndpoint: string = this.identityServerEndpoint + "connect/token";
    // static apiEndpoint: string = "http://localhost:5084/";
    static apiEndpoint: string = "http://192.168.1.15:44350/";
    static apiV1: string = this.apiEndpoint + "api/v1/";
    static apiV2: string = this.apiEndpoint + "api/v2/";
    // static apiV1: string = "api/v1/";
    // static apiV2: string = "api/v2/";

    static areaEndpoint: string = this.apiV1 + "Areas";
    static bankEndpoint: string = this.apiV1 + "Banks";
    static branchesEndpoint: string = this.apiV1 + "Branches";
    static businessPartnerGroupEndpoint: string = this.apiV1 + "BusinessPartnerGroups";
    static customerEndpoint: string = this.apiV1 + "Customers";
    static itemGroupEndpoint: string = this.apiV1 + "ItemGroups";
    static journalAccountEndpoint: string = this.apiV1 + "JournalAccounts";
    static manufacturerEndpoint: string = this.apiV1 + "Manufacturers";
    static menuEndpoint: string = this.apiV1 + "Menus";
    static priceEndpoint: string = this.apiV1 + "Prices";
    static productEndpoint: string = this.apiV1 + "Products";
    static roleMenuEndpoint: string = this.apiV1 + "RoleMenus";
    static roleEndpoint: string = this.apiV1 + "Roles";
    static uomEndpoint: string = this.apiV1 + "UoMs";
    static uomGroupEndpoint: string = this.apiV1 + "UoMGroups";
    static warehouseEndpoint: string = this.apiV1 + "Warehouses";
    static warehouseBinEndpoint: string = this.apiV1 + "WarehouseBins";
  };

  static is4Client: any = class {
    static client_id = "SuburStoreConfiguration-Web";
    static client_secret = "SuburStoreConfiguration-Web";
    static scope = "profile roles openid offline_access SuburStoreConfiguration-ApiScope";
  };
}
