import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Divider,
  TextField,
  Button,
  FormControlLabel,
  Radio,
  RadioGroup,
  FormControl,
  FormLabel,
  Grid,
  Card,
  CardContent,
  Stack,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import BasePlaceholder from "../images/280x280.svg";
import { useUserContext } from "../Components/UserContext";
import Swal from "sweetalert2";
import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { storage } from "../firebase";
import axios from "axios";

const STORAGE_KEY = "images/";

function UploadProduct() {
  const [productName, setProductName] = useState("");
  const [productPricePerUnit, setProductPricePerUnit] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productQuantity, setProductQuantity] = useState("");
  const [productDiscount, setProductDiscount] = useState("false");
  const [productDiscountAmount, setProductDiscountAmount] = useState(1);
  const [uploadPicture1Preview, setUploadPicture1Preview] =
    useState(BasePlaceholder);
  const [uploadPicture2Preview, setUploadPicture2Preview] =
    useState(BasePlaceholder);
  const [uploadPicture3Preview, setUploadPicture3Preview] =
    useState(BasePlaceholder);
  const [uploadPicture4Preview, setUploadPicture4Preview] =
    useState(BasePlaceholder);
  const [fileAdded1, setFileAdded1] = useState(null);
  const [fileAdded2, setFileAdded2] = useState(null);
  const [fileAdded3, setFileAdded3] = useState(null);
  const [fileAdded4, setFileAdded4] = useState(null);
  const [fileValue1, setFileValue1] = useState("");
  const [fileValue2, setFileValue2] = useState("");
  const [fileValue3, setFileValue3] = useState("");
  const [fileValue4, setFileValue4] = useState("");
  const { currUser, setCurrUser } = useUserContext();

  useEffect(() => {
    console.log(currUser);
    if (currUser === null) {
      const localAccess = JSON.parse(localStorage.getItem("currUser"));
      console.log(localAccess);
      setCurrUser(localAccess);
    }
  }, [currUser]);

  console.log(currUser);

  const handleUploadPicture1 = (e) => {
    const file = e.target.files[0];
    setFileAdded1(file);
    setFileValue1(e.target.value);
    const reader = new FileReader();
    reader.onloadend = () => {
      setUploadPicture1Preview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleUploadPicture2 = (e) => {
    const file = e.target.files[0];
    setFileAdded2(file);
    setFileValue2(e.target.value);
    const reader = new FileReader();
    reader.onloadend = () => {
      setUploadPicture2Preview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleUploadPicture3 = (e) => {
    const file = e.target.files[0];
    setFileAdded3(file);
    setFileValue3(e.target.value);
    const reader = new FileReader();
    reader.onloadend = () => {
      setUploadPicture3Preview(reader.result);
    };
    reader.readAsDataURL(file);
  };
  const handleUploadPicture4 = (e) => {
    const file = e.target.files[0];
    setFileAdded4(file);
    setFileValue4(e.target.value);
    const reader = new FileReader();
    reader.onloadend = () => {
      setUploadPicture4Preview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !fileAdded1 ||
      !productName ||
      !productPricePerUnit ||
      !productDescription ||
      !productCategory
    ) {
      Swal.fire({
        title: "Error!",
        text: "You need to populate all fields and make sure you have at least uploaded the main picture!",
        icon: "error",
        confirmButtonText: "Proceed",
      });
      return;
    }
    const uploadPictureFunction = async (file, name) => {
      return new Promise(async (resolve, reject) => {
        const fullStorageRef = storageRef(storage, STORAGE_KEY + name);
        await uploadBytes(fullStorageRef, file).then(() => {
          getDownloadURL(fullStorageRef)
            .then((url) => {
              resolve(url);
            })
            .catch((error) => {
              reject(error);
            });
        });
      });
    };

    const uploadPromises = [uploadPictureFunction(fileAdded1, fileAdded1.name)];
    if (fileAdded2) {
      console.log("upload pic2");
      uploadPromises.push(uploadPictureFunction(fileAdded2, fileAdded2.name));
    }

    if (fileAdded3) {
      console.log("upload pic3");
      uploadPromises.push(uploadPictureFunction(fileAdded3, fileAdded3.name));
    }

    if (fileAdded4) {
      console.log("upload pic4");
      uploadPromises.push(uploadPictureFunction(fileAdded4, fileAdded4.name));
    }

    Promise.all(uploadPromises).then((downloadLinks) => {
      console.log(downloadLinks);
      const sellerId = currUser.id;
      let sellerDiscountId;
      if (productDiscount === "false") {
        sellerDiscountId = null;
      } else {
        sellerDiscountId = productDiscountAmount;
      }
      const dataToSend = {
        sellerId: sellerId,
        sellerDiscountId: sellerDiscountId,
        title: productName,
        price: productPricePerUnit,
        description: productDescription,
        categoryId: productCategory,
        quantity: productQuantity,
        photos: downloadLinks,
      };

      axios
        .post(`${process.env.REACT_APP_BACKEND_URL}/products/`, {
          ...dataToSend,
        })
        .then((info) => {
          console.log(info);
          setFileAdded1(null);
          setFileAdded2(null);
          setFileAdded3(null);
          setFileAdded4(null);
          setFileValue1("");
          setFileValue2("");
          setFileValue3("");
          setFileValue4("");
        })
        .catch((error) => {
          console.log(error);
        });
    });
  };

  return (
    <>
      <Box>
        <Grid
          container
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Grid item>
            <Typography variant="h4" sx={{ fontWeight: "bold", mt: 3 }}>
              Product upload Page!
            </Typography>
            <Typography variant="body1">
              Input ALL Details to upload your product for sale!
            </Typography>
          </Grid>
        </Grid>
        <Card>
          <CardContent>
            <Typography
              variant="h6"
              color="text.primary"
              gutterBottom
              sx={{ fontWeight: "bold" }}
            >
              Product Name
            </Typography>
            <TextField
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              placeholder="GIGAMAX PRO 1000"
              sx={{ width: "48vw" }}
            />
            <Divider sx={{ mt: 1, mb: 1 }} />
            <Typography
              variant="h6"
              color="text.primary"
              gutterBottom
              sx={{ fontWeight: "bold" }}
            >
              Product Price per Unit
            </Typography>
            <TextField
              value={productPricePerUnit}
              onChange={(e) => setProductPricePerUnit(e.target.value)}
              placeholder="$250.00"
              sx={{ width: "48vw" }}
            />
            <Divider sx={{ mt: 1, mb: 1 }} />
            <Typography
              variant="h6"
              color="text.primary"
              gutterBottom
              sx={{ fontWeight: "bold" }}
            >
              Description of Product
            </Typography>
            <TextField
              value={productDescription}
              onChange={(e) => setProductDescription(e.target.value)}
              placeholder="Show the potential buyers the perks of this products!"
              sx={{ width: "95vw" }}
              multiline
              rows={5}
            />
            <Divider sx={{ mt: 1, mb: 1 }} />
            <FormControl>
              <FormLabel>Select a Category for your Product</FormLabel>
              <RadioGroup
                value={productCategory}
                onChange={(e) => setProductCategory(e.target.value)}
              >
                <Stack
                  direction="row"
                  spacing={10}
                  sx={{ mt: 1 }}
                  justifyContent="space-between"
                >
                  <FormControlLabel
                    value={1}
                    control={<Radio />}
                    label="Electronic Accessories"
                  />
                  <FormControlLabel
                    value={2}
                    control={<Radio />}
                    label="Electronic Devices"
                  />
                  <FormControlLabel
                    value={3}
                    control={<Radio />}
                    label="TV & Home Appliances"
                  />
                </Stack>
                <Stack
                  direction="row"
                  spacing={10}
                  sx={{ mt: 1 }}
                  justifyContent="space-between"
                >
                  <FormControlLabel
                    value={4}
                    control={<Radio />}
                    label="Health & Beauty"
                  />
                  <FormControlLabel
                    value={5}
                    control={<Radio />}
                    label="Babies & Toys"
                  />
                  <FormControlLabel
                    value={6}
                    control={<Radio />}
                    label="Groceries & Pets"
                  />
                </Stack>
                <Stack
                  direction="row"
                  spacing={10}
                  sx={{ mt: 1 }}
                  justifyContent="space-between"
                >
                  <FormControlLabel
                    value={7}
                    control={<Radio />}
                    label="Home & Lifestyle"
                  />
                  <FormControlLabel
                    value={8}
                    control={<Radio />}
                    label="Women's Fashion"
                  />
                  <FormControlLabel
                    value={9}
                    control={<Radio />}
                    label="Men's Fashion"
                  />
                </Stack>
                <Stack
                  direction="row"
                  spacing={10}
                  sx={{ mt: 1 }}
                  justifyContent="space-between"
                >
                  <FormControlLabel
                    value={10}
                    control={<Radio />}
                    label="Fashion Accessories"
                  />
                </Stack>
              </RadioGroup>
            </FormControl>
            <Divider sx={{ mt: 1, mb: 1 }} />
            <Typography
              variant="h6"
              color="text.primary"
              gutterBottom
              sx={{ fontWeight: "bold" }}
            >
              Total Available Quantity for Sale
            </Typography>
            <TextField
              value={productQuantity}
              onChange={(e) => setProductQuantity(e.target.value)}
              placeholder="5000"
              sx={{ width: "48vw" }}
            />
            <Divider sx={{ mt: 1, mb: 1 }} />
            <Typography
              variant="h6"
              color="text.primary"
              gutterBottom
              sx={{ fontWeight: "bold" }}
            >
              Discount
            </Typography>
            <FormControl>
              <FormLabel>Allow for Discounts?</FormLabel>
              <RadioGroup
                value={productDiscount}
                onChange={(e) => setProductDiscount(e.target.value)}
              >
                <Stack
                  direction="row"
                  spacing={10}
                  sx={{ mt: 1 }}
                  justifyContent="space-between"
                >
                  <FormControlLabel
                    value={"true"}
                    control={<Radio />}
                    label="Yes"
                  />
                  <FormControlLabel
                    value={"false"}
                    control={<Radio />}
                    label="No"
                  />
                  <FormControl sx={{ width: "20vw" }}>
                    <InputLabel>Discount %</InputLabel>
                    <Select
                      value={productDiscountAmount}
                      label="DiscountPercent"
                      onChange={(e) => setProductDiscountAmount(e.target.value)}
                      disabled={productDiscount === "false"}
                    >
                      <MenuItem value={1}>1</MenuItem>
                      <MenuItem value={2}>2</MenuItem>
                      <MenuItem value={3}>3</MenuItem>
                      <MenuItem value={4}>4</MenuItem>
                      <MenuItem value={5}>5</MenuItem>
                      <MenuItem value={6}>6</MenuItem>
                      <MenuItem value={7}>7</MenuItem>
                      <MenuItem value={8}>8</MenuItem>
                      <MenuItem value={9}>9</MenuItem>
                      <MenuItem value={10}>10</MenuItem>
                      <MenuItem value={11}>11</MenuItem>
                      <MenuItem value={12}>12</MenuItem>
                    </Select>
                  </FormControl>
                </Stack>
              </RadioGroup>
            </FormControl>
            <Divider sx={{ mt: 1, mb: 1 }} />
          </CardContent>
        </Card>
        <Stack direction="row" sx={{ mt: 9 }} justifyContent="space-around">
          <Box>
            <Stack direction="column" spacing={2}>
              {uploadPicture1Preview && (
                <img
                  src={uploadPicture1Preview}
                  alt="Pic"
                  height="280"
                  width="280"
                />
              )}
              <label>
                <Button
                  variant="contained"
                  component="span"
                  sx={{ width: 280 }}
                >
                  Upload Main Picture
                </Button>
                <input
                  hidden
                  accept="image/*"
                  type="file"
                  onChange={handleUploadPicture1}
                />
              </label>
            </Stack>
          </Box>
          <Box>
            <Stack direction="column" spacing={2}>
              {uploadPicture2Preview && (
                <img
                  src={uploadPicture2Preview}
                  alt="Pic"
                  height="280"
                  width="280"
                />
              )}
              <label>
                <Button
                  variant="contained"
                  component="span"
                  sx={{ width: 280 }}
                >
                  Upload Side Picture 1
                </Button>
                <input
                  hidden
                  accept="image/*"
                  type="file"
                  onChange={handleUploadPicture2}
                />
              </label>
            </Stack>
          </Box>
        </Stack>
        <Stack direction="row" sx={{ mt: 9 }} justifyContent="space-around">
          <Box>
            <Stack direction="column" spacing={2}>
              {uploadPicture3Preview && (
                <img
                  src={uploadPicture3Preview}
                  alt="Pic"
                  height="280"
                  width="280"
                />
              )}
              <label>
                <Button
                  variant="contained"
                  component="span"
                  sx={{ width: 280 }}
                >
                  Upload Side Picture 2
                </Button>
                <input
                  hidden
                  accept="image/*"
                  type="file"
                  onChange={handleUploadPicture3}
                />
              </label>
            </Stack>
          </Box>
          <Box>
            <Stack direction="column" spacing={2}>
              {uploadPicture4Preview && (
                <img
                  src={uploadPicture4Preview}
                  alt="Pic"
                  height="280"
                  width="280"
                />
              )}
              <label>
                <Button
                  variant="contained"
                  component="span"
                  sx={{ width: 280 }}
                >
                  Upload Side Picture 3
                </Button>
                <input
                  hidden
                  accept="image/*"
                  type="file"
                  onChange={handleUploadPicture4}
                />
              </label>
            </Stack>
          </Box>
        </Stack>
        <Grid container justifyContent="center" sx={{ mt: 3, mb: 3 }}>
          <Button variant="contained" color="secondary" onClick={handleSubmit}>
            Submit Product
          </Button>
        </Grid>
      </Box>
    </>
  );
}

export default UploadProduct;
