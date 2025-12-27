import { useState, useEffect } from 'react';
import { fetchItems } from '../services/api';
import type { StolenItem } from '../types';

/**
 * Custom hook for fetching paginated items
 * @param page - Current page number
 * @param perPage - Items per page
 * @returns Object containing items, loading state, error, and total pages
 */
export const useItems = (page: number, perPage: number) => {
  const [items, setItems] = useState<StolenItem[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadItems = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetchItems(page, perPage);
        setItems(response.items);
        setTotalPages(response.total_pages);
      } catch (err) {
        setError('Failed to load items. Connection may be compromised.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    loadItems();
  }, [page, perPage]);

  return { items, totalPages, isLoading, error };
};
