import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { PurchaseModal } from './PurchaseModal';
import { mockItem } from '../tests/fixtures/items';
import type { StolenItem } from '../types';

const mockNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate
  };
});

const renderModal = (item: StolenItem, isOpen: boolean = true, onClose = vi.fn()) => {
  return render(
    <BrowserRouter>
      <PurchaseModal item={item} isOpen={isOpen} onClose={onClose} />
    </BrowserRouter>
  );
};

describe('PurchaseModal', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders modal when open', () => {
    renderModal(mockItem);
    expect(screen.getByText('⚠')).toBeInTheDocument();
    expect(screen.getByText(/CHECKOUT/)).toBeInTheDocument();
  });

  it('does not render when closed', () => {
    renderModal(mockItem, false);
    expect(screen.queryByText(/CHECKOUT/)).not.toBeInTheDocument();
  });

  it('displays item information', () => {
    renderModal(mockItem);
    expect(screen.getByText('Test Item')).toBeInTheDocument();
    expect(screen.getByText('testuser')).toBeInTheDocument();
    expect(screen.getByText('New York, USA')).toBeInTheDocument();
  });

  it('displays initial quantity as 1', () => {
    renderModal(mockItem);
    const quantityInput = screen.getByRole('spinbutton') as HTMLInputElement;
    expect(quantityInput.value).toBe('1');
  });

  it('increments quantity when + button clicked', () => {
    renderModal(mockItem);
    const incrementButton = screen.getByText('+');
    fireEvent.click(incrementButton);

    const quantityInput = screen.getByRole('spinbutton') as HTMLInputElement;
    expect(quantityInput.value).toBe('2');
  });

  it('decrements quantity when - button clicked', () => {
    renderModal(mockItem);
    const incrementButton = screen.getByText('+');
    const decrementButton = screen.getByText('-');

    fireEvent.click(incrementButton);
    fireEvent.click(decrementButton);

    const quantityInput = screen.getByRole('spinbutton') as HTMLInputElement;
    expect(quantityInput.value).toBe('1');
  });

  it('does not allow quantity below 1', () => {
    renderModal(mockItem);
    const decrementButton = screen.getByText('-');
    fireEvent.click(decrementButton);

    const quantityInput = screen.getByRole('spinbutton') as HTMLInputElement;
    expect(quantityInput.value).toBe('1');
  });

  it('does not allow quantity above stock', () => {
    renderModal(mockItem);
    const incrementButton = screen.getByText('+');

    for (let i = 0; i < 10; i++) {
      fireEvent.click(incrementButton);
    }

    const quantityInput = screen.getByRole('spinbutton') as HTMLInputElement;
    expect(quantityInput.value).toBe('5');
  });

  it('calculates total price correctly', () => {
    renderModal(mockItem);
    expect(screen.getByText('$1,000')).toBeInTheDocument();

    const incrementButton = screen.getByText('+');
    fireEvent.click(incrementButton);

    expect(screen.getByText('$2,000')).toBeInTheDocument();
  });

  it('calls onClose when close button clicked', () => {
    const onClose = vi.fn();
    renderModal(mockItem, true, onClose);

    const closeButton = screen.getByRole('button', { name: '' });
    fireEvent.click(closeButton);

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('processes purchase and navigates to confirmation page', async () => {
    vi.useFakeTimers();
    renderModal(mockItem);

    const purchaseButton = screen.getByText(/CONFIRM PURCHASE/);
    fireEvent.click(purchaseButton);

    expect(screen.getByText(/PROCESSING.../)).toBeInTheDocument();

    await vi.advanceTimersByTimeAsync(1500);

    expect(mockNavigate).toHaveBeenCalledWith(
      '/transaction-complete',
      expect.objectContaining({
        state: expect.objectContaining({
          itemName: 'Test Item',
          quantity: 1,
          totalPrice: 1000
        })
      })
    );

    vi.useRealTimers();
  });

  it('displays verification badge', () => {
    renderModal(mockItem);
    expect(screen.getByText(/VERIFIED/)).toBeInTheDocument();
  });

  it('shows limited time offer banner', () => {
    renderModal(mockItem);
    expect(screen.getByText(/LIMITED TIME OFFER/)).toBeInTheDocument();
  });

  it('displays warning message', () => {
    renderModal(mockItem);
    expect(screen.getByText(/ALL SALES FINAL/)).toBeInTheDocument();
  });

  it('shows max quantity indicator', () => {
    renderModal(mockItem);
    expect(screen.getByText(/\/ 5/)).toBeInTheDocument();
  });
});