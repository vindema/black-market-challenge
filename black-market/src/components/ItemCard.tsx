import { Link } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';
import type { StolenItem } from '../types';
import TrendingUpOutlinedIcon from '@mui/icons-material/TrendingUpOutlined';
import { PersonOutlineIcon, LocationOnOutlinedIcon } from './common/icons';
import { StyledChip } from './common/StyledChip';
import { formatPrice } from '../utils/formatters';
import { customColors } from '../theme/theme';

interface ItemCardProps {
    item: StolenItem;
}

export function ItemCard({ item }: ItemCardProps) {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                transition: 'all 0.3s',
                border: '1px solid transparent',
                '&:hover': {
                    borderColor: customColors.borders.hover,
                    '& .item-image': {
                        transform: 'scale(1.1)'
                    }
                }
            }}
        >
            <Box sx={{
                aspectRatio: '1/1',
                bgcolor: '#d1d5db',
                position: 'relative',
                overflow: 'hidden'
            }}>
                <Box
                    component="img"
                    src={item.item_photo_url}
                    alt={item.item_name}
                    className="item-image"
                    sx={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.3s'
                    }}
                    onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                        e.currentTarget.src = 'https://placehold.co/400x400/d1d5db/9ca3af?text=';
                    }}
                />
                {item.item_stock === 0 && (
                    <Box sx={{
                        position: 'absolute',
                        inset: 0,
                        bgcolor: 'rgba(0,0,0,0.7)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <Typography sx={{ color: 'error.main', fontWeight: 'bold', fontSize: '1.125rem' }}>
                            SOLD OUT
                        </Typography>
                    </Box>
                )}
            </Box>

            <Box sx={{
                p: 2,
                bgcolor: 'background.paper'
            }}>
                <Typography sx={{
                    color: 'text.primary',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    textTransform: 'uppercase',
                    letterSpacing: '0.025em',
                    mb: 1
                }}>
                    {item.item_name}
                </Typography>
                <Box sx={{
                    color: 'text.disabled',
                    fontSize: '0.75rem',
                    mb: 0.5,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1
                }}>
                    <PersonOutlineIcon sx={{ fontSize: 14 }} /> {item.seller_username}
                </Box>
                <Box sx={{
                    fontSize: '0.75rem',
                    mb: 2,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    color: 'text.secondary'
                }}>
                    <LocationOnOutlinedIcon sx={{ fontSize: 14 }} /> {item.seller_city}, {item.seller_country}
                </Box>

                <Box sx={{
                    bgcolor: 'background.default',
                    border: `1px solid ${customColors.borders.default}`,
                    p: 1.5,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    mb: 2
                }}>
                    <Box>
                        <Typography sx={{ fontWeight: 'bold', fontSize: '1rem', color: 'error.light' }}>
                            {formatPrice(item.item_price)}
                        </Typography>
                        <Box sx={{ color: '#4b5563', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <TrendingUpOutlinedIcon sx={{ fontSize: 14 }} /> BEST PRICE
                        </Box>
                    </Box>
                    {item.item_stock > 0 && (
                        <StyledChip
                            variant="stock"
                            label={`${item.item_stock} LEFT`}
                            size="small"
                            sx={{
                                '& .MuiChip-label': { px: 1.5 }
                            }}
                        />
                    )}
                </Box>

                <Button
                    component={Link}
                    to={`/item/${item.id}`}
                    variant="outlined"
                    color="secondary"
                    fullWidth
                    sx={{
                        py: 1.5,
                        fontSize: '0.75rem',
                        letterSpacing: '0.1em',
                        color: '#9F9FA9',
                        bgColor: '#27272A'
                    }}
                >
                    VIEW DETAILS
                </Button>
            </Box>
        </Box>
    );
}
