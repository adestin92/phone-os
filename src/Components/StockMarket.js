import React from "react";
import "./StockMarket.css";

const mockStocks = [
  { symbol: "AAPL", name: "Apple Inc.", price: 175.64, change: 1.25 },
  { symbol: "GOOGL", name: "Alphabet Inc.", price: 134.89, change: -0.92 },
  { symbol: "AMZN", name: "Amazon.com", price: 99.12, change: 0.56 },
  { symbol: "TSLA", name: "Tesla, Inc.", price: 243.21, change: -3.45 },
  { symbol: "MSFT", name: "Microsoft Corp.", price: 311.45, change: 2.14 },
  { symbol: "NFLX", name: "Netflix, Inc.", price: 410.3, change: -1.87 },
  { symbol: "NVDA", name: "NVIDIA Corp.", price: 625.12, change: 3.78 },
  { symbol: "FB", name: "Meta Platforms", price: 215.67, change: -0.45 },
  { symbol: "DIS", name: "Disney", price: 145.21, change: 0.95 },
  { symbol: "BABA", name: "Alibaba", price: 98.45, change: -2.34 },
  { symbol: "ADBE", name: "Adobe Inc.", price: 489.23, change: 1.12 },
  { symbol: "PYPL", name: "PayPal", price: 122.56, change: -0.78 },
];

const StockMarket = () => {
  return (
    <div className="stock-container">
      <div className="stock-header">
        <h3>Stocks</h3>
        <h3 style={{ color: "gray" }}>September 25</h3>
        <div className="search-wrapper">
          <img src="./search.png" alt="search" className="search-icon" />
          <input type="text" placeholder="Search" className="stock-search" />
        </div>
      </div>

      <div className="stock-list">
        {mockStocks.map((stock) => {
          const isPositive = stock.change >= 0;
          return (
            <div key={stock.symbol} className="stock-row">
              <div className="stock-info">
                <p className="stock-symbol">{stock.symbol}</p>
                <p className="stock-name">{stock.name}</p>
              </div>
              <div className="stock-price-info">
                <p className="stock-price">${stock.price.toFixed(2)}</p>
                <p
                  className={`stock-change ${isPositive ? "positive" : "negative"}`}
                >
                  {isPositive ? "▲" : "▼"} {Math.abs(stock.change).toFixed(2)}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StockMarket;
