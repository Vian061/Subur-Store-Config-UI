import { BusinessPartnerGroupModel } from "./business-partner-group-model";
import { BusinessPartnerModel } from "./business-partner-model";

export interface CustomerModel extends BusinessPartnerModel {
  salt: string;
  pin: string;
  emailAddress: string;
  outstandingBills: number;
  paymentDays: string;
  limitType: number;
  nik: string;
  displayMembership: string;
  membershipBarcode: string;
  deliveryDays: string;
  feesRokok: number;
  feesNonRokok: number;
  salesmanNIK: string;
}
