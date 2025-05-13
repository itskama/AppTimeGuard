export type AppUsage = {
  id: string;
  name: string;
  minutes: number;
  category: string;
};

export type CategorySummary = {
  category: string;
  minutes: number;
};