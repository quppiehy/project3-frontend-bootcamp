import React from "react";
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
import Chat from "./pages/Chat";
import UploadProduct from "./pages/UploadProduct.js";

function App() {
  const { isAuthenticated } = useAuth0();
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
            {/* Unauthenticated route */}
            <Route path="/" element={<Auth0 />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/products/:productId" element={<Product />} />
            <Route path="/uploadproduct" element={<UploadProduct />} />
          </>
        )}
      </Routes>
    </div>
  );
}

export default App;
