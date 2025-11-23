import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '@/constants/Colors';
import { Theme } from '@/constants/Theme';

interface MeditationTimerProps {
  minutes: number;
  seconds: number;
}

export const MeditationTimer: React.FC<MeditationTimerProps> = ({
  minutes,
  seconds,
}) => {
  const formatNumber = (num: number) => num.toString().padStart(2, '0');

  return (
    <View style={styles.container}>
      <Text style={styles.time}>
        {formatNumber(minutes)}:{formatNumber(seconds)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  time: {
    fontSize: Theme.fontSize.xxxl * 1.5,
    fontWeight: Theme.fontWeight.light,
    color: Colors.text.primary,
    letterSpacing: 4,
  },
});
