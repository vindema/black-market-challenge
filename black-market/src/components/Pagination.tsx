import { Box, Button } from '@mui/material';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages: number[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      const start = Math.max(1, Math.min(currentPage - 2, totalPages - maxVisible + 1));
      const end = Math.min(totalPages, start + maxVisible - 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
    }

    return pages;
  };

  const buttonBaseSx = {
    px: 2,
    py: 1,
    fontSize: '0.75rem',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    borderRadius: 0,
    minWidth: 'auto',
    transition: 'all 0.2s',
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.5 }}>
      <Button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        sx={{
          ...buttonBaseSx,
          bgcolor: '#27272A',
          color: '#6b7280',
          border: '1px solid #3F3F46',
          '&:hover': {
            bgcolor: '#3F3F46',
            color: 'white'
          },
          '&:disabled': {
            opacity: 0.4,
            bgcolor: '#27272A',
            color: '#6b7280'
          }
        }}
      >
        &lt; PREV
      </Button>

      {getPageNumbers().map((page) => (
        <Button
          key={page}
          onClick={() => onPageChange(page)}
          sx={{
            ...buttonBaseSx,
            width: 40,
            height: 40,
            p: 0,
            bgcolor: currentPage === page ? '#155DFC' : '#27272A',
            color: currentPage === page ? 'white' : '#6b7280',
            border: currentPage === page ? '1px solid #2B7FFF' : '1px solid #3F3F46',
            '&:hover': {
              bgcolor: currentPage === page ? '#155DFC' : '#3F3F46',
              color: 'white'
            }
          }}
        >
          {page}
        </Button>
      ))}

      <Button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        sx={{
          ...buttonBaseSx,
          bgcolor: '#27272A',
          color: '#6b7280',
          border: '1px solid #3F3F46',
          '&:hover': {
            bgcolor: '#3F3F46',
            color: 'white'
          },
          '&:disabled': {
            opacity: 0.4,
            bgcolor: '#27272A',
            color: '#6b7280'
          }
        }}
      >
        NEXT &gt;
      </Button>
    </Box>
  );
}
