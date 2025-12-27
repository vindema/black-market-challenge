import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { CheckCircleOutlineIcon } from '../components/common/icons';
import { formatPrice } from '../utils/formatters';
import { customColors } from '../theme/theme';

interface TransactionState {
    itemName: string;
    quantity: number;
    totalPrice: number;
    orderId: string;
}

export function TransactionComplete() {
    const location = useLocation();
    const navigate = useNavigate();
    const [countdown, setCountdown] = useState(10);

    const state = location.state as TransactionState | null;

    useEffect(() => {
        if (!state) {
            navigate('/');
            return;
        }

        const interval = setInterval(() => {
            setCountdown((prev) => {
                if (prev <= 1) {
                    clearInterval(interval);
                    navigate('/');
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [state, navigate]);

    if (!state) {
        return null;
    }

    return (
        <Box sx={{
            minHeight: '100vh',
            bgcolor: 'background.default',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            p: 2
        }}>
            <Box sx={{
                bgcolor: 'background.paper',
                border: `1px solid ${customColors.borders.default}`,
                width: '100%',
                maxWidth: 512,
                p: 4,
                textAlign: 'center'
            }}>
                {/* Green Checkmark Icon */}
                <Box sx={{ mb: 3 }}>
                    <CheckCircleOutlineIcon sx={{ fontSize: 80, color: 'success.main' }} />
                </Box>

                <Typography sx={{
                    color: 'text.primary',
                    fontWeight: 'bold',
                    fontSize: '1.25rem',
                    letterSpacing: '0.05em',
                    mb: 1
                }}>
                    TRANSACTION CONFIRMED
                </Typography>
                <Typography sx={{
                    color: 'text.disabled',
                    fontSize: '0.875rem',
                    mb: 4,
                }}>
                    Order #{state.orderId}
                </Typography>

                {/* Order Details Box */}
                <Box sx={{
                    bgcolor: 'background.default',
                    border: `1px solid ${customColors.borders.default}`,
                    p: 3,
                    mb: 3,
                    textAlign: 'left',
                }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                        <Typography sx={{ color: 'text.disabled' }}>Item:</Typography>
                        <Typography sx={{ color: 'text.primary' }}>{state.itemName}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                        <Typography sx={{ color: 'text.disabled' }}>Quantity:</Typography>
                        <Typography sx={{ color: 'text.primary' }}>{state.quantity}</Typography>
                    </Box>
                    <Box sx={{ borderTop: `1px solid ${customColors.borders.default}`, pt: 2 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography sx={{ color: 'text.disabled' }}>TOTAL:</Typography>
                            <Typography sx={{ color: 'error.light', fontWeight: 'bold', fontSize: '1.25rem' }}>
                                {formatPrice(state.totalPrice)}
                            </Typography>
                        </Box>
                    </Box>
                </Box>

                {/* Countdown */}
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 1,
                    color: 'text.disabled',
                    fontSize: '0.875rem',
                    mb: 3
                }}>
                    <AccessTimeIcon sx={{ fontSize: 18 }} />
                    <Typography>Returning in {countdown}s</Typography>
                </Box>

                {/* Return Button */}
                <Button
                    variant="outlined"
                    color="secondary"
                    fullWidth
                    onClick={() => navigate('/')}
                    sx={{
                        py: 1.5,
                        fontSize: '0.875rem',
                        bgcolor: '#27272A',
                        borderColor: '#3F3F46',
                        color: '#9f9fa9',
                        '&:hover': {
                            bgcolor: '#3F3F46',
                        }
                    }}
                >
                    RETURN NOW
                </Button>
            </Box>
        </Box>
    );
}
