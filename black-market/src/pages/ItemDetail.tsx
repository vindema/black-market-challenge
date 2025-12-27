import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Box, Typography, Button, Chip, CircularProgress } from '@mui/material';
import { PurchaseModal } from '../components/PurchaseModal';
import { PersonOutlineIcon, LocationOnOutlinedIcon, InventoryOutlinedIcon, ShieldOutlinedIcon, ElectricBoltOutlinedIcon, StarOutlinedIcon, WarningAmberIcon } from '../components/common/icons';
import { useItemDetail } from '../hooks/useItemDetail';
import { formatPrice } from '../utils/formatters';

export function ItemDetail() {
    const { id } = useParams<{ id: string }>();
    const { item, isLoading, error } = useItemDetail(id);
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <Box sx={{ minHeight: '100vh', bgcolor: '#09090B' }}>
            <Box sx={{
                bgcolor: '#18181B',
                py: 1,
                borderTop: '1px solid #27272A',
                borderBottom: '1px solid #27272A',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <Typography sx={{ color: '#9ca3af', fontSize: '0.75rem', letterSpacing: '0.05em' }}>
                    ★ LIMITED TIME OFFER ★ ACT FAST ★ ONLY {item?.item_stock} LEFT ★
                </Typography>
            </Box>

            <Box sx={{ maxWidth: '72rem', mx: 'auto', px: 2, py: 3 }}>
                <Button
                    component={Link}
                    to="/"
                    sx={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 1,
                        color: '#9ca3af',
                        fontSize: '0.75rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.1em',
                        mb: 3,
                        px: 2,
                        py: 1,
                        bgcolor: '#18181B',
                        border: '1px solid #3F3F46',
                        borderRadius: 0,
                        transition: 'all 0.2s',
                        '&:hover': { bgcolor: '#3f3f46' }
                    }}
                >
                    ← BACK TO DEALS
                </Button>

                <Box sx={{
                    bgcolor: '#460809',
                    border: '1px solid #82181A',
                    py: 1.5,
                    px: 2,
                    mb: 3,
                    textAlign: 'center'
                }}>
                    <Typography component="span" sx={{ color: '#FF6467', fontSize: '0.875rem', ml: 1 }}>
                        ⚠ WARNING: {item?.item_stock} PEOPLE VIEWING THIS RIGHT NOW
                    </Typography>
                </Box>

                {isLoading && (
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', py: 10 }}>
                        <CircularProgress size={32} sx={{ color: '#ef4444', mb: 2 }} />
                        <Typography sx={{ color: '#9ca3af', fontSize: '0.875rem' }}>
                            Loading item details...
                        </Typography>
                    </Box>
                )}

                {error && !isLoading && (
                    <Box sx={{ bgcolor: 'rgba(239, 68, 68, 0.2)', border: '1px solid #ef4444', p: 3, textAlign: 'center' }}>
                        <Typography sx={{ color: '#ef4444', fontSize: '0.875rem', mb: 2 }}>{error}</Typography>
                        <Button
                            component={Link}
                            to="/"
                            sx={{
                                px: 2,
                                py: 1,
                                bgcolor: '#27272A',
                                border: '1px solid #3F3F46',
                                color: '#d1d5db',
                                fontSize: '0.875rem',
                                borderRadius: 0,
                                '&:hover': { bgcolor: '#3f3f46' }
                            }}
                        >
                            RETURN TO DEALS
                        </Button>
                    </Box>
                )}

                {!isLoading && !error && item && (
                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: 'repeat(2, 1fr)' }, gap: 3 }}>
                        <Box>
                            <Box sx={{ position: 'relative' }}>
                                <Box sx={{ aspectRatio: '1/1', bgcolor: '#d1d5db', overflow: 'hidden', position: 'relative' }}>
                                    <Box
                                        component="img"
                                        src={item.item_photo_url}
                                        alt={item.item_name}
                                        sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                        onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                                            e.currentTarget.src = 'https://placehold.co/600x600/d1d5db/9ca3af?text=NO+IMAGE';
                                        }}
                                    />
                                    <Chip
                                        label="✓ VERIFIED"
                                        size="small"
                                        sx={{
                                            position: 'absolute',
                                            top: 16,
                                            right: 16,
                                            bgcolor: '#27272A',
                                            border: '1px solid #3F3F46',
                                            color: '#4ADE80',
                                            fontSize: '0.75rem',
                                            borderRadius: 0,
                                            height: 'auto',
                                            py: 0.5
                                        }}
                                    />
                                </Box>

                                <Box sx={{ bgcolor: '#18181B', border: '1px solid #27272A', p: 2, mt: 2 }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                                        <Typography sx={{ color: '#EAB308' }}>★★★★★</Typography>
                                        <Typography sx={{ color: '#9ca3af', fontSize: '0.875rem' }}>4.9/5.0 (2,847 REVIEWS)</Typography>
                                    </Box>
                                    <Typography sx={{ color: '#6b7280', fontSize: '0.75rem', fontStyle: 'italic' }}>
                                        "Best seller ever!!! Fast shipping no problems!!!!" - Anonymous_Buyer_88
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>

                        <Box>
                            <Box sx={{ bgcolor: '#18181B', border: '1px solid #27272A', p: 3, mb: 2 }}>
                                <Typography sx={{
                                    color: 'white',
                                    fontFamily: '"IBM Plex Mono", monospace',
                                    fontWeight: 'bold',
                                    fontSize: '1.5rem',
                                    letterSpacing: '0.05em',
                                    mb: 1.5,
                                    textTransform: 'uppercase'
                                }}>
                                    {item.item_name}
                                </Typography>

                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                                    <Chip label="HOT" size="small" sx={{ bgcolor: '#460809', border: '1px solid #82181A', color: '#FF6467', fontSize: '0.75rem', borderRadius: 0, height: 'auto', py: 0.5 }} />
                                    <Chip label="VERIFIED" size="small" sx={{ bgcolor: '#27272A', border: '1px solid #3F3F46', color: '#4ADE80', fontSize: '0.75rem', borderRadius: 0, height: 'auto', py: 0.5 }} />
                                    <Chip label="TRUSTED" size="small" sx={{ bgcolor: '#27272A', border: '1px solid #3F3F46', color: '#9ca3af', fontSize: '0.75rem', borderRadius: 0, height: 'auto', py: 0.5 }} />
                                </Box>

                                <Typography sx={{ color: '#9ca3af', fontSize: '0.875rem', lineHeight: 1.6 }}>
                                    {item.item_description}
                                </Typography>
                            </Box>

                            <Box sx={{ bgcolor: '#18181B', border: '1px solid #27272A', p: 2, mb: 3, position: 'relative' }}>
                                <Button
                                    onClick={() => setIsModalOpen(true)}
                                    sx={{
                                        position: 'absolute',
                                        top: -8,
                                        right: -8,
                                        bgcolor: '#E7000B',
                                        color: 'white',
                                        fontSize: '0.75rem',
                                        px: 2,
                                        py: 1,
                                        fontWeight: 'bold',
                                        transform: 'rotate(6deg)',
                                        borderRadius: 0,
                                        minWidth: 'auto',
                                        '&:hover': { bgcolor: '#c7000a' }
                                    }}
                                >
                                    BUY NOW!
                                </Button>

                                <Box sx={{ p: 2, pb: 3 }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <Typography sx={{ color: '#6b7280', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                            PRICE:
                                        </Typography>
                                        <Box sx={{ textAlign: 'right' }}>
                                            <Typography sx={{ color: '#FF6467', fontWeight: 'bold', fontSize: '1.875rem' }}>
                                                {formatPrice(item.item_price)}
                                            </Typography>
                                            <Typography sx={{ color: '#6b7280', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                                LOWEST ON MARKET
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Box>

                                <Box sx={{ borderTop: '1px solid #27272A', mb: 2 }} />

                                <Box sx={{ bgcolor: '#09090B', border: '1px solid #27272A', p: 2, mb: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
                                    <PersonOutlineIcon sx={{ fontSize: 24, color: '#71717A' }} />
                                    <Box>
                                        <Typography sx={{ color: '#6b7280', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>SELLER:</Typography>
                                        <Typography sx={{ color: 'white', fontWeight: 500 }}>{item.seller_username}</Typography>
                                        <Typography sx={{ color: '#F0B100', fontSize: '0.75rem' }}>★★★★★ 100% POSITIVE</Typography>
                                    </Box>
                                </Box>

                                <Box sx={{ bgcolor: '#09090B', border: '1px solid #27272A', p: 2, mb: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
                                    <LocationOnOutlinedIcon sx={{ fontSize: 24, color: '#71717A' }} />
                                    <Box>
                                        <Typography sx={{ color: '#6b7280', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>SHIPS FROM:</Typography>
                                        <Typography sx={{ color: 'white' }}>{item.seller_city}, {item.seller_country}</Typography>
                                    </Box>
                                </Box>

                                <Box sx={{ bgcolor: '#09090B', border: '1px solid #27272A', p: 2, mb: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
                                    <InventoryOutlinedIcon sx={{ fontSize: 24, color: '#71717A' }} />
                                    <Box>
                                        <Typography sx={{ color: '#6b7280', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>IN STOCK:</Typography>
                                        <Typography sx={{ color: '#FF6467', fontWeight: 'bold' }}>
                                            {item.item_stock > 0 ? `ONLY ${item.item_stock} LEFT` : 'OUT OF STOCK'}
                                        </Typography>
                                    </Box>
                                </Box>

                                <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2 }}>
                                    <Box sx={{ bgcolor: '#09090B', border: '1px solid #27272A', p: 2, textAlign: 'center' }}>
                                        <ShieldOutlinedIcon sx={{ fontSize: 24, color: '#71717A' }} />
                                        <Typography sx={{ color: '#6b7280', fontSize: '0.75rem', mt: 0.5, textTransform: 'uppercase' }}>SECURE</Typography>
                                    </Box>
                                    <Box sx={{ bgcolor: '#09090B', border: '1px solid #27272A', p: 2, textAlign: 'center' }}>
                                        <ElectricBoltOutlinedIcon sx={{ fontSize: 24, color: '#71717A' }} />
                                        <Typography sx={{ color: '#6b7280', fontSize: '0.75rem', mt: 0.5, textTransform: 'uppercase' }}>INSTANT</Typography>
                                    </Box>
                                    <Box sx={{ bgcolor: '#09090B', border: '1px solid #27272A', p: 2, textAlign: 'center' }}>
                                        <StarOutlinedIcon sx={{ fontSize: 24, color: '#EAB308' }} />
                                        <Typography sx={{ color: '#6b7280', fontSize: '0.75rem', mt: 0.5, textTransform: 'uppercase' }}>RATED</Typography>
                                    </Box>
                                </Box>
                            </Box>

                            <Button
                                fullWidth
                                onClick={() => setIsModalOpen(true)}
                                disabled={item.item_stock === 0}
                                sx={{
                                    py: 2,
                                    bgcolor: '#E7000B',
                                    color: 'white',
                                    fontWeight: 'bold',
                                    fontSize: '1.125rem',
                                    borderRadius: 0,
                                    '&:hover': { bgcolor: '#c7000a' },
                                    '&:disabled': { opacity: 0.5 }
                                }}
                            >
                                ★ BUY NOW ★
                            </Button>

                            <Box sx={{ bgcolor: '#18181B', border: '1px solid #82181A', p: 2, mt: 2, display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
                                <WarningAmberIcon sx={{ fontSize: 20, color: '#FF6467' }} />
                                <Box>
                                    <Typography sx={{ color: '#FF6467', fontWeight: 'bold', fontSize: '0.875rem', mb: 0.5 }}>WARNING</Typography>
                                    <Typography sx={{ color: '#9ca3af', fontSize: '0.75rem' }}>
                                        LAST CHANCE! PRICES GOING UP SOON! NO REFUNDS! FINAL SALE!
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                )}

                {!isLoading && !error && item && (
                    <Box sx={{ bgcolor: '#18181B', border: '1px solid #27272A', p: 3, mt: 3, display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
                        <WarningAmberIcon sx={{ fontSize: 20, color: '#EAB308' }} />
                        <Box>
                            <Typography sx={{ fontWeight: 'bold', mb: 2, color: 'white' }}>IMPORTANT INFO</Typography>
                            <Box component="ul" sx={{ color: '#9ca3af', fontSize: '0.875rem', m: 0, pl: 0, listStyle: 'none', '& li': { mb: 1 } }}>
                                <li>★ BITCOIN/MONERO ONLY - NO REFUNDS</li>
                                <li>★ ENCRYPTED DELIVERY - UNTRACEABLE</li>
                                <li>★ NO CONTACT - ANONYMOUS DROPOFF</li>
                                <li>★ DELETE BROWSER HISTORY AFTER PURCHASE</li>
                                <li>★ USE TOR BROWSER RECOMMENDED</li>
                            </Box>
                        </Box>
                    </Box>
                )}
            </Box>

            {item && (
                <PurchaseModal
                    item={item}
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                />
            )}
        </Box>
    );
}
