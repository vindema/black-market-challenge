import { Box, CircularProgress, Typography } from '@mui/material';

interface LoadingStateProps {
  message?: string;
}

/**
 * Reusable loading state component with spinner and message
 */
export const LoadingState = ({ message = 'Establishing secure connection...' }: LoadingStateProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        py: 10,
      }}
    >
      <CircularProgress size={32} sx={{ color: 'error.main', mb: 2 }} />
      <Typography sx={{ color: 'text.secondary', fontSize: '0.875rem' }}>
        {message}
      </Typography>
    </Box>
  );
};
