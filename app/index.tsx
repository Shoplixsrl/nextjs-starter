import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Colors } from '@/constants/Colors';
import { Theme } from '@/constants/Theme';
import meditationsData from '@/data/meditations.json';
import type { MeditationSession } from '@/types';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState(false);

  useEffect(() => {
    checkOnboarding();
  }, []);

  const checkOnboarding = async () => {
    try {
      const value = await AsyncStorage.getItem('hasSeenOnboarding');
      if (value === null) {
        router.replace('/onboarding');
      } else {
        setHasSeenOnboarding(true);
      }
    } catch (error) {
      console.error('Error checking onboarding:', error);
      setHasSeenOnboarding(true);
    }
  };

  const handleMeditationPress = async (meditation: MeditationSession) => {
    await AsyncStorage.setItem('hasSeenOnboarding', 'true');
    router.push(`/meditation/${meditation.id}`);
  };

  if (!hasSeenOnboarding) {
    return null;
  }

  const getCategoryGradient = (category: string) => {
    switch (category) {
      case 'sleep':
        return Colors.gradients.evening;
      case 'focus':
        return Colors.gradients.calm;
      case 'anxiety':
        return Colors.gradients.morning;
      default:
        return Colors.gradients.morning;
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      <LinearGradient
        colors={[Colors.background, Colors.primary.lilac]}
        style={styles.header}
      >
        <Text style={styles.greeting}>Ciao 👋</Text>
        <Text style={styles.title}>Trova la tua calma</Text>
      </LinearGradient>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.sectionTitle}>Sessioni di Meditazione</Text>

        {meditationsData.map((meditation, index) => (
          <Animated.View
            key={meditation.id}
            entering={FadeInDown.delay(index * 100)}
          >
            <TouchableOpacity
              onPress={() => handleMeditationPress(meditation as MeditationSession)}
              activeOpacity={0.8}
              style={styles.card}
            >
              <LinearGradient
                colors={getCategoryGradient(meditation.category)}
                style={styles.cardGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <View style={styles.cardContent}>
                  <View style={styles.cardHeader}>
                    <Text style={styles.cardTitle}>{meditation.title}</Text>
                    <View style={styles.durationBadge}>
                      <Text style={styles.durationText}>
                        {meditation.duration} min
                      </Text>
                    </View>
                  </View>
                  <Text style={styles.cardDescription}>
                    {meditation.description}
                  </Text>
                </View>
              </LinearGradient>
            </TouchableOpacity>
          </Animated.View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: Theme.spacing.xl,
    paddingBottom: Theme.spacing.xl,
    borderBottomLeftRadius: Theme.borderRadius.lg,
    borderBottomRightRadius: Theme.borderRadius.lg,
  },
  greeting: {
    fontSize: Theme.fontSize.lg,
    color: Colors.text.secondary,
    marginBottom: Theme.spacing.xs,
  },
  title: {
    fontSize: Theme.fontSize.xxl,
    fontWeight: Theme.fontWeight.bold,
    color: Colors.text.primary,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: Theme.spacing.xl,
    gap: Theme.spacing.md,
  },
  sectionTitle: {
    fontSize: Theme.fontSize.xl,
    fontWeight: Theme.fontWeight.semibold,
    color: Colors.text.primary,
    marginBottom: Theme.spacing.md,
  },
  card: {
    borderRadius: Theme.borderRadius.lg,
    overflow: 'hidden',
    marginBottom: Theme.spacing.md,
    ...Theme.shadows.md,
  },
  cardGradient: {
    padding: Theme.spacing.lg,
  },
  cardContent: {
    gap: Theme.spacing.sm,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: Theme.fontSize.lg,
    fontWeight: Theme.fontWeight.semibold,
    color: Colors.text.primary,
    flex: 1,
  },
  durationBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: Theme.spacing.xs,
    borderRadius: Theme.borderRadius.full,
  },
  durationText: {
    fontSize: Theme.fontSize.sm,
    fontWeight: Theme.fontWeight.medium,
    color: Colors.text.primary,
  },
  cardDescription: {
    fontSize: Theme.fontSize.md,
    color: Colors.text.secondary,
    lineHeight: Theme.fontSize.md * 1.5,
  },
});
