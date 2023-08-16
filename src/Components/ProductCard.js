import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import { Box, Button, Typography } from "@mui/material";
import ReviewProduct from "./ReviewProduct";
import { Link } from "react-router-dom";
import {
  addToCart,
  updateQuantityOfProduct,
  deleteProductFromCart,
} from "../utils/CartFunctions";
import { useUserContext } from "../Components/UserContext";

const ProductCard = ({
  product,
  cart,
  quantity,
  pastorder,
  onProductUpdate,
}) => {
  const { currUser, setCurrUser } = useUserContext();

  const [open, setOpen] = useState(false);
  const [quantityToBuy, setQuantityToBuy] = useState(quantity);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  console.log(product);

  useEffect(() => {
    if (!currUser) {
      const localAccess = JSON.parse(localStorage.getItem("currUser"));
      setCurrUser(localAccess);
    }
  }, [currUser, setCurrUser]);

  const asyncDelete = async () => {
    await deleteProductFromCart(cart, product.id);
    await onProductUpdate();
  };

  console.log("quantity", quantity);
  console.log("cart id", cart);
  return (
    <Box>
      <Card sx={{ width: "100%", height: "100%" }}>
        <Link to={`/products/${product.id}`}>
          <CardMedia
            sx={{ height: 300, objectFit: "cover" }}
            image={
              product.photos
                ? product.photos[0].url
                : "https://hinacreates.com/wp-content/uploads/2021/06/dummy2-450x341.png"
            }
            title={product.title + product.id}
          />
        </Link>
        <CardContent>
          <Link
            style={{ color: "#013d29" }}
            to={`/products/${product.productId}`}
          >
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              sx={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {product.title}
            </Typography>
          </Link>
          <Typography variant="h6" component="div" gutterBottom>
            ${product.price}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ height: "60px", maxHeight: "60px", overflow: "hidden" }}
          >
            {product.description?.split(" ").slice(0, 15).join(" ")}
          </Typography>
          {cart ? (
            <>
              <Typography
                variant="h6"
                color="text.secondary"
                sx={{ overflow: "hidden" }}
              >
                Quantity in cart: {quantityToBuy}
              </Typography>
              <Typography
                variant="h6"
                color="text.secondary"
                sx={{ overflow: "hidden" }}
              >
                Price: {(product.price * quantityToBuy).toFixed(2)}
              </Typography>
            </>
          ) : null}
        </CardContent>
        <CardActions>
          {cart ? (
            <>
              <Button
                onClick={() => {
                  if (quantityToBuy > 1) {
                    setQuantityToBuy((prevQuantity) => {
                      const newQuantity = prevQuantity - 1;
                      updateQuantityOfProduct(cart, product.id, newQuantity);
                      return newQuantity;
                    });
                    onProductUpdate();
                  }
                }}
                variant="outlined"
              >
                -
              </Button>
              <Button
                onClick={() => {
                  setQuantityToBuy((prevQuantity) => {
                    const newQuantity = prevQuantity + 1;
                    updateQuantityOfProduct(cart, product.id, newQuantity);
                    return newQuantity;
                  });
                  onProductUpdate();
                }}
                variant="outlined"
              >
                +
              </Button>
              <Button
                onClick={() => asyncDelete()}
                variant="outlined"
                color="error"
              >
                Delete
              </Button>
            </>
          ) : pastorder && !cart ? (
            <>
              <Button
                onClick={() => handleOpen()}
                variant="outlined"
                color="success"
              >
                Rate Product!
              </Button>
              <ReviewProduct
                product={product}
                open={open}
                handleClose={handleClose}
              />
            </>
          ) : (
            <Button
              onClick={() => addToCart(product.id, quantityToBuy, currUser.id)}
              variant="outlined"
            >
              Add to cart
            </Button>
          )}
        </CardActions>
      </Card>
      {cart ? (
        <Box>
          <hr />
        </Box>
      ) : null}
    </Box>
  );
};

export default ProductCard;
