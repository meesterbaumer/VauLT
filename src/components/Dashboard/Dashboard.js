import React from "react";
import "./Dashboard.css";

export const Dashboard = () => {
  return (
    <>
      <div className="cont">
        <div className="gridContainer">
          <div className="chartContainer">
            <iframe
              title="chart"
              src="https://www.goldbroker.com/widget/live-price/XAG?currency=USD"
              width="100%"
              height="100%"
            ></iframe>
          </div>
          <div className="valueContainer">value</div>
          <div className="recentContainer">recent</div>
          <div className="favoriteContainer">favorite</div>
          <div className="profitContainer">profit</div>
        </div>
      </div>
    </>
  );
};

// https://gold-feed.com/charts/goldfeed29v9234ltlvl234l66l324/chart.php
// https://www.tradingview.com/symbols/OANDA-XAGUSD/?utm_campaign=mini-symbol-overview&utm_medium=widget&utm_source=goldprice.com
