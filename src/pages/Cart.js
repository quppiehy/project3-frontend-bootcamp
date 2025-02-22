import { Box, Button, Typography, ThemeProvider, Divider } from "@mui/material";
import HomepodMini from "../images/deals-homepodmini.png";
import InstaxMini9 from "../images/deals-instaxmini9.png";
import BaseCampDuffelM from "../images/deals-basecampduffelm.png";
import React, { useEffect, useState } from "react";
import ProductCard from "../Components/ProductCard";
import { updateTotalOfCart } from "../utils/CartFunctions";
import { useUserContext } from "../Components/UserContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { theme2 } from "../theme";

const Cart = () => {
  const { currUser, setCurrUser } = useUserContext();
  const [productsInCart, setProductsInCart] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (!currUser) {
      const localAccess = JSON.parse(localStorage.getItem("currUser"));
      setCurrUser(localAccess);
      console.log(currUser);
    }
  }, [currUser, setCurrUser]);

  useEffect(() => {
    //http://localhost:8080/products/cart/11
    getProductsInCart();
  }, []);

  const getProductsInCart = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/products/cart/${currUser.id}`
      );
      console.log("Response", response.data);
      setProductsInCart(response.data);
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const handleProductUpdate = () => {
    getProductsInCart();
  };

  const calculatePreDiscountTotal = () => {
    if (productsInCart.length < 0) {
      return 0;
    } else {
      return productsInCart
        .reduce((total, product) => {
          return total + parseFloat(product.product.price) * product.quantity;
        }, 0)
        .toFixed(2);
    }
  };

  const calculatePostDiscountTotal = () => {
    if (productsInCart.length < 0) {
      return 0;
    } else {
      return productsInCart
        .reduce((total, product) => {
          const price = parseFloat(product.product.price);
          const discountAmount = product.product.seller_discount
            ? parseFloat(product.product.seller_discount.discountAmount)
            : 0;
          return total + (price - price * discountAmount) * product.quantity;
        }, 0)
        .toFixed(2);
    }
  };

  const calculateGST = () => {
    if (productsInCart.length < 0) {
      return 0;
    } else {
      return (parseFloat(calculatePostDiscountTotal()) * 0.08).toFixed(2);
    }
  };

  const calculateTotal = () => {
    if (productsInCart.length < 0) {
      return 0;
    } else {
      return (
        parseFloat(calculatePostDiscountTotal()) + parseFloat(calculateGST())
      ).toFixed(2);
    }
  };

  console.log("cartid");
  return (
    <>
      <Box sx={{ paddingTop: "100px" }}>
        <ThemeProvider theme={theme2}>
          <Typography variant="h3" sx={{ py: "20px", textAlign: "center" }}>
            My Cart
          </Typography>
        </ThemeProvider>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-around" }}>
        <Box sx={{ width: "400px" }}>
          <Box sx={{ p: "2% 5%", margin: "0" }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              {productsInCart.map((product, index) => (
                <ProductCard
                  cart={product.currentCartId}
                  quantity={product.quantity}
                  product={product.product}
                  onProductUpdate={handleProductUpdate}
                  key={index}
                />
              ))}
            </Box>
          </Box>
        </Box>
        <Box>
          <ThemeProvider theme={theme2}>
            <Typography variant="h4">Current Order</Typography>
            <Divider />
            <br />
            <Typography variant="h5">
              Total Before Discounts: ${calculatePreDiscountTotal()}
            </Typography>
            <Typography variant="h5">
              Total After Discounts: ${calculatePostDiscountTotal()}
            </Typography>
            <Typography variant="h5">GST 8%: ${calculateGST()}</Typography>
            <Typography variant="h5">Total: ${calculateTotal()}</Typography>
          </ThemeProvider>
          <br />
          <Button
            variant="contained"
            onClick={() => {
              updateTotalOfCart(
                calculateTotal(),
                productsInCart[0].currentCartId
              );
              navigate("/payment");
            }}
          >
            Check Out Cart
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default Cart;
