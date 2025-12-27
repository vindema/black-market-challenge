import type { StolenItem } from '../../types';

/**
 * Shared test fixtures for StolenItem mock data
 * Use these in tests to maintain consistency across test files
 */

export const mockItem: StolenItem = {
  id: '1',
  item_name: 'Test Item',
  item_price: 1000,
  item_photo_url: 'https://example.com/image.jpg',
  item_description: 'Test description',
  item_stock: 5,
  seller_username: 'testuser',
  seller_country: 'USA',
  seller_city: 'New York'
};

export const mockOutOfStockItem: StolenItem = {
  ...mockItem,
  id: '2',
  item_name: 'Out of Stock Item',
  item_stock: 0,
};

export const mockHighPriceItem: StolenItem = {
  ...mockItem,
  id: '3',
  item_name: 'Expensive Item',
  item_price: 50000,
};

export const mockItems: StolenItem[] = [
  mockItem,
  {
    id: '2',
    item_name: 'Another Test Item',
    item_price: 2500,
    item_photo_url: 'https://example.com/image2.jpg',
    item_description: 'Another test description',
    item_stock: 10,
    seller_username: 'seller2',
    seller_country: 'Canada',
    seller_city: 'Toronto'
  },
  {
    id: '3',
    item_name: 'Third Item',
    item_price: 750,
    item_photo_url: 'https://example.com/image3.jpg',
    item_description: 'Third test description',
    item_stock: 2,
    seller_username: 'seller3',
    seller_country: 'UK',
    seller_city: 'London'
  }
];
