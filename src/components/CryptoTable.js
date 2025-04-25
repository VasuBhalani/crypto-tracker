import React from 'react';
import { useSelector } from 'react-redux';
import { selectAllCryptos } from '../features/crypto/cryptoSlice';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

const CryptoTable = () => {
  const cryptos = useSelector(selectAllCryptos);

  const formatPrice = (value) => {
    if (value >= 1000) {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(value);
    } else if (value >= 1) {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(value);
    } else {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 4,
        maximumFractionDigits: 4,
      }).format(value);
    }
  };

  const formatLargeNumber = (value) => {
    return new Intl.NumberFormat('en-US', {
      maximumFractionDigits: 0,
    }).format(value);
  };

  const PriceChange = ({ value }) => {
    if (value === 0) {
      return <span className="text-gray-500">0.00%</span>;
    }
    
    const isPositive = value > 0;
    let arrow, textColor;
    
    if (isPositive) {
      arrow = '▲';
      textColor = 'text-green-500';
    } else {
      arrow = '▼';
      textColor = 'text-red-500';
    }
    
    return (
      <span className={`${textColor} font-medium`}>
        {arrow} {Math.abs(value).toFixed(2)}%
      </span>
    );
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border-separate border-spacing-0">
        <thead>
          <tr className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
            <th className="sticky top-0 border-b bg-white py-3.5 px-4 whitespace-nowrap">#</th>
            <th className="sticky top-0 border-b bg-white py-3.5 px-4 whitespace-nowrap">Name</th>
            <th className="sticky top-0 border-b bg-white py-3.5 px-4 text-right whitespace-nowrap">Price</th>
            <th className="sticky top-0 border-b bg-white py-3.5 px-4 text-right whitespace-nowrap">1h %</th>
            <th className="sticky top-0 border-b bg-white py-3.5 px-4 text-right whitespace-nowrap">24h %</th>
            <th className="sticky top-0 border-b bg-white py-3.5 px-4 text-right whitespace-nowrap">7d %</th>
            <th className="sticky top-0 border-b bg-white py-3.5 px-4 text-right whitespace-nowrap">
              Market Cap <span className="text-gray-400 ml-1">ⓘ</span>
            </th>
            <th className="sticky top-0 border-b bg-white py-3.5 px-4 text-right whitespace-nowrap">
              Volume(24h) <span className="text-gray-400 ml-1">ⓘ</span>
            </th>
            <th className="sticky top-0 border-b bg-white py-3.5 px-4 text-right whitespace-nowrap">
              Circulating Supply <span className="text-gray-400 ml-1">ⓘ</span>
            </th>
            <th className="sticky top-0 border-b bg-white py-3.5 px-4 text-right whitespace-nowrap">Last 7 Days</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {cryptos.map((crypto) => (
            <tr 
              key={crypto.id} 
              className="hover:bg-gray-50 transition-colors duration-150"
            >
              <td className="py-4 px-4 whitespace-nowrap">
                <div className="flex items-center text-sm text-gray-500">
                  <button className="mr-2 text-gray-300 hover:text-gray-500">★</button>
                  {crypto.id}
                </div>
              </td>
              <td className="py-4 px-4 whitespace-nowrap">
                <div className="flex items-center">
                  <img 
                    src={crypto.logo} 
                    alt={`${crypto.name} logo`}
                    className="w-8 h-8 mr-3 rounded-full"
                    onError={(e) => {
                      e.target.src = "https://s2.coinmarketcap.com/static/cloud/img/placeholder.png";
                    }}
                  />
                  <div>
                    <div className="font-medium text-gray-900">{crypto.name}</div>
                    <div className="text-gray-500 text-sm">{crypto.symbol}</div>
                  </div>
                </div>
              </td>
              <td className="py-4 px-4 whitespace-nowrap text-right font-medium text-gray-900">
                {formatPrice(crypto.price)}
              </td>
              <td className="py-4 px-4 whitespace-nowrap text-right">
                <PriceChange value={crypto.change1h} />
              </td>
              <td className="py-4 px-4 whitespace-nowrap text-right">
                <PriceChange value={crypto.change24h} />
              </td>
              <td className="py-4 px-4 whitespace-nowrap text-right">
                <PriceChange value={crypto.change7d} />
              </td>
              <td className="py-4 px-4 whitespace-nowrap text-right text-gray-900">
                ${formatLargeNumber(crypto.marketCap)}
              </td>
              <td className="py-4 px-4 whitespace-nowrap text-right">
                <div className="text-gray-900">${formatLargeNumber(crypto.volume24h)}</div>
                <div className="text-gray-500 text-sm">{crypto.volumeSymbol}</div>
              </td>
              <td className="py-4 px-4 whitespace-nowrap text-right">
                <div className="text-gray-900">
                  {crypto.circulatingSupply} {crypto.circulatingSymbol}
                </div>
                {crypto.maxSupply && (
                  <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1.5">
                    <div 
                      className="bg-blue-600 h-1.5 rounded-full" 
                      style={{ width: `${(crypto.circulatingSupply / crypto.maxSupply) * 100}%` }}
                    ></div>
                  </div>
                )}
              </td>
              <td className="py-4 px-4 whitespace-nowrap">
                <div className="w-32 h-16">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={crypto.chartData.map((value, index) => ({ value }))}>
                      <Line 
                        type="monotone" 
                        dataKey="value" 
                        stroke={crypto.change7d >= 0 ? "#16a34a" : "#dc2626"} 
                        strokeWidth={2} 
                        dot={false}
                        isAnimationActive={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CryptoTable;