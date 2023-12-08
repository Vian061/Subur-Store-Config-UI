import { BusinessPartnerGroupModel } from "./business-partner-group-model";

export interface CustomerModel extends BusinessPartnerGroupModel {
  salt: string;
  pIN: string;
  emailAddress: string;
  outstandingBills: number;
  paymentDays: string;
  limitType: string;
  nIK: string;
  displayMembership: string;
  membershipBarCode: string;
  deliveryDays: string;
  feesRokok: number;
  feesNonRokok: number;
  salesmanNIK: string;
}
