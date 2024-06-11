import { AddressModel } from "./address-model";
import { AreaModel } from "./area-model";
import { BusinessPartnerGroupModel } from "./business-partner-group-model";

export interface BusinessPartnerModel {
  code: string;
  customerName: string;
  balance: number;
  pointReward: number;
  pic: string;
  phone: string;
  fax: string;
  mobile: string;
  area: AreaModel;
  addresses: AddressModel[];
  bpGroup: BusinessPartnerGroupModel;
  creditLimit: number;
  isTaxCount: boolean;
  overallPointReward: number;
  latitude: number;
  longitude: number;
  accuracy: number;
  birthDate: Date;
  transportType: string;
}
