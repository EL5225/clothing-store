import { api } from "./axios";

export const getUserMe = async () => {
  const { data } = await api.get("/users/me");
  return data;
};

export const getProducts = async (params) => {
  const { data } = await api.get("/products", {
    params,
  });
  return data;
};

export const updateProfile = async (payload) => {
  const { data } = await api.patch("/users/me", payload);
  return data;
};

export const addToCart = async (product_id, payload) => {
  const { data } = await api.patch(`/carts/${product_id}`, payload);
  return data;
};

export const getCarts = async () => {
  const { data } = await api.get("/carts");
  return data;
};

export const deleteProductFromCart = async (cart_id, product_id) => {
  const { data } = await api.delete(`/carts/${cart_id}/products/${product_id}`);
  return data;
};

export const checkoutCart = async () => {
  const { data } = await api.get("/carts/checkout");
  return data;
};

export const getDeliveries = async () => {
  const { data } = await api.get("/delivery");
  return data;
};

export const finishDelivery = async (delivery_id) => {
  const { data } = await api.get(`/delivery/${delivery_id}/finish`);
  return data;
};
