export const colors = {
  // Primary Colors - Energetic Red/Orange Palette
  primary: '#FF4444',      // Vibrant Red
  secondary: '#FF6B35',    // Energetic Orange
  accent: '#FF8C42',       // Soft Orange

  // Background Colors
  background: '#FFFFFF',   // Clean White
  backgroundDark: '#F8F8F8', // Light Gray
  backgroundCard: '#FFFFFF',

  // Text Colors
  text: '#1A1A1A',         // Almost Black
  textSecondary: '#666666', // Medium Gray
  textLight: '#999999',    // Light Gray
  textInverse: '#FFFFFF',  // White

  // Status Colors
  success: '#4CAF50',      // Green
  warning: '#FFC107',      // Amber
  error: '#F44336',        // Red
  info: '#2196F3',         // Blue

  // Gradient Colors
  gradientStart: '#FF4444',
  gradientMiddle: '#FF6B35',
  gradientEnd: '#FF8C42',

  // Chart Colors
  chartRed: '#FF4444',
  chartOrange: '#FF6B35',
  chartLightOrange: '#FF8C42',
  chartGray: '#E0E0E0',

  // UI Elements
  border: '#E0E0E0',
  divider: '#F0F0F0',
  shadow: '#000000',
  overlay: 'rgba(0, 0, 0, 0.5)',

  // Opacity Variants
  primaryLight: 'rgba(255, 68, 68, 0.1)',
  secondaryLight: 'rgba(255, 107, 53, 0.1)',
  accentLight: 'rgba(255, 140, 66, 0.1)',
} as const;

export type Colors = typeof colors;
