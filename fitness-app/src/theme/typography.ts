import { TextStyle } from 'react-native';
import { colors } from './colors';

export const typography = {
  // Headings
  h1: {
    fontSize: 32,
    fontWeight: '700' as TextStyle['fontWeight'],
    color: colors.text,
    letterSpacing: -0.5,
  },
  h2: {
    fontSize: 28,
    fontWeight: '700' as TextStyle['fontWeight'],
    color: colors.text,
    letterSpacing: -0.3,
  },
  h3: {
    fontSize: 24,
    fontWeight: '600' as TextStyle['fontWeight'],
    color: colors.text,
  },
  h4: {
    fontSize: 20,
    fontWeight: '600' as TextStyle['fontWeight'],
    color: colors.text,
  },

  // Body Text
  body: {
    fontSize: 16,
    fontWeight: '400' as TextStyle['fontWeight'],
    color: colors.text,
    lineHeight: 24,
  },
  bodyLarge: {
    fontSize: 18,
    fontWeight: '400' as TextStyle['fontWeight'],
    color: colors.text,
    lineHeight: 26,
  },
  bodySmall: {
    fontSize: 14,
    fontWeight: '400' as TextStyle['fontWeight'],
    color: colors.textSecondary,
    lineHeight: 20,
  },

  // Labels
  label: {
    fontSize: 12,
    fontWeight: '500' as TextStyle['fontWeight'],
    color: colors.textSecondary,
    textTransform: 'uppercase' as TextStyle['textTransform'],
    letterSpacing: 0.5,
  },

  // Buttons
  button: {
    fontSize: 16,
    fontWeight: '600' as TextStyle['fontWeight'],
    textTransform: 'uppercase' as TextStyle['textTransform'],
    letterSpacing: 0.5,
  },

  // Caption
  caption: {
    fontSize: 12,
    fontWeight: '400' as TextStyle['fontWeight'],
    color: colors.textLight,
  },

  // Numbers (for stats)
  number: {
    fontSize: 40,
    fontWeight: '700' as TextStyle['fontWeight'],
    color: colors.text,
    letterSpacing: -1,
  },
  numberSmall: {
    fontSize: 24,
    fontWeight: '700' as TextStyle['fontWeight'],
    color: colors.text,
  },
} as const;
