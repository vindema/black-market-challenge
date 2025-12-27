import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Gallery } from './pages/Gallery';
import { ItemDetail } from './pages/ItemDetail';
import { TransactionComplete } from './pages/TransactionComplete';
import { prefetchItems } from './services/api';

function App() {
  useEffect(() => {
    prefetchItems();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Gallery />} />
        <Route path="/item/:id" element={<ItemDetail />} />
        <Route path="/transaction-complete" element={<TransactionComplete />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
