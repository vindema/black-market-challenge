import { useState } from 'react';
import { Box, Typography, Chip, Button } from '@mui/material';
import { ItemCard } from '../components/ItemCard';
import { Pagination } from '../components/Pagination';
import { ShieldOutlinedIcon, ElectricBoltOutlinedIcon, VisibilityOutlinedIcon } from '../components/common/icons';
import { LoadingState } from '../components/common/LoadingState';
import { ErrorState } from '../components/common/ErrorState';
import { useItems } from '../hooks/useItems';

const ITEMS_PER_PAGE = 8;

export function Gallery() {
    const [currentPage, setCurrentPage] = useState(1);
    const { items, totalPages, isLoading, error } = useItems(currentPage, ITEMS_PER_PAGE);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleRetry = () => {
        setCurrentPage(1);
    };

    return (
        <Box sx={{ minHeight: '100vh', bgcolor: 'black' }}>
            <Box sx={{
                height: 40,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                px: 2,
                bgcolor: '#18181B',
                borderBottom: '1px solid #27272A'
            }}>
                <Chip
                    label="✓ VERIFIED"
                    size="small"
                    sx={{
                        bgcolor: '#27272A',
                        border: '1px solid #3f3f46',
                        color: '#4ADE80',
                        fontSize: '0.75rem',
                        height: 'auto',
                        py: 0.25,
                        borderRadius: 0,
                        '& .MuiChip-label': { px: 1 }
                    }}
                />
                <Box sx={{ flex: 1, mx: 4, textAlign: 'center' }}>
                    <Typography sx={{ color: '#6b7280', fontSize: '0.75rem', letterSpacing: '0.05em' }}>
                        *** VERIFIED SELLERS ONLY *** 100% ANONYMOUS *** NO TRACKING *** FAST SHIPPING WORLDWIDE ★★★
                    </Typography>
                </Box>
                <Chip
                    label="HOT"
                    size="small"
                    sx={{
                        bgcolor: '#E7000B',
                        border: '1px solid #FB2C36',
                        color: 'white',
                        fontSize: '0.75rem',
                        height: 'auto',
                        py: 0.25,
                        borderRadius: 0,
                        '& .MuiChip-label': { px: 1 }
                    }}
                />
            </Box>

            <Box sx={{ maxWidth: '72rem', mx: 'auto', p: 2 }}>
                <Box sx={{ p: 3, mb: 2, position: 'relative', bgcolor: '#18181B' }}>
                    <Button
                        variant="contained"
                        sx={{
                            position: 'absolute',
                            top: -8,
                            right: -8,
                            bgcolor: '#E7000B',
                            color: 'white',
                            px: 2,
                            py: 1,
                            fontSize: '0.75rem',
                            fontWeight: 'bold',
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em',
                            transform: 'rotate(6deg)',
                            zIndex: 10,
                            borderRadius: 0,
                            minWidth: 'auto',
                            '&:hover': { bgcolor: '#c7000a' }
                        }}
                    >
                        HOT DEALS
                    </Button>

                    <Box sx={{ mb: 3 }}>
                        <Typography
                            variant="h1"
                            sx={{
                                color: 'white',
                                fontFamily: '"IBM Plex Mono", monospace',
                                fontWeight: 'bold',
                                fontSize: '3rem',
                                letterSpacing: '0.1em',
                                mb: 1.5
                            }}
                        >
                            THE DARK VAULT
                        </Typography>
                        <Typography sx={{
                            color: '#6b7280',
                            fontFamily: '"IBM Plex Mono", monospace',
                            fontSize: '0.875rem',
                            letterSpacing: '0.1em',
                            textTransform: 'uppercase'
                        }}>
                            STOLEN GOODS • NO QUESTIONS ASKED • CRYPTO ONLY
                        </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', gap: 1 }}>
                        <Chip
                            icon={<ShieldOutlinedIcon sx={{ fontSize: 14, color: '#9ca3af' }} />}
                            label="SECURE"
                            sx={{
                                bgcolor: '#27272A',
                                border: '1px solid #3F3F46',
                                color: '#9ca3af',
                                fontSize: '0.75rem',
                                fontFamily: '"IBM Plex Mono", monospace',
                                height: 'auto',
                                py: 0.75,
                                borderRadius: 0,
                                '& .MuiChip-icon': { ml: 1 },
                                '& .MuiChip-label': { px: 1.5 }
                            }}
                        />
                        <Chip
                            icon={<ElectricBoltOutlinedIcon sx={{ fontSize: 14, color: '#9ca3af' }} />}
                            label="INSTANT"
                            sx={{
                                bgcolor: '#27272A',
                                border: '1px solid #3F3F46',
                                color: '#9ca3af',
                                fontSize: '0.75rem',
                                fontFamily: '"IBM Plex Mono", monospace',
                                height: 'auto',
                                py: 0.75,
                                borderRadius: 0,
                                '& .MuiChip-icon': { ml: 1 },
                                '& .MuiChip-label': { px: 1.5 }
                            }}
                        />
                        <Chip
                            icon={<VisibilityOutlinedIcon sx={{ fontSize: 14 }} />}
                            label="3,847 ONLINE"
                            sx={{
                                bgcolor: '#27272A',
                                border: '1px solid #3F3F46',
                                color: '#4ADE80',
                                fontSize: '0.75rem',
                                fontFamily: '"IBM Plex Mono", monospace',
                                height: 'auto',
                                py: 0.75,
                                borderRadius: 0,
                                '& .MuiChip-icon': { ml: 1, color: '#4ADE80' },
                                '& .MuiChip-label': { px: 1.5 }
                            }}
                        />
                    </Box>
                </Box>

                <Box sx={{
                    py: 1,
                    textAlign: 'center',
                    mb: 3,
                    bgcolor: '#460809',
                    border: '1px solid #7f1d1d'
                }}>
                    <Typography sx={{ color: '#FF6467', fontSize: '0.75rem', letterSpacing: '0.05em' }}>
                        ★ LIMITED TIME OFFERS ★ BUY NOW ★ ANONYMOUS PAYMENT ★ WORLDWIDE SHIPPING ★
                    </Typography>
                </Box>

                {isLoading && <LoadingState />}

                {error && !isLoading && <ErrorState error={error} onRetry={handleRetry} />}

                {!isLoading && !error && (
                    <>
                        {items.length === 0 ? (
                            <Box sx={{ textAlign: 'center', py: 10 }}>
                                <Typography sx={{ color: '#9ca3af', fontSize: '0.875rem' }}>
                                    No items available. Check back later.
                                </Typography>
                            </Box>
                        ) : (
                            <Box sx={{
                                display: 'grid',
                                gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' },
                                gap: 3,
                                mb: 4
                            }}>
                                {items.map((item) => (
                                    <Box key={item.id}>
                                        <ItemCard item={item} />
                                    </Box>
                                ))}
                            </Box>
                        )}

                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                        />
                    </>
                )}

                <Box sx={{
                    bgcolor: '#18181B',
                    border: '1px solid #27272A',
                    display: 'flex',
                    justifyContent: 'center',
                    gap: 1,
                    mt: 4,
                    p: 3
                }}>
                    {['LEGIT', 'TRUSTED', 'VERIFIED'].map((label) => (
                        <Chip
                            key={label}
                            label={label}
                            sx={{
                                bgcolor: '#27272A',
                                border: '1px solid #3F3F46',
                                color: '#6b7280',
                                fontSize: '0.75rem',
                                textTransform: 'uppercase',
                                height: 'auto',
                                py: 1,
                                px: 2,
                                borderRadius: 0,
                                '& .MuiChip-label': { px: 2 }
                            }}
                        />
                    ))}
                </Box>
            </Box>
        </Box>
    );
}
