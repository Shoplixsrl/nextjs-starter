import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Workout } from '../types/types';
import { colors, typography, spacing, borderRadius, iconSizes } from '../theme';

interface WorkoutCardProps {
  workout: Workout;
  onPress: () => void;
}

export const WorkoutCard: React.FC<WorkoutCardProps> = ({ workout, onPress }) => {
  const getWorkoutIcon = (type: string) => {
    switch (type) {
      case 'cardio':
        return 'heart';
      case 'strength':
        return 'barbell';
      case 'flexibility':
        return 'body';
      case 'hiit':
        return 'flash';
      default:
        return 'fitness';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return colors.success;
      case 'intermediate':
        return colors.warning;
      case 'advanced':
        return colors.error;
      default:
        return colors.textSecondary;
    }
  };

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <View style={styles.card}>
        <LinearGradient
          colors={[colors.gradientStart, colors.gradientMiddle]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.iconContainer}
        >
          <Ionicons
            name={getWorkoutIcon(workout.type) as any}
            size={iconSizes.lg}
            color={colors.textInverse}
          />
        </LinearGradient>

        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title} numberOfLines={1}>
              {workout.name}
            </Text>
            <View
              style={[
                styles.difficultyBadge,
                { backgroundColor: `${getDifficultyColor(workout.difficulty)}20` },
              ]}
            >
              <Text
                style={[styles.difficultyText, { color: getDifficultyColor(workout.difficulty) }]}
              >
                {workout.difficulty}
              </Text>
            </View>
          </View>

          <Text style={styles.description} numberOfLines={2}>
            {workout.description}
          </Text>

          <View style={styles.stats}>
            <View style={styles.stat}>
              <Ionicons name="time-outline" size={iconSizes.sm} color={colors.primary} />
              <Text style={styles.statText}>{workout.duration} min</Text>
            </View>
            <View style={styles.stat}>
              <Ionicons name="flame-outline" size={iconSizes.sm} color={colors.secondary} />
              <Text style={styles.statText}>{workout.calories} cal</Text>
            </View>
            <View style={styles.stat}>
              <Ionicons name="list-outline" size={iconSizes.sm} color={colors.accent} />
              <Text style={styles.statText}>{workout.exercises.length} exercises</Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: colors.backgroundCard,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.md,
    shadowColor: colors.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.xs,
  },
  title: {
    ...typography.h4,
    flex: 1,
    marginRight: spacing.sm,
  },
  difficultyBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
  },
  difficultyText: {
    ...typography.caption,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  description: {
    ...typography.bodySmall,
    marginBottom: spacing.sm,
  },
  stats: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  statText: {
    ...typography.caption,
    color: colors.text,
  },
});
