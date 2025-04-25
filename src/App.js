import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import CryptoTable from './components/CryptoTable';
import MockCryptoWebSocket from './features/crypto/mockWebSocket';
import { store } from './app/store';

function App() {
  const dispatch = useDispatch();
  
  useEffect(() => {
    // Initialize and connect the mock WebSocket
    const ws = new MockCryptoWebSocket(store);
    ws.connect();
    
    // Clean up on unmount
    return () => {
      ws.disconnect();
    };
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold text-gray-900">Crypto Market Tracker</h1>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <CryptoTable />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;