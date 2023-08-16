import { useState } from "react";
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

function UploadProduct() {
  const [productName, setProductName] = useState("");
  const [productPricePerUnit, setProductPricePerUnit] = useState();
  const [productDescription, setProductDescription] = useState();
  const [productCategory, setProductCategory] = useState("");
  const [productQuantity, setProductQuantity] = useState();
  const [productDiscount, setProductDiscount] = useState("false");
  const [productDiscountAmount, setProductDiscountAmount] = useState(1);
  const [uploadPicture1, setUploadPicture1] = useState(BasePlaceholder);
  const [uploadPicture2, setUploadPicture2] = useState(BasePlaceholder);
  const [uploadPicture3, setUploadPicture3] = useState(BasePlaceholder);
  const [uploadPicture4, setUploadPicture4] = useState(BasePlaceholder);

  const handleUploadPicture1 = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setUploadPicture1(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleUploadPicture2 = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setUploadPicture2(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleUploadPicture3 = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setUploadPicture3(reader.result);
    };
    reader.readAsDataURL(file);
  };
  const handleUploadPicture4 = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setUploadPicture4(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(uploadPicture1, uploadPicture2, uploadPicture3, uploadPicture4);
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
              {uploadPicture1 && (
                <img src={uploadPicture1} alt="Pic" height="280" width="280" />
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
              {uploadPicture2 && (
                <img src={uploadPicture2} alt="Pic" height="280" width="280" />
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
          <Box>
            <Stack direction="column" spacing={2}>
              {uploadPicture3 && (
                <img src={uploadPicture3} alt="Pic" height="280" width="280" />
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
              {uploadPicture4 && (
                <img src={uploadPicture4} alt="Pic" height="280" width="280" />
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
