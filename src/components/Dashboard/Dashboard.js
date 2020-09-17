import React from "react";
import "./Dashboard.css";

export const Dashboard = () => {
  return (
    <>
      <div className="mainContainer">
        <div className="dashboard">Dashboard</div>
        <div className="chartContainer">
            <iframe className="iframe"
              scrolling="noscroll"
              title="chart"
              src="https://goldiraguide.org/chart/widget/chart-tabs.php?metal=silver&graph_width=220&graph_height=140&color_dark=000000&color_light=ffffff&color_graph=737373"
              width="100%"
              height="335"
            ></iframe>
        </div>
      </div>
    </>
  );
};

// https://gold-feed.com/charts/goldfeed29v9234ltlvl234l66l324/chart.php
// https://www.tradingview.com/symbols/OANDA-XAGUSD/?utm_campaign=mini-symbol-overview&utm_medium=widget&utm_source=goldprice.com
