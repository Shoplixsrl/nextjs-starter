/**
 * Machine Learning Predictions
 * Payment time predictions and revenue forecasting
 */

export interface PaymentPrediction {
  invoiceId: string;
  expectedPaymentDate: Date;
  confidence: number; // 0-1
  riskLevel: 'low' | 'medium' | 'high';
  factors: string[];
}

export interface RevenueForecast {
  month: string;
  predictedRevenue: number;
  confidence: number;
  trend: 'increasing' | 'stable' | 'decreasing';
}

/**
 * Predict payment time for an invoice
 * Uses historical data and customer behavior patterns
 */
export function predictPaymentTime(
  invoice: any,
  customerHistory: any[]
): PaymentPrediction {
  // Calculate average payment time for this customer
  const avgPaymentDays = customerHistory.reduce((sum, inv) => {
    if (inv.paymentDate && inv.dueDate) {
      const days = Math.floor((new Date(inv.paymentDate).getTime() - new Date(inv.dueDate).getTime()) / (1000 * 60 * 60 * 24));
      return sum + days;
    }
    return sum;
  }, 0) / (customerHistory.length || 1);

  // Calculate payment reliability
  const onTimePayments = customerHistory.filter(inv => {
    if (!inv.paymentDate || !inv.dueDate) return false;
    return new Date(inv.paymentDate) <= new Date(inv.dueDate);
  }).length;

  const reliability = onTimePayments / (customerHistory.length || 1);

  // Determine risk level
  let riskLevel: 'low' | 'medium' | 'high' = 'low';
  if (reliability < 0.5) riskLevel = 'high';
  else if (reliability < 0.8) riskLevel = 'medium';

  // Calculate expected payment date
  const dueDate = new Date(invoice.dueDate);
  const expectedDays = avgPaymentDays + (invoice.paymentTermsDays || 30);
  const expectedPaymentDate = new Date(dueDate.getTime() + expectedDays * 24 * 60 * 60 * 1000);

  // Confidence based on historical data volume
  const confidence = Math.min(0.95, 0.5 + (customerHistory.length * 0.05));

  // Identify key factors
  const factors = [];
  if (reliability > 0.9) factors.push('Cliente affidabile con storico positivo');
  if (reliability < 0.5) factors.push('⚠️ Cliente spesso in ritardo');
  if (parseFloat(invoice.total) > 5000) factors.push('Importo elevato potrebbe ritardare pagamento');
  if (avgPaymentDays > 10) factors.push(`Storico: media +${Math.round(avgPaymentDays)} giorni`);

  return {
    invoiceId: invoice.id,
    expectedPaymentDate,
    confidence,
    riskLevel,
    factors,
  };
}

/**
 * Forecast revenue for upcoming months
 * Uses time series analysis and trend detection
 */
export function forecastRevenue(
  historicalData: Array<{ month: string; revenue: number }>
): RevenueForecast[] {
  if (historicalData.length < 3) {
    throw new Error('Insufficient historical data for forecasting');
  }

  // Calculate growth rate
  const recentRevenues = historicalData.slice(-6).map(d => d.revenue);
  const growthRates = [];

  for (let i = 1; i < recentRevenues.length; i++) {
    const rate = (recentRevenues[i] - recentRevenues[i - 1]) / recentRevenues[i - 1];
    growthRates.push(rate);
  }

  const avgGrowthRate = growthRates.reduce((a, b) => a + b, 0) / growthRates.length;

  // Detect trend
  let trend: 'increasing' | 'stable' | 'decreasing' = 'stable';
  if (avgGrowthRate > 0.05) trend = 'increasing';
  else if (avgGrowthRate < -0.05) trend = 'decreasing';

  // Generate forecasts for next 3 months
  const lastRevenue = historicalData[historicalData.length - 1].revenue;
  const forecasts: RevenueForecast[] = [];

  for (let i = 1; i <= 3; i++) {
    const predictedRevenue = lastRevenue * Math.pow(1 + avgGrowthRate, i);
    const confidence = Math.max(0.6, 0.9 - (i * 0.1)); // Confidence decreases with time

    const currentDate = new Date();
    const forecastMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + i, 1);
    const month = forecastMonth.toISOString().slice(0, 7);

    forecasts.push({
      month,
      predictedRevenue: Math.round(predictedRevenue),
      confidence,
      trend,
    });
  }

  return forecasts;
}

/**
 * Detect seasonal patterns in revenue
 */
export function detectSeasonality(
  data: Array<{ month: string; revenue: number }>
): { hasSeasonality: boolean; peakMonths: number[]; lowMonths: number[] } {
  if (data.length < 12) {
    return { hasSeasonality: false, peakMonths: [], lowMonths: [] };
  }

  // Group by month of year
  const monthlyAverages: number[] = new Array(12).fill(0);
  const monthCounts: number[] = new Array(12).fill(0);

  data.forEach(d => {
    const month = new Date(d.month).getMonth();
    monthlyAverages[month] += d.revenue;
    monthCounts[month]++;
  });

  for (let i = 0; i < 12; i++) {
    if (monthCounts[i] > 0) {
      monthlyAverages[i] /= monthCounts[i];
    }
  }

  const avg = monthlyAverages.reduce((a, b) => a + b, 0) / 12;
  const threshold = avg * 0.2; // 20% deviation

  const peakMonths = monthlyAverages
    .map((val, idx) => ({ val, idx }))
    .filter(m => m.val > avg + threshold)
    .map(m => m.idx + 1);

  const lowMonths = monthlyAverages
    .map((val, idx) => ({ val, idx }))
    .filter(m => m.val < avg - threshold)
    .map(m => m.idx + 1);

  return {
    hasSeasonality: peakMonths.length > 0 || lowMonths.length > 0,
    peakMonths,
    lowMonths,
  };
}
