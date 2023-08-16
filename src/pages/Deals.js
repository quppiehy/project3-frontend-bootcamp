import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../Components/ProductCard";

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
      <Typography variant="h3" sx={{ py: "20px", textAlign: "center" }}>
        All the products!
      </Typography>
      <Box
        sx={{
          p: {
            xs: "20px 5% 0 5%",
            md: "20px 20% 0 20%",
          },
          margin: "0",
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
    </>
  );
};

export default Deals;
