# 🎭 The Black Market

An underground marketplace frontend for selling... museum artifacts. Built with React, TypeScript, Tailwind CSS, and Vite.

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
npm install
```

### Configuration

Create a `.env` file in the root directory with your challenge ID:

```env
VITE_CHALLENGE_ID=your-unique-challenge-id
```

Optionally, if the API is hosted on a different domain:

```env
VITE_API_BASE_URL=https://api.example.com
```

### Development

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build

```bash
npm run build
```

## 🏗️ Architecture

### Pages
- **Gallery** (`/`) - Browse available items with pagination (8 items per page)
- **Item Detail** (`/item/:id`) - View full item details and purchase

### Components
- `ItemCard` - Display item preview in the gallery grid
- `Pagination` - Navigate between pages
- `PurchaseModal` - Confirm purchases (frontend-only, no backend integration)

### API Integration

The frontend connects to:
```
/api/v1/challenge/frontend/{CHALLENGE_ID}
```

Expected response format:
```json
{
  "items": [
    {
      "id": "string",
      "item_name": "string",
      "item_price": 0,
      "item_photo_url": "string",
      "item_description": "string",
      "item_stock": 0,
      "seller_username": "string",
      "seller_country": "string",
      "seller_city": "string"
    }
  ],
  "total": 0,
  "page": 1,
  "per_page": 8,
  "total_pages": 1
}
```

The API service also handles raw array responses and paginates client-side if needed.

## 🎨 Design

Dark underground aesthetic with:
- Monospace typography (JetBrains Mono)
- Blood red accent colors
- Scanline overlay effect
- Card glow on hover

## 📦 Tech Stack

- React 19
- TypeScript
- Tailwind CSS
- React Router DOM
- Vite
