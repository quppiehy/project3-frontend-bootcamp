import { Box, Grid, Typography, ThemeProvider } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import ProductCard from "../Components/ProductCard";
import { theme2 } from "../theme";

const Deals = () => {
  const [deals, setDeals] = useState([]);

  useEffect(() => {
    getAllDeals();
  }, []);

  const getAllDeals = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/products/list`
      );
      setDeals(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <>
      <ThemeProvider theme={theme2}>
        <Box sx={{ paddingTop: "100px" }}>
          <Typography variant="h3" sx={{ py: "20px", textAlign: "center" }}>
            Products on Saja
          </Typography>
          <Box
            sx={{
              p: {
                xs: "20px 5% 0 5%",
                md: "20px 20% 0 20%",
              },
              margin: "0px",
            }}
          >
            <Grid container spacing={2}>
              {deals.map((product, index) => (
                <Grid item xs={6} md={4} key={index}>
                  <ProductCard product={product} />
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>
      </ThemeProvider>
    </>
  );
};

export default Deals;
