import { Box, Grid, Paper, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    getAllCategories();
  }, []);

  const getAllCategories = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/products/categories`
      );
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <>
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
          {categories.map((category, i) => (
            <Grid item xs={6} md={4} mkey={i}>
              <Link
                to={`/categories/${category.id}`}
              >
                <Paper
                  sx={{
                    maxWidth: "400px",
                    height: { xs: "700px", md: "400px" },
                    px: "20px",
                  }}
                >
                  <Typography sx={{ py: "20px" }} variant="h5">
                    {category.name}
                  </Typography>
                  <Typography>{category.description}</Typography>
                </Paper>
              </Link>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default Categories;
