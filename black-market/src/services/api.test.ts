import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import type { StolenItem } from '../types';

const mockItems: StolenItem[] = [
  {
    id: '1',
    item_name: 'Item 1',
    item_price: 100,
    item_photo_url: 'https://example.com/1.jpg',
    item_description: 'Description 1',
    item_stock: 10,
    seller_username: 'seller1',
    seller_country: 'USA',
    seller_city: 'New York'
  },
  {
    id: '2',
    item_name: 'Item 2',
    item_price: 200,
    item_photo_url: 'https://example.com/2.jpg',
    item_description: 'Description 2',
    item_stock: 5,
    seller_username: 'seller2',
    seller_country: 'UK',
    seller_city: 'London'
  },
  {
    id: '3',
    item_name: 'Item 3',
    item_price: 300,
    item_photo_url: 'https://example.com/3.jpg',
    item_description: 'Description 3',
    item_stock: 0,
    seller_username: 'seller3',
    seller_country: 'Canada',
    seller_city: 'Toronto'
  }
];

describe('api service', () => {
  beforeEach(() => {
    global.fetch = vi.fn();
    vi.clearAllMocks();
    // Reset module cache to clear allItemsCache between tests
    vi.resetModules();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('fetchItems', () => {
    it('fetches and paginates items correctly', async () => {
      vi.mocked(global.fetch).mockResolvedValueOnce({
        ok: true,
        json: async () => mockItems
      } as Response);

      const { fetchItems } = await import('./api');
      const result = await fetchItems(1, 2);

      expect(result.items).toHaveLength(2);
      expect(result.items[0].id).toBe('1');
      expect(result.items[1].id).toBe('2');
      expect(result.total).toBe(3);
      expect(result.page).toBe(1);
      expect(result.per_page).toBe(2);
      expect(result.total_pages).toBe(2);
    });

    it('handles second page correctly', async () => {
      vi.mocked(global.fetch).mockResolvedValueOnce({
        ok: true,
        json: async () => mockItems
      } as Response);

      const { fetchItems } = await import('./api');
      const result = await fetchItems(2, 2);

      expect(result.items).toHaveLength(1);
      expect(result.items[0].id).toBe('3');
      expect(result.page).toBe(2);
    });

    it('uses default pagination values', async () => {
      vi.mocked(global.fetch).mockResolvedValueOnce({
        ok: true,
        json: async () => mockItems
      } as Response);

      const { fetchItems } = await import('./api');
      const result = await fetchItems();

      expect(result.page).toBe(1);
      expect(result.per_page).toBe(8);
    });

    it('throws error when fetch fails', async () => {
      vi.mocked(global.fetch).mockResolvedValueOnce({
        ok: false
      } as Response);

      const { fetchItems } = await import('./api');
      await expect(fetchItems()).rejects.toThrow('Failed to fetch items');
    });
  });

  describe('fetchItemById', () => {
    it('returns item when found', async () => {
      vi.mocked(global.fetch).mockResolvedValueOnce({
        ok: true,
        json: async () => mockItems
      } as Response);

      const { fetchItemById } = await import('./api');
      const item = await fetchItemById('2');

      expect(item.id).toBe('2');
      expect(item.item_name).toBe('Item 2');
      expect(item.item_price).toBe(200);
    });

    it('throws error when item not found', async () => {
      vi.mocked(global.fetch).mockResolvedValueOnce({
        ok: true,
        json: async () => mockItems
      } as Response);

      const { fetchItemById } = await import('./api');
      await expect(fetchItemById('999')).rejects.toThrow('Item not found');
    });
  });

  describe('prefetchItems', () => {
    it('calls fetch without throwing on error', async () => {
      vi.mocked(global.fetch).mockRejectedValueOnce(new Error('Network error'));

      const { prefetchItems } = await import('./api');
      expect(() => prefetchItems()).not.toThrow();
    });

    it('successfully prefetches items', async () => {
      vi.mocked(global.fetch).mockResolvedValueOnce({
        ok: true,
        json: async () => mockItems
      } as Response);

      const { prefetchItems } = await import('./api');
      prefetchItems();

      await new Promise(resolve => setTimeout(resolve, 10));
      expect(global.fetch).toHaveBeenCalledTimes(1);
    });
  });
});