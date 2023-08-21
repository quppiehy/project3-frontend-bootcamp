import { Box, Grid, Paper, Typography, ThemeProvider } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { theme2 } from "../theme";

const Delivery = () => {
  const [deliveryOptions, setDeliveryOptions] = useState([]);

  useEffect(() => {
    getAllDeliveryOptions();
  }, []);

  const getAllDeliveryOptions = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/orders/shippingmethods/list`
      );
      setDeliveryOptions(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <>
      <ThemeProvider theme={theme2}>
        <Box sx={{ paddingTop: "100px" }}>
          <Typography variant="h3" sx={{ py: "20px", textAlign: "center" }}>
            Shipping Methods
          </Typography>
        </Box>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            py: "20px",
            px: "20px",
          }}
        >
          <Grid container spacing={4} sx={{ width: "800px" }}>
            {deliveryOptions.map((deliveryOption, i) => (
              <Grid item xs={6} md={4} mkey={i}>
                <Paper
                  sx={{
                    maxWidth: "400px",
                    height: { xs: "350px", md: "200px" },
                    px: "20px",
                  }}
                >
                  <Typography sx={{ py: "20px" }} variant="h5">
                    {deliveryOption.name}
                  </Typography>
                  <Typography>{deliveryOption.description}</Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>
      </ThemeProvider>
    </>
  );
};

export default Delivery;
