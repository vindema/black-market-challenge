import { createTheme } from '@mui/material/styles';

/**
 * Centralized MUI theme for the Black Market application
 * Consolidates colors, typography, and component styles
 */
export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#E7000B',
      dark: '#c7000a',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#27272A',
      dark: '#3F3F46',
      contrastText: '#9ca3af',
    },
    error: {
      main: '#ef4444',
      light: '#FF6467',
    },
    success: {
      main: '#4ADE80',
    },
    warning: {
      main: '#EAB308',
    },
    background: {
      default: '#09090B',
      paper: '#18181B',
    },
    text: {
      primary: '#ffffff',
      secondary: '#9ca3af',
      disabled: '#6b7280',
    },
  },
  typography: {
    fontFamily: '"IBM Plex Mono", monospace',
    button: {
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
      fontWeight: 'bold',
    },
  },
  shape: {
    borderRadius: 0,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
        },
        contained: {
          '&:hover': {
            boxShadow: 'none',
          },
        },
        outlined: {
          borderColor: '#27272A',
          '&:hover': {
            backgroundColor: '#27272A',
            borderColor: '#3F3F46',
          },
        },
      },
      defaultProps: {
        disableElevation: true,
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          fontWeight: 500,
          fontSize: '0.75rem',
        },
      },
    },
  },
});

// Export custom colors for special use cases
export const customColors = {
  borders: {
    default: '#27272A',
    hover: '#3F3F46',
    danger: '#82181A',
  },
  backgrounds: {
    tertiary: '#27272A',
  },
  chip: {
    verified: {
      bg: '#27272A',
      border: '#3F3F46',
      text: '#4ADE80',
    },
    hot: {
      bg: '#E7000B',
      border: '#FB2C36',
      text: '#ffffff',
    },
    stock: {
      bg: '#460809',
      border: '#82181A',
      text: '#FF6467',
    },
    trusted: {
      bg: '#27272A',
      border: '#3F3F46',
      text: '#9ca3af',
    },
  },
} as const;
