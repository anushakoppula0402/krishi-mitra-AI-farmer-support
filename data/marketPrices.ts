export interface CropPrice {
  name: string;
  price: number; // Price per quintal
  trend: 'up' | 'down' | 'stable';
}

export interface RegionData {
  nameKey: 'north' | 'south' | 'east' | 'west';
  crops: CropPrice[];
}

export const marketPricesData: RegionData[] = [
  {
    nameKey: 'north',
    crops: [
      { name: 'Wheat', price: 2150, trend: 'up' },
      { name: 'Basmati Rice', price: 3800, trend: 'stable' },
      { name: 'Sugarcane', price: 350, trend: 'up' },
      { name: 'Mustard', price: 5400, trend: 'down' },
    ],
  },
  {
    nameKey: 'south',
    crops: [
      { name: 'Paddy (Rice)', price: 2040, trend: 'stable' },
      { name: 'Cotton', price: 6200, trend: 'up' },
      { name: 'Maize', price: 1950, trend: 'down' },
      { name: 'Turmeric', price: 7500, trend: 'up' },
    ],
  },
  {
    nameKey: 'east',
    crops: [
      { name: 'Jute', price: 4750, trend: 'down' },
      { name: 'Paddy (Rice)', price: 2010, trend: 'stable' },
      { name: 'Potato', price: 1800, trend: 'up' },
      { name: 'Tea', price: 250, trend: 'stable' },
    ],
  },
  {
    nameKey: 'west',
    crops: [
      { name: 'Cotton', price: 6350, trend: 'up' },
      { name: 'Soybean', price: 5100, trend: 'down' },
      { name: 'Groundnut', price: 5800, trend: 'stable' },
      { name: 'Onion', price: 2200, trend: 'up' },
    ],
  },
];
