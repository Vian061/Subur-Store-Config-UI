import { AddressModel } from "./address-model";
import { AreaModel } from "./area-model";

export interface BusinessPartnerModel {
  code: string;
  name: string;
  balance: number;
  poinrtReward: number;
  pIC: string;
  phone: string;
  fax: string;
  mobile: string;
  area: AreaModel;
  adresses: AddressModel[];
  bPGroup: BusinessPartnerModel;
  creditLimit: number;
  isTaxCount: boolean;
  overallPointReward: number;
  latitude: number;
  longitude: number;
  acuracy: number;
  birthDate: Date;
  transportType: string;
}
