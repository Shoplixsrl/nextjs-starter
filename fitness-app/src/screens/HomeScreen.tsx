import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  Dimensions,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatsCard } from '../components/StatsCard';
import { ActivityItem } from '../components/ActivityItem';
import { Card } from '../components/Card';
import { mockActivities, mockUserStats } from '../data/mockData';
import { colors, typography, spacing, borderRadius, iconSizes } from '../theme';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const HEADER_HEIGHT = 200;

const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);

export const HomeScreen: React.FC = () => {
  const scrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  const headerAnimatedStyle = useAnimatedStyle(() => {
    const height = interpolate(
      scrollY.value,
      [0, HEADER_HEIGHT],
      [HEADER_HEIGHT, 80],
      Extrapolate.CLAMP
    );

    const opacity = interpolate(
      scrollY.value,
      [0, HEADER_HEIGHT / 2],
      [1, 0],
      Extrapolate.CLAMP
    );

    return {
      height,
      opacity,
    };
  });

  const titleAnimatedStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      scrollY.value,
      [0, HEADER_HEIGHT],
      [0, -20],
      Extrapolate.CLAMP
    );

    const scale = interpolate(
      scrollY.value,
      [0, HEADER_HEIGHT],
      [1, 0.8],
      Extrapolate.CLAMP
    );

    return {
      transform: [{ translateY }, { scale }],
    };
  });

  const todayActivities = mockActivities.filter(
    (activity) =>
      new Date(activity.date).toDateString() === new Date().toDateString()
  );

  const completedToday = todayActivities.filter((a) => a.completed).length;
  const totalToday = todayActivities.length;

  const getTodayCalories = () => {
    return todayActivities
      .filter((a) => a.completed)
      .reduce((sum, a) => sum + a.calories, 0);
  };

  const getTodayDuration = () => {
    return todayActivities
      .filter((a) => a.completed)
      .reduce((sum, a) => sum + a.duration, 0);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      <Animated.View style={[styles.header, headerAnimatedStyle]}>
        <LinearGradient
          colors={[colors.gradientStart, colors.gradientMiddle, colors.gradientEnd]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.headerGradient}
        >
          <SafeAreaView edges={['top']} style={styles.headerContent}>
            <Animated.View style={titleAnimatedStyle}>
              <Text style={styles.greeting}>Welcome back!</Text>
              <Text style={styles.date}>
                {new Date().toLocaleDateString('en-US', {
                  weekday: 'long',
                  month: 'long',
                  day: 'numeric',
                })}
              </Text>
            </Animated.View>
          </SafeAreaView>
        </LinearGradient>
      </Animated.View>

      <AnimatedScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
      >
        <View style={styles.statsContainer}>
          <View style={styles.statsRow}>
            <StatsCard
              title="Calories"
              value={getTodayCalories()}
              subtitle="burned today"
              icon="flame"
              gradientColors={[colors.primary, colors.secondary]}
            />
            <StatsCard
              title="Minutes"
              value={getTodayDuration()}
              subtitle="exercised"
              icon="time"
              gradientColors={[colors.secondary, colors.accent]}
            />
          </View>
          <View style={styles.statsRow}>
            <StatsCard
              title="Streak"
              value={`${mockUserStats.streak} days`}
              subtitle="Keep it up!"
              icon="trophy"
              gradientColors={[colors.accent, colors.secondary]}
            />
            <StatsCard
              title="Workouts"
              value={`${completedToday}/${totalToday}`}
              subtitle="completed"
              icon="checkmark-circle"
              gradientColors={[colors.primary, colors.accent]}
            />
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Today's Activities</Text>
            <Ionicons name="calendar" size={iconSizes.md} color={colors.primary} />
          </View>

          {todayActivities.length > 0 ? (
            todayActivities.map((activity) => (
              <ActivityItem key={activity.id} activity={activity} />
            ))
          ) : (
            <Card>
              <View style={styles.emptyState}>
                <Ionicons
                  name="calendar-outline"
                  size={iconSizes.xl}
                  color={colors.textLight}
                />
                <Text style={styles.emptyText}>No activities scheduled for today</Text>
              </View>
            </Card>
          )}
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Quick Stats</Text>
            <Ionicons name="stats-chart" size={iconSizes.md} color={colors.primary} />
          </View>

          <Card>
            <View style={styles.quickStatsGrid}>
              <View style={styles.quickStat}>
                <Text style={styles.quickStatValue}>{mockUserStats.totalWorkouts}</Text>
                <Text style={styles.quickStatLabel}>Total Workouts</Text>
              </View>
              <View style={styles.quickStat}>
                <Text style={styles.quickStatValue}>
                  {Math.round(mockUserStats.totalMinutes / 60)}h
                </Text>
                <Text style={styles.quickStatLabel}>Total Time</Text>
              </View>
              <View style={styles.quickStat}>
                <Text style={styles.quickStatValue}>
                  {(mockUserStats.totalCalories / 1000).toFixed(1)}k
                </Text>
                <Text style={styles.quickStatLabel}>Total Calories</Text>
              </View>
            </View>
          </Card>
        </View>

        <View style={{ height: spacing.xxxl }} />
      </AnimatedScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    overflow: 'hidden',
  },
  headerGradient: {
    flex: 1,
  },
  headerContent: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
  },
  greeting: {
    ...typography.h1,
    color: colors.textInverse,
    marginBottom: spacing.xs,
  },
  date: {
    ...typography.body,
    color: colors.textInverse,
    opacity: 0.9,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: HEADER_HEIGHT + spacing.md,
    paddingHorizontal: spacing.lg,
  },
  statsContainer: {
    marginBottom: spacing.lg,
  },
  statsRow: {
    flexDirection: 'row',
    marginHorizontal: -spacing.xs,
  },
  section: {
    marginBottom: spacing.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  sectionTitle: {
    ...typography.h3,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: spacing.xl,
  },
  emptyText: {
    ...typography.body,
    color: colors.textLight,
    marginTop: spacing.md,
  },
  quickStatsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quickStat: {
    flex: 1,
    alignItems: 'center',
  },
  quickStatValue: {
    ...typography.numberSmall,
    color: colors.primary,
    marginBottom: spacing.xs,
  },
  quickStatLabel: {
    ...typography.caption,
    textAlign: 'center',
  },
});
