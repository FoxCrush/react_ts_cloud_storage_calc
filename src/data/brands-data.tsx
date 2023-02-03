import { IBrand } from "../interfaces/calc-interfaces";

const backblaze: IBrand = {
  brandName: "backblaze.com",
  brandColor: "red",
  minPayment: 7,
  pricePerStorage: 0.005,
  pricePerTransfer: 0.01,
};
const bunny: IBrand = {
  brandName: "bunny.net",
  brandColor: "orange",
  togglingOption: true,
  switchOptions: ["HDD", "SSD"],
  maxPayment: 10,
  pricePerStorage: 0.01,
  altPricePerStorage: 0.02,
  pricePerTransfer: 0.01,
  altPricePerTransfer: 0.01,
};
const scaleway: IBrand = {
  brandName: "scaleway.com",
  brandColor: "purple",
  togglingOption: true,
  switchOptions: ["Single", "Multi"],
  pricePerStorage: 0.03,
  altPricePerStorage: 0.06,
  pricePerTransfer: 0.02,
  altPricePerTransfer: 0.02,
  freeSpace: 75,
};
const vultr: IBrand = {
  brandName: "vultr.com",
  brandColor: "blue",
  minPayment: 5,
  pricePerStorage: 0.01,
  pricePerTransfer: 0.01,
};

const arrayToSend = [backblaze, vultr, bunny, scaleway];
export default arrayToSend;
