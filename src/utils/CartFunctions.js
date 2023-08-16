import axios from "axios";

export const addToCart = async (id, quantityToBuy, currUserId) => {
  if (!quantityToBuy) {
    quantityToBuy = 1;
  }
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/products/carts/${currUserId}` //check if a user has a cart already
    );
    console.log("cart id", response.data);

    const UpdateCurrentCartProducts = {
      currentCartId: response.data,
      productId: id,
      quantity: quantityToBuy,
    };

    await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/products/carts/`,
      UpdateCurrentCartProducts
    );
  } catch (error) {
    console.error("Error adding to cart:", error);
  }
};

export const updateQuantityOfProduct = async (
  currentCartId,
  productId,
  quantityToBuy
) => {
  try {
    const quantityUpdated = {
      productId: productId,
      quantity: quantityToBuy,
    };

    const response = await axios.put(
      `${process.env.REACT_APP_BACKEND_URL}/products/cart/${currentCartId}`,
      quantityUpdated
    );
  } catch (err) {
    console.log(err);
  }
};

export const deleteProductFromCart = async (currentCartId, productId) => {
  try {
    const response = await axios.delete(
      `${process.env.REACT_APP_BACKEND_URL}/products/cart/${currentCartId}/${productId}`
    );
    return response.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const updateTotalOfCart = async (total, currentCartId) => {
  if (total > 0) {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/products/cart/${currentCartId}/total`,
        { total: total }
      );
      console.log(response.data);
      return response.data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  } else {
    return false;
  }
};
