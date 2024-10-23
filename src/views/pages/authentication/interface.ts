/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

export interface IStripePlans {
  name: string;
  description: string;
  bullets: string[];
  extraInfo: string;
  images: string[];
  metadata: string;
  prices: IStripePrices[];
}

export interface IStripePrices {
  id: string;
  amount: number;
  currency: string;
}
