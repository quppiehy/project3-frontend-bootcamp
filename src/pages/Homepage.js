import React from "react";
import Hero from "../images/hero-image.png";
import {
  Box,
  Button,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActionArea,
} from "@mui/material";
import Books from "../images/category-books.png";
import Furniture from "../images/category-furniture.png";
import HandBag from "../images/category-handbag.png";
import Sneakers from "../images/category-sneakers.png";
import Tech from "../images/category-tech.png";
import Travel from "../images/category-travel.png";
import HomepodMini from "../images/deals-homepodmini.png";
import InstaxMini9 from "../images/deals-instaxmini9.png";
import BaseCampDuffelM from "../images/deals-basecampduffelm.png";
import FurnitureSaves from "../images/furniture-saves.png";
import BooksSaves from "../images/book-saves.png";
import ClothesSaves from "../images/clothes-saves.png";
import BackpacksSaves from "../images/backpacks-saves.png";

const Homepage = () => {
  const categories = [
    { image: Books, name: "Books" },
    { image: Furniture, name: "Furniture" },
    { image: HandBag, name: "Hand Bag" },
    { image: Sneakers, name: "Sneakers" },
    { image: Tech, name: "Tech" },
    { image: Travel, name: "Travel" },
  ];

  const deals = [
    {
      image: HomepodMini,
      name: "HomePod mini",
      description: "Table with air purifier, stained veneer/black",
      price: 239.0,
      stars: 121,
    },
    {
      image: InstaxMini9,
      name: "HomePod mini",
      description: "Selfie mode and selfie mirror, Macro mode",
      price: 239.0,
      stars: 121,
    },
    {
      image: BaseCampDuffelM,
      name: "Base Camp Duffel M",
      description: "Table with air purifier, stained veneer/black",
      price: 239.0,
      stars: 121,
    },
  ];
  const saves = [
    {
      save: 100,
      description: "Explore Our Furniture & Home Furnishing Page",
      image: FurnitureSaves,
      color: "#f2e4d9",
    },
    {
      save: 29,
      description: "Explore Our Furniture & Home Furnishing Page",
      image: BooksSaves,
      color: "#f9dcdc",
    },
    {
      save: 67,
      description: "Explore Our Furniture & Home Furnishing Page",
      image: ClothesSaves,
      color: "#f2e4d9",
    },
    {
      save: 59,
      description: "Explore Our Furniture & Home Furnishing Page",
      image: BackpacksSaves,
      color: "#d2f7ec",
    },
  ];

  return (
    <>
      {/* Hero */}
      <Box
        className="hero"
        sx={{
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: {
            xl: "60%",
          },
          overflow: "hidden",
        }}
      >
        <img src={Hero} alt="hero" />
        <Button
          variant="contained"
          color="primary"
          sx={{
            position: "absolute",
            left: {
              xs: "16%",
              lg: "5%",
            },
            bottom: "0%",
            transform: "translate(-50%, -50%)",
          }}
        >
          SHOP NOW
        </Button>
      </Box>

      {/* Top Categories */}
      <Box className="top-categories" sx={{ py: "20px" }}>
        <Typography variant="h2" sx={{}}>
          SHOP OUR TOP CATEGORIES
        </Typography>
        <Box sx={{ pt: "20px" }}>
          <Grid container spacing={2}>
            {categories.map((category, index) => (
              <Grid item xs={4} sm={6} md={4} lg={2} xl={2} key={index}>
                <Card
                  sx={{
                    height: { xs: "200px", sm: "250px" }, // Adjust as needed
                    width: { xs: "100%", sm: "200px" },
                    position: "relative",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <CardMedia
                    component="img"
                    sx={{
                      position: "absolute",
                      top: "0",
                      left: "0",
                      right: "0",
                      bottom: "0",
                      objectFit: "cover",
                      width: "100%",
                      height: "100%",
                    }}
                    image={category.image}
                    alt={`image ${index + 1}`}
                  />
                  <CardContent
                    sx={{
                      position: "absolute",
                      top: "10px",
                      left: "10px",
                      color: "white",
                      padding: "5px",
                    }}
                  >
                    <Typography variant="h5">{category.name}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>

      {/* Best deals */}
      <Box className="best-deals">
        <Typography variant="h2" sx={{}}>
          TODAY'S BEST DEALS FOR YOU
        </Typography>
        <Box sx={{ pt: "20px", margin: "0" }}>
          <Grid container spacing={2}>
            {deals.map((deal, index) => (
              <Grid
                item
                xs={12}
                md={4}
                lg={4}
                mkey={index}
                sx={{ width: "100%", margin: "0", padding: "0" }}
              >
                <Card sx={{ width: "100%", maxWidth: 345 }}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="100%"
                      image={deal.image}
                      alt={deal.name}
                    />
                    <CardContent>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          paddingBottom: "10px",
                        }}
                      >
                        <Typography gutterBottom variant="h5" component="div">
                          {deal.name}
                        </Typography>
                        <Typography sx={{ marginLeft: "auto" }} variant="h8">
                          ${deal.price}
                        </Typography>
                      </Box>
                      <Typography
                        sx={{ marginBottom: "20px" }}
                        variant="body2"
                        color="text.secondary"
                      >
                        {deal.description} <br />
                      </Typography>
                      <Button variant="outlined">Add to cart</Button>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>

      {/*  Get Up to 50% Off */}
      <Box sx={{ py: "20px" }}>
        <Typography variant="h2">GET UP TO 50% OFF</Typography>
        <Grid container spacing={2}>
          {saves.map((save, i) => (
            <Grid
              item
              xs={12}
              md={3}
              lg={3}
              mkey={i}
              sx={{ width: "100%", margin: "0", padding: "0" }}
            >
              <Card sx={{ maxWidth: 345, backgroundColor: save.color }}>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Save
                  </Typography>
                  <Typography gutterBottom variant="h5" component="div">
                    ${save.save}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {save.description}
                  </Typography>
                </CardContent>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="100%"
                    image={save.image}
                    alt={i + save.image}
                  />
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Footer */}
      <Box
        sx={{
          height: "500px",
          width: "99vw",
          backgroundColor: "primary.main",
        }}
      ></Box>
    </>
  );
};

export default Homepage;
