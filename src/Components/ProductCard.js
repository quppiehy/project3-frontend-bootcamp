import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import { Box, Button, Typography } from "@mui/material";
import ReviewProduct from "./ReviewProduct";
import { Link } from "react-router-dom";

const ProductCard = ({ product, cart, quantity, pastorder }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  console.log(product);

  return (
    <Box>
      <Card sx={{ width: "100%", height: "100%" }}>
        <CardMedia
          sx={{ height: 300, objectFit: "cover" }}
          image={
            product.photos
              ? product.photos[0].url
              : "https://hinacreates.com/wp-content/uploads/2021/06/dummy2-450x341.png"
          }
          title={product.title + product.id}
        />
        <CardContent>
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
                variant="body2"
                color="text.secondary"
                sx={{ overflow: "hidden" }}
              >
                Quantity: {quantity}
              </Typography>
            </>
          ) : null}
        </CardContent>
        <CardActions>
          {cart ? (
            <>
              <Button variant="outlined">-</Button>
              <Button variant="outlined">+</Button>
              <Button variant="outlined" color="error">
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
            <Link to={`/products/${product.productId}`}>
              <Button variant="outlined">See Product Page</Button>
            </Link>
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
