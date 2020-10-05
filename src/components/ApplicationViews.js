import React from "react";
import { Route } from "react-router-dom";
import { MetalProvider } from "./Entries/MetalProvider";
import { MetalList } from "./Entries/MetalList";
import { Dashboard } from "./Dashboard/Dashboard";
import { MetalApiProvider } from "./MetalAPI/MetalApiProvider";
import { UnitProvider } from "./Units/UnitProvider";
import { CollectionProvider } from "./Collections/collectionProvider";
import { MetalTypesProvider } from "./Entries/MetalTypesProvider";
import { PieceTypesProvider } from "./Entries/PieceTypesProvider";
import { ImageFrontProvider } from "./Entries/ImageProviderFront";
import { ImageBackProvider } from "./Entries/ImageProviderBack";

// test
export const ApplicationViews = () => {
  return (
    <>
      {/* Render the location list when http://localhost:3000/ */}
      <Route exact path="/">
        <ImageFrontProvider>
          <ImageBackProvider>
            <MetalApiProvider>
              <MetalTypesProvider>
                <CollectionProvider>
                  <UnitProvider>
                    <MetalProvider>
                      <PieceTypesProvider>
                        <Dashboard />
                      </PieceTypesProvider>
                    </MetalProvider>
                  </UnitProvider>
                </CollectionProvider>
              </MetalTypesProvider>
            </MetalApiProvider>
          </ImageBackProvider>
        </ImageFrontProvider>
      </Route>

      <ImageFrontProvider>
        <ImageBackProvider>
          <MetalApiProvider>
            <MetalTypesProvider>
              <CollectionProvider>
                <UnitProvider>
                  <MetalProvider>
                    <PieceTypesProvider>
                      <Route
                        exact
                        path="/collection"
                        render={(props) => <MetalList {...props} />}
                      />
                      <Route
                        path="/collection/edit/:metalId(\d+)"
                        render={(props) => <MetalList {...props} />}
                      />
                    </PieceTypesProvider>
                  </MetalProvider>
                </UnitProvider>
              </CollectionProvider>
            </MetalTypesProvider>
          </MetalApiProvider>
        </ImageBackProvider>
      </ImageFrontProvider>
      <Route
        path="/logout"
        render={(props) => {
          localStorage.removeItem("vault_user");
          props.history.push("/login");
        }}
      />
    </>
  );
};
