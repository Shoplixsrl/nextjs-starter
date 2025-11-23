export interface MetricData {
  label: string;
  value: string;
  change: number;
  changeLabel: string;
  icon: "trendingUp" | "users" | "target" | "dollarSign";
}

export interface ChartDataPoint {
  date: string;
  value: number;
  category?: string;
}

export interface Transaction {
  id: string;
  description: string;
  amount: number;
  date: string;
  status: "completed" | "pending" | "failed";
  category: string;
}

export const metricsData: MetricData[] = [
  {
    label: "Total Revenue",
    value: "$284,529",
    change: 12.5,
    changeLabel: "vs last month",
    icon: "trendingUp",
  },
  {
    label: "Active Users",
    value: "12,483",
    change: 8.2,
    changeLabel: "vs last month",
    icon: "users",
  },
  {
    label: "Conversion Rate",
    value: "3.24%",
    change: -2.1,
    changeLabel: "vs last month",
    icon: "target",
  },
  {
    label: "Avg. Order Value",
    value: "$142.38",
    change: 5.7,
    changeLabel: "vs last month",
    icon: "dollarSign",
  },
];

export const revenueData: ChartDataPoint[] = [
  { date: "Jan", value: 186000 },
  { date: "Feb", value: 205000 },
  { date: "Mar", value: 237000 },
  { date: "Apr", value: 273000 },
  { date: "May", value: 309000 },
  { date: "Jun", value: 284529 },
];

export const categoryData: ChartDataPoint[] = [
  { date: "Mon", value: 42000, category: "Sales" },
  { date: "Mon", value: 28000, category: "Marketing" },
  { date: "Tue", value: 38000, category: "Sales" },
  { date: "Tue", value: 32000, category: "Marketing" },
  { date: "Wed", value: 45000, category: "Sales" },
  { date: "Wed", value: 35000, category: "Marketing" },
  { date: "Thu", value: 52000, category: "Sales" },
  { date: "Thu", value: 41000, category: "Marketing" },
  { date: "Fri", value: 48000, category: "Sales" },
  { date: "Fri", value: 38000, category: "Marketing" },
];

export const performanceData: ChartDataPoint[] = [
  { date: "Week 1", value: 65 },
  { date: "Week 2", value: 72 },
  { date: "Week 3", value: 68 },
  { date: "Week 4", value: 85 },
  { date: "Week 5", value: 78 },
  { date: "Week 6", value: 92 },
];

export const recentTransactions: Transaction[] = [
  {
    id: "TXN-001",
    description: "Premium Subscription",
    amount: 99.99,
    date: "2025-11-23",
    status: "completed",
    category: "Subscription",
  },
  {
    id: "TXN-002",
    description: "Enterprise License",
    amount: 1299.00,
    date: "2025-11-23",
    status: "completed",
    category: "License",
  },
  {
    id: "TXN-003",
    description: "API Credits",
    amount: 49.99,
    date: "2025-11-22",
    status: "pending",
    category: "Credits",
  },
  {
    id: "TXN-004",
    description: "Monthly Plan",
    amount: 29.99,
    date: "2025-11-22",
    status: "completed",
    category: "Subscription",
  },
  {
    id: "TXN-005",
    description: "Add-on Features",
    amount: 149.00,
    date: "2025-11-21",
    status: "failed",
    category: "Add-on",
  },
];

export const portfolioDistribution = [
  { name: "Stocks", value: 45, fill: "hsl(var(--chart-1))" },
  { name: "Bonds", value: 25, fill: "hsl(var(--chart-2))" },
  { name: "Real Estate", value: 15, fill: "hsl(var(--chart-3))" },
  { name: "Crypto", value: 10, fill: "hsl(var(--chart-4))" },
  { name: "Cash", value: 5, fill: "hsl(var(--chart-5))" },
];
