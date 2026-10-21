export interface TrailerSpec {
  id: number | string;
  brand: string;
  type: string;
  foto?: string;
  priceSum: string | null;
  priceUsd: number | null;
  priceR?: number | string | null;
  from?: string | null;
  source?: string | null;
  mass: number | string;
  volume: string | number;
  electrical?: string;
  braking?: string;
  loadCapacity?: string;
  dimensions?: string;
  suspension?: string;
  axleBrand?: string;
  painting?: string;
  tires?: string;
  roof?: string;
  superstructure?: string;
  category: string;
}

export interface Category {
  id: string;
  label: string;
}

export interface MarketShareRecord {
  brand: string;
  count: number;
  percentage: number;
  color?: string;
}

export interface MarketShareData {
  period: string;
  total: number;
  records: MarketShareRecord[];
}
