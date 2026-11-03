export interface RegistrationTrendPoint {
  dayLabel: string;
  count: number;
}

export interface CategoryStat {
  category: string;
  quota: number;
  registered: number;
  color: string;
}

export const initialTrends: RegistrationTrendPoint[] = [
  { dayLabel: "H-14", count: 180 },
  { dayLabel: "H-12", count: 320 },
  { dayLabel: "H-10", count: 490 },
  { dayLabel: "H-8", count: 780 },
  { dayLabel: "H-6", count: 1210 },
  { dayLabel: "H-4", count: 1840 },
  { dayLabel: "H-2", count: 2150 },
];

export const categoryBreakdown: CategoryStat[] = [
  {
    category: "Race Lokal",
    quota: 1200,
    registered: 1050,
    color: "#10B981",
  },
  {
    category: "Race Nasional",
    quota: 800,
    registered: 680,
    color: "#0284C7",
  },
  {
    category: "FunRun",
    quota: 500,
    registered: 420,
    color: "#D97706",
  },
];

