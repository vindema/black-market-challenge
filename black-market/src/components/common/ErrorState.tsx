import { Box, Typography, Button } from '@mui/material';

interface ErrorStateProps {
  error: string;
  onRetry?: () => void;
  retryLabel?: string;
}

/**
 * Reusable error state component with optional retry button
 */
export const ErrorState = ({ error, onRetry, retryLabel = 'RETRY CONNECTION' }: ErrorStateProps) => {
  return (
    <Box
      sx={{
        bgcolor: 'rgba(239, 68, 68, 0.2)',
        border: '1px solid',
        borderColor: 'error.main',
        p: 3,
        textAlign: 'center',
      }}
    >
      <Typography sx={{ color: 'error.main', fontSize: '0.875rem', mb: 2 }}>
        {error}
      </Typography>
      {onRetry && (
        <Button
          variant="contained"
          color="error"
          onClick={onRetry}
        >
          {retryLabel}
        </Button>
      )}
    </Box>
  );
};
