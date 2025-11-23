import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import Animated, {
  FadeIn,
  FadeOut,
  useAnimatedStyle,
  withSpring,
  useSharedValue,
} from 'react-native-reanimated';
import { StatusBar } from 'expo-status-bar';
import { Audio } from 'expo-av';
import * as Haptics from 'expo-haptics';
import { BreathingCircle } from '@/components/BreathingCircle';
import { MeditationTimer } from '@/components/MeditationTimer';
import { GradientButton } from '@/components/GradientButton';
import { Colors } from '@/constants/Colors';
import { Theme } from '@/constants/Theme';
import meditationsData from '@/data/meditations.json';
import type { MeditationSession } from '@/types';

const { width, height } = Dimensions.get('window');

export default function MeditationScreen() {
  const { id } = useLocalSearchParams();
  const meditation = meditationsData.find((m) => m.id === id) as MeditationSession | undefined;

  const [isPlaying, setIsPlaying] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const soundRef = useRef<Audio.Sound>();
  const timerRef = useRef<NodeJS.Timeout>();

  const opacity = useSharedValue(0);

  useEffect(() => {
    if (meditation) {
      setTimeRemaining(meditation.duration * 60); // Convert to seconds
    }

    return () => {
      if (soundRef.current) {
        soundRef.current.unloadAsync();
      }
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [meditation]);

  useEffect(() => {
    opacity.value = withSpring(isPlaying ? 1 : 0);
  }, [isPlaying]);

  const handlePlayPause = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    if (isPlaying) {
      // Pause
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      if (soundRef.current) {
        await soundRef.current.pauseAsync();
      }
      setIsPlaying(false);
    } else {
      // Play
      setIsPlaying(true);

      // Mock sound - in real app, load actual audio file
      try {
        const { sound } = await Audio.Sound.createAsync(
          { uri: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
          { shouldPlay: false, isLooping: true, volume: 0.3 }
        );
        soundRef.current = sound;
        await sound.playAsync();
      } catch (error) {
        console.log('Audio loading error (expected in mock):', error);
      }

      // Start timer
      timerRef.current = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            handleComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
  };

  const handleComplete = async () => {
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    setIsPlaying(false);
    setIsComplete(true);

    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    if (soundRef.current) {
      await soundRef.current.stopAsync();
    }
  };

  const handleClose = () => {
    router.back();
  };

  const animatedOverlayStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  if (!meditation) {
    return null;
  }

  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;

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
      <StatusBar style="light" />

      <LinearGradient
        colors={getCategoryGradient(meditation.category)}
        style={styles.background}
      >
        {/* Close Button */}
        <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
          <BlurView intensity={20} style={styles.closeBlur}>
            <Text style={styles.closeText}>✕</Text>
          </BlurView>
        </TouchableOpacity>

        {/* Main Content */}
        <View style={styles.content}>
          <Animated.View entering={FadeIn.delay(200)} style={styles.header}>
            <Text style={styles.title}>{meditation.title}</Text>
            <Text style={styles.description}>{meditation.description}</Text>
          </Animated.View>

          {/* Breathing Animation */}
          <Animated.View entering={FadeIn.delay(400)}>
            <BreathingCircle isActive={isPlaying} size={240} />
          </Animated.View>

          {/* Timer */}
          <Animated.View entering={FadeIn.delay(600)}>
            <MeditationTimer minutes={minutes} seconds={seconds} />
          </Animated.View>

          {/* Breathing Instruction (only when playing) */}
          {isPlaying && (
            <Animated.View
              entering={FadeIn}
              exiting={FadeOut}
              style={styles.instructionContainer}
            >
              <Text style={styles.instruction}>Respira con il cerchio</Text>
            </Animated.View>
          )}

          {/* Play/Pause Button */}
          <Animated.View entering={FadeIn.delay(800)} style={styles.controls}>
            {!isComplete ? (
              <GradientButton
                title={isPlaying ? 'Pausa' : 'Inizia'}
                onPress={handlePlayPause}
                gradient={['rgba(255, 255, 255, 0.8)', 'rgba(255, 255, 255, 0.6)']}
              />
            ) : (
              <View style={styles.completedContainer}>
                <Text style={styles.completedEmoji}>✨</Text>
                <Text style={styles.completedText}>Sessione completata!</Text>
                <GradientButton
                  title="Torna alla Home"
                  onPress={handleClose}
                  gradient={['rgba(255, 255, 255, 0.8)', 'rgba(255, 255, 255, 0.6)']}
                />
              </View>
            )}
          </Animated.View>
        </View>

        {/* Blur Overlay when playing */}
        <Animated.View
          style={[styles.overlay, animatedOverlayStyle]}
          pointerEvents="none"
        >
          <BlurView intensity={10} style={StyleSheet.absoluteFill} />
        </Animated.View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
  },
  closeButton: {
    position: 'absolute',
    top: 60,
    right: Theme.spacing.lg,
    zIndex: 10,
    borderRadius: Theme.borderRadius.full,
    overflow: 'hidden',
  },
  closeBlur: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeText: {
    fontSize: Theme.fontSize.xl,
    color: Colors.text.primary,
  },
  content: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingHorizontal: Theme.spacing.xl,
    paddingVertical: Theme.spacing.xxl * 2,
  },
  header: {
    alignItems: 'center',
    gap: Theme.spacing.sm,
  },
  title: {
    fontSize: Theme.fontSize.xxl,
    fontWeight: Theme.fontWeight.bold,
    color: Colors.text.primary,
    textAlign: 'center',
  },
  description: {
    fontSize: Theme.fontSize.md,
    color: Colors.text.secondary,
    textAlign: 'center',
    maxWidth: '80%',
    lineHeight: Theme.fontSize.md * 1.5,
  },
  instructionContainer: {
    paddingVertical: Theme.spacing.md,
  },
  instruction: {
    fontSize: Theme.fontSize.lg,
    color: Colors.text.secondary,
    fontWeight: Theme.fontWeight.medium,
    textAlign: 'center',
  },
  controls: {
    width: '100%',
    alignItems: 'center',
  },
  completedContainer: {
    alignItems: 'center',
    gap: Theme.spacing.md,
  },
  completedEmoji: {
    fontSize: 64,
  },
  completedText: {
    fontSize: Theme.fontSize.xl,
    fontWeight: Theme.fontWeight.semibold,
    color: Colors.text.primary,
    marginBottom: Theme.spacing.md,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
});
