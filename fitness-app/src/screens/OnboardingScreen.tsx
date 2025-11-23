import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withRepeat,
  withSequence,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import Svg, { Circle, Path, Rect, G } from 'react-native-svg';
import { Button } from '../components/Button';
import { onboardingSlides } from '../data/mockData';
import { colors, typography, spacing, borderRadius, iconSizes } from '../theme';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

interface OnboardingScreenProps {
  onComplete: () => void;
}

const AnimatedSvgIcon: React.FC<{ iconName: string }> = ({ iconName }) => {
  const scale = useSharedValue(1);
  const rotation = useSharedValue(0);

  React.useEffect(() => {
    scale.value = withRepeat(
      withSequence(
        withSpring(1.1, { damping: 2 }),
        withSpring(1, { damping: 2 })
      ),
      -1,
      true
    );

    rotation.value = withRepeat(
      withSequence(
        withSpring(-5, { damping: 2 }),
        withSpring(5, { damping: 2 }),
        withSpring(0, { damping: 2 })
      ),
      -1,
      true
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: scale.value },
      { rotate: `${rotation.value}deg` },
    ],
  }));

  const renderSvgIllustration = () => {
    const size = 200;
    const center = size / 2;

    if (iconName === 'activity') {
      return (
        <Svg width={size} height={size} viewBox="0 0 200 200">
          <Circle cx={center} cy={center} r="80" fill={colors.primaryLight} />
          <Circle cx={center} cy={center} r="60" fill={colors.secondaryLight} />
          <Path
            d="M 60 100 L 80 100 L 90 70 L 110 130 L 120 100 L 140 100"
            stroke={colors.primary}
            strokeWidth="6"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Circle cx={center} cy="50" r="8" fill={colors.secondary} />
        </Svg>
      );
    }

    if (iconName === 'dumbbell') {
      return (
        <Svg width={size} height={size} viewBox="0 0 200 200">
          <Circle cx={center} cy={center} r="80" fill={colors.secondaryLight} />
          <G rotation="45" origin={`${center}, ${center}`}>
            <Rect x="85" y="40" width="30" height="120" fill={colors.primary} rx="4" />
            <Rect x="70" y="35" width="60" height="20" fill={colors.secondary} rx="4" />
            <Rect x="70" y="145" width="60" height="20" fill={colors.secondary} rx="4" />
          </G>
        </Svg>
      );
    }

    if (iconName === 'flame') {
      return (
        <Svg width={size} height={size} viewBox="0 0 200 200">
          <Circle cx={center} cy={center} r="80" fill={colors.accentLight} />
          <Path
            d="M 100 40 C 100 40 80 70 80 90 C 80 110 90 120 100 120 C 110 120 120 110 120 90 C 120 70 100 40 100 40 Z"
            fill={colors.primary}
          />
          <Path
            d="M 100 60 C 100 60 90 75 90 85 C 90 95 95 100 100 100 C 105 100 110 95 110 85 C 110 75 100 60 100 60 Z"
            fill={colors.secondary}
          />
          <Path
            d="M 100 75 C 100 75 95 82 95 87 C 95 92 97 95 100 95 C 103 95 105 92 105 87 C 105 82 100 75 100 75 Z"
            fill={colors.accent}
          />
        </Svg>
      );
    }

    return null;
  };

  return (
    <Animated.View style={[styles.svgContainer, animatedStyle]}>
      {renderSvgIllustration()}
    </Animated.View>
  );
};

export const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useSharedValue(0);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    scrollX.value = contentOffsetX;
    const index = Math.round(contentOffsetX / SCREEN_WIDTH);
    setCurrentIndex(index);
  };

  const renderDot = (index: number) => {
    const inputRange = [
      (index - 1) * SCREEN_WIDTH,
      index * SCREEN_WIDTH,
      (index + 1) * SCREEN_WIDTH,
    ];

    const animatedStyle = useAnimatedStyle(() => ({
      width: withSpring(
        scrollX.value >= index * SCREEN_WIDTH - SCREEN_WIDTH / 2 &&
        scrollX.value < index * SCREEN_WIDTH + SCREEN_WIDTH / 2
          ? 24
          : 8
      ),
      opacity: withSpring(
        scrollX.value >= index * SCREEN_WIDTH - SCREEN_WIDTH / 2 &&
        scrollX.value < index * SCREEN_WIDTH + SCREEN_WIDTH / 2
          ? 1
          : 0.3
      ),
    }));

    return <Animated.View key={index} style={[styles.dot, animatedStyle]} />;
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[colors.background, colors.backgroundDark]}
        style={styles.gradient}
      >
        <FlatList
          data={onboardingSlides}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.slide}>
              <View style={styles.iconWrapper}>
                <AnimatedSvgIcon iconName={item.icon} />
              </View>

              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.description}>{item.description}</Text>
            </View>
          )}
        />

        <View style={styles.footer}>
          <View style={styles.pagination}>
            {onboardingSlides.map((_, index) => renderDot(index))}
          </View>

          <Button
            title={currentIndex === onboardingSlides.length - 1 ? "Get Started" : "Next"}
            onPress={onComplete}
            style={styles.button}
          />

          {currentIndex < onboardingSlides.length - 1 && (
            <Text style={styles.skipText} onPress={onComplete}>
              Skip
            </Text>
          )}
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  slide: {
    width: SCREEN_WIDTH,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
  },
  iconWrapper: {
    marginBottom: spacing.xl,
  },
  svgContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    ...typography.h1,
    textAlign: 'center',
    marginBottom: spacing.md,
    color: colors.text,
  },
  description: {
    ...typography.bodyLarge,
    textAlign: 'center',
    color: colors.textSecondary,
    lineHeight: 28,
  },
  footer: {
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.xl,
    paddingTop: spacing.lg,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.xl,
    gap: spacing.sm,
  },
  dot: {
    height: 8,
    borderRadius: borderRadius.round,
    backgroundColor: colors.primary,
  },
  button: {
    marginBottom: spacing.md,
  },
  skipText: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});
