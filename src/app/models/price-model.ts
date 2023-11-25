import { BusinessPartnerGroupModel } from "./business-partner-group-model";
import { ProudctModel } from "./product-model";
import { UoMGroupModel } from "./uom-group-model";
import { UoMModel } from "./uom-model";

export interface PriceModel {
  name: string;
  averagePrice: number;
  customPrice: number;
  validFrom: Date;
  validTo: Date;
  proudct: ProudctModel;
  isActive: boolean;
  details: PriceDetailModel[];
}

export interface PriceDetailModel {
  lineNo: number;
  colNo: number;
  uoMGroup: UoMGroupModel;
  uoM: UoMModel;
  customerGroup: BusinessPartnerGroupModel;
  baseHorizontalPercentageIncrement: number;
  baseVerticalPercentageIncrement: number;
  baseVerticalPercentage: number;
  baseHorizontalPercentage: number;
  baseQuantity: number;
  basePrice: number;
  basePercentage: number;
}
