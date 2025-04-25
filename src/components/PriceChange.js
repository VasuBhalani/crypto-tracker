import React from 'react';

const PriceChange = ({ value }) => {
  if (value === 0) {
    return <span className="text-gray-500">0.00%</span>;
  }
  
  const isPositive = value > 0;
  const displayValue = `${isPositive ? '▲' : '▼'} ${Math.abs(value).toFixed(2)}%`;
  
  return (
    <span className={`${isPositive ? 'text-green-500' : 'text-red-500'}`}>
      {displayValue}
    </span>
  );
};

export default PriceChange;