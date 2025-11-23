import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  FadeIn,
  FadeOut,
  SlideInRight,
} from 'react-native-reanimated';
import { StatusBar } from 'expo-status-bar';
import { GradientButton } from '@/components/GradientButton';
import { Colors } from '@/constants/Colors';
import { Theme } from '@/constants/Theme';
import onboardingData from '@/data/onboarding.json';

const { width } = Dimensions.get('window');

export default function OnboardingScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const handleNext = () => {
    if (currentIndex < onboardingData.length - 1) {
      const nextIndex = currentIndex + 1;
      flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
      setCurrentIndex(nextIndex);
    } else {
      router.replace('/');
    }
  };

  const handleSkip = () => {
    router.replace('/');
  };

  return (
    <LinearGradient
      colors={Colors.gradients.morning}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
    >
      <StatusBar style="dark" />

      <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
        <Text style={styles.skipText}>Salta</Text>
      </TouchableOpacity>

      <FlatList
        ref={flatListRef}
        data={onboardingData}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEnabled={false}
        keyExtractor={(item) => item.id}
        onMomentumScrollEnd={(event) => {
          const index = Math.round(event.nativeEvent.contentOffset.x / width);
          setCurrentIndex(index);
        }}
        renderItem={({ item }) => (
          <Animated.View
            entering={SlideInRight}
            style={styles.slide}
          >
            <View style={styles.emojiContainer}>
              <Animated.Text
                entering={FadeIn.delay(200)}
                style={styles.emoji}
              >
                {item.emoji}
              </Animated.Text>
            </View>
            <Animated.Text
              entering={FadeIn.delay(400)}
              style={styles.title}
            >
              {item.title}
            </Animated.Text>
            <Animated.Text
              entering={FadeIn.delay(600)}
              style={styles.description}
            >
              {item.description}
            </Animated.Text>
          </Animated.View>
        )}
      />

      <View style={styles.footer}>
        <View style={styles.pagination}>
          {onboardingData.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                index === currentIndex && styles.dotActive,
              ]}
            />
          ))}
        </View>

        <GradientButton
          title={currentIndex === onboardingData.length - 1 ? 'Inizia' : 'Avanti'}
          onPress={handleNext}
        />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  skipButton: {
    position: 'absolute',
    top: 60,
    right: Theme.spacing.lg,
    zIndex: 10,
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: Theme.spacing.sm,
  },
  skipText: {
    fontSize: Theme.fontSize.md,
    color: Colors.text.secondary,
    fontWeight: Theme.fontWeight.medium,
  },
  slide: {
    width,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Theme.spacing.xl,
  },
  emojiContainer: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Theme.spacing.xxl,
  },
  emoji: {
    fontSize: 80,
  },
  title: {
    fontSize: Theme.fontSize.xxl,
    fontWeight: Theme.fontWeight.bold,
    color: Colors.text.primary,
    textAlign: 'center',
    marginBottom: Theme.spacing.md,
  },
  description: {
    fontSize: Theme.fontSize.lg,
    color: Colors.text.secondary,
    textAlign: 'center',
    lineHeight: Theme.fontSize.lg * 1.5,
    maxWidth: '80%',
  },
  footer: {
    paddingHorizontal: Theme.spacing.xl,
    paddingBottom: Theme.spacing.xxl,
    gap: Theme.spacing.xl,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: Theme.spacing.sm,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(74, 74, 106, 0.2)',
  },
  dotActive: {
    width: 24,
    backgroundColor: Colors.text.primary,
  },
});
