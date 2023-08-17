import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useUserContext } from "../Components/UserContext";
import Swal from "sweetalert2";
const Profile = () => {
  const { currUser, setCurrUser } = useUserContext();

  const [userData, setUserData] = useState({
    userName: currUser.userName || "",
    firstName: currUser.firstName || "",
    lastName: currUser.lastName || "",
    email: currUser.email || "",
    mobileNumber: currUser.mobileNumber || "",
  });

  const [addressData, setAddressData] = useState({
    address: "",
    city: "",
    postalCode: "",
    contactNumber: "",
  });

  useEffect(() => {
    if (!currUser) {
      const localAccess = JSON.parse(localStorage.getItem("currUser"));
      setCurrUser(localAccess);
    }
  }, [currUser, setCurrUser]);

  useEffect(() => {
    getAddress();
  }, [currUser]);

  const getAddress = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/users/address/${currUser.id}`
      );
      setAddressData((prev) => ({ ...prev, ...response.data }));
    } catch (error) {
      console.error("Error fetching address:", error);
    }
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`${process.env.REACT_APP_BACKEND_URL}/users`, {
        ...userData,
        id: currUser.id,
      });
      await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/users/addresses/${currUser.id}`,
        { ...addressData, userId: currUser.id }
      );
      Swal.fire({
        title: "Success",
        text: "Profile updated successfully",
        icon: "success",
        confirmButtonText: "OK",
      });
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleInputChange = (event, setState, key) => {
    const { value } = event.target;
    setState((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <>
      <Box>
        <Typography variant="h3">My profile</Typography>
        <Typography variant="h5">Manage and protect your account</Typography>
        <hr />
        <Box
          sx={{
            p: "20px",
            display: "flex",
            flexDirection: "column",
            width: "300px",
            gap: "20px",
          }}
        >
          {/* Using a common function to handle changes and setting state */}
          <TextField
            required
            id="username"
            label="Username"
            value={userData.userName}
            onChange={(e) => handleInputChange(e, setUserData, "userName")}
            InputProps={{ style: { backgroundColor: "white" } }}
          />
          <TextField
            required
            id="firstname"
            label="First Name"
            value={userData.firstName}
            onChange={(e) => handleInputChange(e, setUserData, "firstName")}
            InputProps={{ style: { backgroundColor: "white" } }}
          />
          <TextField
            required
            id="lastname"
            label="Last Name"
            value={userData.lastName}
            onChange={(e) => handleInputChange(e, setUserData, "lastName")}
            InputProps={{ style: { backgroundColor: "white" } }}
          />
          <TextField
            required
            id="email"
            label="Email"
            type="email"
            value={userData.email}
            onChange={(e) => handleInputChange(e, setUserData, "email")}
            InputProps={{ style: { backgroundColor: "white" } }}
          />
          <TextField
            required
            id="phone"
            label="Phone"
            value={userData.mobileNumber}
            onChange={(e) => handleInputChange(e, setUserData, "mobileNumber")}
            InputProps={{ style: { backgroundColor: "white" } }}
          />
          <TextField
            required
            id="address"
            label="Address"
            value={addressData.address}
            onChange={(e) => handleInputChange(e, setAddressData, "address")}
            InputProps={{ style: { backgroundColor: "white" } }}
          />
          <TextField
            required
            id="city"
            label="City"
            value={addressData.city}
            onChange={(e) => handleInputChange(e, setAddressData, "city")}
            InputProps={{ style: { backgroundColor: "white" } }}
          />
          <TextField
            required
            id="postalCode"
            label="Postal Code"
            value={addressData.postalCode}
            onChange={(e) => handleInputChange(e, setAddressData, "postalCode")}
            InputProps={{ style: { backgroundColor: "white" } }}
          />
          <TextField
            required
            id="contactNumber"
            label="Mobile Number for Address"
            value={addressData.contactNumber}
            onChange={(e) =>
              handleInputChange(e, setAddressData, "contactNumber")
            }
            InputProps={{ style: { backgroundColor: "white" } }}
          />
          <Button onClick={handleUpdate} variant="contained">
            Update
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default Profile;
