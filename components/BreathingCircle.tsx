import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '@/constants/Colors';

interface BreathingCircleProps {
  isActive: boolean;
  size?: number;
}

export const BreathingCircle: React.FC<BreathingCircleProps> = ({
  isActive,
  size = 200,
}) => {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(0.6);

  useEffect(() => {
    if (isActive) {
      // Breathing animation: inhale (4s) -> hold (2s) -> exhale (4s) -> hold (2s)
      scale.value = withRepeat(
        withSequence(
          withTiming(1.3, { duration: 4000, easing: Easing.inOut(Easing.ease) }),
          withTiming(1.3, { duration: 2000 }),
          withTiming(1, { duration: 4000, easing: Easing.inOut(Easing.ease) }),
          withTiming(1, { duration: 2000 })
        ),
        -1,
        false
      );

      opacity.value = withRepeat(
        withSequence(
          withTiming(0.9, { duration: 4000 }),
          withTiming(0.9, { duration: 2000 }),
          withTiming(0.6, { duration: 4000 }),
          withTiming(0.6, { duration: 2000 })
        ),
        -1,
        false
      );
    } else {
      scale.value = withTiming(1, { duration: 500 });
      opacity.value = withTiming(0.6, { duration: 500 });
    }
  }, [isActive]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  return (
    <View style={styles.container}>
      <Animated.View style={[{ width: size, height: size }, animatedStyle]}>
        <LinearGradient
          colors={Colors.gradients.calm}
          style={styles.circle}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle: {
    width: '100%',
    height: '100%',
    borderRadius: 9999,
  },
});
