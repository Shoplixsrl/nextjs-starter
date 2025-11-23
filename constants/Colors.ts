// Pastel Lilac & Blue Meditation Color Palette
export const Colors = {
  // Primary Colors
  primary: {
    lilac: '#E6E6FA',      // Lavender
    blue: '#B0E0E6',       // Powder Blue
    purple: '#D8BFD8',     // Thistle
    sky: '#87CEEB',        // Sky Blue
  },

  // Gradients
  gradients: {
    morning: ['#E6E6FA', '#B0E0E6'] as const,
    evening: ['#D8BFD8', '#E6E6FA'] as const,
    calm: ['#B0E0E6', '#87CEEB'] as const,
  },

  // UI Colors
  background: '#F8F8FF',   // Ghost White
  surface: '#FFFFFF',
  text: {
    primary: '#4A4A6A',
    secondary: '#8B8BA8',
    muted: '#B8B8D0',
  },

  // Functional
  success: '#98D8C8',
  overlay: 'rgba(230, 230, 250, 0.95)',
};
