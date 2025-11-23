import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  Modal,
} from 'react-native';
import Animated, {
  FadeIn,
  FadeInDown,
  FadeOut,
  Layout,
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { WorkoutCard } from '../components/WorkoutCard';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { mockWorkouts } from '../data/mockData';
import { Workout } from '../types/types';
import { colors, typography, spacing, borderRadius, iconSizes } from '../theme';

export const WorkoutsScreen: React.FC = () => {
  const [selectedWorkout, setSelectedWorkout] = useState<Workout | null>(null);
  const [filter, setFilter] = useState<'all' | 'cardio' | 'strength' | 'flexibility' | 'hiit'>('all');

  const filters = [
    { key: 'all' as const, label: 'All', icon: 'apps' as const },
    { key: 'cardio' as const, label: 'Cardio', icon: 'heart' as const },
    { key: 'strength' as const, label: 'Strength', icon: 'barbell' as const },
    { key: 'flexibility' as const, label: 'Flexibility', icon: 'body' as const },
    { key: 'hiit' as const, label: 'HIIT', icon: 'flash' as const },
  ];

  const filteredWorkouts = filter === 'all'
    ? mockWorkouts
    : mockWorkouts.filter(w => w.type === filter);

  const handleWorkoutPress = (workout: Workout) => {
    setSelectedWorkout(workout);
  };

  const handleCloseModal = () => {
    setSelectedWorkout(null);
  };

  const handleStartWorkout = () => {
    handleCloseModal();
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.header}>
        <Text style={styles.title}>Workouts</Text>
        <Ionicons name="fitness" size={iconSizes.lg} color={colors.primary} />
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filterScroll}
        contentContainerStyle={styles.filterContent}
      >
        {filters.map((item) => (
          <TouchableOpacity
            key={item.key}
            style={[
              styles.filterButton,
              filter === item.key && styles.filterButtonActive,
            ]}
            onPress={() => setFilter(item.key)}
            activeOpacity={0.7}
          >
            <Ionicons
              name={item.icon}
              size={iconSizes.sm}
              color={filter === item.key ? colors.textInverse : colors.primary}
            />
            <Text
              style={[
                styles.filterText,
                filter === item.key && styles.filterTextActive,
              ]}
            >
              {item.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {filteredWorkouts.map((workout, index) => (
          <Animated.View
            key={workout.id}
            entering={FadeInDown.delay(index * 100)}
            layout={Layout.springify()}
          >
            <WorkoutCard workout={workout} onPress={() => handleWorkoutPress(workout)} />
          </Animated.View>
        ))}

        {filteredWorkouts.length === 0 && (
          <Animated.View entering={FadeIn}>
            <Card>
              <View style={styles.emptyState}>
                <Ionicons name="search-outline" size={iconSizes.xl} color={colors.textLight} />
                <Text style={styles.emptyText}>No workouts found</Text>
              </View>
            </Card>
          </Animated.View>
        )}

        <View style={{ height: spacing.xl }} />
      </ScrollView>

      <Modal
        visible={!!selectedWorkout}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={handleCloseModal}
      >
        {selectedWorkout && (
          <SafeAreaView style={styles.modalContainer} edges={['top', 'bottom']}>
            <LinearGradient
              colors={[colors.gradientStart, colors.gradientMiddle]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.modalHeader}
            >
              <TouchableOpacity onPress={handleCloseModal} style={styles.closeButton}>
                <Ionicons name="close" size={iconSizes.lg} color={colors.textInverse} />
              </TouchableOpacity>

              <Text style={styles.modalTitle}>{selectedWorkout.name}</Text>
              <Text style={styles.modalSubtitle}>{selectedWorkout.description}</Text>

              <View style={styles.modalStats}>
                <View style={styles.modalStat}>
                  <Ionicons name="time" size={iconSizes.md} color={colors.textInverse} />
                  <Text style={styles.modalStatText}>{selectedWorkout.duration} min</Text>
                </View>
                <View style={styles.modalStat}>
                  <Ionicons name="flame" size={iconSizes.md} color={colors.textInverse} />
                  <Text style={styles.modalStatText}>{selectedWorkout.calories} cal</Text>
                </View>
                <View style={styles.modalStat}>
                  <Ionicons name="trophy" size={iconSizes.md} color={colors.textInverse} />
                  <Text style={styles.modalStatText}>{selectedWorkout.difficulty}</Text>
                </View>
              </View>
            </LinearGradient>

            <ScrollView
              style={styles.modalContent}
              contentContainerStyle={styles.modalScrollContent}
            >
              <Text style={styles.exercisesTitle}>Exercises ({selectedWorkout.exercises.length})</Text>

              {selectedWorkout.exercises.map((exercise, index) => (
                <Animated.View
                  key={exercise.id}
                  entering={FadeInDown.delay(index * 50)}
                >
                  <Card style={styles.exerciseCard}>
                    <View style={styles.exerciseHeader}>
                      <View style={styles.exerciseNumber}>
                        <Text style={styles.exerciseNumberText}>{index + 1}</Text>
                      </View>
                      <Text style={styles.exerciseName}>{exercise.name}</Text>
                    </View>

                    <View style={styles.exerciseDetails}>
                      {exercise.sets && (
                        <View style={styles.exerciseDetail}>
                          <Ionicons name="repeat" size={iconSizes.sm} color={colors.primary} />
                          <Text style={styles.exerciseDetailText}>{exercise.sets} sets</Text>
                        </View>
                      )}
                      {exercise.reps && (
                        <View style={styles.exerciseDetail}>
                          <Ionicons name="fitness" size={iconSizes.sm} color={colors.secondary} />
                          <Text style={styles.exerciseDetailText}>{exercise.reps} reps</Text>
                        </View>
                      )}
                      {exercise.duration && (
                        <View style={styles.exerciseDetail}>
                          <Ionicons name="time" size={iconSizes.sm} color={colors.accent} />
                          <Text style={styles.exerciseDetailText}>{exercise.duration}s</Text>
                        </View>
                      )}
                      {exercise.rest && (
                        <View style={styles.exerciseDetail}>
                          <Ionicons name="pause" size={iconSizes.sm} color={colors.textSecondary} />
                          <Text style={styles.exerciseDetailText}>{exercise.rest}s rest</Text>
                        </View>
                      )}
                    </View>
                  </Card>
                </Animated.View>
              ))}
            </ScrollView>

            <View style={styles.modalFooter}>
              <Button title="Start Workout" onPress={handleStartWorkout} />
            </View>
          </SafeAreaView>
        )}
      </Modal>
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
  filterScroll: {
    maxHeight: 60,
  },
  filterContent: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
    gap: spacing.sm,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.md,
    backgroundColor: colors.primaryLight,
    marginRight: spacing.sm,
  },
  filterButtonActive: {
    backgroundColor: colors.primary,
  },
  filterText: {
    ...typography.body,
    fontWeight: '600',
    color: colors.primary,
  },
  filterTextActive: {
    color: colors.textInverse,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: spacing.xxxl,
  },
  emptyText: {
    ...typography.body,
    color: colors.textLight,
    marginTop: spacing.md,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },
  modalHeader: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.xl,
  },
  closeButton: {
    alignSelf: 'flex-start',
    marginBottom: spacing.md,
  },
  modalTitle: {
    ...typography.h1,
    color: colors.textInverse,
    marginBottom: spacing.sm,
  },
  modalSubtitle: {
    ...typography.bodyLarge,
    color: colors.textInverse,
    opacity: 0.9,
    marginBottom: spacing.lg,
  },
  modalStats: {
    flexDirection: 'row',
    gap: spacing.lg,
  },
  modalStat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  modalStatText: {
    ...typography.body,
    color: colors.textInverse,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  modalContent: {
    flex: 1,
  },
  modalScrollContent: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
  },
  exercisesTitle: {
    ...typography.h3,
    marginBottom: spacing.md,
  },
  exerciseCard: {
    marginBottom: spacing.md,
  },
  exerciseHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  exerciseNumber: {
    width: 32,
    height: 32,
    borderRadius: borderRadius.round,
    backgroundColor: colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  exerciseNumberText: {
    ...typography.body,
    fontWeight: '700',
    color: colors.primary,
  },
  exerciseName: {
    ...typography.h4,
    flex: 1,
  },
  exerciseDetails: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  exerciseDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  exerciseDetailText: {
    ...typography.bodySmall,
  },
  modalFooter: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.divider,
  },
});
