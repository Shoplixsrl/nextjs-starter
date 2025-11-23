import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { WeeklyProgress } from '../types/types';
import { colors, typography, spacing, borderRadius } from '../theme';

interface ProgressChartProps {
  data: WeeklyProgress;
  metric: 'calories' | 'duration' | 'workouts';
}

export const ProgressChart: React.FC<ProgressChartProps> = ({ data, metric }) => {
  const screenWidth = Dimensions.get('window').width;

  const getChartData = () => {
    const labels = data.days.map(day => day.day);
    const values = data.days.map(day => {
      switch (metric) {
        case 'calories':
          return day.calories;
        case 'duration':
          return day.duration;
        case 'workouts':
          return day.workouts;
        default:
          return 0;
      }
    });

    return {
      labels,
      datasets: [
        {
          data: values,
        },
      ],
    };
  };

  const getMetricLabel = () => {
    switch (metric) {
      case 'calories':
        return 'Calories Burned';
      case 'duration':
        return 'Minutes Exercised';
      case 'workouts':
        return 'Workouts Completed';
      default:
        return '';
    }
  };

  const chartConfig = {
    backgroundColor: colors.background,
    backgroundGradientFrom: colors.background,
    backgroundGradientTo: colors.background,
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(255, 68, 68, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(102, 102, 102, ${opacity})`,
    style: {
      borderRadius: borderRadius.lg,
    },
    propsForBackgroundLines: {
      strokeDasharray: '',
      stroke: colors.divider,
      strokeWidth: 1,
    },
    barPercentage: 0.7,
    fillShadowGradient: colors.gradientMiddle,
    fillShadowGradientOpacity: 1,
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{getMetricLabel()}</Text>
      <View style={styles.chartContainer}>
        <BarChart
          data={getChartData()}
          width={screenWidth - spacing.md * 4}
          height={220}
          yAxisLabel=""
          yAxisSuffix=""
          chartConfig={chartConfig}
          style={styles.chart}
          showValuesOnTopOfBars
          withInnerLines
          fromZero
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.md,
  },
  title: {
    ...typography.h4,
    marginBottom: spacing.md,
  },
  chartContainer: {
    backgroundColor: colors.backgroundCard,
    borderRadius: borderRadius.lg,
    padding: spacing.sm,
    shadowColor: colors.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  chart: {
    borderRadius: borderRadius.lg,
  },
});
