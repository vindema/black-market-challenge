import type { StolenItem, PaginatedResponse } from '../types';

const CHALLENGE_ID = '8cfbaae4-566a-46e8-95d9-5d798efaaaa6';
const API_BASE = `/api/v1/challenge/frontend/${CHALLENGE_ID}`;

let allItemsCache: StolenItem[] | null = null;

async function fetchAllItems(): Promise<StolenItem[]> {
    if (allItemsCache) {
        return allItemsCache;
    }

    const response = await fetch(API_BASE);
    if (!response.ok) {
        throw new Error('Failed to fetch items');
    }

    const data = await response.json();
    const items = Array.isArray(data) ? data : (data.items || [data]);
    allItemsCache = items;
    return items;
}

export async function fetchItems(page: number = 1, perPage: number = 8): Promise<PaginatedResponse> {
    const allItems = await fetchAllItems();
    const total = allItems.length;
    const totalPages = Math.ceil(total / perPage);
    const startIndex = (page - 1) * perPage;
    const items = allItems.slice(startIndex, startIndex + perPage);

    return {
        items,
        total,
        page,
        per_page: perPage,
        total_pages: totalPages,
    };
}

export async function fetchItemById(id: string): Promise<StolenItem> {
    const allItems = await fetchAllItems();
    const item = allItems.find((i) => i.id === id);

    if (!item) {
        throw new Error('Item not found');
    }

    return item;
}

export function prefetchItems(): void {
    fetchAllItems().catch(() => {});
}
