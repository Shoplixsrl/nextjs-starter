export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  category: string;
  type: "income" | "expense";
  status: "completed" | "pending";
}

export interface CategorySpending {
  category: string;
  amount: number;
  percentage: number;
  color: string;
}

export interface MonthlyData {
  month: string;
  income: number;
  expenses: number;
  savings: number;
}

export interface AccountSummary {
  balance: number;
  income: number;
  expenses: number;
  savings: number;
  savingsRate: number;
}

export const accountSummary: AccountSummary = {
  balance: 24658.50,
  income: 8250.00,
  expenses: 4892.35,
  savings: 3357.65,
  savingsRate: 40.7,
};

export const transactions: Transaction[] = [
  {
    id: "1",
    date: "2025-11-23",
    description: "Salary - Tech Corp",
    amount: 8250.00,
    category: "Salary",
    type: "income",
    status: "completed",
  },
  {
    id: "2",
    date: "2025-11-22",
    description: "Rent Payment",
    amount: -1800.00,
    category: "Housing",
    type: "expense",
    status: "completed",
  },
  {
    id: "3",
    date: "2025-11-21",
    description: "Grocery Shopping - Whole Foods",
    amount: -187.45,
    category: "Food",
    type: "expense",
    status: "completed",
  },
  {
    id: "4",
    date: "2025-11-20",
    description: "Electric Bill",
    amount: -124.80,
    category: "Utilities",
    type: "expense",
    status: "completed",
  },
  {
    id: "5",
    date: "2025-11-19",
    description: "Freelance Project",
    amount: 1500.00,
    category: "Freelance",
    type: "income",
    status: "completed",
  },
  {
    id: "6",
    date: "2025-11-18",
    description: "Netflix Subscription",
    amount: -15.99,
    category: "Entertainment",
    type: "expense",
    status: "completed",
  },
  {
    id: "7",
    date: "2025-11-18",
    description: "Spotify Premium",
    amount: -10.99,
    category: "Entertainment",
    type: "expense",
    status: "completed",
  },
  {
    id: "8",
    date: "2025-11-17",
    description: "Gas Station",
    amount: -65.00,
    category: "Transportation",
    type: "expense",
    status: "completed",
  },
  {
    id: "9",
    date: "2025-11-16",
    description: "Restaurant - Dinner",
    amount: -89.50,
    category: "Food",
    type: "expense",
    status: "completed",
  },
  {
    id: "10",
    date: "2025-11-15",
    description: "Gym Membership",
    amount: -59.99,
    category: "Health",
    type: "expense",
    status: "completed",
  },
  {
    id: "11",
    date: "2025-11-14",
    description: "Online Course",
    amount: -149.00,
    category: "Education",
    type: "expense",
    status: "completed",
  },
  {
    id: "12",
    date: "2025-11-13",
    description: "Coffee Shop",
    amount: -28.50,
    category: "Food",
    type: "expense",
    status: "completed",
  },
  {
    id: "13",
    date: "2025-11-12",
    description: "Phone Bill",
    amount: -75.00,
    category: "Utilities",
    type: "expense",
    status: "completed",
  },
  {
    id: "14",
    date: "2025-11-11",
    description: "Shopping - Clothing",
    amount: -245.80,
    category: "Shopping",
    type: "expense",
    status: "completed",
  },
  {
    id: "15",
    date: "2025-11-10",
    description: "Car Insurance",
    amount: -156.00,
    category: "Transportation",
    type: "expense",
    status: "completed",
  },
  {
    id: "16",
    date: "2025-11-09",
    description: "Investment Returns",
    amount: 320.50,
    category: "Investment",
    type: "income",
    status: "completed",
  },
  {
    id: "17",
    date: "2025-11-08",
    description: "Pharmacy",
    amount: -42.30,
    category: "Health",
    type: "expense",
    status: "completed",
  },
  {
    id: "18",
    date: "2025-11-07",
    description: "Grocery Shopping",
    amount: -156.75,
    category: "Food",
    type: "expense",
    status: "completed",
  },
  {
    id: "19",
    date: "2025-11-06",
    description: "Movie Tickets",
    amount: -38.00,
    category: "Entertainment",
    type: "expense",
    status: "completed",
  },
  {
    id: "20",
    date: "2025-11-05",
    description: "Book Purchase",
    amount: -45.99,
    category: "Education",
    type: "expense",
    status: "completed",
  },
];

export const categorySpending: CategorySpending[] = [
  { category: "Housing", amount: 1800.00, percentage: 36.8, color: "hsl(var(--chart-1))" },
  { category: "Food", amount: 720.20, percentage: 14.7, color: "hsl(var(--chart-2))" },
  { category: "Transportation", amount: 286.00, percentage: 5.8, color: "hsl(var(--chart-3))" },
  { category: "Utilities", amount: 199.80, percentage: 4.1, color: "hsl(var(--chart-4))" },
  { category: "Entertainment", amount: 102.98, percentage: 2.1, color: "hsl(var(--chart-5))" },
  { category: "Health", amount: 102.29, percentage: 2.1, color: "hsl(var(--income))" },
  { category: "Shopping", amount: 245.80, percentage: 5.0, color: "hsl(var(--expense))" },
  { category: "Education", amount: 194.99, percentage: 4.0, color: "hsl(var(--savings))" },
];

export const monthlyData: MonthlyData[] = [
  { month: "Jun", income: 7850, expenses: 4520, savings: 3330 },
  { month: "Jul", income: 8100, expenses: 4680, savings: 3420 },
  { month: "Aug", income: 7950, expenses: 4890, savings: 3060 },
  { month: "Sep", income: 8300, expenses: 4750, savings: 3550 },
  { month: "Oct", income: 8450, expenses: 4920, savings: 3530 },
  { month: "Nov", income: 9750, expenses: 4892, savings: 4858 },
];

export const budgetCategories = [
  { name: "Housing", budget: 2000, spent: 1800, color: "hsl(var(--chart-1))" },
  { name: "Food", budget: 800, spent: 720, color: "hsl(var(--chart-2))" },
  { name: "Transportation", budget: 400, spent: 286, color: "hsl(var(--chart-3))" },
  { name: "Entertainment", budget: 200, spent: 103, color: "hsl(var(--chart-5))" },
  { name: "Shopping", budget: 300, spent: 246, color: "hsl(var(--expense))" },
  { name: "Health", budget: 150, spent: 102, color: "hsl(var(--income))" },
];

// Utility functions
export function getTransactionsByCategory(category?: string) {
  if (!category) return transactions;
  return transactions.filter(t => t.category === category);
}

export function getTransactionsByType(type: "income" | "expense") {
  return transactions.filter(t => t.type === type);
}

export function getRecentTransactions(limit: number = 10) {
  return transactions.slice(0, limit);
}
