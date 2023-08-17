import React, { useState, useEffect } from "react";
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
import { ThemeProvider } from "@mui/material/styles";
import ElectronicAccessoriesPicture from "../images/ElectronicAccessories.png";
import ElectronicDevices from "../images/ElectronicDevices.png";
import TV from "../images/TV.png";
import Cream from "../images/Cream.png";
import BabyToys from "../images/BabyToys.png";
import PetsGroceries from "../images/PetsGroceries.png";
import HomepodMini from "../images/deals-homepodmini.png";
import InstaxMini9 from "../images/deals-instaxmini9.png";
import BaseCampDuffelM from "../images/deals-basecampduffelm.png";
import FurnitureSaves from "../images/furniture-saves.png";
import BooksSaves from "../images/book-saves.png";
import ClothesSaves from "../images/clothes-saves.png";
import BackpacksSaves from "../images/backpacks-saves.png";
import ProductCard from "../Components/ProductCard";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { useUserContext } from "../Components/UserContext";
import { Link } from "react-router-dom";
import { theme2 } from "../theme";

const Homepage = () => {
  const { loginWithRedirect, getAccessTokenSilently, user, isAuthenticated } =
    useAuth0();
  const [accessToken, setAccessToken] = useState("");
  const { setCurrUser, currUser } = useUserContext();
  const [deal1, setDeal1] = useState();
  const [deal2, setDeal2] = useState();
  const [deal3, setDeal3] = useState();
  const [overallDeals, setOverallDeals] = useState();

  const [deals, setDeals] = useState([
    {
      photos: [
        {
          url: HomepodMini,
        },
      ],
      title: "etc",
      description: "etc",
      price: "etc",
      id: 0,
    },
    {
      photos: [
        {
          url: InstaxMini9,
        },
      ],
      title: "etc",
      description: "etc",
      price: "etc",
      id: 0,
    },
    {
      photos: [
        {
          url: BaseCampDuffelM,
        },
      ],
      title: "etc",
      description: "etc",
      price: "etc",
      id: 0,
    },
  ]);

  useEffect(() => {
    if ((deal1, deal2, deal3)) {
      setDeals([
        {
          photos: [
            {
              url: deal1.photos[0].url,
            },
          ],
          title: deal1.title,
          description: deal1.description,
          price: deal1.price,
          id: deal1.id,
        },
        {
          photos: [
            {
              url: deal2.photos[0].url,
            },
          ],
          title: deal2.title,
          description: deal2.description,
          price: deal2.price,
          id: deal2.id,
        },
        {
          photos: [
            {
              url: deal3.photos[0].url,
            },
          ],
          title: deal3.title,
          description: deal3.description,
          price: deal3.price,
          id: deal3.id,
        },
      ]);
    }
  }, [deal1, deal2, deal3]);
  const categories = [
    { image: ElectronicAccessoriesPicture, name: "Electronic Accessories" },
    { image: ElectronicDevices, name: "Electronic Devices" },
    { image: TV, name: "TV & Home Appliances" },
    { image: Cream, name: "Health & Beauty" },
    { image: BabyToys, name: "Baby Toys & Products" },
    { image: PetsGroceries, name: "Pets & Groceries" },
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

  useEffect(() => {
    const checkLogin = async () => {
      const accessToken = await getAccessTokenSilently({
        authorizationParams: {
          audience: process.env.REACT_APP_AUDIENCE,
          scope: process.env.REACT_APP_SCOPE,
        },
      });
      setAccessToken(accessToken);
      // }
      console.log("Access Token : ", accessToken);
      console.log("User: ", user);
      if (
        isAuthenticated &&
        accessToken !== null &&
        typeof user.email !== "undefined"
      ) {
        // post to db
        const userInfo = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/users/login`,
          user
        );
        console.log(userInfo.data.checkedUser);
        if (userInfo != null) {
          setCurrUser(userInfo.data.checkedUser);
        }
      }
    };
    checkLogin();
  }, [user, isAuthenticated]);

  useEffect(() => {
    if (accessToken !== null) {
      localStorage.setItem("Token", JSON.stringify(accessToken));
    }
  }, [accessToken]);

  useEffect(() => {
    if (currUser !== null || currUser !== "") {
      localStorage.setItem("currUser", JSON.stringify(currUser));
    }
  }, [currUser]);

  useEffect(() => {
    console.log(setCurrUser);
  }, [setCurrUser]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/products/list`)
      .then((info) => {
        const data = info.data;
        console.log(data);
        const maxNumber = data.length;
        let randomNumber1 = Math.floor(Math.random() * maxNumber);
        console.log(randomNumber1);
        let randomNumber2 = Math.floor(Math.random() * maxNumber);
        console.log(randomNumber2);
        let randomNumber3 = Math.floor(Math.random() * maxNumber);
        console.log(randomNumber3);
        setDeal1(data[randomNumber1]);
        setDeal2(data[randomNumber2]);
        setDeal3(data[randomNumber3]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    console.log("deal1", deal1);
  }, [deal1]);
  useEffect(() => {
    console.log("deal2", deal3);
  }, [deal2]);
  useEffect(() => {
    console.log("deal3", deal3);
  }, [deal3]);
  return (
    <>
      {/* Hero */}

      <Box
        className="hero"
        sx={{
          paddingTop: "60px",
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: {
            xl: "50vh",
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
              xs: "10%",
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
      <ThemeProvider theme={theme2}>
        <Box className="top-categories" sx={{ paddingLeft: "50px" }}>
          <Typography
            variant="h4"
            sx={{ p: "20px 0 20px 0", overflow: "hidden" }}
          >
            SHOP OUR TOP CATEGORIES
          </Typography>
          <Box sx={{ p: "20px" }}>
            <Grid container spacing={2}>
              {categories.map((category, index) => (
                <Grid item xs={4} sm={6} md={4} lg={2} xl={2} key={index}>
                  <Link to={`/categories/${index + 1}`}>
                    <Card
                      sx={{
                        height: { xs: "200px", sm: "250px" },
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
                          left: {
                            xs: "-1",
                            md: "10px",
                          },
                          color: "white",
                          padding: "5px",
                        }}
                      >
                        <Typography variant="h5">{category.name}</Typography>
                      </CardContent>
                    </Card>
                  </Link>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>
      </ThemeProvider>
      {/* Best deals */}
      <ThemeProvider theme={theme2}>
        <Box className="best-deals" sx={{ paddingLeft: "50px" }}>
          <Typography variant="h4" sx={{ py: "30px" }}>
            TODAY'S BEST DEALS FOR YOU
          </Typography>
          <Box sx={{ p: "20px 5% 0 5%", margin: "0" }}>
            <Grid container spacing={2}>
              {deals.map((product, index) => {
                console.log("product is", product);
                return (
                  <Grid item xs={6} md={4} key={index}>
                    <ProductCard product={product} />
                  </Grid>
                );
              })}
            </Grid>
          </Box>
        </Box>
      </ThemeProvider>
      {/*  Get Up to 50% Off */}
      <ThemeProvider theme={theme2}>
        <Box sx={{ p: "20px", paddingLeft: "50px" }}>
          <Typography variant="h4" sx={{ py: "20px" }}>
            GET UP TO 50% OFF
          </Typography>
          <Grid container spacing={4}>
            {saves.map((save, i) => (
              <Grid
                item
                xs={6}
                md={6}
                xl={3}
                key={i}
                sx={{ margin: "0", padding: "0" }}
              >
                <Card
                  sx={{
                    height: "97%",
                    backgroundColor: save.color,
                  }}
                >
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
      </ThemeProvider>
      {/* Footer */}
      <Box
        sx={{
          height: "200px",
          width: "100%",
          backgroundColor: "primary.main",
          overflow: "hidden",
        }}
      ></Box>
    </>
  );
};

export default Homepage;
