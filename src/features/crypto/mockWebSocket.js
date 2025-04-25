import { updateMultipleAssets } from './cryptoSlice';

class MockCryptoWebSocket {
  constructor(store) {
    this.store = store;
    this.intervalId = null;
    this.isConnected = false;
  }

  connect() {
    if (this.isConnected) return;
    
    this.isConnected = true;
    this.intervalId = setInterval(() => {
      this.generateUpdates();
    }, 3000); // Update every 3 seconds for less fluctuation
    
    console.log('WebSocket connected');
  }

  disconnect() {
    if (!this.isConnected) return;
    
    clearInterval(this.intervalId);
    this.isConnected = false;
    this.intervalId = null;
    
    console.log('WebSocket disconnected');
  }

  generateUpdates() {
    const assets = this.store.getState().crypto.assets;
    const updatedAssets = assets.map(asset => {
      // Generate more subtle price movements (between -0.5% and +0.5%)
      const priceChange = asset.price * (Math.random() * 0.01 - 0.005);
      const newPrice = parseFloat((asset.price + priceChange).toFixed(2));
      
      // Generate more subtle percentage changes
      const change1h = parseFloat((asset.change1h + (Math.random() * 0.06 - 0.03)).toFixed(2));
      const change24h = parseFloat((asset.change24h + (Math.random() * 0.08 - 0.04)).toFixed(2));
      const change7d = parseFloat((asset.change7d + (Math.random() * 0.04 - 0.02)).toFixed(2));
      
      // Update 24h volume (random ±1%)
      const volumeChange = asset.volume24h * (Math.random() * 0.02 - 0.01);
      const newVolume = Math.floor(asset.volume24h + volumeChange);
      
      // Smoother chart data updates
      const lastPoint = asset.chartData[asset.chartData.length - 1];
      const maxChange = lastPoint * 0.01; // Max 1% change
      const change = (Math.random() * maxChange * 2) - maxChange;
      const newPoint = parseFloat((lastPoint + change).toFixed(2));
      const newChartData = [...asset.chartData.slice(1), newPoint];
      
      return {
        id: asset.id,
        price: newPrice,
        change1h,
        change24h,
        change7d,
        volume24h: newVolume,
        chartData: newChartData
      };
    });
    
    this.store.dispatch(updateMultipleAssets(updatedAssets));
  }
}

export default MockCryptoWebSocket;