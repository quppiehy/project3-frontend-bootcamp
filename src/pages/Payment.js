import {
  Box,
  Button,
  Typography,
  Divider,
  Paper,
  InputBase,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Grid,
  ThemeProvider,
} from "@mui/material";
import { Directions } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import StripeContainer from "../Components/StripeContainer";
import { useUserContext } from "../Components/UserContext";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../utils/CartFunctions";
import { theme2 } from "../theme";

function Payment() {
  const [overallPrice, setOverallPrice] = useState(0);
  const [openPaymentBar, setOpenPaymentBar] = useState(false);
  const [selectedPaymentOption, setSelectedPaymentOption] = useState("COD");
  const { currUser, setCurrUser } = useUserContext();
  const [loadedStatus, setLoadedStatus] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (currUser) {
      axios
        .get(
          `${process.env.REACT_APP_BACKEND_URL}/products/cart/total/${currUser.id}`
        )
        .then((info) => {
          console.log(info);
          setOverallPrice(info.data[0].totalPrice);
        })
        .catch((erro) => {
          console.log(erro);
        });
    } else {
      return;
    }
  }, [loadedStatus]);

  useEffect(() => {
    console.log(currUser);
    if (currUser === null) {
      const localAccess = JSON.parse(localStorage.getItem("currUser"));
      console.log(localAccess);
      setCurrUser(localAccess);
      setLoadedStatus(true);
    }
  }, [currUser]);

  const changePaymentOption = (event) => {
    setSelectedPaymentOption(event.target.value);
  };

  const codCheckout = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Success",
      text: "Your order has been confirmed, the Seller will contact you",
      icon: "success",
      confirmButtonText: "Proceed",
    });

    navigate("/");
  };

  return (
    <>
      <Box sx={{ paddingTop: "40px" }}>
        <ThemeProvider theme={theme2}>
          <Typography variant="h3" sx={{ mt: 10 }}>
            Current Cart
          </Typography>
          <Box margin="20px">
            {overallPrice ? (
              <Typography variant="h4">
                Total Cart Price: ${overallPrice}
              </Typography>
            ) : (
              <Typography variant="h4">Total Cart Price:</Typography>
            )}

            <br />
            <Divider variant="middle" />
            <br />

            <Paper
              component="form"
              sx={{
                p: "2px 4px",
                display: "flex",
                alignItems: "center",
                width: 400,
              }}
            >
              <Typography variant="h6">Coupon Code:</Typography>
              <InputBase
                sx={{ marginLeft: 1, flex: 1 }}
                placeholder="Coupon Code Here"
              />
              <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
              <Directions />
            </Paper>
          </Box>
        </ThemeProvider>

        <br />
        <Divider variant="middle" />
        <br />
        <ThemeProvider theme={theme2}>
          <Box margin="20px">
            <Typography variant="h4">Payment Options:</Typography>
            <FormControl>
              <FormLabel>Select an Option</FormLabel>
              <RadioGroup
                value={selectedPaymentOption}
                onChange={changePaymentOption}
              >
                <FormControlLabel
                  value="COD"
                  control={<Radio />}
                  label="Cash on Delivery"
                />
                <FormControlLabel
                  value="CDC"
                  control={<Radio />}
                  label="Credit/Debit Card"
                />
              </RadioGroup>
            </FormControl>
          </Box>
        </ThemeProvider>
        <br />
        <Box margin="20px">
          {selectedPaymentOption === "CDC" ? (
            <Button
              variant="contained"
              size="large"
              onClick={() => setOpenPaymentBar(true)}
            >
              Checkout
            </Button>
          ) : (
            <Button variant="contained" size="large" onClick={codCheckout}>
              Cash-On-Delivery Checkout
            </Button>
          )}
          <Divider sx={{ mt: 3, mb: 3 }} />
          <Grid container justifyContent="center" flexDirection="row">
            <Grid item sx={{ width: "50%" }}>
              {openPaymentBar ? (
                <StripeContainer userId={currUser.id} cost={overallPrice} />
              ) : null}
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
}

export default Payment;
