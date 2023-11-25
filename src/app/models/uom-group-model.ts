import { UoMModel } from "./uom-model";

export interface UoMGroupModel {
  code: string;
  description: string;
  details: UoMGroupDetailModel[];
}

export interface UoMGroupDetailModel {
  alternateUoMModel: UoMModel;
  alternateQuantity: number;
  baseUoMModel: UoMModel;
  baseQuantity: number;
  uoMPackage: string;
}
