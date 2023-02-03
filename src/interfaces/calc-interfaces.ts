export interface IBrand {
  brandName: string;
  brandColor: string;
  pricePerStorage: number;
  pricePerTransfer: number;
  altPricePerStorage?: number;
  altPricePerTransfer?: number;
  minPayment?: number;
  maxPayment?: number;
  togglingOption?: boolean;
  switchOptions?: string[];
  freeSpace?: number;
}
export interface ISliderValues {
  sliderStorageValue: number;
  sliderTransferValue: number;
}
export interface IPrices {
  [name: string]: number;
}
export interface IProps {
  bestPrice: number;
  brandInfo: IBrand;
  getCost: (any) => { brand: number };
  pickedAmount: { sliderStorageValue: number; sliderTransferValue: number };
}
