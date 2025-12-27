import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, IconButton, TextField, CircularProgress, Modal, Backdrop, Button } from '@mui/material';
import type { StolenItem } from '../types';
import SentimentVeryDissatisfiedOutlinedIcon from '@mui/icons-material/SentimentVeryDissatisfiedOutlined';
import { CloseIcon } from './common/icons';
import { formatPrice } from '../utils/formatters';
import { customColors } from '../theme/theme';

interface PurchaseModalProps {
    item: StolenItem;
    isOpen: boolean;
    onClose: () => void;
}

export function PurchaseModal({ item, isOpen, onClose }: PurchaseModalProps) {
    const navigate = useNavigate();
    const [quantity, setQuantity] = useState(1);
    const [isPurchasing, setIsPurchasing] = useState(false);

    if (!isOpen) return null;

    const handlePurchase = async () => {
        setIsPurchasing(true);
        await new Promise(resolve => setTimeout(resolve, 1500));

        const orderId = Math.random().toString(36).substring(7).toUpperCase();
        const totalPrice = item.item_price * quantity;

        setIsPurchasing(false);
        setQuantity(1);
        onClose();

        navigate('/transaction-complete', {
            state: {
                itemName: item.item_name,
                quantity,
                totalPrice,
                orderId
            }
        });
    };

    const handleClose = () => {
        setQuantity(1);
        onClose();
    };

    const maxQuantity = item.item_stock;
    const totalPrice = item.item_price * quantity;

    const infoBoxSx = {
        bgcolor: 'background.default',
        border: `1px solid ${customColors.borders.default}`,
        p: 2,
        mb: 2
    };

    return (
        <Modal
            open={isOpen}
            onClose={handleClose}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
                backdrop: {
                    sx: {
                        bgcolor: 'rgba(0, 0, 0, 0.8)',
                        backdropFilter: 'blur(4px)'
                    }
                }
            }}
            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
            <Box sx={{
                position: 'relative',
                bgcolor: 'background.paper',
                border: `1px solid ${customColors.borders.default}`,
                width: '100%',
                maxWidth: 448,
                mx: 2,
                overflow: 'visible',
                outline: 'none'
            }}>
                <Button
                    variant="contained"
                    color="primary"
                    sx={{
                        position: 'absolute',
                        top: -14,
                        right: -8,
                        fontSize: '0.75rem',
                        px: 2,
                        py: 1,
                        transform: 'rotate(6deg)',
                        zIndex: 10,
                        minWidth: 'auto',
                    }}
                >
                    ACT NOW!
                </Button>

                <Box sx={{ px: 3, py: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Typography sx={{
                        color: 'error.light',
                        fontWeight: 'bold',
                        fontSize: '1.125rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                    }}>
                        <span>⚠</span> CHECKOUT
                    </Typography>
                    <IconButton
                        onClick={handleClose}
                        sx={{
                            color: 'text.disabled',
                            bgcolor: customColors.backgrounds.tertiary,
                            border: `1px solid ${customColors.borders.hover}`,
                            borderRadius: 0,
                            width: 40,
                            height: 40,
                            '&:hover': { color: 'text.primary', bgcolor: customColors.borders.hover }
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </Box>

                <Box sx={{ p: 3, pt: 0 }}>
                    <Box sx={{
                        bgcolor: customColors.chip.stock.bg,
                        border: `1px solid ${customColors.borders.danger}`,
                        color: 'error.light',
                        py: 1,
                        px: 2,
                        mb: 3,
                        textAlign: 'center'
                    }}>
                        <Typography sx={{ fontSize: '0.875rem', letterSpacing: '0.05em' }}>
                            ★ LIMITED TIME OFFER ★
                        </Typography>
                    </Box>

                    <Box sx={infoBoxSx}>
                        <Typography sx={{ color: 'text.disabled', fontSize: '0.75rem', mb: 0.5, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                            ITEM:
                        </Typography>
                        <Typography sx={{ color: 'text.primary' }}>
                            {item.item_name}
                        </Typography>
                    </Box>

                    <Box sx={infoBoxSx}>
                        <Typography sx={{ color: 'text.disabled', fontSize: '0.75rem', mb: 0.5, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                            SELLER:
                        </Typography>
                        <Typography sx={{ color: 'text.primary' }}>
                            {item.seller_username}
                        </Typography>
                        <Typography sx={{ color: 'warning.main', fontSize: '0.75rem' }}>
                            ⭐⭐⭐⭐⭐ VERIFIED
                        </Typography>
                    </Box>

                    <Box sx={infoBoxSx}>
                        <Typography sx={{ color: 'text.disabled', fontSize: '0.75rem', mb: 0.5, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                            SHIPPING FROM:
                        </Typography>
                        <Typography sx={{ color: 'text.primary' }}>
                            {item.seller_city}, {item.seller_country}
                        </Typography>
                    </Box>

                    <Box sx={infoBoxSx}>
                        <Typography sx={{ color: 'text.disabled', fontSize: '0.75rem', mb: 1, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                            QUANTITY:
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                            <Button
                                variant="outlined"
                                color="secondary"
                                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                                disabled={quantity <= 1}
                                sx={{
                                    minWidth: 40,
                                    width: 40,
                                    height: 40,
                                    p: 0,
                                    color: '#9F9FA9',
                                    bgcolor: '#27272A',
                                    borderColor: '#3f3f46',
                                    '&:hover': {
                                        bgcolor: '#3F3F46',
                                    }
                                }}
                            >
                                -
                            </Button>
                            <TextField
                                type="number"
                                value={quantity}
                                onChange={(e) => {
                                    const val = parseInt(e.target.value) || 1;
                                    setQuantity(Math.min(Math.max(1, val), maxQuantity));
                                }}
                                inputProps={{ min: 1, max: maxQuantity, style: { textAlign: 'center' } }}
                                sx={{
                                    width: 80,
                                    '& .MuiOutlinedInput-root': {
                                        bgcolor: 'background.default',
                                        borderRadius: 0,
                                        height: 40,
                                        color: 'text.primary',
                                        '& fieldset': { borderColor: customColors.borders.default },
                                        '&:hover fieldset': { borderColor: customColors.borders.hover },
                                        '&.Mui-focused fieldset': { borderColor: 'primary.main' }
                                    },
                                    '& input': { color: 'text.primary', p: 1 }
                                }}
                            />
                            <Button
                                variant="outlined"
                                color="secondary"
                                onClick={() => setQuantity(q => Math.min(maxQuantity, q + 1))}
                                disabled={quantity >= maxQuantity}
                                sx={{
                                    minWidth: 40,
                                    width: 40,
                                    height: 40,
                                    p: 0,
                                    color: '#9F9FA9',
                                    bgcolor: '#27272A',
                                    borderColor: '#3f3f46',
                                    '&:hover': {
                                        bgcolor: '#3F3F46',
                                    }
                                }}
                            >
                                +
                            </Button>
                            <Typography sx={{ color: 'text.disabled', fontSize: '0.875rem' }}>
                                / {maxQuantity}
                            </Typography>
                        </Box>
                    </Box>

                    <Box sx={infoBoxSx}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                            <Typography sx={{ color: 'text.disabled', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                TOTAL COST:
                            </Typography>
                            <Typography sx={{ color: 'error.light', fontWeight: 'bold', fontSize: '1.5rem' }}>
                                {formatPrice(totalPrice)}
                            </Typography>
                        </Box>

                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            onClick={handlePurchase}
                            disabled={isPurchasing || item.item_stock === 0}
                            sx={{
                                py: 2,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: 1,
                            }}
                        >
                            {isPurchasing ? (
                                <>
                                    <CircularProgress size={16} sx={{ color: 'text.primary' }} />
                                    PROCESSING...
                                </>
                            ) : (
                                '★ CONFIRM PURCHASE ★'
                            )}
                        </Button>
                    </Box>

                    <Box sx={{ bgcolor: 'background.default', border: `1px solid ${customColors.borders.danger}`, p: 2, display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
                        <SentimentVeryDissatisfiedOutlinedIcon sx={{ fontSize: 20, color: 'error.light' }} />
                        <Typography sx={{ color: 'text.secondary', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                            ALL SALES FINAL! NO REFUNDS! NO TRACKING! CRYPTO ONLY!
                        </Typography>
                    </Box>

                    <Typography sx={{ color: '#4b5563', fontSize: '0.75rem', textAlign: 'center', mt: 2 }}>
                        By clicking confirm you agree to all terms
                    </Typography>
                </Box>
            </Box>
        </Modal>
    );
}
