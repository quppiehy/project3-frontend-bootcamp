import { Box, Button, Grid, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ProductCard from "../Components/ProductCard";

const Category = () => {
  const { categoryId } = useParams();

  const [products, setProducts] = useState([]);
  const [categoryInfo, setCategoryInfo] = useState([]);

  useEffect(() => {
    getCategoryInfo();
    getAllProductsByCategory();
  }, []);

  const getCategoryInfo = async () => {
    try {
      const url = `${process.env.REACT_APP_BACKEND_URL}/products/category/${categoryId}`;
      console.log(url);
      const response = await axios.get(url);
      setCategoryInfo(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getAllProductsByCategory = async () => {
    try {
      const url = `${process.env.REACT_APP_BACKEND_URL}/products/categories/${categoryId}`;
      console.log(url);
      const response = await axios.get(url);
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  console.log(categoryInfo);
  console.log(products);

  return (
    <>
      <Box>
        <Box sx={{ p: "20px 5% 20px 5%", width: "100%", m: "0 auto" }}>
          <Link to="/categories">
            <Button sx={{ color: "#000" }} variant="">
              Back to all categories
            </Button>
          </Link>
          <Typography variant="h4">Products in {categoryInfo.name}</Typography>
          <Typography variant="h5">{categoryInfo.description}</Typography>
        </Box>

        {/* Products */}
        <Box>
          <Box sx={{ p: "2% 5%", margin: "0" }}>
            <Grid container spacing={2}>
              {products.map((product, index) => (
                <Grid item xs={6} md={3} key={index}>
                  <ProductCard product={product} />
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Category;
