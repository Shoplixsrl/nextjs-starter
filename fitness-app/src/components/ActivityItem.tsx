import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Activity } from '../types/types';
import { colors, typography, spacing, borderRadius, iconSizes } from '../theme';

interface ActivityItemProps {
  activity: Activity;
  onPress?: () => void;
}

export const ActivityItem: React.FC<ActivityItemProps> = ({ activity, onPress }) => {
  const getTypeIcon = (type: string) => {
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

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'cardio':
        return colors.primary;
      case 'strength':
        return colors.secondary;
      case 'flexibility':
        return colors.accent;
      case 'hiit':
        return colors.error;
      default:
        return colors.textSecondary;
    }
  };

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7} disabled={!onPress}>
      <View style={styles.container}>
        <View style={[styles.iconContainer, { backgroundColor: `${getTypeColor(activity.type)}20` }]}>
          <Ionicons
            name={getTypeIcon(activity.type) as any}
            size={iconSizes.md}
            color={getTypeColor(activity.type)}
          />
        </View>

        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title}>{activity.workoutName}</Text>
            {activity.completed && (
              <Ionicons name="checkmark-circle" size={iconSizes.sm} color={colors.success} />
            )}
          </View>

          <View style={styles.stats}>
            <View style={styles.stat}>
              <Ionicons name="time-outline" size={iconSizes.xs} color={colors.textSecondary} />
              <Text style={styles.statText}>{activity.duration} min</Text>
            </View>
            <View style={styles.stat}>
              <Ionicons name="flame-outline" size={iconSizes.xs} color={colors.textSecondary} />
              <Text style={styles.statText}>{activity.calories} cal</Text>
            </View>
          </View>
        </View>

        {!activity.completed && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>Todo</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.backgroundCard,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.sm,
    shadowColor: colors.shadow,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.sm,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.xs,
  },
  title: {
    ...typography.body,
    fontWeight: '600',
    flex: 1,
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
    color: colors.textSecondary,
  },
  badge: {
    backgroundColor: colors.primaryLight,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
  },
  badgeText: {
    ...typography.caption,
    color: colors.primary,
    fontWeight: '600',
  },
});
