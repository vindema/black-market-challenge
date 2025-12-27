import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ItemCard } from './ItemCard';
import { mockItem } from '../tests/fixtures/items';
import type { StolenItem } from '../types';

const renderItemCard = (item: StolenItem) => {
  return render(
    <BrowserRouter>
      <ItemCard item={item} />
    </BrowserRouter>
  );
};

describe('ItemCard', () => {
  it('renders item name correctly', () => {
    renderItemCard(mockItem);
    expect(screen.getByText('Test Item')).toBeInTheDocument();
  });

  it('displays formatted price', () => {
    renderItemCard(mockItem);
    expect(screen.getByText('$1,000')).toBeInTheDocument();
  });

  it('shows seller information', () => {
    renderItemCard(mockItem);
    expect(screen.getByText('testuser')).toBeInTheDocument();
    expect(screen.getByText(/New York/)).toBeInTheDocument();
    expect(screen.getByText(/USA/)).toBeInTheDocument();
  });

  it('displays stock count when in stock', () => {
    renderItemCard(mockItem);
    expect(screen.getByText('5 LEFT')).toBeInTheDocument();
  });

  it('shows SOLD OUT overlay when out of stock', () => {
    const outOfStockItem = { ...mockItem, item_stock: 0 };
    renderItemCard(outOfStockItem);
    expect(screen.getByText('SOLD OUT')).toBeInTheDocument();
    expect(screen.queryByText('5 LEFT')).not.toBeInTheDocument();
  });

  it('displays item image with correct src', () => {
    renderItemCard(mockItem);
    const image = screen.getByAltText('Test Item');
    expect(image).toHaveAttribute('src', 'https://example.com/image.jpg');
  });

  it('renders VIEW DETAILS button', () => {
    renderItemCard(mockItem);
    expect(screen.getByText('VIEW DETAILS')).toBeInTheDocument();
  });

  it('links to correct item detail page', () => {
    renderItemCard(mockItem);
    const link = screen.getByText('VIEW DETAILS').closest('a');
    expect(link).toHaveAttribute('href', '/item/1');
  });

  it('displays BEST PRICE indicator', () => {
    renderItemCard(mockItem);
    expect(screen.getByText('BEST PRICE')).toBeInTheDocument();
  });
});