// Color scheme helper - Robin Egg Blue & Black Olive theme
export const colors = {
  // Primary colors
  primary: '#6EC6CB',       // Robin Egg Blue
  primaryDark: '#50b8bd',   // Darker Robin Egg Blue
  primaryLight: '#9dd9dc',  // Lighter Robin Egg Blue
  
  // Secondary colors
  secondary: '#30382F',     // Black Olive
  secondaryLight: '#4a524a',
  secondaryMuted: '#5a6158',
  
  // Background colors
  bgPrimary: '#e8f5f6',     // Very light blue tint
  bgSecondary: '#f0f9fa',   // Even lighter blue tint
  bgCard: '#ffffff',        // White for cards
  
  // Text colors
  textPrimary: '#30382F',   // Black Olive for main text
  textSecondary: '#5a6158', // Muted for secondary text
  textMuted: '#7a817a',     // Even more muted
  
  // Border colors
  border: '#b8d4d6',        // Light teal border
  borderLight: '#d1eced',   // Very light teal border
  
  // Status colors (keep existing for consistency)
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
  info: '#6EC6CB',
};

// Utility class strings
export const cn = {
  // Text classes
  textPrimary: 'text-[#30382F]',
  textSecondary: 'text-[#5a6158]',
  textMuted: 'text-[#7a817a]',
  textAccent: 'text-[#6EC6CB]',
  
  // Background classes
  bgPrimary: 'bg-[#e8f5f6]',
  bgSecondary: 'bg-[#f0f9fa]',
  bgCard: 'bg-white',
  bgAccent: 'bg-[#6EC6CB]',
  bgAccentLight: 'bg-[#d1eced]',
  
  // Border classes
  border: 'border-[#b8d4d6]',
  borderLight: 'border-[#d1eced]',
  
  // Button classes
  btnPrimary: 'bg-[#6EC6CB] hover:bg-[#50b8bd] text-white',
  btnSecondary: 'bg-[#30382F] hover:bg-[#4a524a] text-white',
  btnOutline: 'border-[#6EC6CB] text-[#6EC6CB] hover:bg-[#6EC6CB] hover:text-white',
  
  // Card classes
  card: 'bg-white border-[#b8d4d6] shadow-md',
  cardHover: 'bg-white border-[#b8d4d6] shadow-md hover:shadow-lg transition-shadow',
  
  // Badge classes
  badgePrimary: 'bg-[#d1eced] text-[#50b8bd]',
  badgeSuccess: 'bg-green-100 text-green-700',
  badgeWarning: 'bg-yellow-100 text-yellow-700',
  badgeError: 'bg-red-100 text-red-700',
  badgeInfo: 'bg-[#d1eced] text-[#50b8bd]',
};
