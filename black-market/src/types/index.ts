export interface StolenItem {
  id: string;
  item_name: string;
  item_price: number;
  item_photo_url: string;
  item_description: string;
  item_stock: number;
  seller_username: string;
  seller_country: string;
  seller_city: string;
}

export interface PaginatedResponse {
  items: StolenItem[];
  total: number;
  page: number;
  per_page: number;
  total_pages: number;
}


