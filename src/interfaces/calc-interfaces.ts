export interface IBrand {
  brandName: string;
  pricePerStorage: number;
  pricePerTransfer: number;
  altPricePerStorage?: number;
  altPricePerTransfer?: number;
  minPayment?: number;
  maxPayment?: number;
  togglingOption?: boolean;
  freeSpace?: number;
}
