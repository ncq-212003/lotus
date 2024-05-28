import React, { createContext, useState } from 'react';

export const MarketContext = createContext();

export const MarketProvider = ({ children }) => {
  const [selectedMarket, setSelectedMarket] = useState(null);

  const setMarket = (marketName) => {
    setSelectedMarket(marketName);
    window.sessionStorage.setItem('market', marketName);
  };

  const value = {
    selectedMarket,
    setMarket
  }

  return (
    <MarketContext.Provider value={value}>
      {children}
    </MarketContext.Provider>
  );
};
