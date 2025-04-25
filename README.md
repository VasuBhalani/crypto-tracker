# Crypto Tracker App

A responsive React + Redux Toolkit application that simulates a cryptocurrency tracking website like CoinMarketCap, with real-time price updates.

## Features

- Display of cryptocurrency assets in a responsive table format
- Real-time price updates simulated with mock WebSocket
- State managed entirely through Redux Toolkit
- Responsive design using Tailwind CSS
- Dynamic price change visualizations
- 7-day price trend charts

## Tech Stack

- React 18
- Redux Toolkit
- Recharts for data visualization
- Tailwind CSS for styling

## Setup Instructions

1. Clone the repository:
```bash
git clone https://github.com/VasuBhalani/crypto-tracker.git
cd crypto-tracker
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open your browser and navigate to `http://localhost:3000`

## Architecture

The application follows a simple architecture:

- **Redux Store**: Manages all the application state
- **Mock WebSocket**: Simulates real-time data updates
- **Components**: Presentational components for rendering the UI

### State Management

All state is managed through Redux Toolkit:
- `cryptoSlice.js`: Handles cryptocurrency data and updates
- The mock WebSocket dispatches actions to update the state
- Components use selectors to access only the data they need

### Real-time Updates

The application simulates real-time updates by:
1. Creating a mock WebSocket class
2. Setting up an interval to generate random data changes
3. Dispatching Redux actions to update the store
4. Components re-render with new data automatically

## Future Improvements

- Add sorting and filtering options
- Implement real WebSocket connection to a crypto API
- Add pagination for large sets of data
- Add detail view for each cryptocurrency
- Implement dark mode theme
