import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
} from "@mui/material";

function ProductsOrders() {
  const [orderData, setOrderData] = useState([]);
  const [orderIds, setOrderIds] = useState([]);
  const [selectedOrderId, setSelectedOrderId] = useState("");

  useEffect(() => {
    // Fetch available order IDs
    axios
      .get("http://localhost:8080/orders/list")
      .then((response) => {
        const ids = response.data.map((order) => order.id);
        setOrderIds(ids);
        if (ids.length > 0) {
          setSelectedOrderId(ids[0]);
        }
      })
      .catch((error) => {
        console.error("Error fetching order IDs:", error);
      });
  }, []);

  useEffect(() => {
    if (selectedOrderId !== "") {
      // Fetch order data based on selected order ID
      axios
        .get(`http://localhost:8080/productorders/${selectedOrderId}`)
        .then((response) => {
          setOrderData(response.data);
        })
        .catch((error) => {
          console.error("Error fetching order data:", error);
        });
    }
  }, [selectedOrderId]);

  const handleOrderChange = (event) => {
    setSelectedOrderId(event.target.value);
  };

  return (
    <div>
      <h1>Order Information</h1>
      <label htmlFor="orderSelect">Select Order ID:</label>
      <Select
        id="orderSelect"
        value={selectedOrderId}
        onChange={handleOrderChange}
      >
        {orderIds.map((orderId) => (
          <MenuItem key={orderId} value={orderId}>
            {orderId}
          </MenuItem>
        ))}
      </Select>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Product ID</TableCell>
              <TableCell>Subtotal Price</TableCell>
              <TableCell>Discount Amount</TableCell>
              <TableCell>Total Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orderData.map((orderItem, index) => (
              <TableRow key={index}>
                <TableCell>{orderItem.productId}</TableCell>
                <TableCell>{orderItem.subtotalPrice}</TableCell>
                <TableCell>{orderItem.sellerDiscountAmount}</TableCell>
                <TableCell>
                  {orderItem.subtotalPrice - orderItem.sellerDiscountAmount}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default ProductsOrders;
