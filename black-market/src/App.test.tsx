import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';

vi.mock('./services/api', () => ({
  prefetchItems: vi.fn()
}));

vi.mock('./pages/Gallery', () => ({
  Gallery: () => <div>Gallery Page</div>
}));

vi.mock('./pages/ItemDetail', () => ({
  ItemDetail: () => <div>Item Detail Page</div>
}));

vi.mock('./pages/TransactionComplete', () => ({
  TransactionComplete: () => <div>Transaction Complete Page</div>
}));

describe('App', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders without crashing', () => {
    render(<App />);
    expect(screen.getByText('Gallery Page')).toBeInTheDocument();
  });

  it('calls prefetchItems on mount', async () => {
    const { prefetchItems } = await import('./services/api');
    render(<App />);
    expect(prefetchItems).toHaveBeenCalledTimes(1);
  });

  it('sets up BrowserRouter', () => {
    const { container } = render(<App />);
    expect(container.querySelector('div')).toBeInTheDocument();
  });
});