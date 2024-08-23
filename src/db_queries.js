import axios from "axios";

export async function getProducts() {
  const response = await axios.get("/api/products");
  const products = response.data;
  return products;
}

export async function getCartItems(userId) {
  const response = await axios.get(`/api/users/${userId}/cart`);

  const cartItems = response.data;
  return cartItems;
}

export async function deleteProductFromCart(userId, productId) {
  const response = await axios.delete(`/api/users/${userId}/cart/${productId}`);
  const updatedCart = response.data;
  return updatedCart;
}

export async function getSingleProduct(productId) {
  const response = await axios.get(`/api/products/${productId}`);
  const product = response.data;
  return product;
}

export async function registerUser(userName, userEmail, userPassword) {
  const userData = {
    userName: userName,
    userEmail: userEmail,
    userPassword: userPassword,
  };

  try {
    const response = await axios.post("/api/users/add", userData);
    const message = response.data.message;
    return message;
  } catch (error) {
    return "Error adding user:", error.response.data;
  }
}
