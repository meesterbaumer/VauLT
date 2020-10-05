import React, { useContext, useEffect } from "react";
import { MetalApiTestContext } from "../MetalAPI/MetalApiTestProvider";
import { MetalContext } from "../Entries/MetalProvider";
import { CollectionContext } from "../Collections/collectionProvider";
import { MetalTypesContext } from "../Entries/MetalTypesProvider";
import { PieceTypesContext } from "../Entries/PieceTypesProvider";
import { UnitContext } from "../Units/UnitProvider";
import { Metal } from "../Entries/MetalDashboard";
import "./Dashboard.css";
import "../Dashboard/MetalDashboard.css";

export const Dashboard = (props) => {
  const { metals, getMetals, addMetals } = useContext(MetalContext);
  // const { uploadImageFront, loadingFront, imageURLFront } = useContext(ImageFrontContext);
  // const { uploadImageBack, loadingBack, imageURLBack } = useContext(ImageBackContext);
  const { collectionOptions, getCollections, addCollections } = useContext(
    CollectionContext
  );
  const { unitOptions, getUnits } = useContext(UnitContext);
  const { metalTypes, getMetalTypes } = useContext(MetalTypesContext);
  const { pieceTypes, getPieceTypes } = useContext(PieceTypesContext);
  const { metalTestValue } = useContext(MetalApiTestContext);

  // useEffect to get all necessary data from providers
  useEffect(() => {
    getMetals();
    getUnits();
    getCollections();
    getMetalTypes();
    getPieceTypes();
  }, []);

  // Function to just retrieve metals specific to the logged in user
  const userMetals = metals
    .filter((m) => {
      return m.userId === parseInt(localStorage.vault_user);
    })
    .reverse();

  console.log(userMetals[0]);

  const userFavorites = userMetals.filter((uf) => uf.isFavorite === true);

  const recentMetals = userMetals.slice(0, 3);
  console.log(recentMetals);

  // Function to just retrieve collections specific to the logged in user
  const userCollections = collectionOptions.filter((c) => {
    return c.userId === parseInt(localStorage.vault_user);
  });

  // Function to retrieve total collection weight
  const CollectionWeight = userMetals.map((metal) => {
    return metal.weight * metal.qty;
  });

  let collectionWeightTotal = 0;
  for (const piece of CollectionWeight) {
    collectionWeightTotal = collectionWeightTotal + piece;
  }

  return (
    <>
      <div className="cont">
        <div className="gridContainer">
          <div className="chartContainer">
            <div className="iframeCont">
              <iframe
                title="chart"
                src="https://www.goldbroker.com/widget/live-price/XAG?currency=USD"
                width="100%"
                height="100%"
              ></iframe>
            </div>
          </div>
          <div className="valueContainerDashboard">
            <div className="collectionHeader">VauLT Value</div>
            <div className="collectionWorth">
              ${" "}
              {parseFloat(
                (1 / metalTestValue[0].rates.XAG) * collectionWeightTotal
              ).toFixed(2)}
            </div>
            <div className="collectionUpdateDash">
              Last Update: <br></br>{" "}
              {new Date(metalTestValue[0].timestamp * 1000).toLocaleString(
                "en-US"
              )}
            </div>
          </div>
          <div className="recentContainer">
            <div className="metalsDashboard">
              Recently Added to your collection
              {recentMetals.map((um) => {
                return (
                  <Metal
                    key={um.id}
                    metal={um}
                    props={props.history}
                    metalValue={metalTestValue[0]}
                  />
                );
              })}
            </div>
          </div>
          <div className="favoriteContainer">
            <div className="metalsDashboard">
            Favorite Pieces
            <div className="metals">
              {userFavorites.map((um) => {
                return (
                  <Metal
                    key={um.id}
                    metal={um}
                    props={props.history}
                    metalValue={metalTestValue[0]}
                  />
                );
              })}
            </div>
            </div>
          </div>
          <div className="profitContainer">profit</div>
        </div>
      </div>
    </>
  );
};

// https://gold-feed.com/charts/goldfeed29v9234ltlvl234l66l324/chart.php
// https://www.tradingview.com/symbols/OANDA-XAGUSD/?utm_campaign=mini-symbol-overview&utm_medium=widget&utm_source=goldprice.com
