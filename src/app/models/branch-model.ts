export interface BranchModel {
  code: string;
  description: string;
  latitude: number;
  longitude: number;
  accuracy: number;
  imageUrl: string;
  nominalPerPointRokok: number;
  nominalPerPointRokokCredit: number;
  multiplyPointFullPaymentRokok: number;
  nominalPerPointNonRokok: number;
  nominalPerPointNonRokokCredit: number;
  multiplyPointFullPaymentNonRokok: number;
  minimalAmountNonRokokForNotification: number;
}
