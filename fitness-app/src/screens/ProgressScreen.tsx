import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { ProgressChart } from '../components/ProgressChart';
import { Card } from '../components/Card';
import { mockWeeklyProgress, mockUserStats } from '../data/mockData';
import { colors, typography, spacing, borderRadius, iconSizes } from '../theme';

type MetricType = 'calories' | 'duration' | 'workouts';

export const ProgressScreen: React.FC = () => {
  const [selectedMetric, setSelectedMetric] = useState<MetricType>('calories');

  const metrics: { key: MetricType; label: string; icon: keyof typeof Ionicons.glyphMap }[] = [
    { key: 'calories', label: 'Calories', icon: 'flame' },
    { key: 'duration', label: 'Time', icon: 'time' },
    { key: 'workouts', label: 'Workouts', icon: 'barbell' },
  ];

  const getWeekTotal = (metric: MetricType) => {
    return mockWeeklyProgress.days.reduce((sum, day) => {
      switch (metric) {
        case 'calories':
          return sum + day.calories;
        case 'duration':
          return sum + day.duration;
        case 'workouts':
          return sum + day.workouts;
        default:
          return sum;
      }
    }, 0);
  };

  const getWeekAverage = (metric: MetricType) => {
    const total = getWeekTotal(metric);
    return Math.round(total / mockWeeklyProgress.days.length);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.header}>
        <Text style={styles.title}>Progress</Text>
        <Ionicons name="stats-chart" size={iconSizes.lg} color={colors.primary} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Card style={styles.metricSelector}>
          <Text style={styles.sectionTitle}>Select Metric</Text>
          <View style={styles.metricButtons}>
            {metrics.map((metric) => (
              <TouchableOpacity
                key={metric.key}
                style={[
                  styles.metricButton,
                  selectedMetric === metric.key && styles.metricButtonActive,
                ]}
                onPress={() => setSelectedMetric(metric.key)}
                activeOpacity={0.7}
              >
                <Ionicons
                  name={metric.icon}
                  size={iconSizes.md}
                  color={selectedMetric === metric.key ? colors.textInverse : colors.primary}
                />
                <Text
                  style={[
                    styles.metricButtonText,
                    selectedMetric === metric.key && styles.metricButtonTextActive,
                  ]}
                >
                  {metric.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </Card>

        <View style={styles.summaryCards}>
          <Card style={styles.summaryCard}>
            <Text style={styles.summaryLabel}>Week Total</Text>
            <Text style={styles.summaryValue}>
              {selectedMetric === 'calories' && `${getWeekTotal(selectedMetric)} cal`}
              {selectedMetric === 'duration' && `${getWeekTotal(selectedMetric)} min`}
              {selectedMetric === 'workouts' && getWeekTotal(selectedMetric)}
            </Text>
          </Card>

          <Card style={styles.summaryCard}>
            <Text style={styles.summaryLabel}>Daily Average</Text>
            <Text style={styles.summaryValue}>
              {selectedMetric === 'calories' && `${getWeekAverage(selectedMetric)} cal`}
              {selectedMetric === 'duration' && `${getWeekAverage(selectedMetric)} min`}
              {selectedMetric === 'workouts' && getWeekAverage(selectedMetric)}
            </Text>
          </Card>
        </View>

        <ProgressChart data={mockWeeklyProgress} metric={selectedMetric} />

        <View style={styles.statsSection}>
          <Text style={styles.sectionTitle}>Overall Statistics</Text>

          <Card>
            <View style={styles.statRow}>
              <View style={styles.statItem}>
                <Ionicons name="trophy" size={iconSizes.lg} color={colors.primary} />
                <View style={styles.statContent}>
                  <Text style={styles.statValue}>{mockUserStats.totalWorkouts}</Text>
                  <Text style={styles.statLabel}>Total Workouts</Text>
                </View>
              </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.statRow}>
              <View style={styles.statItem}>
                <Ionicons name="flame" size={iconSizes.lg} color={colors.secondary} />
                <View style={styles.statContent}>
                  <Text style={styles.statValue}>
                    {(mockUserStats.totalCalories / 1000).toFixed(1)}k
                  </Text>
                  <Text style={styles.statLabel}>Total Calories Burned</Text>
                </View>
              </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.statRow}>
              <View style={styles.statItem}>
                <Ionicons name="time" size={iconSizes.lg} color={colors.accent} />
                <View style={styles.statContent}>
                  <Text style={styles.statValue}>
                    {Math.floor(mockUserStats.totalMinutes / 60)}h{' '}
                    {mockUserStats.totalMinutes % 60}m
                  </Text>
                  <Text style={styles.statLabel}>Total Exercise Time</Text>
                </View>
              </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.statRow}>
              <View style={styles.statItem}>
                <Ionicons name="calendar" size={iconSizes.lg} color={colors.primary} />
                <View style={styles.statContent}>
                  <Text style={styles.statValue}>{mockUserStats.streak} days</Text>
                  <Text style={styles.statLabel}>Current Streak</Text>
                </View>
              </View>
            </View>
          </Card>
        </View>

        <View style={{ height: spacing.xl }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  title: {
    ...typography.h1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: spacing.lg,
  },
  metricSelector: {
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    ...typography.h4,
    marginBottom: spacing.md,
  },
  metricButtons: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  metricButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.md,
    backgroundColor: colors.primaryLight,
  },
  metricButtonActive: {
    backgroundColor: colors.primary,
  },
  metricButtonText: {
    ...typography.body,
    fontWeight: '600',
    color: colors.primary,
  },
  metricButtonTextActive: {
    color: colors.textInverse,
  },
  summaryCards: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.lg,
  },
  summaryCard: {
    flex: 1,
    alignItems: 'center',
  },
  summaryLabel: {
    ...typography.label,
    marginBottom: spacing.xs,
  },
  summaryValue: {
    ...typography.numberSmall,
    color: colors.primary,
  },
  statsSection: {
    marginTop: spacing.lg,
  },
  statRow: {
    paddingVertical: spacing.sm,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  statContent: {
    flex: 1,
  },
  statValue: {
    ...typography.h4,
    marginBottom: spacing.xs,
  },
  statLabel: {
    ...typography.bodySmall,
  },
  divider: {
    height: 1,
    backgroundColor: colors.divider,
    marginVertical: spacing.sm,
  },
});
