import { useState, useEffect } from 'react';
import { fetchItemById } from '../services/api';
import type { StolenItem } from '../types';

/**
 * Custom hook for fetching a single item by ID
 * @param id - Item ID
 * @returns Object containing item, loading state, and error
 */
export const useItemDetail = (id: string | undefined) => {
  const [item, setItem] = useState<StolenItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadItem = async () => {
      if (!id) return;

      setIsLoading(true);
      setError(null);
      try {
        const response = await fetchItemById(id);
        setItem(response);
      } catch (err) {
        setError('Item not found or connection lost.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    loadItem();
  }, [id]);

  return { item, isLoading, error };
};
