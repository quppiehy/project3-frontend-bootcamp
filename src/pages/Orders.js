import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, List, ListItem, ListItemText } from '@mui/material';

function Orders() {
  const [userOrders, setUserOrders] = useState([]);
  const [userId , setUserId] = useState('')
  const [orderDate, setOrderDate]=useState('')
  const [totalPrice, setTotalPrice]=useState('')
  const [shippingMethodId, setShippingMethodId] = useState('')
  const [userDiscountId, setUserDiscountId]=useState('')
  const [userDiscountAmount, setUserDiscountAmount] =useState('')
   const [currUser, setCurrUser] = useState("");
useEffect(() => {
  console.log(currUser);
  if (currUser === null) {
    const localAccess = JSON.parse(localStorage.getItem("currUser"));
    console.log(localAccess);
    setCurrUser(localAccess);
  }
}, [currUser]);

const handleOrders = async () => {
  console.log(
    userId,
    orderDate,
    totalPrice,
    shippingMethodId,
    userDiscountId,
    userDiscountAmount
  );
  try {
    const response = await axios.post(`http://localhost:8080/orders`, {
      userId:userId,
      orderDate:orderDate,
      totalPrice:totalPrice,
      shippingMethodId:shippingMethodId,
      userDiscountId:userDiscountId,
      userDiscountAmount:userDiscountAmount
    });
    console.log(response);
    // You can also show a success message to the user if needed
  } catch (error) {
    console.log(error);
    // Handle error, show an error message, etc.
  }
};


  

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Your Orders</Typography>
      <List>
        {userOrders.map(order => (
          <ListItem key={order.id} alignItems="flex-start">
            <ListItemText
              primary={`Order ID: ${order.id}`}
              secondary={
                <>
                  <Typography
                    component="span"
                    variant="body2"
                    color="textPrimary"
                  >
                    Total Price: {order.totalPrice}
                  </Typography>
                  {/* Display other order details */}
                </>
              }
            />
          </ListItem>
        ))}
      </List>
    </Container>
  );
}

export default Orders;
