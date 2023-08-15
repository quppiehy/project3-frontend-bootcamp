import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Button,
  TextField,
  Card,
  CardContent,
  Divider,
  Stack,
  Rating,
} from "@mui/material";
import "./Product.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { useUserContext } from "../Components/UserContext";

const Product = () => {
  const [productIndex, setProductIndex] = useState();
  const [itemName, setItemName] = useState("ITEM NAME");
  const [itemDescription, setItemDescription] = useState("");
  const [itemPricePerUnit, setItemPricePerUnit] = useState("1.00");
  const [currentAmountChoice, setCurrentAmountChoice] = useState(1);
  const [availableQuantity, setAvailableQuantity] = useState(0);
  const [overallPhotos, setOverallPhotos] = useState([]);
  const [photoDisplay, setPhotoDisplay] = useState();
  const [MainPhoto, setMainPhoto] = useState("");
  const [ratingValue, setRatingValue] = useState(null);
  const [sellerDiscountPercentage, setSellerDiscountPercentage] = useState(0);
  const [displayPrice, setDisplayPrice] = useState();
  const { currUser, setCurrUser } = useUserContext();
  const [sellerEmail, setSellerEmail] = useState();
  const [uniqueChatroomId, setUniqueChatRoomId] = useState();

  useEffect(() => {
    console.log(currUser);
    if (currUser === null) {
      const localAccess = JSON.parse(localStorage.getItem("currUser"));
      console.log(localAccess);
      setCurrUser(localAccess);
    }
  }, [currUser]);

  console.log(currUser);

  useEffect(() => {
    if (sellerDiscountPercentage === 0) {
      setDisplayPrice(
        <Typography variant="h6" component="div">
          Price: <span style={{ color: "red" }}>${itemPricePerUnit}</span>
        </Typography>
      );
    } else {
      const priceAfterDiscount =
        itemPricePerUnit * ((100 - sellerDiscountPercentage) / 100);
      setDisplayPrice(
        <Typography variant="h6" component="div">
          Price:{" "}
          <span style={{ textDecoration: "line-through" }}>
            ${itemPricePerUnit}{" "}
          </span>
          <span style={{ color: "red" }}>${priceAfterDiscount}</span>
        </Typography>
      );
    }
  }, [sellerDiscountPercentage]);

  const param = useParams();
  if (productIndex !== param.productId) {
    setProductIndex(param.productId);
  }

  useEffect(() => {
    if (productIndex) {
      axios
        .get(`${process.env.REACT_APP_BACKEND_URL}/products/${productIndex}`)
        .then((info) => {
          console.log(info);
          const data = info.data;
          setItemName(data.title);
          setItemDescription(data.description);
          setItemPricePerUnit(Number(data.price).toFixed(2));
          setAvailableQuantity(data.quantity);
          setOverallPhotos(data.photos);
          setMainPhoto(data.photos[0].url);
          setSellerDiscountPercentage(data.sellerDiscountId);
          setSellerEmail(data.seller.email);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [productIndex]);

  useEffect(() => {
    if (overallPhotos) {
      setPhotoDisplay(
        overallPhotos.map((photos, index) => {
          return (
            <Box key={index} className="side-picture-container">
              <Box
                className="picture"
                component="img"
                src={photos.url}
                alt="Picture"
              />
            </Box>
          );
        })
      );
    }
  }, [overallPhotos]);

  const handleChangeAmount = (input) => {
    if (input === "L") {
      return setCurrentAmountChoice((prev) => prev - 1);
    } else if (input === "R") {
      return setCurrentAmountChoice((prev) => prev + 1);
    } else {
      return;
    }
  };

  const setQuantityToBuy = (e) => {
    const requestedQuantity = Number(e.target.value);
    if (isNaN(requestedQuantity)) {
      setCurrentAmountChoice(0);
      Swal.fire({
        title: "Error!",
        text: "You can only key in numbers!",
        icon: "error",
        confirmButtonText: "Proceed",
      });
      return;
    }
    if (requestedQuantity > availableQuantity) {
      Swal.fire({
        title: "Error!",
        text: `There are only ${availableQuantity} available!`,
        icon: "error",
        confirmButtonText: "Proceed",
      });
      setCurrentAmountChoice(0);
      return;
    }
    setCurrentAmountChoice(requestedQuantity);
  };

  //CONNIE THIS PART IS FOR YOU

  useEffect(() => {
    const productId = productIndex;
    if (currUser && sellerEmail && productId) {
      const uniqueId = currUser.userName + sellerEmail + String(productId);
      console.log(uniqueId);
      setUniqueChatRoomId(uniqueId);
    }
  });
  return (
    <div>
      <Grid container sx={{ display: "flex", flexDirection: "row" }}>
        <Grid item xs={12} lg={6}>
          <Box className="main-picture-area">
            <Box className="main-picture-container">
              <Box
                component="img"
                className="picture"
                src={MainPhoto}
                alt="Picture"
              />
            </Box>
          </Box>
          <Box className="side-picture-area">
            {photoDisplay ? photoDisplay : null}
          </Box>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Box className="description-area-overall">
            <Card
              sx={{ minWidth: "44vw", minHeight: "44vw", marginTop: "30px" }}
            >
              <CardContent>
                <Typography variant="h3" color="text.primary" gutterBottom>
                  {itemName}
                </Typography>
                <Typography
                  sx={{ mb: 2, mt: 2 }}
                  color="text.primary"
                  variant="h5"
                >
                  Description
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {itemDescription}
                </Typography>
                <Typography variant="h6" component="div">
                  Quantity Available:{" "}
                  <span style={{ color: "red" }}>{availableQuantity}</span>
                </Typography>
                <Stack
                  direction="row"
                  divider={<Divider orientation="vertical" flexItem />}
                  spacing={5}
                  sx={{ mt: 10 }}
                  justifyContent="space-between"
                >
                  <Box>
                    <Typography component="legend">Product Rating</Typography>
                    {ratingValue !== null ? (
                      <Rating name="Review" value={ratingValue} readOnly />
                    ) : (
                      <Typography component="legend">
                        No ratings for this product yet, be the first!
                      </Typography>
                    )}
                  </Box>
                  <Box>
                    <Button variant="text">Like this? ❤️</Button>
                  </Box>
                </Stack>
                <Stack
                  direction="row"
                  spacing={5}
                  sx={{ mt: 3 }}
                  justifyContent="space-between"
                >
                  {displayPrice}
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ ml: "10vw" }}
                  >
                    Contact Seller
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          </Box>
        </Grid>
      </Grid>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Box sx={{ mt: "20px" }}>
          <Button
            variant="outlined"
            onClick={(e) => handleChangeAmount("L")}
            disabled={currentAmountChoice < 1}
          >
            -
          </Button>
          <TextField
            variant="outlined"
            value={currentAmountChoice}
            onChange={(e) => setQuantityToBuy(e)}
            size="small"
            sx={{ ml: "0.8vw", mr: "0.8vw" }}
          />
          <Button
            variant="outlined"
            onClick={(e) => handleChangeAmount("R")}
            disabled={currentAmountChoice === availableQuantity}
          >
            +
          </Button>
          <Divider sx={{ mt: "20px", mb: "20px" }} />

          <Button variant="contained" color="primary" sx={{ ml: "8vw" }}>
            Add to Cart!
          </Button>
          <Divider sx={{ mt: "20px", mb: "20px" }} />
          <Grid
            container
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Grid item>
              <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                Reviews
              </Typography>
            </Grid>
          </Grid>
          <Divider sx={{ mt: "20px", mb: "20px" }} />
        </Box>
      </Grid>
    </div>
  );
};

export default Product;
