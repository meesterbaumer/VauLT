// Imports
import React, { useContext, useEffect, useRef, useState } from "react";
import { MetalApiTestContext } from "../MetalAPI/MetalApiProvider";
import { MetalContext } from "./MetalProvider";
import { CollectionContext } from "../Collections/collectionProvider";
import { MetalTypesContext } from "./MetalTypesProvider";
import { PieceTypesContext } from "./PieceTypesProvider";
import { UnitContext } from "../Units/UnitProvider";
import { ImageFrontContext } from "./ImageProviderFront";
import { ImageBackContext } from "./ImageProviderBack";
import { Metal } from "./Metal";
import "./Metal.css";

// Function to list all metals for the current User
export const MetalList = (props) => {
  // Setting all data with useContext()
  const { metals, getMetals, addMetals, editMetals } = useContext(MetalContext);
  const { uploadImageFront, loadingFront, imageURLFront } = useContext(ImageFrontContext);
  const { uploadImageBack, loadingBack, imageURLBack } = useContext(ImageBackContext);
  const { collectionOptions, getCollections, addCollections } = useContext(
    CollectionContext
  );
  const { unitOptions, getUnits } = useContext(UnitContext);
  const { metalTypes, getMetalTypes } = useContext(MetalTypesContext);
  const { pieceTypes, getPieceTypes } = useContext(PieceTypesContext);
  const { metalTestValue } = useContext(MetalApiTestContext);

  const [filteredMetals, setFilteredMetals] = useState([]);
  const [metal, setMetal] = useState({});

  const editMode = props.match.params.hasOwnProperty("metalId");

  const handleControlledInputChange = (event) => {
    const newMetal = Object.assign({}, metal);
    newMetal[event.target.name] = event.target.value;
    setMetal(newMetal);
  };

  const getMetalInEditMode = () => {
    if (editMode) {
      const metalId = parseInt(props.match.params.metalId);
      const selectedMetal = metals.find((a) => a.id === metalId) || {};
      setMetal(selectedMetal);
    }
  };

  // Setting blanks refs to use in add form
  const pieceName = useRef();
  const metalType = useRef();
  // const pieceType = useRef();
  const pieceWeight = useRef();
  const pieceUnit = useRef();
  const pieceQty = useRef();
  const piecePurchasedPrice = useRef();
  const chooseCollection = useRef();
  const addPieceDialog = useRef();
  const newCollectionDialog = useRef();
  const collectionName = useRef();
  const chosenCollection = useRef(0);
  const favorite = useRef();

  // useEffect to get all necessary data from providers
  useEffect(() => {
    getMetals();
    getUnits();
    getCollections();
    getMetalTypes();
    getPieceTypes();
  }, []);

  useEffect(() => {
    getMetalInEditMode();
  }, [metals]);

  useEffect(() => {
    console.log(chosenCollection.current.value);
    console.log(filteredMetals);
    const collectionFilteredMetals = userMetals.filter((m) => {
      return m.collectionId === parseInt(chosenCollection.current.value);
    });
    setFilteredMetals(collectionFilteredMetals);
  }, [chosenCollection]);

  useEffect(() => {
    if (editMode) {
      console.log("EditMode");
      addPieceButtonClicked();
    } else {
      console.log("not Edit Mode");
    }
  }, []);

  // Function to just retrieve metals specific to the logged in user
  const userMetals = metals
    .filter((m) => {
      return m.userId === parseInt(localStorage.vault_user);
    })
    .reverse();

  console.log(userMetals);

  // Function to just retrieve collections specific to the logged in user
  const userCollections = collectionOptions.filter((c) => {
    return c.userId === parseInt(localStorage.vault_user);
  });

  // Function to retrieve total collection weight
  const CollectionWeight = userMetals.map((metal) => {
    return metal.weight * metal.qty;
  });

  const pieceProfit = metalTestValue - metal.purchasedPrice

  let collectionWeightTotal = 0;
  for (const piece of CollectionWeight) {
    collectionWeightTotal = collectionWeightTotal + piece;
  }

  // Add a piece modal Trigger START
  const addPieceButtonClicked = () => {
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

  console.log(chosenCollection.current.value);
  const changeCollection = () => {
    const userSelectedCollection = userMetals.filter((m) => {
      return m.collectionId === parseInt(chosenCollection.current.value);
    });
    setFilteredMetals(userSelectedCollection);
    console.log(chosenCollection.current.value);
    console.log(userSelectedCollection);
    console.log(userMetals);
    console.log(filteredMetals);
  };

  // add collection function END

  // add a piece function START

  const addItem = () => {
    const name = pieceName.current.value;
    const weight = parseInt(pieceWeight.current.value);
    const qty = parseInt(pieceQty.current.value);
    const purchasedPrice = parseInt(piecePurchasedPrice.current.value);
    const timestamp = Date.now();
    const isFavorite = parseInt(favorite.current.value);
    const isHidden = false;
    const userId = parseInt(localStorage.vault_user);
    const collectionId = parseInt(chooseCollection.current.value);
    const metalTypeId = parseInt(metalType.current.value);
    // const pieceTypeId = parseInt(pieceType.current.value);
    const unitId = parseInt(pieceUnit.current.value);

    if (
      unitId === 0 ||
      collectionId === 0 ||
      metalTypeId === 0
      // pieceTypeId === 0
    ) {
      window.alert("Be sure to complete all sections");
    } else {
      if (editMode) {
        editMetals({
          id: metal.id,
          name: name,
          imageFront: imageURLFront,
          imageBack: imageURLBack,
          weight: weight,
          qty: qty,
          purchasedPrice: purchasedPrice,
          timestamp: timestamp,
          isFavorite: (isFavorite)? true :false,
          isHidden: isHidden,
          userId: userId,
          collectionId: collectionId,
          metalTypeId: metalTypeId,
          pieceTypeId: metal.pieceTypeId,
          unitId: unitId,
        }).then(() => props.history.push("/collection"));
      } else {
        addMetals({
          name: name,
          imageFront: imageURLFront,
          imageBack: imageURLBack,
          weight: weight,
          qty: qty,
          purchasedPrice: purchasedPrice,
          timestamp: timestamp,
          isFavorite: (isFavorite)? true :false,
          isHidden: isHidden,
          userId: userId,
          collectionId: collectionId,
          metalTypeId: metalTypeId,
          pieceTypeId: metal.pieceTypeId,
          unitId: unitId,
        }).then(() => props.history.push("/collection"));
      }
    }
  };

  // add a piece function END

  // HTML to render starts below

  return (
    <>
      {/* Collection Value Container START */}

      <div className="collectionContainer">
        <div className="collectionValue">
          <div className="collectionHeader">VauLT Value</div>
          <div className="blurred collectionWorth">
            ${" "}
            {parseFloat(
              (1 / metalTestValue.rates.XAG) * collectionWeightTotal
            ).toFixed(2)}
          </div>
          <div className="collectionUpdate">
            Last Update: <br></br>{" "}
            {new Date(metalTestValue.timestamp * 1000).toLocaleString(
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
              Add Collection
            </button>
          </div>
          <div className="changeCollectionContainer">
            <div>View Collection</div>

            <select
              ref={chosenCollection}
              onChange={changeCollection}
              id="changeCollectionContainer"
              type="select"
              name="collectionNames"
              className="form-control"
              required
            >
              <option value="0">All Metals</option>
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

        {/* ternary for displaying metals */}
        {chosenCollection.current.value === "0" ? (
          <div className="metals">
            {userMetals.map((um) => {
              return (
                <Metal
                  key={um.id}
                  metal={um}
                  props={props.history}
                  metalValue={metalTestValue}
                />
              );
            })}
          </div>
        ) : (
          <div className="metals">
            {filteredMetals.map((fm) => {
              return (
                <Metal
                  key={fm.id}
                  metal={fm}
                  props={props.history}
                  metalValue={metalTestValue}
                />
              );
            })}
          </div>
        )}
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
              onChange={handleControlledInputChange}
              required
              autoFocus
            />
          </fieldset>
          <fieldset>
            <div className="buttonsContainer">
              <button className="Buttons" type="submit">
                Add new collection to VauLT
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
        <form className="form--add">
          <div className="addHeader formText h3 mb-3 font-weight-normal">
            {editMode ? `Edit your ${metal.name}` : "Add a piece to your VauLT"}
          </div>
          <fieldset>
            <label className="formText" htmlFor="name">
              {" "}
              Piece Name{" "}
            </label>
            <input
              ref={pieceName}
              type="text"
              name="name"
              defaultValue={metal.name}
              className="form-control"
              placeholder="Enter a name for your piece"
              onChange={handleControlledInputChange}
              required
              autoFocus
            />
          </fieldset>
          <fieldset>
            <label className="formText" htmlFor="pieceTypeId">
              Category
            </label>
            <select
              // ref={pieceType}
              name="pieceTypeId"
              value={metal.pieceTypeId}
              onChange={handleControlledInputChange}
              type="select"
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
            <label className="formText" htmlFor="metalTypeId">
              Type of Metal
            </label>
            <select
              ref={metalType}
              type="select"
              name="metalTypeId"
              value={metal.metalTypeId}
              onChange={handleControlledInputChange}
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
              defaultValue={metal.weight}
              onChange={handleControlledInputChange}
              className="form-control"
              required
            />
          </fieldset>
          <fieldset>
            <label className="formText" htmlFor="unitId">
              Units
            </label>
            <select
              ref={pieceUnit}
              type="select"
              name="unitId"
              value={metal.unitId}
              onChange={handleControlledInputChange}
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
              defaultValue={metal.qty}
              onChange={handleControlledInputChange}
              className="form-control"
              required
            />
          </fieldset>
          <fieldset>
            <label className="formText" htmlFor="purchasePrice">
              Purchased Price Per OZ.
            </label>
            <input
              ref={piecePurchasedPrice}
              type="number"
              name="purchasedPrice"
              defaultValue={metal.purchasedPrice}
              onChange={handleControlledInputChange}
              className="form-control"
              step=".01"
              placeholder="13.00"
              required
            />
          </fieldset>
          <fieldset>
            <label className="formText" htmlFor="collectionId">
              Pick a Collection
            </label>
            <select
              ref={chooseCollection}
              type="select"
              name="collectionId"
              value={metal.collectionId}
              onChange={handleControlledInputChange}
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
            <label className="formText" htmlFor="isFavorite">
              Favorite Piece
            </label>
            <select
              ref={favorite}
              type="select"
              name="isFavorite"
              value={metal.isFavorite}
              onChange={handleControlledInputChange}
              className="form-control"
              required
            >
              <option value="0">No</option>
              <option value="1">Yes</option>
            </select>
          </fieldset>

          <fieldset>
            <label className="formText formImageFront" htmlFor="imageFront">
              Upload Image Front:{" "}
            </label>
            <input
              className="form-control"
              id="imageFront"
              name="imageFront"
              type="file"
              onChange={uploadImageFront}
            />

            {loadingFront ? (
              <div className="formText">Loading</div>
            ) : (
              <img src={imageURLFront} style={{ width: `50px` }} alt=""></img>
            )}
          </fieldset>

          <fieldset>
            <label className="formText formImageBack" htmlFor="imageBack">
              Upload Image Back:{" "}
            </label>
            <input
              className="form-control"
              id="imageBack"
              name="imageBack"
              type="file"
              onChange={uploadImageBack}
            />

            {loadingBack ? (
              <div className="formText">Loading</div>
            ) : (
              <img src={imageURLBack} style={{ width: `50px` }} alt=""></img>
            )}
          </fieldset>

          <fieldset>
            <div className="buttonsContainer">
              <button
                className="Buttons"
                type="submit"
                onClick={(evt) => {
                  evt.preventDefault();
                  addItem();
                  addPieceDialog.current.close();
                }}
              >
                {editMode ? "Update your VauLT" : "Add to your VauLT"}
              </button>
              <button
                className=" Buttons Loginbutton--close"
                onClick={(e) => {
                  addPieceDialog.current.close();
                  props.history.push("/collection");
                }}
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
