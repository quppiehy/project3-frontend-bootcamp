import React, { createContext, useEffect, useState } from "react";
import "./App.css";
import Navbar from "./Components/Navbar";
import { Route, Routes } from "react-router-dom";
import Cart from "./pages/Cart";
import Homepage from "./pages/Homepage";
import Categories from "./pages/Categories";
import Search from "./pages/Search";
import Profile from "./pages/Profile";
import Deals from "./pages/Deals";
import Delivery from "./pages/Delivery";
import Product from "./pages/Product";
import FirebaseUpload from "./Components/FirebaseUpload";
import Payment from "./pages/Payment";
import Auth0 from "./pages/Auth0"; // Import your Auth0 component
import { useAuth0 } from "@auth0/auth0-react";
import Category from "./pages/Category";
import Chat from "./pages/Chat
import UploadProduct from "./pages/UploadProduct.js";
import axios from "axios";

export const UserContext = createContext({});

function App() {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();

  const [currUser, setCurrUser] = useState({});
  const [accessToken, setAccessToken] = useState("");

  useEffect(() => {
    const checkLogin = async () => {
      const localAccess = JSON.parse(localStorage.getItem("Token"));

      if (localAccess) {
        setAccessToken(accessToken);
      } else if (isAuthenticated) {
        const accessToken = await getAccessTokenSilently({
          authorizationParams: {
            audience: process.env.REACT_APP_AUDIENCE,
            scope: process.env.REACT_APP_SCOPE,
          },
        });
        console.log("This is access token ", accessToken);
        setAccessToken(accessToken);
      }

      if (isAuthenticated && accessToken !== null) {
        //login
        const userInfo = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/users/login`,
          user
        );
        console.log(userInfo.data.checkedUser);
        if (userInfo != null) {
          setCurrUser(userInfo.data.checkedUser);
        }
      }
    };
    checkLogin();
    console.log(user);
  }, [user, isAuthenticated]);

  useEffect(() => {
    if (accessToken !== null) {
      localStorage.setItem("Token", JSON.stringify(accessToken));
    }
  }, [accessToken]);

  console.log("curruser", currUser);
  console.log("auth user", user);

  return (
    <div>
      <Navbar />
      <Routes>
        {isAuthenticated ? (
          <>
            {/* Authenticated routes */}
            <Route path="/" element={<Homepage />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/categories/:categoryId" element={<Category />} />
            <Route path="/search" element={<Search />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/deals" element={<Deals />} />
            <Route path="/delivery" element={<Delivery />} />
            <Route path="/products/:productId" element={<Product />} />
            <Route path="/firebaseUpload" element={<FirebaseUpload />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/uploadproduct" element={<UploadProduct />} />
          </>
        ) : (
          <>
            {/* Unauthenticated routes */}
            <Route path="/" element={<Auth0 />} />
            <Route path="/chat" element={<Chat />} />
          </>
        )}
      </Routes>
    </div>
  );
}

export default App;
