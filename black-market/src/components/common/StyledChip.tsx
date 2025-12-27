import { Chip } from '@mui/material';
import type { ChipProps } from '@mui/material';
import { customColors } from '../../theme/theme';

type ChipVariant = 'verified' | 'hot' | 'stock' | 'trusted' | 'default';

interface StyledChipProps extends Omit<ChipProps, 'variant'> {
  variant?: ChipVariant;
}

const variantStyles: Record<ChipVariant, object> = {
  verified: {
    bgcolor: customColors.chip.verified.bg,
    color: customColors.chip.verified.text,
    border: `1px solid ${customColors.chip.verified.border}`,
  },
  hot: {
    bgcolor: customColors.chip.hot.bg,
    color: customColors.chip.hot.text,
    border: `1px solid ${customColors.chip.hot.border}`,
  },
  stock: {
    bgcolor: customColors.chip.stock.bg,
    color: customColors.chip.stock.text,
    border: `1px solid ${customColors.chip.stock.border}`,
  },
  trusted: {
    bgcolor: customColors.chip.trusted.bg,
    color: customColors.chip.trusted.text,
    border: `1px solid ${customColors.chip.trusted.border}`,
  },
  default: {
    bgcolor: customColors.backgrounds.tertiary,
    color: 'text.secondary',
    border: `1px solid ${customColors.borders.hover}`,
  },
};

/**
 * Simplified chip component with theme-based variants
 */
export const StyledChip = ({ variant = 'default', ...props }: StyledChipProps) => {
  return (
    <Chip
      {...props}
      sx={{
        ...variantStyles[variant],
        ...props.sx,
      }}
    />
  );
};
