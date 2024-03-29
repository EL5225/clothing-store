import { useMutation, useQuery } from "@tanstack/react-query";
import {
  addToCart,
  checkoutCart,
  createProduct,
  deleteProduct,
  deleteProductFromCart,
  finishDelivery,
  getCarts,
  getDeliveries,
  getProductById,
  getProducts,
  getUserMe,
  updateProduct,
  updateProfile,
} from "./api";

export const useUserMe = () => {
  return useQuery({
    queryKey: ["userMe"],
    queryFn: async () => getUserMe(),
  });
};

export const useGetProducts = (params) => {
  return useQuery({
    queryKey: ["products", params],
    queryFn: async () => getProducts(params),
  });
};

export const useUpdateProfile = () => {
  return useMutation({
    mutationKey: ["updateProfile"],
    mutationFn: async (payload) => {
      const formData = new FormData();
      Object.entries(payload).forEach(([key, value]) => {
        formData.append(key, value);
      });
      await updateProfile(formData);
    },
  });
};

export const useAddToCart = (product_id) => {
  return useMutation({
    mutationKey: ["addToCart"],
    mutationFn: async (payload) => {
      await addToCart(product_id, payload);
    },
  });
};

export const useGetCarts = () => {
  return useQuery({
    queryKey: ["carts"],
    queryFn: async () => getCarts(),
  });
};

export const useDeleteProductFromCart = (cart_id) => {
  return useMutation({
    mutationKey: ["deleteProductFromCart"],
    mutationFn: async (product_id) => {
      await deleteProductFromCart(cart_id, product_id);
    },
  });
};

export const useCheckoutCart = () => {
  return useMutation({
    mutationKey: ["checkoutCart"],
    mutationFn: async () => {
      await checkoutCart();
    },
  });
};

export const useGetDeliveries = () => {
  return useQuery({
    queryKey: ["deliveries"],
    queryFn: async () => getDeliveries(),
  });
};

export const useFinishDelivery = () => {
  return useMutation({
    mutationKey: ["finishDelivery"],
    mutationFn: async (delivery_id) => {
      await finishDelivery(delivery_id);
    },
  });
};

export const useCreateProduct = () => {
  return useMutation({
    mutationKey: ["createProduct"],
    mutationFn: async (payload) => {
      const formData = new FormData();
      Object.entries(payload).forEach(([key, value]) => {
        formData.append(key, value);
      });
      await createProduct(formData);
    },
  });
};

export const useUpdateProduct = (product_id) => {
  return useMutation({
    mutationKey: ["updateProduct"],
    mutationFn: async (payload) => {
      const formData = new FormData();
      Object.entries(payload).forEach(([key, value]) => {
        formData.append(key, value);
      });
      await updateProduct(product_id, formData);
    },
  });
};

export const useDeleteProduct = () => {
  return useMutation({
    mutationKey: ["deleteProduct"],
    mutationFn: async (product_id) => {
      await deleteProduct(product_id);
    },
  });
};

export const useGetProductById = (product_id) => {
  return useQuery({
    queryKey: ["productById", product_id],
    queryFn: async () => getProductById(product_id),
  });
};
