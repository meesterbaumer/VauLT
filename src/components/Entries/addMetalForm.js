import React, { useContext, useEffect, useRef } from "react";
import { MetalContext } from "./MetalProvider";
import { Metal } from "./Metal";
import "./Metal.css";
import { UnitContext } from "../Units/UnitProvider";
import { CollectionContext } from "../Collections/collectionProvider";

export const addMetalForm = () => {
  const { metals, getMetals, addMetals } = useContext(MetalContext);
  const { metalTestValue } = useContext(MetalApiTestContext);
  const { unitOptions, getUnits } = useContext(UnitContext);
  const { collectionOptions, getCollections } = useContext(CollectionContext);

  const pieceName = useRef();
  const weight = useRef();
  const unit = useRef();
  const qty = useRef();
  const purchasedPrice = useRef();
  const chooseCollection = useRef();
  const addPieceDialog = useRef();

  useEffect(() => {
    getMetals();
    getUnits();
    getCollections();
  }, []);
  console.log(metals);
  console.log(metalTestValue[0]);
  console.log(unitOptions);
  console.log(collectionOptions);

  const userMetals = metals.filter((m) => {
    return m.userId === parseInt(localStorage.vault_user);
  });
  console.log(userMetals);

  const userCollections = collectionOptions.filter((c) => {
    return c.userId === parseInt(localStorage.vault_user);
  });
  console.log(userCollections);

  const CollectionWeight = userMetals.map((metal) => {
    return metal.weight;
  });
  console.log(CollectionWeight);

  let collectionWeightTotal = 0;
  for (const piece of CollectionWeight) {
    collectionWeightTotal = collectionWeightTotal + piece;
  }
  console.log(collectionWeightTotal);

  console.log(metalTestValue[0].rates.XAG);
  console.log(parseInt(localStorage.vault_user));

  // Add a piece section
  const addPieceButtonClicked = (e) => {
    e.preventDefault();

    addPieceDialog.current.showModal();
  };
  // add a piece end

  const addItem = () => {

    const collectionId = parseInt(chooseCollection.current.value)
    const metalTypeId = parseInt(chooseCollection.current.value)

        if (unit.current.value !== 0 || chooseCollection.current.value !== 0) {
      existingUserCheck().then(() => {
        fetch("http://localhost:8088/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email.current.value,
            password: password.current.value,
            firstName: firstName.current.value,
            lastName: lastName.current.value,
          }),
        })
          .then((_) => _.json())
          .then((createdUser) => {
            if (createdUser.hasOwnProperty("id")) {
              localStorage.setItem("vault_user", createdUser.id);
              props.history.push("/");
            }
          });
      });
    } else {
      ;
    }

  };

  return (
    <>
      {/* dialog for adding piece to collection */}
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
            <label className="formText" htmlFor="weight">
              {" "}
              Weight{" "}
            </label>
            <input
              ref={weight}
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
              ref={unit}
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
              ref={qty}
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
              ref={purchasedPrice}
              type="number"
              name="purchasePrice"
              className="form-control"
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

      {/* Main enclosing container Start */}
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
        <div className="trioContainer">
          <div className="newCollectionContainer">
            <div>New Collection</div>
            <button>New Collection</button>
          </div>
          <div className="changeCollectionContainer">
            <div>View Collection</div>
            <select id="changeCollection">
              <option>Collection</option>
            </select>
          </div>
          <div className="addPieceContainer">
            <div>Add a piece</div>
            <button onClick={addPieceButtonClicked} id="addPieceClicked">
              Add Item
            </button>
          </div>
        </div>
        <div className="metals">
          {userMetals.map((m) => {
            return (
              <Metal key={m.id} metal={m} metalValue={metalTestValue[0]} />
            );
          })}
        </div>
      </div>
    </>
  );
};
