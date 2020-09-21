// Imports
import React, { useContext, useEffect, useRef, useState } from "react";
import { MetalApiTestContext } from "../MetalAPI/MetalApiTestProvider";
import { CollectionContext } from "../Collections/collectionProvider";
import { MetalContext } from "./MetalProvider";
import { UnitContext } from "../Units/UnitProvider";
import { MetalTypesContext } from "./MetalTypesProvider";
import { Metal } from "./Metal";
import "./Metal.css";
import { PieceTypesContext } from "./PieceTypesProvider";

// Function to list all metals for the current User
export const MetalList = () => {
  // Setting all data with useContext()
  const { metals, getMetals, addMetals } = useContext(MetalContext);
  const { collectionOptions, getCollections, addCollections } = useContext(
    CollectionContext
  );
  const { unitOptions, getUnits } = useContext(UnitContext);
  const { metalTypes, getMetalTypes } = useContext(MetalTypesContext);
  const { pieceTypes, getPieceTypes } = useContext(PieceTypesContext);
  const { metalTestValue } = useContext(MetalApiTestContext);

  const [filteredMetals, setFilteredMetals] = useState([])

  // Setting blanks refs to use in add form
  const pieceName = useRef();
  const metalType = useRef();
  const pieceType = useRef();
  const pieceWeight = useRef();
  const pieceUnit = useRef();
  const pieceQty = useRef();
  const piecePurchasedPrice = useRef();
  const chooseCollection = useRef();
  const addPieceDialog = useRef();
  const newCollectionDialog = useRef();
  const collectionName = useRef();
  const chosenCollectionName = useRef();

  // useEffect to get all necessary data from providers
  useEffect(() => {
    getMetals();
    getUnits();
    getCollections();
    getMetalTypes();
    getPieceTypes();
  }, []);

  useEffect(() => {
    console.log(chosenCollectionName.current.value)
    const collectionFilteredMetals = userMetals.filter((m) => {
      return m.collectionId === parseInt(chosenCollectionName.current.value)
    })
    setFilteredMetals(collectionFilteredMetals)
  }, [chosenCollectionName])

  // Function to just retrieve metals specific to the logged in user
  const userMetals = metals.filter((m) => {
    return m.userId === parseInt(localStorage.vault_user);
  });

  // Function to just retrieve collections specific to the logged in user
  const userCollections = collectionOptions.filter((c) => {
    return c.userId === parseInt(localStorage.vault_user);
  });

  

  // Function to retrieve total collection weight
  const CollectionWeight = userMetals.map((metal) => {
    return metal.weight;
  });

  let collectionWeightTotal = 0;
  for (const piece of CollectionWeight) {
    collectionWeightTotal = collectionWeightTotal + piece;
  }

  // Add a piece modal Trigger START
  const addPieceButtonClicked = (e) => {
    e.preventDefault();

    addPieceDialog.current.showModal();
  };

  const newCollectionClicked = (e) => {
    e.preventDefault();

    newCollectionDialog.current.showModal();
  };

  // Add a piece modal Trigger END

  // add collection function START

  const addCollection = () => {
    const name = collectionName.current.value;
    const userId = parseInt(localStorage.vault_user);

    console.log("Testing");

    if (name !== 0) {
      addCollections({
        name: name,
        userId: userId,
      });
    } else {
      window.alert("Be sure to complete all sections");
    }
  };

  const changeCollection = () => {
    const userSelectedCollection = userMetals.filter((m) => {
      return m.collectionId === parseInt(chosenCollectionName.current.value)
    }) 
    setFilteredMetals(userSelectedCollection)
    console.log(chosenCollectionName.current.value);
    console.log(userSelectedCollection)
    
  }

  // add collection function END

  // add a piece function START

  const addItem = () => {
    const name = pieceName.current.value;
    const weight = parseInt(pieceWeight.current.value);
    const qty = parseInt(pieceQty.current.value);
    const purchasedPrice = parseInt(piecePurchasedPrice.current.value);
    const timestamp = Date.now();
    const isFavorite = false;
    const isHidden = false;
    const userId = parseInt(localStorage.vault_user);
    const collectionId = parseInt(chooseCollection.current.value);
    const metalTypeId = parseInt(metalType.current.value);
    const pieceTypeId = parseInt(pieceType.current.value);
    const unitId = parseInt(pieceUnit.current.value);

    if (
      unitId !== 0 ||
      collectionId !== 0 ||
      metalTypeId !== 0 ||
      pieceTypeId !== 0
    ) {
      addMetals({
        name: name,
        weight: weight,
        qty: qty,
        purchasedPrice: purchasedPrice,
        timestamp: timestamp,
        isFavorite: isFavorite,
        isHidden: isHidden,
        userId: userId,
        collectionId: collectionId,
        metalTypeId: metalTypeId,
        pieceTypeId: pieceTypeId,
        unitId: unitId,
      });
    } else {
      window.alert("Be sure to complete all sections");
    }
  };

  // add a piece function END

  // HTML to render starts below

  return (
    <>
      {/* Collection Value Container START */}

      <div className="collectionContainer">
        <div className="collectionValue">
          <div className="collectionHeader">Collection Value</div>
          <div className="collectionWorth">
            ${" "}
            {parseFloat(
              (1 / metalTestValue[0].rates.XAG) * collectionWeightTotal
            ).toFixed(2)}
          </div>
          <div className="collectionUpdate">
            Data current as of{" "}
            {new Date(metalTestValue[0].timestamp * 1000).toLocaleString(
              "en-US"
            )}
          </div>
        </div>

        {/* Collection Value Container END */}

        {/* Trio Container START */}

        <div className="trioContainer">
          <div className="newCollectionContainer">
            <div>New Collection</div>
            <button onClick={newCollectionClicked} id="newCollection">
              New Collection
            </button>
          </div>
          <div className="changeCollectionContainer">
            <div>View Collection</div>

            <select
              ref={chosenCollectionName}
              onChange={changeCollection}
              id="changeCollectionContainer"
              type="select"
              name="collectionNames"
              className="form-control"
              required
            >
              <option value="0">Choose</option>
              {userCollections.map((uc) => (
                <option key={uc.id} value={uc.id}>
                  {uc.name}
                </option>
              ))}

            </select>
          </div>
          <div className="addPieceContainer">
            <div>Add a piece</div>
            <button onClick={addPieceButtonClicked} id="addPieceClicked">
              Add Item
            </button>
          </div>
        </div>

        {/* Trio Container END */}

        {/* Metal List START */}


        {filteredMetals === []?
        <div className="metals">
            {userMetals.map((m) => {
              return (
                <Metal key={m.id} metal={m} metalValue={metalTestValue[0]} />
              );
            })}
        </div>:<div className="metals">
            {filteredMetals.map((m) => {
              return (
                <Metal key={m.id} metal={m} metalValue={metalTestValue[0]} />
              );
            })}
        </div>}
      </div>

      {/* Metal List END */}

      {/* dialog for new collection START */}
      <dialog
        className="dialog dialog--newCollection"
        ref={newCollectionDialog}
      >
        <form className="form--add" onSubmit={addCollection}>
          <div className="addHeader formText h3 mb-3 font-weight-normal">
            Type a name for your new collection
          </div>
          <fieldset>
            <label className="formText" htmlFor="collectionName">
              Collection Name
            </label>
            <input
              ref={collectionName}
              type="text"
              name="collectionName"
              className="form-control"
              placeholder="Enter a name for your collection"
              required
              autoFocus
            />
          </fieldset>
          <fieldset>
            <div className="buttonsContainer">
              <button className="Buttons" type="submit">
                Add new colletion to VauLT
              </button>
              <button
                className=" Buttons Loginbutton--close"
                onClick={(e) => newCollectionDialog.current.close()}
              >
                Close
              </button>
            </div>
          </fieldset>
        </form>
      </dialog>
      {/* dialog for new collection END */}

      {/* dialog for adding piece to collection START */}
      <dialog className="dialog dialog--addPiece" ref={addPieceDialog}>
        <form className="form--add" onSubmit={addItem}>
          <div className="addHeader formText h3 mb-3 font-weight-normal">
            Add a piece to your collection
          </div>
          <fieldset>
            <label className="formText" htmlFor="pieceName">
              {" "}
              Piece Name{" "}
            </label>
            <input
              ref={pieceName}
              type="text"
              name="pieceName"
              className="form-control"
              placeholder="Enter a name for your piece"
              required
              autoFocus
            />
          </fieldset>
          <fieldset>
            <label className="formText" htmlFor="pieceTypes">
              Category
            </label>
            <select
              ref={pieceType}
              type="select"
              name="pieceTypes"
              className="form-control"
              required
            >
              <option value="0">Select from the categories below</option>
              {pieceTypes.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </fieldset>
          <fieldset>
            <label className="formText" htmlFor="metalTypes">
              Type of Metal
            </label>
            <select
              ref={metalType}
              type="select"
              name="metalTypes"
              className="form-control"
              required
            >
              <option value="0">Choose the type of metal</option>
              {metalTypes.map((mt) => (
                <option key={mt.id} value={mt.id}>
                  {mt.name}
                </option>
              ))}
            </select>
          </fieldset>
          <fieldset>
            <label className="formText" htmlFor="weight">
              {" "}
              Weight{" "}
            </label>
            <input
              ref={pieceWeight}
              type="number"
              name="weight"
              className="form-control"
              required
            />
          </fieldset>
          <fieldset>
            <label className="formText" htmlFor="weightUnit">
              Units
            </label>
            <select
              ref={pieceUnit}
              type="select"
              name="weightUnit"
              className="form-control"
              required
            >
              <option value="0">Choose OZ. or Grams</option>
              {unitOptions.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.name}
                </option>
              ))}
            </select>
          </fieldset>
          <fieldset>
            <label className="formText" htmlFor="qty">
              Qty.
            </label>
            <input
              ref={pieceQty}
              type="number"
              name="qty"
              className="form-control"
              required
            />
          </fieldset>
          <fieldset>
            <label className="formText" htmlFor="purchasePrice">
              Purchased Price
            </label>
            <input
              ref={piecePurchasedPrice}
              type="number"
              name="purchasePrice"
              className="form-control"
              step=".01"
              placeholder="13.00"
              required
            />
          </fieldset>
          <fieldset>
            <label className="formText" htmlFor="chooseCollection">
              Pick a Collection
            </label>
            <select
              ref={chooseCollection}
              type="select"
              name="chooseCollection"
              className="form-control"
              required
            >
              <option value="0">to add your piece to</option>
              {userCollections.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </fieldset>
          <fieldset>
            <div className="buttonsContainer">
              <button className="Buttons" type="submit">
                Add to your VauLT
              </button>
              <button
                className=" Buttons Loginbutton--close"
                onClick={(e) => addPieceDialog.current.close()}
              >
                Close
              </button>
            </div>
          </fieldset>
        </form>
      </dialog>

      {/* dialog for adding piece to collection END */}
    </>
  );
};
