import React, { useContext, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { AuthContext } from "../contexts/auth";
import ReactLoading from "react-loading";

import Home from "../pages/Home";
import Shop from "../pages/Shop";
import Cart from "../pages/Cart";
import Rescues from "../pages/Rescues";
import Account from "../pages/Account";
// import MapView from "../pages/MapView";
import Map from '../pages/MapView/index.tsx';

import HomeAdm from "../pages_Admin/HomeAdm";
import ShopAdm from "../pages_Admin/ShopAdm";
import UsersAdm from "../pages_Admin/UsersAdm";

const AppRoutes = () => {
  const { user, closeMap } = useContext(AuthContext);


  return (
    <Routes>
      {!closeMap ?
        <Route
          path="/"
          element={
            <Map
              Link={Link}
              AuthContext={AuthContext}
              ReactLoading={ReactLoading}
            />
          }
        />
        :
        <>
          <Route
            path="/"
            element={
              (user.admin ? true : false) ? (
                <HomeAdm
                  Link={Link}
                  AuthContext={AuthContext}
                  ReactLoading={ReactLoading}
                />
              ) : (
                <Home
                  Link={Link}
                  AuthContext={AuthContext}
                  ReactLoading={ReactLoading}
                />
              )
            }
          />

          <Route
            path="/shop"
            element={
              user.admin ? (
                <ShopAdm
                  Link={Link}
                  AuthContext={AuthContext}
                  ReactLoading={ReactLoading}
                />
              ) : (
                <Shop
                  Link={Link}
                  AuthContext={AuthContext}
                  ReactLoading={ReactLoading}
                />
              )
            }
          />

          <Route
            path="/users"
            element={
              user.admin && (
                <UsersAdm
                  Link={Link}
                  AuthContext={AuthContext}
                  ReactLoading={ReactLoading}
                />
              )
            }
          />
          <Route
            path="/cart"
            element={
              <Cart
                Link={Link}
                AuthContext={AuthContext}
                ReactLoading={ReactLoading}
              />
            }
          />
          <Route
            path="/rescues"
            element={
              <Rescues
                Link={Link}
                AuthContext={AuthContext}
                ReactLoading={ReactLoading}
              />
            }
          />
          <Route
            path="/account"
            element={
              <Account
                Link={Link}
                AuthContext={AuthContext}
                ReactLoading={ReactLoading}
              />
            }
          />
        </>
      }


    </Routes>
  );
};

export default AppRoutes;
