import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, typography, spacing, borderRadius, iconSizes } from '../theme';

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: keyof typeof Ionicons.glyphMap;
  gradientColors?: readonly [string, string, ...string[]];
}

export const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  subtitle,
  icon,
  gradientColors = [colors.gradientStart, colors.gradientMiddle] as const,
}) => {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={gradientColors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        <View style={styles.iconContainer}>
          <Ionicons name={icon} size={iconSizes.lg} color={colors.textInverse} />
        </View>

        <View style={styles.content}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.value}>{value}</Text>
          {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    marginHorizontal: spacing.xs,
    marginBottom: spacing.md,
    shadowColor: colors.shadow,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  gradient: {
    padding: spacing.md,
    minHeight: 120,
  },
  iconContainer: {
    marginBottom: spacing.sm,
  },
  content: {
    flex: 1,
  },
  title: {
    ...typography.label,
    color: colors.textInverse,
    opacity: 0.9,
    marginBottom: spacing.xs,
  },
  value: {
    ...typography.numberSmall,
    color: colors.textInverse,
  },
  subtitle: {
    ...typography.caption,
    color: colors.textInverse,
    opacity: 0.8,
    marginTop: spacing.xs,
  },
});
