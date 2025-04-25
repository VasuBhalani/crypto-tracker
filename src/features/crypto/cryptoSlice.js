import { createSlice } from '@reduxjs/toolkit';

// Sample crypto data with working image URLs
const initialState = {
  assets: [
    {
      id: 1,
      name: 'Bitcoin',
      symbol: 'BTC',
      logo: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1.png',
      price: 93759.48,
      change1h: 0.43,
      change24h: 0.93,
      change7d: 11.11,
      marketCap: 1861618902186,
      volume24h: 43874950947,
      volumeSymbol: '467.81K BTC',
      circulatingSupply: 19.85,
      circulatingSymbol: 'M BTC',
      maxSupply: 21,
      chartData: [70, 72, 73, 75, 78, 80, 82, 84, 86, 89, 92, 94]
    },
    {
      id: 2,
      name: 'Ethereum',
      symbol: 'ETH',
      logo: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png',
      price: 1802.46,
      change1h: 0.60,
      change24h: 3.21,
      change7d: 13.68,
      marketCap: 217581279327,
      volume24h: 23547469307,
      volumeSymbol: '13.05M ETH',
      circulatingSupply: 120.71,
      circulatingSymbol: 'M ETH',
      maxSupply: null,
      chartData: [50, 52, 53, 55, 57, 58, 59, 60, 61, 62, 63, 64]
    },
    {
      id: 3,
      name: 'Tether',
      symbol: 'USDT',
      logo: 'https://s2.coinmarketcap.com/static/img/coins/64x64/825.png',
      price: 1.00,
      change1h: 0.00,
      change24h: 0.00,
      change7d: 0.04,
      marketCap: 145320022085,
      volume24h: 92288882007,
      volumeSymbol: '92.25B USDT',
      circulatingSupply: 145.27,
      circulatingSymbol: 'B USDT',
      maxSupply: null,
      chartData: [100, 100, 100, 100, 100, 100, 99.5, 99.8, 100, 100, 100, 100]
    },
    {
      id: 4,
      name: 'XRP',
      symbol: 'XRP',
      logo: 'https://s2.coinmarketcap.com/static/img/coins/64x64/52.png',
      price: 2.22,
      change1h: 0.46,
      change24h: 0.54,
      change7d: 6.18,
      marketCap: 130073814966,
      volume24h: 5131481491,
      volumeSymbol: '2.30B XRP',
      circulatingSupply: 58.39,
      circulatingSymbol: 'B XRP',
      maxSupply: 100,
      chartData: [42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53]
    },
    {
      id: 5,
      name: 'BNB',
      symbol: 'BNB',
      logo: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png',
      price: 606.65,
      change1h: 0.09,
      change24h: -1.20,
      change7d: 3.73,
      marketCap: 85471956947,
      volume24h: 1874281784,
      volumeSymbol: '3.08M BNB',
      circulatingSupply: 140.89,
      circulatingSymbol: 'M BNB',
      maxSupply: 200,
      chartData: [40, 41, 42, 43, 44, 45, 46, 45, 46, 47, 48, 49]
    },
    {
      id: 6,
      name: 'Solana',
      symbol: 'SOL',
      logo: 'https://s2.coinmarketcap.com/static/img/coins/64x64/5426.png',
      price: 151.51,
      change1h: 0.53,
      change24h: 1.26,
      change7d: 14.74,
      marketCap: 78381958631,
      volume24h: 4881674486,
      volumeSymbol: '32.25M SOL',
      circulatingSupply: 517.31,
      circulatingSymbol: 'M SOL',
      maxSupply: null,
      chartData: [35, 37, 38, 40, 42, 44, 45, 46, 47, 48, 49, 50]
    }
  ],
  status: 'idle',
  error: null
};

const cryptoSlice = createSlice({
  name: 'crypto',
  initialState,
  reducers: {
    updateCryptoData: (state, action) => {
      const { id, updates } = action.payload;
      const assetIndex = state.assets.findIndex(asset => asset.id === id);
      if (assetIndex !== -1) {
        state.assets[assetIndex] = { ...state.assets[assetIndex], ...updates };
      }
    },
    updateMultipleAssets: (state, action) => {
      const updates = action.payload;
      updates.forEach(update => {
        const { id, ...changes } = update;
        const assetIndex = state.assets.findIndex(asset => asset.id === id);
        if (assetIndex !== -1) {
          state.assets[assetIndex] = { ...state.assets[assetIndex], ...changes };
        }
      });
    }
  }
});

export const { updateCryptoData, updateMultipleAssets } = cryptoSlice.actions;

// Selectors
export const selectAllCryptos = state => state.crypto.assets;
export const selectCryptoById = (state, id) => 
  state.crypto.assets.find(crypto => crypto.id === id);

export default cryptoSlice.reducer;